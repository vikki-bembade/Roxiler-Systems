import { createUser } from '../model/UserModel.js';
import { findUserByEmail } from '../model/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserById } from '../model/UserModel.js';
import { findStoreByUserId } from '../model/UserModel.js';
import { updateUserPassword } from '../model/UserModel.js';

export const RegisterService = async (name, email, password, address, role) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(name, email, hashedPassword, address, role);
        if(!user.state) {
            return { state: false, message: user.message };
        }
        return { state: true};
    } catch (error) {
        //console.error("Error registering user:", error);
        return { state: false, message: "An error occurred during registration" };
    }
}

export const loginService = async (email, password) => {
    console.log("from service", { email, password });
    try{
            const user = await findUserByEmail(email);
            if(!user.state) {
                return { state: false, message: "User not found" };
            }
            const isMatch = await bcrypt.compare(password, user.user.password);
            console.log("Password match result:", isMatch);
            if(!isMatch) {
                return { state: false, message: "Invalid password" };
            }
            const storeID = await findStoreByUserId(user.user.id);
            const token = jwt.sign({ userId: user.user.id, role: user.user.role, storeId: storeID.storeId }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const role = user.user.role;
            console.log("Generated token:", token , "Role:", role);
            return { state: true, token , Role: role, storeId: storeID.storeId };
    }
    catch(error) {
         return { state: false, message: "An error occurred during login" };
    }
}

export const updatePasswordService = async (userId, newPassword) => {
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const result = await updateUserPassword(userId, hashedPassword);
        if (!result.state) {
            return { state: false, message: result.message };
        }
        return { state: true, user: result.user };
    } catch (error) {
        console.error("Error updating password:", error);
        return { state: false, message: "An error occurred while updating the password" };
    }
}