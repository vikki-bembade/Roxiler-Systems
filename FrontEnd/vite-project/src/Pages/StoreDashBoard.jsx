import React from 'react'
import AvgRating from '../componants/Store/AvgRating'
import ShowDtails from '../componants/Store/ShowDtails'
import LogOut from '../componants/LogOut'
import CheckToken from '../componants/CheckToken'
import UpdatePassword from '../componants/UpdatePassword'

const StoreDashBoard = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <CheckToken />
      <header className='py-6 px-6 bg-white border-b border-gray-200 shadow-sm'>
        <h1 className='text-3xl font-bold text-slate-900'>Store Dashboard</h1>
      </header>
      <UpdatePassword />
      <div className='p-6'>
        <div className='absolute top-6 right-6'>
          <LogOut />
        </div>
        <div className='bg-white rounded-lg border border-gray-200 p-6 mb-6'>
          <AvgRating />
        </div>
        <div className='bg-white rounded-lg border border-gray-200 p-6'>
          <ShowDtails />
        </div>
      </div>
    </div>
  )
}

export default StoreDashBoard