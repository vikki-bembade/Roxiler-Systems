import React, { use } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { GetAllStoresApi } from '../../APIs/AdminAPIS';

const ShowStoreList = () => {
    const [stores, setStores] = useState([]);
    useEffect(() => {
        getStores();
    }, []);

    const getStores = async() => {
        try {
            const result = await GetAllStoresApi();
            // Handle both {state: true, data: [...]} and {data: [...]} formats
            if (result && Array.isArray(result.data)) {
                setStores(result.data);
            } else if (result && result.state === true && Array.isArray(result.data)) {
                setStores(result.data);
            } else if (Array.isArray(result)) {
                setStores(result);
            } else {
                console.error('Failed to fetch stores:', result?.message || 'Unknown error');
                setStores([]);
            }
        } catch (error) {
            console.error('Error fetching stores:', error);
            setStores([]);
        }
    }
  
  return (
    <div>
        <h2 className='text-2xl font-bold text-slate-900 mb-6'>Store List</h2>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
              <thead>
                  <tr className='bg-slate-900'>
                      <th className='border border-gray-300 bg-slate-900 text-white px-6 py-3 text-left text-sm font-semibold'>Store Name</th>
                      <th className='border border-gray-300 bg-slate-900 text-white px-6 py-3 text-left text-sm font-semibold'>Email</th>
                      <th className='border border-gray-300 bg-slate-900 text-white px-6 py-3 text-left text-sm font-semibold'>Address</th>
                      <th className='border border-gray-300 bg-slate-900 text-white px-6 py-3 text-left text-sm font-semibold'>Rating</th>
                  </tr>
              </thead>
              <tbody>
                  {stores.map((store) => (
                      <tr key={store.id} className='hover:bg-gray-50'>
                          <td className='border border-gray-300 px-6 py-3 text-sm'>{store.name}</td>
                          <td className='border border-gray-300 px-6 py-3 text-sm'>{store.email}</td>
                          <td className='border border-gray-300 px-6 py-3 text-sm'>{store.address}</td>
                          <td className='border border-gray-300 px-6 py-3 text-sm'>{store.rating}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
        </div>
    </div>
  )
}

export default ShowStoreList