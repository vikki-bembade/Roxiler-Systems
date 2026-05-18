import axios from "axios";


const BaseURL = 'http://localhost:3000/admin';

export const AddNewStoreApi = async (storeData) => {
    console.log(storeData , localStorage.getItem('token'));
    try{
        const response = await axios.post(`${BaseURL}/addStore`, storeData, {
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}` }
        });
        console.log(response.data);
        return response.data;
    }
    catch(error){
        console.error('Error adding new store:', error);
        return {status: 'error', message: 'An error occurred while adding the new store.'};
    }
}

export const AddNewUserApi = async (userData) => {
    console.log(userData , localStorage.getItem('token'));
    try{
        const response = await axios.post(`${BaseURL}/addUser`, userData, {
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}` }
        });
        console.log(response.data);
        return response.data;
    }
    catch(error){
        console.error('Error adding new user:', error);
        return {status: 'error', message: 'An error occurred while adding the new user.'};
    }
}

export const GetAllStoresApi = async () => {
    try{
        const response = await axios.get(`${BaseURL}/getAllStores`, {
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}` }
        });
        console.log(response.data);
        return response.data;
    }
    catch(error){
        console.error('Error fetching all stores:', error);
        return {status: 'error', message: 'An error occurred while fetching the stores.'};
    }
}

export const getAllUsersApi = async () => {
    try{
        const response = await axios.get(`${BaseURL}/getAllUsers`, {
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}` }
        });
        console.log(response.data);
        return response.data;
    }
    catch(error){
        console.error('Error fetching all users:', error);
        return {status: 'error', message: 'An error occurred while fetching the users.'};
    }
}

export const getAllStoreOwnersApi = async () => {
    try{
        const response = await axios.get(`${BaseURL}/getAllStoreOwners`, {
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}` }
        });
        console.log(response.data);
        return response.data;
    }
    catch(error){
        console.error('Error fetching all store owners:', error);
        return {status: 'error', message: 'An error occurred while fetching the store owners.'};
    }
}

export const getTotalApi = async () => {
    try{
        const response = await axios.get(`${BaseURL}/getTotalofAll`, {
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}` }
        });
         console.log(response.data);
       
        return {status: true, data: response.data};
    }
    catch(error){
        console.error('Error fetching total:', error);
        return {status: 'error', message: 'An error occurred while fetching the total.'};
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