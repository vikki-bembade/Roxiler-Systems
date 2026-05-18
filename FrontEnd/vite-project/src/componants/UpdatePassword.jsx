import React from 'react'
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { updatePasswordApi } from '../APIs/UserAPIs.js';

const UpdatePassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUpdatePassword = async () => {
        try {
            if (!newPassword.trim()) {
                setMessage("❌ Please enter a new password");
                return;
            }
            
            setLoading(true);
            const token = localStorage.getItem("token");
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;
            
            const result = await updatePasswordApi(userId, newPassword);
            
            if (result.state === true) {
                setMessage("✅ Password updated successfully!");
                setNewPassword("");
                setTimeout(() => setShowModal(false), 1500);
            } else {
                setMessage("❌ Failed: " + result.message);
            }
        }
        catch (error) {
            console.error("Error in UpdatePassword component:", error);
            setMessage("❌ Error updating password: " + error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <button 
                onClick={() => {
                    setShowModal(true);
                    setMessage("");
                }}
                className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium'
            >
                Change Password
            </button>

            {showModal && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white rounded-lg p-6 w-96 shadow-lg'>
                        <h2 className='text-xl font-bold mb-4'>Update Password</h2>
                        <input 
                            type="password" 
                            placeholder='Enter new password' 
                            className='border border-gray-300 rounded-md px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500' 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            disabled={loading}
                        />
                        {message && <p className='text-sm mb-4 font-medium'>{message}</p>}
                        <div className='flex gap-2'>
                            <button 
                                onClick={handleUpdatePassword}
                                disabled={loading}
                                className='flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50'
                            >
                                {loading ? 'Updating...' : 'Update'}
                            </button>
                            <button 
                                onClick={() => { 
                                    setShowModal(false); 
                                    setMessage("");
                                    setNewPassword("");
                                }}
                                disabled={loading}
                                className='flex-1 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 disabled:opacity-50'
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default UpdatePassword