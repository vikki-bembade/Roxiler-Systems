import pool from "../Utils/dbConnect.js";

export const getStoreRatingTable = async (storeId) => {
    try {
        console.log(storeId);
        const result = await pool.query(`SELECT r.rating, u.name, s.store_name FROM 
  rating r RIGHT JOIN users u ON r.user_id = u.id
  RIGHT JOIN store s ON r.store_id = s.id
WHERE s.id =$1`, [storeId]);
        console.log(result.rows);  
        return result.rows;
    } catch (error) {
        return { state: false, data: error.message };
    }
};

export const getStoreAvgRating = async (storeId) => {
    try {
        const result = await pool.query(`SELECT COALESCE(ROUND(AVG(rating), 2), 0) AS avg_rating FROM rating 
            WHERE store_id = $1`, [storeId]);
        return result.rows[0].avg_rating;
    } catch (error) {
        return { state: false, data: error.message };
    }
}