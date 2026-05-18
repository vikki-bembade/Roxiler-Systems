import pool from '../Utils/dbConnect.js';

export const createUser = async (name, email, password, address, role) => {
    const result = await pool.query(`INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [name, email, password, address, role]);
    if (result.rowCount === 0) {
        return { state: false, message: "User creation failed" };
    }
    return { state: true, user: result.rows[0] };
}

export const findUserByEmail = async (email) => {
    console.log(email);
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);  
    console.log(result);
    if (result.rowCount === 0) {
        return { state: false, message: "User creation failed" };
    }
    return { state: true, user: result.rows[0] };
}

export const findUserById = async (id) => {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    if (result.rowCount === 0) {
        return { state: false, message: "User not found" };
    }
    return { state: true, user: result.rows[0] };
}
export const findStoreByUserId = async (userId) => {
    try{
        const result = await pool.query(`SELECT id FROM store WHERE owner_id = $1`, [userId]);
        if (result.rowCount === 0) {
            return { state: false, message: "Store not found" };
        }
        return { state: true, storeId: result.rows[0].id };
    } catch (error) {
        return { state: false, message: error.message };
    }
}

export const updateUserPassword = async (userId, newPassword) => {
    try {
        const result = await pool.query(`UPDATE users SET password = $1 
            WHERE id = $2 RETURNING *`, [newPassword, userId]);
            return { state: true, user: result.rows[0] };
        } catch (error) {
            console.error("Error updating password:", error);
            return { state: false, message: "Internal server error" };
        }
    };