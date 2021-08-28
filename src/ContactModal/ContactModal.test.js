import { render, screen } from '@testing-library/react';
import { ContactModal } from './ContactModal';

test('renders contact modal', async () => {
  render(<ContactModal />);
  const text = await screen.findByText('I am the contact modal');
  expect(text).toBeInTheDocument();
});
