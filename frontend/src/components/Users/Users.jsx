import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../../context/AuthContext";
import styles from './User.module.css';

export default function Users({ onUserClick, currentUser }) {
    
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/friend', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.token}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            setUsers(data);
        })
        .catch(error => console.error('Error:', error));
    }, [currentUser.token]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Users</h1>
            {users && users.length > 0 ? (
                <ul className={styles.userList}>
                    {users.map(user => (
                        <li 
                            key={user.id} 
                            className={styles.userItem}
                            onClick={() => onUserClick(user)}
                        >
                            {user.username}
                        <div className={styles["bio"]}>
                            {user.bio}
                        </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users available. Add a friend to begin chatting!</p>
            )}
        </div>
    );
}