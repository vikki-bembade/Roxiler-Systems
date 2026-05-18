import pool from "../Utils/dbConnect.js";

export const getAllstoresForUserModel = async (userId) => {
    try{
        const result = await pool.query(`SELECT 
    s.id,
    s.store_name,
    s.address,
    ROUND(AVG(r.rating), 2) AS avg_rating,
    COUNT(r.rating) AS total_ratings,
    MAX(CASE 
            WHEN r.user_id = $1 THEN r.rating 
            ELSE NULL 
        END) AS user_rating
FROM store s
LEFT JOIN rating r 
    ON s.id = r.store_id
GROUP BY s.id, s.store_name, s.address; `, [userId]);
  console.log(result.rows);
        return { state: true, data: result.rows };
    } catch (error) {
        return { state: false, data: error.message };
    }
}

export const addRatingModel = async (userid, storeid, Rating) => {
    try {
        const existingRating = await pool.query(`SELECT * FROM rating 
            WHERE user_id = $1 AND store_id = $2`, [userid, storeid]);

        if (existingRating.rowCount > 0) {
            const ratingId = existingRating.rows[0].id;
            const updatedRating = await pool.query(`UPDATE rating 
                SET rating = $1 
                WHERE id = $2 
                RETURNING *`, [Rating, ratingId]);

            return {
                state: true,
                data: updatedRating.rows[0]
            };
        }

        const newRating = await pool.query(`INSERT INTO rating (user_id, store_id, rating) 
            VALUES ($1, $2, $3) 
            RETURNING *`, [userid, storeid, Rating]);

        return {
            state: true,
            data: newRating.rows[0]
        };
    } catch (error) {
        console.error("Add rating error:", error);

        return {
            state: false,
            message: error.message
        };
    }
};