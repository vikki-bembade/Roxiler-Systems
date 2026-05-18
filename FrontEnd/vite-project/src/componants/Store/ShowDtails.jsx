import React from 'react'
import { useState,useEffect } from 'react'
import { jwtDecode } from 'jwt-decode';
import { GetStoreRatingTableApi } from '../../APIs/StoreAPIs.js';

const ShowDtails = () => {
  const [store, setStore] = useState([]);
    useEffect(() => {
        getStoreDetails();
    }, []);

    const getStoreDetails = async() => {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const storeId = decoded.storeId;
        console.log(storeId);

        try {
            const response = await GetStoreRatingTableApi(storeId);
            console.log(response);
            if (!response.status) {
                return console.error(response.message);
            }
            return setStore(response.data.result);
        }
        catch (error) {
            console.error("Error fetching store details:", error);
        }
    };

  return (
    <div>
        <h2 className='text-2xl font-bold text-slate-900 mb-6'>Store Details</h2>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
              <thead>
                  <tr className='bg-slate-900'>
                      <th className='border border-gray-300 bg-slate-900 text-white px-6 py-3 text-left text-sm font-semibold'>Store Name</th>
                      <th className='border border-gray-300 bg-slate-900 text-white px-6 py-3 text-left text-sm font-semibold'>Users</th>
                      <th className='border border-gray-300 bg-slate-900 text-white px-6 py-3 text-left text-sm font-semibold'>Rating</th>
                  </tr>
              </thead>
              <tbody>
                  {store.map((detail, index) => (
                      <tr key={index} className='hover:bg-gray-50'>
                          <td className='border border-gray-300 px-6 py-3 text-sm'>{detail.store_name}</td>
                          <td className='border border-gray-300 px-6 py-3 text-sm'>{detail.name}</td>
                          <td className='border border-gray-300 px-6 py-3 text-sm'>{detail.rating}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
        </div>
    </div>
  )
}

export default ShowDtails