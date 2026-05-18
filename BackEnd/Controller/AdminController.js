import { AdminRegisterNewUserService } from '../Service/AdminService.js';
import { AdminAddStoreService } from '../Service/AdminService.js';
import { AdminDashboardService } from '../Service/AdminService.js';
import { GetAllStoresDataService } from '../Service/AdminService.js';
import { getAllUsersDataService } from '../Service/AdminService.js';
import { getAllStoreOwnersDataService } from '../Service/AdminService.js';
import { getTotalOfAllService } from '../Service/AdminService.js';
import { updatePasswordService } from '../Service/UserServices.js';

export const AdminRegisterNewUserController = async (req, res) => {
    console.log("from controller", req.body);
    const { name, email, password, address, role } = req.body;
    try {
        const result = await AdminRegisterNewUserService(name, email, password, address, role);
        console.log("from controller", result);
        return res.status(201).json({ state: true, message: "User registered successfully" });
    } catch (error) {
        return res.status(500).json({ state: false, message: "Internal server error" });
    }
};

export const AdminAddStoreController = async (req, res) => {
    console.log(req.body);
    try {
        const result = await AdminAddStoreService(req.body);
        console.log(result);
        
        return res.status(201).json({ state: true, message: "Store created successfully" });   
    } 
    catch (error) {
        return res.status(500).json({ state: false, message: "Internal server error" });
    }
}

export const AdminDashboardController = async (req, res) => {
    const adminId = req.user.id;
    try{
        const result = await AdminDashboardService(adminId);
        
        return res.status(200).json({ data: result });
    }
    catch (error) {
        return res.status(500).json({ state: false, message: "Internal server error" });
    }
}

export const GetAllStoresDataController = async (req, res) => {
    try{
        const result = await GetAllStoresDataService();
       
        return res.status(200).json({ data: result });
    }
    catch (error) {
        return res.status(500).json({ state: false, message: "Internal server error" });
    }
}

export const getAllUsersDataController = async (req, res) => {
    try{
        const result = await getAllUsersDataService();
        
        return res.status(200).json({ data: result });
    }
    catch (error) {
        return res.status(500).json({ state: false, message: "Internal server error" });
    }
}

export const getAllStoreOwnersDataController = async (req, res) => {
    try{
        const result = await getAllStoreOwnersDataService();
        if (!result.state) {
            return res.status(400).json({ state: false, message: result.message });
        }
        return res.status(200).json({ state: true, data: result.data });
    }
    catch (error) {
        console.error("Error in getAllStoreOwnersDataController:", error);
        return res.status(500).json({ state: false, message: "Internal server error" });
    }
}

export const getTotalOfAllController = async (req, res) => {
    try{
        const result = await getTotalOfAllService();
        if (!result.state) {
            return res.status(400).json({ state: false, message: result.message });
        }
        return res.status(200).json({ state: true, data: result.data });
    }
    catch (error) {
        console.error("Error in getTotalOfAllController:", error);
        return res.status(500).json({ state: false, message: "Internal server error" });
    }
}

export const updatePasswordController = async (req, res) => {
    const { userId, password } = req.body;
    console.log("Update password request for user:", userId);
    try {
        if (!userId || !password) {
            return res.status(400).json({ state: false, message: "User ID and password are required" });
        }
        const result = await updatePasswordService(userId, password);
        res.status(200).json(result);
    } catch (error) {
        console.error("Update password error:", error);
        res.status(500).json({ state: false, message: error.message });
    }
}
