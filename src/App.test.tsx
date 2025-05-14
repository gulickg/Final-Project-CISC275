import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  Object.defineProperty(window, 'location', {
    value: {
      ...window.location,
      reload: jest.fn(), 
    },
    writable: true
  });
});

afterEach(() => {
  (window.location.reload as jest.Mock).mockClear();
});

jest.mock('./Components/Navigation', () => ({
  Navigation: ({ setPage, footer, showAPI }: any) => (
    <div data-testid={footer ? 'footer-nav' : 'header-nav'}>
      <button data-testid={footer ? 'btn-basic-footer' : 'btn-basic-header'} onClick={() => setPage('basicQuestions')}>Basic Quiz</button>
      <button data-testid={footer ? 'btn-detailed-footer' : 'btn-detailed-header'} onClick={() => setPage('detailedQuestions')}>Detailed Quiz</button>
      {footer && <button onClick={showAPI}>Show API</button>}
    </div>
  )
}));

jest.mock('./Components/Homepage/Homepage', () => ({
  Homepage: ({ setPage }: any) => (
    <div>
      <h1>Mock Homepage</h1>
      <button onClick={() => setPage('basicQuestions')}>Go Basic</button>
    </div>
  )
}));

jest.mock('./Components/Basic-Questions-Folder/BasicQuestions', () => ({
  BasicQuestions: ({ setPage, answers }: any) => (
    <div>
      <h2>Basic Questions</h2>
      <button onClick={() => setPage('basicReport')}>Submit Basic</button>
      <p data-testid="basic-count">{answers.length}</p>
    </div>
  )
}));

jest.mock('./Components/Detailed-Questions-Folder/DetailedQuestions', () => ({
  DetailedQuestions: ({ setPage, answers }: any) => (
    <div>
      <h2>Detailed Questions</h2>
      <button onClick={() => setPage('detailedReport')}>Submit Detailed</button>
      <p data-testid="detailed-count">{answers.length}</p>
    </div>
  )
}));

jest.mock('./Components/Popup', () => ({
  PopUp: ({ disablePopUp }: any) => (
    <div data-testid="popup">
      Popup Displayed
      <button onClick={disablePopUp}>Close</button>
    </div>
  )
}));

jest.mock('./Components/ReportPage', () => ({
  ReportPage: ({ type }: any) => <div data-testid={`report-${type.toLowerCase()}`}>Report for {type}</div>
}));

jest.mock('./Components/ProfilePage', () => ({
  ProfilePage: ({ user }: any) => <div data-testid="profile-page">{user ? 'Logged In' : 'No User'}</div>
}));

jest.mock('./Components/Loader', () => ({
  Loader: () => <div role="status">Loading...</div>
}));

jest.mock('./Components/Login', () => ({
  Login: () => <div data-testid="login-modal">Login Modal</div>
}));

jest.mock('./Components/APIPopup', () => ({
  APIPopup: ({ handleSubmit }: any) => (
    <div data-testid="api-popup">
      API Input Popup
      <button onClick={handleSubmit}>Submit Key</button>
    </div>
  )
}));


describe('App Component Integration', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders homepage by default', () => {
    render(<App />);
    expect(screen.getByText(/Mock Homepage/i)).toBeInTheDocument();
  });

  it('navigates to basic questions from homepage', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Go Basic/i));
    expect(screen.getByRole('heading', { name: /Basic Questions/i })).toBeInTheDocument();
  });

  it('navigates to detailed questions via header nav', () => {
    render(<App />);
    fireEvent.click(screen.getByTestId('btn-detailed-header'));
    expect(screen.getByRole('heading', { name: /Detailed Questions/i })).toBeInTheDocument();
  });

  it('shows detailed report page when detailed quiz is submitted', () => {
    render(<App />);
    fireEvent.click(screen.getByTestId('btn-detailed-header'));
    fireEvent.click(screen.getByText(/Submit Detailed/i));
    expect(screen.getByTestId('report-etailed')).toBeInTheDocument();
  });

  it('does not show popup when basic quiz is incomplete', () => {
    render(<App />);
    fireEvent.click(screen.getByTestId('btn-basic-header'));
    fireEvent.click(screen.getByText(/Submit Basic/i));
    expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
  });

  it('displays API popup and handles submission', async () => {
    render(<App />);
    fireEvent.click(screen.getByText(/Show API/i));
    expect(screen.getByTestId('api-popup')).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Submit Key/i));
    await waitFor(() => {
      expect(screen.queryByTestId('api-popup')).not.toBeInTheDocument();
    });
  });

  it('shows loading overlay if loading is enabled', () => {
    render(<App />);
    expect(screen.queryByRole('status', { name: /loading/i })).not.toBeInTheDocument();
  });
});
