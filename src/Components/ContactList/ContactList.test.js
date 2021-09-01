import {
  render,
  screen,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import { ContactList } from './ContactList';

test('Renders list of contacts', () => {
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

test('Calls the edit function when edit button is clicked', () => {
  const contacts = [
    {
      id: 0,
      name: 'Joe',
      phone: '987-654-3210',
      email: 'test123@gmail.com',
    },
  ];

  const editFn = jest.fn();

  render(<ContactList contacts={contacts} onEditClick={editFn} />);

  const editBtnJoe = screen.getByTestId('edit-btn-0');

  fireEvent.click(editBtnJoe);

  expect(editFn).toHaveBeenCalledWith(contacts[0]);
});

test('Calls the delete function when delete button is clicked', () => {
  const contacts = [
    {
      id: 0,
      name: 'Joe',
      phone: '987-654-3210',
      email: 'test123@gmail.com',
    },
  ];

  const deleteFn = jest.fn();

  render(
    <ContactList contacts={contacts} onDeleteClick={deleteFn} />,
  );

  const deleteBtnJoe = screen.getByTestId('delete-btn-0');

  fireEvent.click(deleteBtnJoe);

  expect(deleteFn).toHaveBeenCalledWith(contacts[0]);
});
