import { useState } from 'react';
import { ContactModal } from '../ContactModal/ContactModal';

import styles from './styles.module.css';

export const App = () => {
  const [addingContact, setAddingContact] = useState(false);

  return (
    <div className={styles.main}>
      {addingContact && (
        <ContactModal
          cancel={() => setAddingContact(false)}
          sumbit={() => console.log('Submit!')}
        />
      )}
      <button
        data-testid="add-contact-btn"
        onClick={() => setAddingContact(true)}
      >
        Add Contact
      </button>
    </div>
  );
};
