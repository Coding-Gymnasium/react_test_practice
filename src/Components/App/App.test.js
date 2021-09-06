import { render, screen, fireEvent } from '@testing-library/react';
import { App } from './';

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

const addContact = c => {
  const addContactBtn = screen.getByTestId('add-contact-btn');

  fireEvent.click(addContactBtn);

  expect(
    screen.getByTestId('contact-modal-form'),
  ).toBeInTheDocument();

  const nameInput = screen.getByPlaceholderText('Name');
  const phoneInput = screen.getByPlaceholderText('Phone Number');
  const emailInput = screen.getByPlaceholderText('Email Address');
  const form = screen.getByTestId('contact-modal-form');

  fireEvent.change(nameInput, { target: { value: c.name } });
  fireEvent.change(phoneInput, { target: { value: c.phone } });
  fireEvent.change(emailInput, {
    target: { value: c.email },
  });

  fireEvent.submit(form);
};

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

  addContact(joe);

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

  test('Properly manages teh deletion of contacts', () => {
    render(<App />);
  });

  test('Initializes empty array in localStorage if no contacts are stored yet', () => {
    render(<App />);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'contacts',
      JSON.stringify([]),
    );
  });

  test('Properly stores submitted users', () => {
    render(<App />);

    expect(
      screen.queryByTestId('contact-modal-form'),
    ).not.toBeInTheDocument();

    const addContactBtn = screen.getByTestId('add-contact-btn');

    fireEvent.click(addContactBtn);

    expect(
      screen.getByTestId('contact-modal-form'),
    ).toBeInTheDocument();

    addContact(joe);

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

    addContact(bob);

    expect(
      screen.queryByTestId('contact-modal-form'),
    ).not.toBeInTheDocument();

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'contacts',
      JSON.stringify([joe, bob]),
    );
  });
});
