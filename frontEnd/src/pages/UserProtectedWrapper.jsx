import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserProtectedWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      } else {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: { authorization: `Bearer ${token}` }
          });
          if (response.status === 200) {
            setUser(response.data.user);
            setIsLoading(false);
          } else {
            localStorage.removeItem('token');
            navigate('/login');
          }
        } catch (error) {
          console.error('Error getting user profile:', error);
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    checkAuth();
  }, [navigate, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectedWrapper;