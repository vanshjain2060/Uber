import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const UserLogin = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({ email, password });
    setEmail('');
    setPassword('');
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between '>
      <div>
        <img className='w-16 mb-10' src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg" alt="Uber-Logo" />
        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input 
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='bg-[#eee] mb-7 w-full px-4 py-2 rounded-md border text-lg placeholder:text-base'
          />
          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input 
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='bg-[#eee] mb-7 w-full px-4 py-2 rounded-md border text-lg placeholder:text-base'
          />
          <button className='w-full bg-black text-white font-semibold px-4 py-3 rounded-md mt-3 mb-4'>Login</button>
        </form>
        <p className='text-center'>new here? <Link to={"/signup"} className='text-blue-600'>Create new Account</Link></p>
      </div>
      <div>
      <Link to={"/captain-login"} className='flex justify-center items-center w-full bg-[#10b461] text-white font-semibold px-4 py-3 rounded-md mt-3 mb-5'>Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin