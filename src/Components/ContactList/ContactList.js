import styles from './styles.module.css';

export const ContactList = ({
  contacts,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className={styles.main}>
      {contacts.map((c, index) => (
        <div key={`row-${index}`} data-testid={`contact-${c.id}`}>
          <div>{c.name}</div>
          <div>{c.phone}</div>
          <div>{c.email}</div>
        </div>
      ))}
    </div>
  );
};
