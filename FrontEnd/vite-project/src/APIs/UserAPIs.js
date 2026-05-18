import axios from "axios";

const UserBaseURL = 'http://localhost:3000/user';
const UseBaseURL = 'http://localhost:3000/use';

export const getStoreDataForUSerAPI = async (userId) => {
    try{
        const token = localStorage.getItem('token');
        if (!token) {
            return { state: false, message: 'No token available' };
        }

        const response = await axios.get(`${UseBaseURL}/getAllStoresForUser/${userId}`, {
            headers:{ Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
    catch(error){
        console.error('Error fetching store data:', error?.response?.data || error.message);
        return { state: false, message: 'An error occurred while fetching store data.' };
    }
}

export const addRatingApi = async (data) => {
    try {
        const payload = {
            user_id: data.userId,
            store_id: data.storeId,
            rating: data.rating
        };
        const response = await axios.post(`${UseBaseURL}/addRating`, payload, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log("Add rating response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error adding rating:", error?.response?.data || error.message);
        return { state: false, message: 'An error occurred while adding the rating.' };
    }
}

export const updatePasswordApi = async (userId, newPassword) => {
    try {
        const response = await axios.patch(`${UserBaseURL}/password/${userId}`, 
            { newPassword },
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        console.log("Update password response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating password:", error?.response?.data || error.message);
        return { state: false, message: 'An error occurred while updating password.' };
    }
}