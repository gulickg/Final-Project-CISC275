// import React from "react";
// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { AIpage } from './AIIntegration';
import OpenAI from 'openai';
import { Report } from './Report';
import { Question } from './Detailed-Questions-Folder/DetailedQuestions';

jest.mock('openai');
jest.mock('./Report');

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

const mockChatResponse = {
  choices: [
    {
      message: {
        content: `{
          "title": "Project Manager",
          "description": "Leads teams, creates project plans, and oversees deliverables.",
          "breakdown": "1. Tokyo implies interest in innovation and structure.\\n2. Planner role matches project leadership."
        }`
      }
    }
  ]
};

describe('AIpage()', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (OpenAI as unknown as jest.Mock).mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue(mockChatResponse)
        }
      }
    }));
  });

  it('calls OpenAI and then Report with parsed JSON data', async () => {
    await AIpage({questions: mockQuestions}, 'Structured', 'fake-api-key');

    expect(Report).toHaveBeenCalledWith(
      'Project Manager',
      'Leads teams, creates project plans, and oversees deliverables.',
      expect.stringContaining('Tokyo implies'),
      'Structured'
    );

    const OpenAIInstance = (OpenAI as unknown as jest.Mock).mock.results[0].value;
    expect(OpenAIInstance.chat.completions.create).toHaveBeenCalled();
  });

  it('logs error if JSON is malformed in OpenAI response', async () => {
    (OpenAI as unknown as jest.Mock).mockImplementation(() => ({
      chat: {
        completions: {
          create: jest.fn().mockResolvedValue({
            choices: [{ message: { content: 'not JSON at all' } }]
          })
        }
      }
    }));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    await AIpage({questions: mockQuestions}, 'Creative', 'fake-api-key');
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error generating career'),
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });
  it('logs error if API key is missing', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const originalEnv = process.env.OPENAI_API_KEY;
    (global as any).API_KEY_HERE = null;
    await AIpage({questions: mockQuestions}, 'Technical', 'fake-api-key');
    expect(consoleSpy).toHaveBeenCalledWith('API key not found.');
    consoleSpy.mockRestore();
    process.env.OPENAI_API_KEY = originalEnv;
  });
});


export function AITest(){}