import { getAllStoresForUserService } from "../Service/useService.js";

import { addRatingService } from "../Service/useService.js";

export const getAllStoresForUserController = async (req, res) => {
    const { userId } = req.params;
    try{
        const result = await getAllStoresForUserService(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ state: false, data: error.message });
    }
}



export const addRatingController = async (req, res) => {
    const { user_id, store_id, rating } = req.body;
    console.log("Add rating request:", { user_id, store_id, rating });
    try {
        const result = await addRatingService(user_id, store_id, rating);
        res.status(200).json(result);
    } catch (error) {
        console.error("Add rating error:", error);
        res.status(500).json({ state: false, message: error.message });
    }
}
