import { render, screen, fireEvent } from '@testing-library/react';
import { App } from './';

test('Shows contact modal when add contact button is clicked', () => {
  render(<App />);

  expect(
    screen.queryByTestId('contact-modal-form'),
  ).not.toBeInTheDocument();
  const addContactBtn = screen.getByTestId('add-contact-btn');

  fireEvent.click(addContactBtn);

  expect(
    screen.getByTestId('contact-modal-form'),
  ).toBeInTheDocument();
});

test('Hides contact modal wehn cancel button is clicked', () => {
  render(<App />);

  expect(
    screen.queryByTestId('contact-modal-form'),
  ).not.toBeInTheDocument();

  const addContactBtn = screen.getByTestId('add-contact-btn');

  fireEvent.click(addContactBtn);

  expect(
    screen.getByTestId('contact-modal-form'),
  ).toBeInTheDocument();

  const cancelBtn = screen.getByTestId('cancel');

  fireEvent.click(cancelBtn);

  expect(
    screen.queryByTestId('contact-modal-form'),
  ).not.toBeInTheDocument();
});

test('Closes modal automatically after submit', () => {
  render(<App />);

  expect(
    screen.queryByTestId('contact-modal-form'),
  ).not.toBeInTheDocument();

  const addContactBtn = screen.getByTestId('add-contact-btn');

  fireEvent.click(addContactBtn);

  expect(
    screen.getByTestId('contact-modal-form'),
  ).toBeInTheDocument();

  const nameInput = screen.getByPlaceholderText('Name');
  const phoneInput = screen.getByPlaceholderText('Phone Number');
  const emailInput = screen.getByPlaceholderText('Email Address');
  const form = screen.getByTestId('contact-modal-form');

  fireEvent.change(phoneInput, { target: { value: '123-456-7890' } });
  fireEvent.change(nameInput, { target: { value: 'Port Exe' } });
  fireEvent.change(emailInput, {
    target: { value: '123@gmail.com' },
  });

  fireEvent.submit(form);

  expect(
    screen.queryByTestId('contact-modal-form'),
  ).not.toBeInTheDocument();
});

describe('Local Storage Logic', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(c => c),
      },
      writable: true,
    });
  });

  test('Initializes empty array in localStorage if no contacts are stored yet', () => {
    render(<App />);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'contacts',
      JSON.stringify([]),
    );
  });

  test('Properly stores submitted users', () => {
    const joe = {
      name: 'Joe',
      email: 'joe@gmail.com',
      phone: '303-333-3333',
    };
    const bob = {
      name: 'Bob',
      email: 'bob@gmail.com',
      phone: '303-333-3333',
    };

    render(<App />);

    expect(
      screen.queryByTestId('contact-modal-form'),
    ).not.toBeInTheDocument();

    const addContactBtn = screen.getByTestId('add-contact-btn');

    fireEvent.click(addContactBtn);

    expect(
      screen.getByTestId('contact-modal-form'),
    ).toBeInTheDocument();

    let nameInput = screen.getByPlaceholderText('Name');
    let phoneInput = screen.getByPlaceholderText('Phone Number');
    let emailInput = screen.getByPlaceholderText('Email Address');
    let form = screen.getByTestId('contact-modal-form');

    fireEvent.change(phoneInput, { target: { value: joe.phone } });
    fireEvent.change(nameInput, { target: { value: joe.name } });
    fireEvent.change(emailInput, {
      target: { value: joe.email },
    });

    fireEvent.submit(form);

    expect(
      screen.queryByTestId('contact-modal-form'),
    ).not.toBeInTheDocument();

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'contacts',
      JSON.stringify([joe]),
    );

    fireEvent.click(addContactBtn);

    expect(
      screen.getByTestId('contact-modal-form'),
    ).toBeInTheDocument();

    nameInput = screen.getByPlaceholderText('Name');
    phoneInput = screen.getByPlaceholderText('Phone Number');
    emailInput = screen.getByPlaceholderText('Email Address');
    form = screen.getByTestId('contact-modal-form');

    fireEvent.change(phoneInput, { target: { value: bob.phone } });
    fireEvent.change(nameInput, { target: { value: bob.name } });
    fireEvent.change(emailInput, {
      target: { value: bob.email },
    });

    fireEvent.submit(form);

    expect(
      screen.queryByTestId('contact-modal-form'),
    ).not.toBeInTheDocument();

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'contacts',
      JSON.stringify([joe, bob]),
    );
  });
});
