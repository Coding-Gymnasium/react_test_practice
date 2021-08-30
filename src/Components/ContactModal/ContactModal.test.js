import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { ContactModal } from './ContactModal';

afterEach(cleanup);

test('Initializes empty form', () => {
  render(<ContactModal />);

  const nameInput = screen.getByPlaceholderText('Name');
  const phoneInput = screen.getByPlaceholderText('Phone Number');
  const emailInput = screen.getByPlaceholderText('Email Address');
  const submitButton = screen.getByText('Submit');

  expect(nameInput).toBeInTheDocument();
  expect(phoneInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();

  expect(nameInput).toHaveValue('');
  expect(phoneInput).toHaveValue('');
  expect(emailInput).toHaveValue('');

  expect(screen.queryByTestId('error')).not.toBeInTheDocument();

  expect(submitButton).toBeDisabled();
});

test('Enables submit button once form is valid', () => {
  render(<ContactModal />);

  const nameInput = screen.getByPlaceholderText('Name');
  const phoneInput = screen.getByPlaceholderText('Phone Number');
  const emailInput = screen.getByPlaceholderText('Email Address');
  const submitButton = screen.getByText('Submit');

  fireEvent.change(nameInput, { target: { value: 'Port Exe' } });
  fireEvent.change(phoneInput, { target: { value: '123-456-7890' } });
  fireEvent.change(emailInput, { target: { value: '123@gmail.com' } });

  expect(submitButton).not.toBeDisabled();
});

test('Remains disable if input is not valid', () => {
  render(<ContactModal />);

  const nameInput = screen.getByPlaceholderText('Name');
  const phoneInput = screen.getByPlaceholderText('Phone Number');
  const emailInput = screen.getByPlaceholderText('Email Address');
  const submitButton = screen.getByText('Submit');

  fireEvent.change(nameInput, { target: { value: 'Port Exe' } });
  fireEvent.change(phoneInput, { target: { value: '123-456-7890' } });
  fireEvent.change(emailInput, { target: { value: '123' } });

  expect(submitButton).toBeDisabled();

  fireEvent.change(phoneInput, { target: { value: '1234567890' } });

  expect(submitButton).toBeDisabled();
});

test('Displays error messages for invalid inputs', () => {
  render(<ContactModal />);

  const nameInput = screen.getByPlaceholderText('Name');
  const phoneInput = screen.getByPlaceholderText('Phone Number');
  const emailInput = screen.getByPlaceholderText('Email Address');

  // email error
  fireEvent.change(nameInput, { target: { value: 'Port Exe' } });
  fireEvent.change(phoneInput, { target: { value: '123-456-7890' } });
  fireEvent.change(emailInput, { target: { value: '123' } });

  let errorDiv = screen.queryByTestId('error');

  expect(errorDiv).toHaveTextContent('Email is improperly formatted');

  // phone error
  fireEvent.change(phoneInput, { target: { value: '1234567890' } });
  fireEvent.change(emailInput, { target: { value: '123@gmail.com' } });

  errorDiv = screen.queryByTestId('error');
  expect(errorDiv).toHaveTextContent('Phone is improperly formatted');

  fireEvent.change(phoneInput, { target: { value: '123-456-7890' } });
  errorDiv = screen.queryByTestId('error');
  expect(errorDiv).not.toBeInTheDocument();
});

test('Prevents submit function from being called if invalid', () => {
  const onSubmit = jest.fn();

  render(<ContactModal submit={onSubmit} />);

  const nameInput = screen.getByPlaceholderText('Name');
  const phoneInput = screen.getByPlaceholderText('Phone Number');
  const emailInput = screen.getByPlaceholderText('Email Address');
  const submitButton = screen.getByText('Submit');
  const form = screen.getByTestId('contact-modal-form');

  fireEvent.change(nameInput, { target: { value: 'Port Exe' } });
  fireEvent.change(phoneInput, { target: { value: '123-456-7890' } });
  fireEvent.change(emailInput, { target: { value: '123@gmail.' } });

  expect(submitButton).toBeDisabled();
  fireEvent.submit(form);
  expect(onSubmit).not.toHaveBeenCalled();

  fireEvent.change(emailInput, { target: { value: '123@gmail.com' } });

  expect(submitButton).not.toBeDisabled();
  fireEvent.submit(form);
  expect(onSubmit).toHaveBeenCalled();
});