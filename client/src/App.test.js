import io from 'socket.io-client';
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from './App';

const API = 'http://localhost:8003';

jest.mock('socket.io-client', () => {
  return {
    connect: jest.fn(() => ({
      emit: jest.fn(),
      on: jest.fn(),
    })),
  };
});

describe('App', () => {
  afterEach(cleanup);
  let container, sendMessageButton;
  beforeEach(() => {
    io.connect(API);
    container = render(<App />);
    sendMessageButton = container.getByText('+1');
  });

  test('it renders the counter button and result', () => {
    expect(sendMessageButton).toBeInTheDocument();
    expect(container.getByText('Counter')).toBeInTheDocument();
    expect(container.getByText('0')).toBeInTheDocument();
  });

  test('it increments the counter when the button is clicked', () => {
    fireEvent.click(sendMessageButton);
    expect(io.connect).toHaveBeenCalledWith(API);
  });
});
