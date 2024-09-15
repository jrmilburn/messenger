import { useEffect, useState } from "react";
import styles from './ChatMessages.module.css';
import ChatInput from "./ChatInput";
import Message from "./Message";

export default function ChatMessages({ currentUser, selectedUser }) {

    console.log('CURRENT USER: ', currentUser.user.id);
    console.log('SELECTED USER: ', selectedUser);

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/user/${currentUser.user.id}/message/${selectedUser.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.token}`,
        }})
        .then(response => response.json())
        .then(data => {
            setMessages(data);
        })
        .catch(error => console.error('Error:', error));
    }, [currentUser.user.id, selectedUser.id, currentUser.token]);

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>{selectedUser.username}</h2>
            <ul className={styles.messageList}>
                {messages.map((message, index) => (
                    <Message key={index} message={message}/>
                ))}
            </ul>
            <ChatInput currentUser={currentUser} selectedUser={selectedUser}/>
        </div>
    );
}