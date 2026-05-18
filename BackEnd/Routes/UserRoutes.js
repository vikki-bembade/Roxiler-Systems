import { Router } from 'express';
import { RegisterController } from '../Controller/UserController.js';
import { LoginController } from '../Controller/UserController.js';
import  Authentication  from '../Middleware/Authentication.js';

import { updatePasswordController } from '../Controller/UserController.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Test route is working!' });
});

router.post('/register', RegisterController);


router.post('/login', LoginController);
router.patch('/password/:userId', Authentication,updatePasswordController);



export default router;