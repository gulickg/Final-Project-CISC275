import React from "react";
import { render, screen } from "@testing-library/react";
import { Homepage, keyData } from "./Homepage";

jest.mock("../Question-Templates/DescriptionBox", () => ({
  Description: ({ questionType }: any) => (
    <div data-testid={`description-${questionType.toLowerCase()}`}>
      Mock {questionType} Description
    </div>
  )
}));

describe("Homepage component", () => {
  const mockSetPage = jest.fn();

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("renders welcome title", () => {
    render(<Homepage setPage={mockSetPage} />);
    expect(screen.getByText(/welcome to careersprout!/i)).toBeInTheDocument();
  });

  it("renders both Basic and Detailed descriptions", () => {
    render(<Homepage setPage={mockSetPage} />);
    expect(screen.getByTestId("description-basic")).toBeInTheDocument();
    expect(screen.getByTestId("description-detailed")).toBeInTheDocument();
  });

  it("renders mascot image", () => {
    render(<Homepage setPage={mockSetPage} />);
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", expect.stringContaining("Homepage.png"));
  });

  it("logs error if API key is not found", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    render(<Homepage setPage={mockSetPage} />);
    expect(consoleSpy).toHaveBeenCalledWith("API key not found.");
    consoleSpy.mockRestore();
  });

  it("does not log error and sets keyData if API key is in localStorage", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    localStorage.setItem("MYKEY", JSON.stringify("test-api-key"));
    render(<Homepage setPage={mockSetPage} />);
    expect(consoleSpy).not.toHaveBeenCalled();
    expect(keyData).toBe("test-api-key");
    consoleSpy.mockRestore();
  });
});


// import React from "react";
// import { render, screen } from "@testing-library/react";
// import { Homepage, keyData } from './Homepage';

// jest.mock('./Question-Templates/DescriptionBox', () => ({
//   Description: ({ questionType }: any) => (
//     <div data-testid={`description-${questionType.toLowerCase()}`}>Mock {questionType} Description</div>
//   )
// }));

// describe('Homepage component', () => {
//   const mockSetPage = jest.fn();

//   beforeEach(() => {
//     localStorage.clear();
//     jest.clearAllMocks();
//   });

//   it('renders welcome title', () => {
//     render(<Homepage setPage={mockSetPage} />);
//     expect(screen.getByText(/welcome to careersprout!/i)).toBeInTheDocument();
//   });

//   it('renders both basic and detailed descriptions', () => {
//     render(<Homepage setPage={mockSetPage} />);
//     expect(screen.getByTestId('description-basic')).toBeInTheDocument();
//     expect(screen.getByTestId('description-detailed')).toBeInTheDocument();
//   });

//   it('renders the mascot image', () => {
//     render(<Homepage setPage={mockSetPage} />);
//     const image = screen.getByRole('img');
//     expect(image).toBeInTheDocument();
//     expect(image).toHaveAttribute('src', expect.stringContaining('Homepage.png'));
//   });

//   it('logs an error if API key is not found in localStorage', () => {
//     const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
//     render(<Homepage setPage={mockSetPage} />);
//     expect(consoleSpy).toHaveBeenCalledWith('API key not found.');
//     consoleSpy.mockRestore();
//   });

//   it('sets keyData if API key is present in localStorage', () => {
//     localStorage.setItem('MYKEY', JSON.stringify('test-api-key'));
//     render(<Homepage setPage={mockSetPage} />);
//     expect(keyData).toBe('test-api-key');
//   });
// });
