import {
  render,
  screen,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import { ContactList } from './ContactList';

test.only('Renders list of contacts', () => {
  const contacts = [
    {
      id: 0,
      name: 'Joe',
      phone: '987-654-3210',
      email: 'test123@gmail.com',
    },
    {
      id: 1,
      name: 'Bob',
      phone: '187-654-3210',
      email: 'test456@gmail.com',
    },
  ];

  render(<ContactList contacts={contacts} />);

  const joeRow = screen.getByTestId('contact-0');
  const bobRow = screen.getByTestId('contact-1');

  expect(joeRow).toHaveTextContent('Joe');
  expect(joeRow).toHaveTextContent('987-654-3210');
  expect(joeRow).toHaveTextContent('test123@gmail.com');

  expect(bobRow).toHaveTextContent('Bob');
  expect(bobRow).toHaveTextContent('187-654-3210');
  expect(bobRow).toHaveTextContent('test456@gmail.com');
});
