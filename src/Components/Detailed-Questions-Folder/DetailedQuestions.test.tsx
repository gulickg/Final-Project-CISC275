import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { DetailedQuestions } from './DetailedQuestions';


// jest.mock('../Question-Templates/TextInputQuestion', () => ({
//   TextInputQuestion: ({ qNumber, question }: any) => (
//     <div data-testid={`question-${qNumber}`}>{question}</div>
//   )
// }));

// describe('DetailedQuestions component', () => {
//   const blankAnswers = ['', '', '', '', '', '', ''];
//   const filledAnswers = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
//   const mockSetAnswers = jest.fn();
//   it('renders all 7 questions', () => {
//     render(<DetailedQuestions answers={blankAnswers} setAnswers={mockSetAnswers} completed={0} />);
//     for (let i = 1; i <= 7; i++) {
//       expect(screen.getByTestId(`question-${i}`)).toBeInTheDocument();
//     }
//   });
//   it('disables the submit button when not all questions are answered', () => {
//     render(<DetailedQuestions answers={blankAnswers} setAnswers={mockSetAnswers} completed={3} />);
//     const submitBtn = screen.getByRole('button', { name: /submit responses/i });
//     expect(submitBtn).toBeDisabled();
//   });
//   it('enables the submit button when all questions are completed', () => {
//     render(<DetailedQuestions answers={filledAnswers} setAnswers={mockSetAnswers} completed={7} />);
//     const submitBtn = screen.getByRole('button', { name: /submit responses/i });
//     expect(submitBtn).toBeEnabled();
//   });
// });

export function HomepageTest(){}