import React from 'react'
import { useState, useEffect } from 'react';
import { getTotalApi } from '../../APIs/AdminAPIS';
const DashBoard = () => {
    const [total, setTotal] = useState([]);
    useEffect(() => {
        getTotal();
    }, []);

    const getTotal = async() => {
        try{
            const response = await getTotalApi();
            console.log(response);
            // Handle both {state: true, data: {...}} and {data: {...}} formats
            if (response && response.state === true && response.data) {
                setTotal(response.data);
            } else if (response && response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
                setTotal(response.data.data);
            }
        }
        catch(error){
            console.error("Error fetching total:", error);
        }
    }
  return (
    <div>
        <h2 className='text-2xl font-bold text-slate-900 mb-6'>Dashboard</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div className='bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6'>
                <p className='text-sm font-medium text-blue-700'>Total Users</p>
                <p className='text-4xl font-bold text-blue-900 mt-2'>{total.total_users}</p>
            </div>
            <div className='bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6'>
                <p className='text-sm font-medium text-green-700'>Total Stores</p>
                <p className='text-4xl font-bold text-green-900 mt-2'>{total.total_stores}</p>
            </div>
            <div className='bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6'>
                <p className='text-sm font-medium text-purple-700'>Total Ratings</p>
                <p className='text-4xl font-bold text-purple-900 mt-2'>{total.total_rating}</p>
            </div>
        </div>
    </div>
  )
}

export default DashBoard