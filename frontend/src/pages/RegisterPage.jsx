import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add registration logic here
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        // Simulate registration logic
        if (email === 'test@example.com' && password === 'password') {
            navigate('/login');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Register</h1>
                {error && <p className={styles.error}>{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Register</button>
                <p className={styles.loginLink}>
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </form>
        </div>
    );
}