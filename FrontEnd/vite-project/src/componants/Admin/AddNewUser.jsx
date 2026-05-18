import React from 'react'
import { useState } from 'react'
import { AddNewUserApi } from '../../APIs/AdminAPIS';

const AddNewUser = () => {
    const [User, setUser] = useState({
           name:"",
           email:"",
           password:"",
           address:"",
           role:"",
        });
    
        const addUser = () => {
            console.log(User);
            const result = AddNewUserApi(User);
            console.log(result);
        }
    
      return (
        <div>
            <h2 className='text-2xl font-bold text-slate-900 mb-6'>Add New User</h2>
            <form className='space-y-4 max-w-md'>
              <input type="text" placeholder='Name' 
                  className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-slate-500'
                  onChange={(e) => setUser({...User, name: e.target.value})} />
              <input type="text" placeholder='Email' 
                  className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-slate-500'
                  onChange={(e) => setUser({...User, email: e.target.value})} />
              <input type="text" placeholder='Password' 
                  className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-slate-500'
                  onChange={(e) => setUser({...User, password: e.target.value})} />
              <input type="text" placeholder='Address' 
                  className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-slate-500'
                  onChange={(e) => setUser({...User, address: e.target.value})} />
              <select className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-slate-500'
                  onChange={(e) => setUser({...User, role: e.target.value})}>
                  <option value="">Select Role</option>
                  <option value="user">user</option>
                  <option value="admin">Admin</option>
                  <option value="Store Owner">Store Owner</option>
              </select>
              <button onClick={() => addUser()} className='w-full bg-slate-900 text-white font-semibold py-3 rounded-lg hover:bg-slate-800'>Add User</button>
            </form>
        </div>
      )
    }

export default AddNewUser