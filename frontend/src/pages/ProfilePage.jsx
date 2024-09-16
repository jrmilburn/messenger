import React, { useState, useContext } from 'react';
import styles from './ProfilePage.module.css';
import { AuthContext } from '../context/AuthContext';

export default function ProfilePage() {

    const { currentUser } = useContext(AuthContext);

    const [username, setUsername] = useState(currentUser.username);
    const [bio, setBio] = useState(currentUser.bio);
    const [profilePicture, setProfilePicture] = useState(currentUser.image);

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to update the user's profile
        console.log('Profile updated:', { username, bio, profilePicture });
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Profile Page</h1>
            <img src={profilePicture} alt="Profile" className={styles.profilePicture} />
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.input}
                />
                <textarea
                    placeholder="Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className={styles.textarea}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Update Profile</button>
            </form>
        </div>
    );
}