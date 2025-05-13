import React from "react";
import { render, screen } from "@testing-library/react";
import { DetailedQuestions } from './DetailedQuestions';

jest.mock('../Question-Templates/TextInputQuestion', () => ({
  TextInputQuestion: ({ qNumber, question }: any) => (
    <div data-testid={`question-${qNumber}`}>{question}</div>
  )
}));

const mockSetAnswers = jest.fn();
const mockSetPage = jest.fn();
const mockSetReport = jest.fn();
const mockLoading = jest.fn();

describe('DetailedQuestions component', () => {
  const blankAnswers = ['', '', '', '', '', '', ''];
  const validAnswers = Array(7).fill('12345678901'); 

  it('renders all 7 questions', () => {
    render(
      <DetailedQuestions
        answers={blankAnswers}
        setAnswers={mockSetAnswers}
        completed={0}
        setPage={mockSetPage}
        setReport={mockSetReport}
        apiExists={false}
        loading={mockLoading}
      />
    );
    for (let i = 1; i <= 7; i++) {
      expect(screen.getByTestId(`question-${i}`)).toBeInTheDocument();
    }
  });

  it('disables submit button if answers are incomplete', () => {
    render(
      <DetailedQuestions
        answers={blankAnswers}
        setAnswers={mockSetAnswers}
        completed={3}
        setPage={mockSetPage}
        setReport={mockSetReport}
        apiExists={true}
        loading={mockLoading}
      />
    );
    const button = screen.getByRole('button', { name: /submit responses/i });
    expect(button).toBeDisabled();
  });

  it('disables submit button even if answers are complete but api key is missing', () => {
    render(
      <DetailedQuestions
        answers={validAnswers}
        setAnswers={mockSetAnswers}
        completed={7}
        setPage={mockSetPage}
        setReport={mockSetReport}
        apiExists={false}
        loading={mockLoading}
      />
    );
    const button = screen.getByRole('button', { name: /submit responses/i });
    expect(button).toBeDisabled();
  });

  it('enables submit button when all answers are complete and API key exists', () => {
    render(
      <DetailedQuestions
        answers={validAnswers}
        setAnswers={mockSetAnswers}
        completed={7}
        setPage={mockSetPage}
        setReport={mockSetReport}
        apiExists={true}
        loading={mockLoading}
      />
    );
    const button = screen.getByRole('button', { name: /submit responses/i });
    expect(button).toBeEnabled();
  });
});
