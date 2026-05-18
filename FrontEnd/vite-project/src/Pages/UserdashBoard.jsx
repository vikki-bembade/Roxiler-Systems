import React from 'react'
import ShowStoreListUser from '../componants/User/ShowStoreListUser';
import LogOut from '../componants/LogOut';
import CheckToken from '../componants/CheckToken';
import UpdatePassword from '../componants/UpdatePassword';

const UserdashBoard = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <CheckToken />
      <header className='py-6 px-6 bg-white border-b border-gray-200 shadow-sm flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-slate-900'>User Dashboard</h1>
        <LogOut />
      </header>
      <UpdatePassword />
      <div className='p-6'>
        <div className='bg-white rounded-lg border border-gray-200 p-6'>
          <ShowStoreListUser />
        </div>
      </div>
    </div>
  )
}

export default UserdashBoard