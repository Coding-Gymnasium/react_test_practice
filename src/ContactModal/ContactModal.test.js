import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { ContactModal } from './ContactModal';

afterEach(cleanup);

test('Initializes empty form', () => {
  render(<ContactModal />);

  const nameInput = screen.queryByPlaceholderText('Name');
  const phoneInput = screen.queryByPlaceholderText('Phone Number');
  const emailInput = screen.queryByPlaceholderText('Email Address');
  const submitButton = 'Submit';

  expect(nameInput).toBeInTheDocument();
  expect(phoneInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();

  expect(nameInput).toHaveValue('');
  expect(phoneInput).toHaveValue('');
  expect(emailInput).toHaveValue('');
});

test('Enables submit button once form is valid', () => {
  render(<ContactModal />);

  const nameInput = screen.queryByPlaceholderText('Name');
  const phoneInput = screen.queryByPlaceholderText('Phone Number');
  const emailInput = screen.queryByPlaceholderText('Email Address');
  const submitButton = 'Submit';

  fireEvent.change(nameInput, { target: { value: 'Port Exe' } });
  fireEvent.change(phoneInput, { target: { value: '123-456-7890' } });
  fireEvent.change(emailInput, { target: { value: '123@gmail.com' } });
});

test('Remains disable if input is not valid', () => {
  render(<ContactModal />);

  const nameInput = screen.queryByPlaceholderText('Name');
  const phoneInput = screen.queryByPlaceholderText('Phone Number');
  const emailInput = screen.queryByPlaceholderText('Email Address');
  const submitButton = 'Submit';

  fireEvent.change(nameInput, { target: { value: 'Port Exe' } });
  fireEvent.change(phoneInput, { target: { value: '123-456-7890' } });
  fireEvent.change(emailInput, { target: { value: '123' } });

  fireEvent.change(emailInput, { target: { value: '123@gmail.com' } });

  fireEvent.change(phoneInput, { target: { value: '1234567890' } });
});

test('Displays error messages for invalid inputs', () => {
  render(<ContactModal />);

  const nameInput = screen.queryByPlaceholderText('Name');
  const phoneInput = screen.queryByPlaceholderText('Phone Number');
  const emailInput = screen.queryByPlaceholderText('Email Address');

  // email error
  fireEvent.change(nameInput, { target: { value: 'Port Exe' } });
  fireEvent.change(phoneInput, { target: { value: '123-456-7890' } });
  fireEvent.change(emailInput, { target: { value: '123' } });

  // phone error
  fireEvent.change(phoneInput, { target: { value: '1234567890' } });
  fireEvent.change(emailInput, { target: { value: '123@gmail.com' } });
});
