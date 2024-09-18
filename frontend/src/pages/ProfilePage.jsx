import React, { useState, useContext, useEffect } from 'react';
import styles from './ProfilePage.module.css';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {

    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        if(currentUser){
            fetch(`http://localhost:3000/user/${currentUser.user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.token}`,
            }}).then(response => response.json())
            .then(data => {
                setUsername(data.username);
                setBio(data.bio);
            })
        }
    }, [currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch(`http://localhost:3000/user/${currentUser.user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.token}`,
            },
            body: JSON.stringify({ username, bio })});

        const data = await response.json();

        navigate('/dashboard');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Profile Page</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Bio"
                    value={bio} // Set the value to the bio state
                    onChange={(e) => setBio(e.target.value)}
                    className={styles.textarea}
                />
                <button type="submit" className={styles.button}>Update Profile</button>
            </form>
        </div>
    );
}