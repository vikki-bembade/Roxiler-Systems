import axios from 'axios';

const BaseURL = `${import.meta.env.VITE_API_URL}/user`;


export const RegisterAPI = async(newUser) =>{
    try {
        const response = await axios.post(`${BaseURL}/register`, newUser);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error?.response?.data || error.message);
        return {status: 'error', message: 'An error occurred while registering the user.'};
    }
};

export const LoginAPI = async(loginUser) => {
    try {
        console.log(loginUser);
        const response = await axios.post(`${BaseURL}/login`, loginUser, {
        });
        console.log(response.data);
        return response.data;
    } catch (error) {   
        //console.error('Error logging in user:', error);
        return {status: 'error', message: 'An error occurred while logging in the user.'};
    }
}

export const updatePasswordApi = async (userId, newPassword) => {
    try {
        const response = await axios.patch(`${BaseURL}/password/${userId}`, { password: newPassword }, {
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating password:', error);
        return { status: 'error', message: 'An error occurred while updating the password.' };
    }
};
