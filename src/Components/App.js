import { ContactModal } from './ContactModal/ContactModal';

export const App = () => {
  return <ContactModal onSubmit={() => console.log('Submit!')} />;
};
