import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/userContext';

const UserSignup = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUserData = {
      fullname: { firstname, lastname },
      email,
      password
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUserData);
      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }

    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg" alt="Uber-Logo" />
        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your Name</h3>
          <div className='flex gap-4'>
            <input
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              className='bg-[#eee] mb-7 w-1/2 px-4 py-2 rounded-md border text-lg placeholder:text-base'
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className='bg-[#eee] mb-7 w-1/2 px-4 py-2 rounded-md border text-lg placeholder:text-base'
            />
          </div>
          <h3 className='text-lg font-medium mb-2'>Email</h3>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='bg-[#eee] mb-7 w-full px-4 py-2 rounded-md border text-lg placeholder:text-base'
          />
          <h3 className='text-lg font-medium mb-2'>Password</h3>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='bg-[#eee] mb-7 w-full px-4 py-2 rounded-md border text-lg placeholder:text-base'
          />
          <button className='w-full bg-black text-white font-semibold px-4 py-3 rounded-md mt-3 mb-4'>Create Account</button>
        </form>
        <p className='text-center'>Already have an account? <Link to={"/login"} className='text-blue-600'>Login</Link></p>
      </div>
      <div>
        <p className='text-[10px] mt-10'>
          By signing up, you agree to our Terms of Service and Privacy Policy, and acknowledge that you have read our Cookie Policy. You also agree to receive marketing communications from Uber and can opt out at any time.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;