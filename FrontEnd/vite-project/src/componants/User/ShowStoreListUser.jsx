import React from 'react'
import { useState, useEffect } from 'react';
import { getStoreDataForUSerAPI } from '../../APIs/UserAPIS.js';
import { jwtDecode } from 'jwt-decode';
import { addRatingApi } from '../../APIs/UserAPIS.js';

const ShowStoreListUser = () => {
  const [stores, setStores] = useState([]);
  const [rate, setRate] = useState({
    storeId: "",
    rating: "",
});

useEffect(() => {
  getStoresForUser();
}, []);

const getStoresForUser = async() => {
    const token = localStorage.getItem("token");
    console.log("CHECKING TOKEN IN LOCALSTORAGE:");
    console.log("Token exists?", !!token);
    console.log("Token value:", token ? token.substring(0, 30) + "..." : "NULL");
    
    if (!token) {
        console.error("NO TOKEN FOUND - User not authenticated!");
        alert("Session expired. Please login again.");
        setStores([]);
        return;
    }
    
    try {
        const decoded = jwtDecode(token);
        const userId = decoded.userId;
        console.log(" User ID from token:", userId);

        const response = await getStoreDataForUSerAPI(userId);
        console.log(" API Response:", response);

        if (!response.state) {
            console.error('Failed to load stores:', response.message);
            setStores([]);
            return;
        }

        setStores(response.data || []);
    } catch(error) {
        console.error("Error in getStoresForUser:", error?.message || error);
        setStores([]);
    }
}

const submitRating = async() =>{
  const store_id = rate.storeId;
  const toakn = localStorage.getItem("token");
  const decoded = jwtDecode(toakn);
  const user_id = decoded.userId;
  const rating = rate.rating;
  const data = {
    storeId: store_id,
    userId: user_id,
    rating: rating
  };
  try {
    const response = await addRatingApi(data);
  } catch (error) {
    console.error("Error adding rating:", error);
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
                    <th className='border border-gray-300 bg-slate-900 text-white px-6 py-3 text-left text-sm font-semibold'>Address</th>
                    <th className='border border-gray-300 bg-slate-900 text-white px-6 py-3 text-left text-sm font-semibold'>Overall Rating</th>
                    <th className='border border-gray-300 bg-slate-900 text-white px-6 py-3 text-left text-sm font-semibold'>Total Ratings</th>
                    <th className='border border-gray-300 bg-slate-900 text-white px-6 py-3 text-left text-sm font-semibold'>Your Rating</th>
                    <th className='border border-gray-300 bg-slate-900 text-white px-6 py-3 text-left text-sm font-semibold'>New Rating</th>
                </tr>
              </thead>
              <tbody>
                {stores.length === 0 ? (
                  <tr>
                    <td colSpan="6" className='border border-gray-300 px-6 py-3 text-center text-gray-500'>No stores available</td>
                  </tr>
                ) : (
                  stores.map((store) => (
                    <tr key={store.id} className='hover:bg-gray-50'>
                      <td className='border border-gray-300 px-6 py-3 text-sm'>{store.store_name}</td>
                      <td className='border border-gray-300 px-6 py-3 text-sm'>{store.address}</td>
                      <td className='border border-gray-300 px-6 py-3 text-sm'>{store.avg_rating}</td>
                      <td className='border border-gray-300 px-6 py-3 text-sm'>{store.total_ratings}</td>
                      <td className='border border-gray-300 px-6 py-3 text-sm'>{store.user_rating}</td>
                      <td className='border border-gray-300 px-6 py-3 text-sm'>
                        <div className='flex gap-2'>
                          <input
                            type="number"
                            placeholder="1-5"
                            className='w-16 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-slate-500'
                            value={rate.rating}
                            onChange={(e) => setRate({...rate, rating: e.target.value , storeId: store.id})}
                          />
                          <button onClick={() => submitRating()} className='bg-slate-900 text-white px-3 py-1 rounded text-sm hover:bg-slate-800'>Submit</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
        </div>
        </div>
  )
}

export default ShowStoreListUser