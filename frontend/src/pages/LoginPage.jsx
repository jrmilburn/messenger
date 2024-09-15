import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
        navigate("/dashboard");
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input} />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Login</button>
                <p className={styles.registerLink}>
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
            </form>
        </div>
    );
}

export default LoginPage;