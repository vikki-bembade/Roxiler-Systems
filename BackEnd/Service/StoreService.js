import { getStoreRatingTable } from "../model/StoreModel.js";
import { getStoreAvgRating } from "../model/StoreModel.js";

export const getStoreRatingTableService = async (storeId) => {
    try{
        console.log(storeId);
        const result = await getStoreRatingTable(storeId);
        console.log(result);
        return result;
    }
    catch(error){
        return { state: false, data: error.message };
    }
};

export const getStoreAvgRatingService = async (storeId) => {
    try{
        const result = await getStoreAvgRating(storeId);
        console.log(result);
        return result;
    }    catch(error){
        return { state: false, data: error.message };
    }
}