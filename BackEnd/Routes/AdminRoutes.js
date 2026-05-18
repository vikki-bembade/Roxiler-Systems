import { Router } from 'express';
import { AdminRegisterNewUserController } from '../Controller/AdminController.js';
import { AdminAddStoreController } from '../Controller/AdminController.js';
import { AdminDashboardController } from '../Controller/AdminController.js';
import  Authentication  from '../Middleware/Authentication.js';
import  Authorization from '../Middleware/Athorization.js';
import { GetAllStoresDataController } from '../Controller/AdminController.js';
import { getAllUsersDataController } from '../Controller/AdminController.js';
import { getAllStoreOwnersDataController } from '../Controller/AdminController.js';
import { getTotalOfAllController } from '../Controller/AdminController.js';
import { updatePasswordController } from '../Controller/AdminController.js';

const Adminrouter = Router();



Adminrouter.post('/addStore', Authentication, Authorization, AdminAddStoreController);
Adminrouter.post('/addUser', Authentication, Authorization, AdminRegisterNewUserController);
Adminrouter.get('/getAllStores', Authentication, Authorization, GetAllStoresDataController);
Adminrouter.get('/getAllUsers',Authentication,Authorization,getAllUsersDataController)
Adminrouter.get('/getAllStoreOwners',Authentication,Authorization,getAllStoreOwnersDataController)
Adminrouter.get('/getTotalofAll',Authentication,Authorization,getTotalOfAllController);
Adminrouter.patch('/updatePassword', Authentication, Authorization, updatePasswordController);

export default Adminrouter;