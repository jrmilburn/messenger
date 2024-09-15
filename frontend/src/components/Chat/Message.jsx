import styles from './ChatMessages.module.css';

export default function Message({ message }) {
    return (
        <li className={styles.messageItem}>
            <p>{message.content}</p>
            <p>{message.createdAt}</p>
        </li>
    )
}