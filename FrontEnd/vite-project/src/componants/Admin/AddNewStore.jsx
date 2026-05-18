import React from 'react'
import { useState } from 'react';
import { AddNewStoreApi } from '../../APIs/AdminAPIS';

const AddNewStore = () => {
    const [Store, setStore] = useState({
       name:"",
       storeEmail:"",
       ownerEmail:"",
       password:"",
       Address:"",
    });

    const addStore = async() => {
        console.log(Store);
        const result = await AddNewStoreApi(Store);
        
    }

  return (
    <div>
        <h2 className='text-2xl font-bold text-slate-900 mb-6'>Add New Store</h2>
        <form className='space-y-4 max-w-md'>
          <input type="text" placeholder='Store Name' 
              className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-slate-500'
              onChange={(e) => setStore({...Store, name: e.target.value})} />
          <input type="text" placeholder='Store Email' 
              className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-slate-500'
              onChange={(e) => setStore({...Store, storeEmail: e.target.value})} />
          <input type="text" placeholder='Owner Email' 
              className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-slate-500'
              onChange={(e) => setStore({...Store, ownerEmail: e.target.value})} />
          <input type="text" placeholder='password' 
              className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-slate-500'
              onChange={(e) => setStore({...Store, password: e.target.value})} />
          <input type="text" placeholder='Address' 
              className='w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-slate-500'
              onChange={(e) => setStore({...Store, Address: e.target.value})} />
          <button onClick={() => addStore()} className='w-full bg-slate-900 text-white font-semibold py-3 rounded-lg hover:bg-slate-800'>Add Store</button>
        </form>
    </div>
  )
}

export default AddNewStore