import { Router } from 'express';
import { getAllStoresForUserController } from '../Controller/useController.js';

import { addRatingController } from '../Controller/useController.js';
import Authentication  from '../Middleware/Authentication.js';


const useRoutes = Router();

useRoutes.get('/getAllStoresForUser/:userId', Authentication, getAllStoresForUserController);

useRoutes.post('/addRating', Authentication, addRatingController);

export default useRoutes;