import { useState } from 'react';
import styles from './ChatMessages.module.css';

export default function ChatInput({ currentUser, selectedUser }) {

    const [message, setMessage] = useState('');

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }

    const handleSendMessage = () => {
        fetch(`http://localhost:3000/user/${currentUser.user.id}/message/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.token}`,
            },
            body: JSON.stringify({ content: message, receiverId: selectedUser.id }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error('Error:', error));
    }

    return (
        <div className={styles['chat-input']}>
            <input 
                type="text" 
                value={message} 
                onChange={handleMessageChange} 
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    )
}