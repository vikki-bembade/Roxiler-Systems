import React from 'react'
import { useState } from 'react';
import { LoginAPI} from '../APIs/API.js';
import { Link , useNavigate } from 'react-router-dom'


const Login = () => {
    const [loginUser, setLoginUser] = useState({
        email:"",
        password: "",
    });
const navigate = useNavigate();

      // handle submit function 
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login attempt with:", loginUser);
        const result = await LoginAPI(loginUser);
        console.log("Login result:", result);
        
        // Check if login was successful
        if (result.status === 'error' || !result.token) {
            alert('Login failed: ' + (result.message || 'Invalid credentials'));
            console.error("Login failed:", result);
            return;
        }
        
        // Save token to localStorage
        localStorage.setItem("token", result.token);
        localStorage.setItem("Role", result.Role);
        console.log("Token saved to localStorage:", result.token.substring(0, 20) + "...");
        
        handUserLogIn(result.Role);
    };

    const handUserLogIn = (Role) =>{

       switch(Role){
        case "Admin":
            return navigate("/AdmindashBoard");
            break;
        case "user":
            return navigate("/UserdashBoard");
            break;
        case "Store Owner":
            return navigate("/StoreDashBoard");
            break;
        default:
            return navigate("/");
            break
       }
    }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <div className='bg-white border border-gray-300 rounded-lg p-8 w-full max-w-md'>
        <h1 className='text-3xl font-bold mb-8 text-center text-slate-900'>Login</h1>
        <form className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Email
            </label>
            <input
              className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-slate-500'
              id='email'
              type='email'
              placeholder='Email'
              value={loginUser.email}
              onChange={(e) => setLoginUser({ ...loginUser, email: e.target.value })}
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
              value={loginUser.password}
              onChange={(e) => setLoginUser({ ...loginUser, password: e.target.value })}  
            />
          </div>
          <button
            onClick={handleSubmit}
            className='w-full bg-slate-900 text-white font-semibold py-3 rounded-lg hover:bg-slate-800'
            type='submit'
          >
            Login
          </button>
        </form>
        <p className='mt-5 text-center text-sm text-slate-600'>
          Don't have an account?{' '}
          <Link to='/register' className='text-sky-600 hover:text-sky-700'>
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login