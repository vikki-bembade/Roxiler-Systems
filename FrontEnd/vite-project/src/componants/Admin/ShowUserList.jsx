import React from 'react'
import { useState, useEffect } from 'react';
import { getAllUsersApi } from '../../APIs/AdminAPIS';

const ShowUserList = () => {
const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);
    

    const getUsers = async() => {
        try{
            const response = await getAllUsersApi();
            // Handle both {state: true, data: [...]} and {data: [...]} formats
            if (response && Array.isArray(response.data)) {
                setUsers(response.data);
            } else if (response && response.state === true && Array.isArray(response.data)) {
                setUsers(response.data);
            } else if (Array.isArray(response)) {
                setUsers(response);
            } else {
                console.error('Failed to fetch users:', response?.message || 'Unknown error');
                setUsers([]);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]);
        }
    }
  return (
    <div>
        <h2 className='text-2xl font-bold text-slate-900 mb-6'>Users List</h2>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
              <thead>
                  <tr className='bg-slate-900'>
                      <th className='border border-gray-300 bg-slate-900 text-white px-6 py-3 text-left text-sm font-semibold'>Name</th>
                      <th className='border border-gray-300 bg-slate-900 text-white px-6 py-3 text-left text-sm font-semibold'>Email</th>
                      <th className='border border-gray-300 bg-slate-900 text-white px-6 py-3 text-left text-sm font-semibold'>Address</th>
                      <th className='border border-gray-300 bg-slate-900 text-white px-6 py-3 text-left text-sm font-semibold'>Role</th>
                  </tr>
              </thead>
              <tbody>
                  {users.map((user) => (
                      <tr key={user.id} className='hover:bg-gray-50'>
                          <td className='border border-gray-300 px-6 py-3 text-sm'>{user.name}</td>
                          <td className='border border-gray-300 px-6 py-3 text-sm'>{user.email}</td>
                          <td className='border border-gray-300 px-6 py-3 text-sm'>{user.address}</td>
                          <td className='border border-gray-300 px-6 py-3 text-sm'>{user.role}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
        </div>
    </div>
  )
}

export default ShowUserList