import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogout = () => {
  const navigate = useNavigate();
  const { setCaptain } = useContext(CaptainDataContext);

  useEffect(() => {
    const logout = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {}, {
          headers: { authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
          localStorage.removeItem('token');
          setCaptain(null);
          navigate('/captain-login');
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    logout();
  }, [navigate, setCaptain]);

  return (
    <div>Logging out...</div>
  );
};

export default CaptainLogout;