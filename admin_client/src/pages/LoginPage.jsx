// LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/instructors') 
      .then((response) => response.json())
      .then((data) => setInstructors(data))
      .catch((error) => console.error('Error fetching instructors:', error));
  }, []);

  const handleLogin = () => {
    if (role === 'admin') {
      if (username === 'admin' && password === 'adminpassword') {
        navigate('/admin');
      } else {
        setError('Invalid username or password');
      }
    } else if (role === 'instructor') {
      if (username === 'instructor' && password === 'instructorpassword') {
        navigate('/instructor');
      } else {
        setError('Invalid username or password');
      }
    } else {
      setError('Please select a role');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="instructor">Instructor</option>
        </select>
        <button type="submit">Login</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div>
          <label>Select Instructor:</label>
          <select value={username} onChange={(e) => setUsername(e.target.value)}>
            <option value="">Select Instructor</option>
            {instructors.map((instructor) => (
              <option key={instructor._id} value={instructor._id}>{`${instructor.name} - ${instructor.email}`}</option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
