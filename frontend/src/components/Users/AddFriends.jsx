import React, { useEffect, useState } from 'react';
import styles from './AddFriends.module.css';

export default function AddFriends({ isOpen, onClose, currentUser }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (isOpen) {
            fetch('http://localhost:3000/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.token}`,
                }
            })
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error:', error));
        }
    }, [isOpen, currentUser.token]);

    const handleSendRequest = (userId) => {
        fetch(`http://localhost:3000/friend/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.token}`,
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Friend request sent:', data);
            onClose();
        })
        .catch(error => console.error('Error:', error));
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.dialog}>
                <h2>Add Friends</h2>
                <button className={styles.closeButton} onClick={onClose}>Close</button>
                <ul className={styles.userList}>
                    {users.map(user => (
                        <li key={user.id} className={styles.userItem}>
                            <span>{user.username}</span>
                            <button onClick={() => handleSendRequest(user.id)}>Send Friend Request</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}