import styles from './ChatMessages.module.css';

export default function Message({ message, sender, currentUsername, otherUsername }) {
    const messageClass = sender ? styles.sent : styles.received;
    const username = sender ? currentUsername : otherUsername;

    return (
        <li className={`${styles.messageItem} ${messageClass}`}>
            <p className={styles.username}>{username}</p>
            <p>{message.content}</p>
            <p className={styles.timestamp}>{new Date(message.createdAt).toLocaleString()}</p>
        </li>
    );
}