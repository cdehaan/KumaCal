import React, { useState, useEffect } from 'react';
import styles from "./index.module.css";

function Login({ data, setData }) {
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [passwordPlaceholder, setPasswordPlaceholder] = useState('');

    useEffect(() => {
        // Populate username if present in local storage
        if (data.username) {
        setInputUsername(data.username);
        } else {
            setInputUsername('');
        }

        // Indicate that password is still entered if present in local storage
        if (data.hashedPassword) {
        setPasswordPlaceholder('●●●●●●●●');
        } else {
            setPasswordPlaceholder('');
        }
    }, [data.username, data.hashedPassword]);

    const handleLogin = async () => {
        if (data.username) {
            setData(prevData => ({ ...prevData, loggedIn: true }));
        } else {
            if(inputUsername.length === 0) { alert("Enter a username please"); return; }
            if(inputPassword.length === 0) { alert("Enter a password please"); return; }

            const hashedPassword = await hashUsernameAndPassword(inputUsername, inputPassword)
            setData(prevData => ({ ...prevData, username: inputUsername, hashedPassword: hashedPassword, loggedIn: true, processStage: data.processStage === 0 ? 1 : data.processStage }));
        }
    };

  async function hashUsernameAndPassword(username, password) {
    const concatenatedString = username + password;
  
    // Encode the concatenated string as bytes
    const encoder = new TextEncoder();
    const data = encoder.encode(concatenatedString);
  
    // Create a SHA-256 hash of the data
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
    // Convert the hashBuffer to a hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedValue = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  
    return hashedValue;
  }

  return (
    <>
        <div className={styles.mascotContainer}>
            <div className={styles.speechBubble}>{data.username ? 'Welcome Back!' : 'Welcome!'}</div>
            <img src="/bear.png" alt="Bear Mascot" className={styles.mascotImage} />
        </div>
        <div className={styles.loginContainer}>
            <form className={styles.loginForm} onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <input
                        type="text"
                        placeholder="Username"
                        autoComplete="off"
                        value={inputUsername}
                        onChange={(e) => setInputUsername(e.target.value)}
                        className={styles.loginInput}
                    />
                    <input
                        type="password"
                        placeholder={passwordPlaceholder || "Password"}
                        autoComplete="off"
                        value={passwordPlaceholder ? '' : inputPassword}
                        onChange={(e) => setInputPassword(e.target.value)}
                        className={styles.loginInput}
                    />
                <button type="submit" className={styles.loginButton}>
                    {data.hashedPassword ? "Log back in" : "Sign in"}
                </button>
            </form>
        </div>
    </>
  );
};

export default Login;