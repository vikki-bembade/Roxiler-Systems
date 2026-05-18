import React, { use } from 'react'
import { useState, useEffect } from 'react';
import {getAllStoreOwnersApi} from '../../APIs/AdminAPIS';

const ShowOwnerList = () => {
    const [owners, setOwners] = useState([]);
    useEffect(() => {
        getOwners();
    }, []);

    const getOwners = async() => {
        try {
            const response = await getAllStoreOwnersApi();
            // Handle both {state: true, data: [...]} and {data: [...]} formats
            if (response && Array.isArray(response.data)) {
                setOwners(response.data);
            } else if (response && response.state === true && Array.isArray(response.data)) {
                setOwners(response.data);
            } else if (Array.isArray(response)) {
                setOwners(response);
            } else {
                console.error('Failed to fetch owners:', response?.message || 'Unknown error');
                setOwners([]);
            }
        } catch (error) {
            console.error('Error fetching owners:', error);
            setOwners([]);
        }
    }

  return (
    <div>
        <h2 className='text-2xl font-bold text-slate-900 mb-6'>Owner List</h2>
        <div className='overflow-x-auto'>
            <table className='w-full border-collapse'>
                <thead>
                    <tr className='bg-slate-900'>
                        <th className='border border-gray-300 bg-slate-900 text-white px-6 py-3 text-left text-sm font-semibold'>Name</th>
                        <th className='border border-gray-300 bg-slate-900 text-white px-6 py-3 text-left text-sm font-semibold'>Email</th>
                        <th className='border border-gray-300 bg-slate-900 text-white px-6 py-3 text-left text-sm font-semibold'>Address</th>
                        <th className='border border-gray-300 bg-slate-900 text-white px-6 py-3 text-left text-sm font-semibold'>Role</th>
                        <th className='border border-gray-300 bg-slate-900 text-white px-6 py-3 text-left text-sm font-semibold'>Store Name</th>
                    </tr>
                </thead>
                <tbody>
                    {owners.map((owner) => (
                        <tr key={owner.id} className='hover:bg-gray-50'>
                            <td className='border border-gray-300 px-6 py-3 text-sm'>{owner.name}</td>
                            <td className='border border-gray-300 px-6 py-3 text-sm'>{owner.email}</td>
                            <td className='border border-gray-300 px-6 py-3 text-sm'>{owner.address}</td>
                            <td className='border border-gray-300 px-6 py-3 text-sm'>{owner.role}</td>
                            <td className='border border-gray-300 px-6 py-3 text-sm'>{owner.store_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ShowOwnerList