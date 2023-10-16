import React, { useState, useEffect } from 'react';

const Login = ({ data, setData }) => {
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [passwordPlaceholder, setPasswordPlaceholder] = useState('');

  useEffect(() => {
    // Populate username if present in local storage
    if (data.username) {
      setInputUsername(data.username);
    }

    // Indicate that password is still entered if present in local storage
    if (data.hashedPassword) {
      setPasswordPlaceholder('●●●●●●●●');
    }
  }, [data.username, data.hashedPassword]);

  const handleLogin = async () => {
    if (data.username) {
      setData(prevData => ({ ...prevData, loggedIn: true }));
    } else {
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
    <div className="login-container">
      <input
        type="text"
        placeholder="Username"
        autoComplete="off"
        value={inputUsername}
        onChange={(e) => setInputUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder={passwordPlaceholder || "Password"}
        autoComplete="off"
        value={passwordPlaceholder ? '' : inputPassword}
        onChange={(e) => setInputPassword(e.target.value)}
      />
      <button onClick={handleLogin}>
        {data.hashedPassword ? "Log back in" : "Sign in"}
      </button>
    </div>
  );
};

export default Login;