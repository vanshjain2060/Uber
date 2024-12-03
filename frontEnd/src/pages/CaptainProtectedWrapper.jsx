import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainProtectedWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/captain-login');
      } else {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: { authorization: `Bearer ${token}` }
          });
          if (response.status === 200) {
            setCaptain(response.data.captain);
            setIsLoading(false);
          } else {
            localStorage.removeItem('token');
            navigate('/captain-login');
          }
        } catch (error) {
          console.error('Error getting captain profile:', error);
          localStorage.removeItem('token');
          navigate('/captain-login');
        }
      }
    };

    checkAuth();
  }, [navigate, setCaptain]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectedWrapper;