import { AIpage } from './AIIntegration';
import OpenAI from 'openai';
import { Question } from './Detailed-Questions-Folder/DetailedQuestions';

jest.mock('openai');

const mockQuestions: Question[] = [
  {
    num: 1,
    question: 'Where would you live and why?',
    answer: 'Tokyo for the culture and innovation.',
    tooltip: 'fake'
  },
  {
    num: 2,
    question: 'What role do you take in group work?',
    answer: 'Usually the planner or organizer.',
    tooltip: 'fake'
  }
];

const mockResponseContent = JSON.stringify([
  {
    title: "Project Manager",
    description: "Leads teams, creates project plans, and oversees deliverables.",
    breakdown: "1. Tokyo implies interest in innovation and structure.\n2. Planner role matches project leadership.",
    percentMatch: 90,
    skills: ["Planning", "Communication"],
    personalityTraits: ["Organized", "Strategic"],
    salary: "$95,000",
    potentialMajors: ["Business", "Management"]
  }
]);

const mockChatResponse = {
  choices: [
    {
      message: {
        content: mockResponseContent
      }
    }
  ]
};

describe('AIpage()', () => {
  const mockPopulateReport = jest.fn();
  const mockLoading = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (OpenAI as unknown as jest.Mock).mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue(mockChatResponse)
        }
      }
    }));
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify('fake-api-key')
    );
  });

  it('calls OpenAI and returns parsed report', async () => {
    await AIpage(mockQuestions, mockPopulateReport, mockLoading);

    expect(mockLoading).toHaveBeenCalledWith(true);
    expect(mockLoading).toHaveBeenCalledWith(false);
    expect(mockPopulateReport).toHaveBeenCalledWith(mockResponseContent);

    const OpenAIInstance = (OpenAI as unknown as jest.Mock).mock.results[0].value;
    expect(OpenAIInstance.chat.completions.create).toHaveBeenCalled();
  });

  it('handles malformed JSON response gracefully', async () => {
    const malformedChatResponse = {
      choices: [{ message: { content: 'not a json string' } }]
    };

    (OpenAI as unknown as jest.Mock).mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue(malformedChatResponse)
        }
      }
    }));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    await AIpage(mockQuestions, mockPopulateReport, mockLoading);
    expect(mockPopulateReport).toHaveBeenCalledWith('not a json string');
    expect(consoleSpy).not.toHaveBeenCalled(); // note: no JSON.parse in AIpage currently
    consoleSpy.mockRestore();
  });

  it('logs and handles OpenAI errors', async () => {
    (OpenAI as unknown as jest.Mock).mockImplementation(() => {
      throw new Error('OpenAI failed');
    });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    await AIpage(mockQuestions, mockPopulateReport, mockLoading);

    expect(consoleSpy).toHaveBeenCalledWith("AI Error: ", expect.any(Error));
    consoleSpy.mockRestore();
  });
});

