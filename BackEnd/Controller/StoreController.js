import { getStoreRatingTableService } from "../Service/StoreService.js";
import { updatePasswordService } from "../Service/UserServices.js";
import { getStoreAvgRatingService } from "../Service/StoreService.js";

export const getStoreRatingTableController = async (req, res) => {
    try {
        const { storeId } = req.params;
        console.log(storeId);
        const result = await getStoreRatingTableService(storeId);
        console.log(result);
        return res.status(200).json({result});
    } catch (error) {
        return res.status(500).json({ state: false, data: error.message });
    }
};

export const getStoreAvgRatingController = async (req, res) => {
    try {
        const { storeId } = req.params;
        const result = await getStoreAvgRatingService(storeId);
        return res.status(200).json({ result });
    } catch (error) {
        return res.status(500).json({ state: false, data: error.message });
    }
};

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