import styles from './styles.module.css';

export const ContactList = ({
  contacts,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className={styles.main}>
      {contacts.map((c, index) => (
        <div key={`row-${index}`} data-testid={`contact-${index}`}>
          <div>{c.name}</div>
          <div>{c.phone}</div>
          <div>{c.email}</div>

          <div
            data-testid={`edit-btn-${index}`}
            onClick={() => onEditClick(c)}
          >
            Edit
          </div>

          <div
            data-testid={`delete-btn-${index}`}
            onClick={() => onDeleteClick(c)}
          >
            Delete
          </div>
        </div>
      ))}
    </div>
  );
};
