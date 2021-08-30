import { ContactModal } from './ContactModal/ContactModal';

export const App = () => {
  return <ContactModal submit={() => console.log('Submit!')} />;
};
