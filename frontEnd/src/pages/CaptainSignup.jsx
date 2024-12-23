import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainSignup = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newCaptainData = {
      fullname: { firstname, lastname },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptainData);
      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error registering captain:', error);
    }

    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
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
          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4'>
            <input
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              required
              className='bg-[#eee] mb-7 w-1/2 px-4 py-2 rounded-md border text-lg placeholder:text-base'
            />
            <input
              type="text"
              placeholder="Vehicle Plate"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              required
              className='bg-[#eee] mb-7 w-1/2 px-4 py-2 rounded-md border text-lg placeholder:text-base'
            />
          </div>
          <div className='flex gap-4'>
            <input
              type="number"
              placeholder="Vehicle Capacity"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              required
              className='bg-[#eee] mb-7 w-1/2 px-4 py-2 rounded-md border text-lg placeholder:text-base'
            />
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
              className='bg-[#eee] mb-7 w-1/2 px-4 py-2 rounded-md border text-lg placeholder:text-base'
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </div>
          <button className='w-full bg-black text-white font-semibold px-4 py-3 rounded-md mt-3 mb-4'>Create Account</button>
        </form>
        <p className='text-center'>Already have an account? <Link to={"/captain-login"} className='text-blue-600'>Login</Link></p>
      </div>
      <div>
        <p className='text-[10px] mt-10 loading-tight'>
          By signing up, you agree to our Terms of Service and Privacy Policy, and acknowledge that you have read our <span className='underline'>Cookie Policy</span>. You also agree to receive marketing communications from Uber and can opt out at any time.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;