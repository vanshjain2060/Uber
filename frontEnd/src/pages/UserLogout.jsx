import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/logout`, {}, {
          headers: { authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    logout();
  }, [navigate]);

  return (
    <div>Logging out...</div>
  );
};

export default UserLogout;