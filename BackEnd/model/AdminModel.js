import pool from '../Utils/dbConnect.js';

export const createAdminNewUser = async (name, email, password, address, role) => {
    console.log(name, email, password, address, role);
    const existingUser = await pool.query(`SELECT id FROM users WHERE email = $1`, [email]);
    if (existingUser.rowCount > 0) {
        return { state: false, message: "User is already registered" , data: existingUser.rows[0]};
    }
    try{
        const result = await pool.query(`INSERT INTO users (name, email, address, password, role) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`, [name, email, address, password,role]);
        return result.rows[0];
    }
    catch (error) {
        console.error("Error creating admin user:", error);
      
    }
};

export const createAdminStore = async (name, Address, ownerEmail, storeEmail, password) => {
   console.log(name, Address, ownerEmail, storeEmail, password);
    try{
        const Owner = await pool.query(`SELECT id FROM users WHERE email = $1`, [ownerEmail]);
        const ownerId = Owner.rows[0].id;
        const result = await pool.query(`INSERT INTO store (owner_id, store_name, email, address, password) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *`, [ownerId, name, storeEmail, Address, password]);
        //console.log(result.rows[0]);
        return result.rows[0];
    }
    catch (error) {
        console.error("Error creating store:", error);
        return { state: false, message: "Internal server error" };
    }
};

export const getAdminDashboardData = async (adminId) => {
    try{
        const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [adminId]);
        return result.rows[0];
    }
    catch (error) {
        return { state: false, message: "Internal server error" };
    }
}

export const getAllStoresData = async () => {
    try{
        const result = await pool.query(`SELECT * FROM store`);
        return result.rows;
    }
    catch (error) {
        return { state: false, message: "Internal server error" };
    }
}

export const getAllUsersData = async () => {
    try{
        const result = await pool.query(`SELECT * FROM users`);
        return result.rows;
    }
    catch (error) {
        return { state: false, message: "Internal server error" };
    }
}

export const getAllStoreOwnersData = async () => {
    try{
        const query = `SELECT u.id, u.name, u.email, u.address, u.role, s.store_name FROM 
users u RIGHT JOIN store s 
ON s.owner_id = u.id`;
        console.log("Executing query:", query);
        const result = await pool.query(query);
        if (result.rowCount === 0) {
            return { state: false, message: "No store owners found" };
        }
        return { state: true, data: result.rows };
    }
    catch (error) {
        console.error("Error fetching store owners:", error.message);
        return { state: false, message: "Internal server error" };
    }
}

export const getTotalOfAll = async () => {
    try{
        const result = await pool.query(`SELECT 
(SELECT COUNT(*) FROM users) AS total_users,
(SELECT COUNT(*) FROM store) AS total_stores,
(SELECT COUNT(*) FROM rating) AS total_rating;`);
        if (result.rowCount === 0) {
            return { state: false, message: "No data found" };
        }
        return { state: true, data: result.rows[0] };
    }
    catch (error) {
        console.error("Error fetching total:", error);
        return { state: false, message: "Internal server error" };
    }
}