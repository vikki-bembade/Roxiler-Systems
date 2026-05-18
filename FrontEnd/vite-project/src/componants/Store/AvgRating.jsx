import React from 'react'
import { useState, useEffect } from 'react';
import { getstoreAvgRatingApi } from '../../APIs/StoreAPIs.js';
import { jwtDecode } from 'jwt-decode';

const AvgRating = () => {
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    // Fetch average rating from the database and update state
    getAvgRating();
  }, []);

  const getAvgRating = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const storeId = decoded.storeId;

      const response = await getstoreAvgRatingApi(storeId);
      if (response.status) {
        console.log(response);
        setAvgRating(response.data.result);
      }
    } catch (error) {
      console.error("Error fetching average rating:", error);
    }
  };

  return (
    <div className='bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-300 rounded-lg p-6 mb-6'>
        <p className='text-sm font-medium text-amber-700'>Average Rating</p>
        <p className='text-4xl font-bold text-amber-900 mt-2'>{avgRating}</p>
    </div>
  )
}

export default AvgRating