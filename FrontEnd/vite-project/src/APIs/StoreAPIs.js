import axios from "axios";


const BaseURL = `${import.meta.env.VITE_API_URL}/store`;

export const GetStoreRatingTableApi = async (storeId) => {
    try{
        const response = await axios.get(`${BaseURL}/getStoreRatingTable/${storeId}`, {
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}` }
        });
        console.log(response.data);
        return {status: true, data: response.data};
    }
    catch(error){
       return {status: false, message: 'An error occurred while fetching the store rating table.'};
    }
}

export const getstoreAvgRatingApi = async (storeId) => {
    try{
        const response = await axios.get(`${BaseURL}/getStoreAvgRating/${storeId}`, {
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}` }
        });
        console.log(response.data);
        return {status: true, data: response.data};
    }
    catch(error){
        return {status: false, message: 'An error occurred while fetching the store average rating.'};
    }
}

export const updatePasswordApi = async (userId, newPassword) => {
    try {
        const response = await axios.patch(`${BaseURL}/updatePassword`, 
            { userId, password: newPassword },
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        console.log("Update password response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating password:", error);
        return { state: false, message: 'An error occurred while updating password.' };
    }
}