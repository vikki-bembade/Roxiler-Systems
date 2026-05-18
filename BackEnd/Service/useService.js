import { getAllstoresForUserModel } from "../model/useModel.js";

import { addRatingModel } from "../model/useModel.js";

export const getAllStoresForUserService = async (userId) => {
    try{
        const result = await getAllstoresForUserModel(userId);
        return result;
    } catch (error) {
        throw error;
    }
}





export const addRatingService = async (user_id, store_id, rating) => {
    try {
        const result = await addRatingModel(user_id, store_id, rating);
        return result;
    } catch (error) {
        throw error;
    }
}
