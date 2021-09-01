import { useEffect, useState } from 'react';
import styles from './styles.module.css';

export const ContactModal = ({ submit, contact }) => {
  const [name, setName] = useState(contact?.name || '');
  const [phone, setPhone] = useState(contact?.phone || '');
  const [email, setEmail] = useState(contact?.email || '');

  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  const [nameDirty, setNameDirty] = useState(false);
  const [phoneDirty, setPhoneDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setNameError('');
    setPhoneError('');
    setEmailError('');

    let _valid = (() => {
      if (!name) {
        return false;
      } else if (!phone) {
        return false;
      } else if (!email) {
        return false;
      } else if (!/^[0-9]{3}-[0-9]{3}-[0-9]{4}/.test(phone)) {
        return false;
      } else if (!/^\w+([.-]?w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return false;
      } else {
        return true;
      }
    })();

    if (nameDirty && !name) {
      setNameError('Name is Required');
    } else if (phoneDirty && !phone) {
      setPhoneError('Phone is Required');
    } else if (emailDirty && !email) {
      setEmail('Email is Required');
    } else if (phoneDirty && !/^[0-9]{3}-[0-9]{3}-[0-9]{4}/.test(phone)) {
      setPhoneError('Phone is improperly formatted');
    } else if (
      emailDirty &&
      !/^\w+([.-]?w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      setEmailError('Email is improperly formatted');
    }

    setIsValid(_valid);
  }, [name, phone, email, nameDirty, phoneDirty, emailDirty]);

  return (
    <div className={styles.main}>
      <form
        data-testid="contact-modal-form"
        onSubmit={e => {
          e.preventDefault();
          if (isValid) {
            submit();
          } else {
          }
        }}
      >
        <div>
          <input
            required
            value={name}
            placeholder="Name"
            onChange={e => {
              setName(e.target.value);
              setNameDirty(true);
            }}
          />
          {!!nameError && (
            <div data-testid="error" className={styles.error}>
              {nameError}
            </div>
          )}
        </div>

        <div>
          <input
            required
            value={phone}
            placeholder="Phone Number"
            onChange={e => {
              setPhone(e.target.value);
              setPhoneDirty(true);
            }}
          />
          {!!phoneError && (
            <div data-testid="error" className={styles.error}>
              {phoneError}
            </div>
          )}
        </div>

        <div>
          <input
            required
            value={email}
            placeholder="Email Address"
            onChange={e => {
              setEmail(e.target.value);
              setEmailDirty(true);
            }}
          />
          {!!emailError && (
            <div data-testid="error" className={styles.error}>
              {emailError}
            </div>
          )}
        </div>

        <button disabled={!isValid}>Submit</button>
      </form>
    </div>
  );
};
