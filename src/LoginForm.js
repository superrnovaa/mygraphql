import { useState, useEffect } from 'react';
import './index.css';

export function LoginForm({ navigateTo }) {
    const [credentials, setCredentials] = useState({
      usernameOrEmail: '',
      password: '',
    });

    const handleInputChange = (e) => {
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const encodedCredentials = btoa(`${credentials.usernameOrEmail}:${credentials.password}`);
        const response = await fetch('https://learn.reboot01.com/api/auth/signin', {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${encodedCredentials}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          sessionStorage.setItem('jwt', data);
          navigateTo('/profile'); // Use navigateTo to change the path
        } else {
          const errorData = await response.json();
          console.error('Login error:', errorData.error);
          alert(`Login failed: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again later.');
      }
    };

    return (
      <div className='login-page'>
      <div className='form'>
        <h1>Login</h1>
        <form className='register-form' onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              placeholder= { 'Username Or Email'}
              name="usernameOrEmail"
              value={credentials.usernameOrEmail}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
        
            <input
              type="password"
              name="password"
              placeholder= "Password"
              value={credentials.password}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
        </div>
      </div>
    );
  }

export default LoginForm;