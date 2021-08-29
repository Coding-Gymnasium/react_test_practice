import { useEffect, useState } from 'react';
import styles from './styles.module.css';

export const ContactModal = ({ submit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // setIsValid(
    //   !!name &&
    //     !!phone &&
    //     !!email &&
    //     /^[0-9]{3}-[0-9]{3}-[0-9]{4}/.test(phone) &&
    //     /^\w+([.-]?w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email),
    // );

    setNameError('');
    setPhoneError('');
    setEmailError('');

    let _valid = (() => {
      if (!name) {
        setNameError('Name is Required');
        return false;
      } else if (!phone) {
        setPhoneError('Phone is Required');
        return false;
      } else if (!email) {
        setEmail('Email is Required');
        return false;
      } else if (!/^[0-9]{3}-[0-9]{3}-[0-9]{4}/.test(phone)) {
        setPhoneError('Phone is improperly formatted');
        return false;
      } else if (!/^\w+([.-]?w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailError('Email is improperly formatted');
        return false;
      } else {
        return true;
      }
    })();

    setIsValid(_valid);
  }, [name, phone, email]);

  return (
    <div className={styles.main}>
      <form
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
            onChange={e => setName(e.target.value)}
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
            onChange={e => setPhone(e.target.value)}
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
            onChange={e => setEmail(e.target.value)}
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
