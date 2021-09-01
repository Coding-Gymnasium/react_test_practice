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

          <div
            data-testid={`edit-btn-${c.id}`}
            onClick={() => onEditClick(c)}
          >
            Edit
          </div>

          <div
            data-testid={`delete-btn-${c.id}`}
            onClick={() => onDeleteClick(c)}
          >
            Delete
          </div>
        </div>
      ))}
    </div>
  );
};
