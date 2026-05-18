import { RegisterService } from '../Service/UserServices.js';
import { loginService } from '../Service/UserServices.js';

import { updatePasswordService } from '../Service/UserServices.js';

export const RegisterController = async (req, res) => {
    if(!req.body){
        return res.status(400).json({ state: false, message: "Invalid request body" });
    }
    try{

        const { name, email, password, address, } = req.body;

        const role = "user"; // Default role for new users

        if(!name || !email || !password || !role) {
            return res.status(400).json({ state: false, message: "All fields are required" });
        }

        const result = await RegisterService(name, email, password, address, role);
        if(!result.state) {
            return res.status(400).json({ state: false, message: result.message });
        }
        return res.status(201).json({ state: true });
    } catch (error) {
        return res.status(500).json({ state: false, message: "Internal server error" });
    }
}


export const LoginController = async (req, res) => {
    console.log("controller",req.body);
    if(!req.body){
        return res.status(400).json({ state: false, message: "Invalid request body" });
    }
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ state: false, message: "Email and password are required" });
        }
        console.log("controller", { email, password });

        const result = await loginService(email, password);
        console.log("controller", result);
        if(!result.state) {
            return res.status(400).json({ state: false, message: result.message });
        }
        return res.status(200).json({ state: true, token: result.token , Role: result.Role});
    } catch (error) {        
        return res.status(500).json({ state: false, message: "Internal server error" });
    }
}


export const updatePasswordController = async (req, res) => {
    const userId = req.params.userId;
    const { newPassword } = req.body;

    try {
        const result = await updatePasswordService(userId, newPassword);
        if (!result.state) {
            return res.status(400).json({ state: false, message: result.message });
        }
        return res.status(200).json({ state: true, user: result.user });
    } catch (error) {
        return res.status(500).json({ state: false, message: "Internal server error" });
    }
}