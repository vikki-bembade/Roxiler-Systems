import { createAdminNewUser } from '../model/AdminModel.js';
import { createAdminStore } from '../model/AdminModel.js';
import { getAdminDashboardData } from '../model/AdminModel.js';
import { getAllStoresData } from '../model/AdminModel.js';
import { getAllUsersData } from '../model/AdminModel.js';
import { getAllStoreOwnersData } from '../model/AdminModel.js';
import {getTotalOfAll} from '../model/AdminModel.js';
import bcrypt from 'bcrypt';

export const AdminRegisterNewUserService = async (name, email, password, address, role) => {
    console.log("from service", name, email, password, address, role);
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await createAdminNewUser(name, email, hashedPassword, address, role);
        //console.log("from service", result);
        
        return result;
    }
    catch (error) {
        return { state: false, message: "Internal server error" };
    }
};

export const AdminAddStoreService = async (storeData) => {
    console.log(storeData);
    const { name, Address, ownerEmail, storeEmail, password } = storeData;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await createAdminStore(name, Address, ownerEmail, storeEmail, hashedPassword);
    
        return result;
    }
    catch (error) {
        return { state: false, message: "Internal server error" };
    }
};

export const AdminDashboardService = async (adminId) => {
    return await getAdminDashboardData(adminId);
}

export const GetAllStoresDataService = async () => {
    try{
        const result = await getAllStoresData();
       
        return result;
    }
    catch (error) {
        return { state: false, message: "Internal server error" };
    }
}

export const getAllUsersDataService = async () => {
    try{
        const result = await getAllUsersData();
       
        return result;
    }
    catch (error) {
        return { state: false, message: "Internal server error" };
    }
}

export const getAllStoreOwnersDataService = async () => {
    try{
        const result = await getAllStoreOwnersData();
       
        return result;
    }
    catch (error) {
        console.error("Error in getAllStoreOwnersDataService:", error);
        return { state: false, message: "Internal server error" };
    }
}

export const getTotalOfAllService = async () => {
    try{
        const result = await getTotalOfAll();
        if (!result.state) {
            return { state: false, message: result.message };
        }
        return { state: true, data: result.data };
    }
    catch (error) {
        console.error("Error in getTotalOfAllService:", error);
        return { state: false, message: "Internal server error" };
    }
}
