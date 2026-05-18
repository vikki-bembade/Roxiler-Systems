import React from 'react'
import { useState } from 'react';
import { RegisterAPI} from '../APIs/API.js';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const  [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    address: ""
  });

const navigate = useNavigate();
  // function handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(newUser);
    // console.log(newUser.name);
    const result = await RegisterAPI(newUser);
    
    navigate("/");
    
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <div className='w-full max-w-md bg-white border border-gray-300 rounded-lg p-8'>
        <h1 className='text-3xl font-bold text-center text-slate-900 mb-8'>Register</h1>
        <form className='space-y-5'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Name
            </label>
            <input
              className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-slate-500'
              id='name'
              type='text'
              placeholder='Name'
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Email
            </label>
            <input
              className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-slate-500'
              id='email'
              type='email'
              placeholder='Email'
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Password
            </label>
            <input
              className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-slate-500'
              id='password'
              type='password'
              placeholder='Password'
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}  
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Address
            </label>
            <input
              className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-slate-500'
              id='address'
              type='text'
              placeholder='Address'
              value={newUser.address}
              onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
            />
          </div>
          <button
            onClick={handleSubmit}
            className='w-full bg-slate-900 text-white font-semibold py-3 rounded-lg hover:bg-slate-800'
            type='submit'
          >
            Register
          </button>
        </form>
        <p className='mt-5 text-center text-sm text-slate-600'>
          Already have an account?{' '}
          <Link to='/' className='text-sky-600 hover:text-sky-700'>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}


export default RegisterPage