import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className='bg-cover bg-bottom bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhZmZpYyUyMGxpZ2h0JTIwaW1hZ2UlMjBmb3IlMjBob21lJTIwcGFnZXxlbnwwfHwwfHx8MA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full'>
        <img className='w-16 ml-8' src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg" alt="Uber-Logo" />
        <div className="bg-white py-4 px-4 pb-7">
          <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
          <Link to={"/login"} className='flex justify-center items-center font-semibold
           w-full bg-black text-white py-3 rounded-md mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Home