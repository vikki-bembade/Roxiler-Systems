import { Router } from 'express';
import { getStoreRatingTableController } from '../Controller/StoreController.js';
import { getStoreAvgRatingController } from '../Controller/StoreController.js';
import { updatePasswordController } from '../Controller/StoreController.js';
import Authentication  from '../Middleware/Authentication.js';

const StoreRoutes = Router();

StoreRoutes.get('/getStoreRatingTable/:storeId', Authentication, getStoreRatingTableController );

StoreRoutes.get('/getStoreAvgRating/:storeId', Authentication, getStoreAvgRatingController);

StoreRoutes.patch('/updatePassword', Authentication, updatePasswordController);

export default StoreRoutes;