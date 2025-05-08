import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { Homepage } from './Homepage';

jest.mock('./Question-Templates/DescriptionBox', () => ({
  Description: ({ questionType }: any) => (
    <div data-testid={`description-${questionType.toLowerCase()}`}>Mock {questionType} Description</div>
  )
}));

describe('Homepage component', () => {
  const mockSetPage = jest.fn();
  beforeEach(() => {
    localStorage.clear();
  });
  it('renders welcome title', () => {
    render(<Homepage setPage={mockSetPage} />);
    expect(screen.getByText(/welcome to careersprout!/i)).toBeInTheDocument();
  });
  it('renders both basic and detailed descriptions', () => {
    render(<Homepage setPage={mockSetPage} />);
    expect(screen.getByTestId('description-basic')).toBeInTheDocument();
    expect(screen.getByTestId('description-detailed')).toBeInTheDocument();
  });
  it('renders the search input field', () => {
    render(<Homepage setPage={mockSetPage} />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('logs an error if API key is not found in localStorage', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Homepage setPage={mockSetPage} />);
    expect(consoleSpy).toHaveBeenCalledWith('API key not found.');
    consoleSpy.mockRestore();
  });
  it('does not log error if API key is in localStorage', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    localStorage.setItem('MYKEY', JSON.stringify('test-api-key'));
    render(<Homepage setPage={mockSetPage} />);
    expect(consoleSpy).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

export function HomepageTest(){}