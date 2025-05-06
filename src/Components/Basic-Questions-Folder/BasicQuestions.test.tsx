// import React from "react";
// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";

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

describe('BasicQuestions component', () => {
  const answers = ['', '', '', '', '', '', ''];
  const mockSetAnswers = jest.fn();
  it('renders all radio, slider, and switch questions', () => {
    render(<BasicQuestions answers={answers} setAnswers={mockSetAnswers} completed={0} />);

    expect(screen.getByTestId('radio-1')).toBeInTheDocument();
    expect(screen.getByTestId('radio-2')).toBeInTheDocument();
    expect(screen.getByTestId('radio-3')).toBeInTheDocument();
    expect(screen.getByTestId('radio-4')).toBeInTheDocument();

    expect(screen.getByTestId('slider-5')).toBeInTheDocument();
    expect(screen.getByTestId('slider-6')).toBeInTheDocument();

    expect(screen.getByTestId('switch-7')).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: /submit responses/i });
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeDisabled(); // completed < 100%
  });
  it('enables the submit button when all questions are complete', () => {
    render(<BasicQuestions answers={['a', 'b', 'c', 'd', 'e', 'f', 'g']} setAnswers={mockSetAnswers} completed={7} />);
    const submitBtn = screen.getByRole('button', { name: /submit responses/i });
    expect(submitBtn).toBeEnabled();
  });
});


export function HomepageTest(){}