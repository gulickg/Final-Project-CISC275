import React from 'react';
import { render, screen } from '@testing-library/react';
import { BasicQuestions } from './BasicQuestions';

jest.mock('../Question-Templates/RadioButtonsQuestion', () => ({
  RadioButtonQuestion: ({ order, question }: any) => (
    <div data-testid={`radio-${order}`}>{question}</div>
  )
}));

jest.mock('../Question-Templates/SliderQuestion', () => ({
  SliderRangeQuestion: ({ order, question }: any) => (
    <div data-testid={`slider-${order}`}>{question}</div>
  )
}));

jest.mock('../Question-Templates/SwitchQuestion', () => ({
  SwitchQuestion: ({ order, question }: any) => (
    <div data-testid={`switch-${order}`}>{question}</div>
  )
}));

const mockSetAnswers = jest.fn();
const mockSetPage = jest.fn();
const mockSetReport = jest.fn();
const mockLoading = jest.fn();

describe('BasicQuestions component', () => {
  const blankAnswers = ['', '', '', '', '', '', ''];
  const filledAnswers = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

  it('renders all 7 questions', () => {
    render(
      <BasicQuestions
        answers={blankAnswers}
        setAnswers={mockSetAnswers}
        completed={0}
        setPage={mockSetPage}
        setReport={mockSetReport}
        apiExists={false}
        loading={mockLoading}
      />
    );

    for (let i = 1; i <= 4; i++) {
      expect(screen.getByTestId(`radio-${i}`)).toBeInTheDocument();
    }
    for (let i = 5; i <= 6; i++) {
      expect(screen.getByTestId(`slider-${i}`)).toBeInTheDocument();
    }
    expect(screen.getByTestId(`switch-7`)).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /submit responses/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('disables the submit button when API key is missing, even if complete', () => {
    render(
      <BasicQuestions
        answers={filledAnswers}
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

  it('enables the submit button when all questions are complete and API key exists', () => {
    render(
      <BasicQuestions
        answers={filledAnswers}
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
