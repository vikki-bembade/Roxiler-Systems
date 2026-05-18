import express from 'express';
import cors from 'cors';
import { connectDB } from './Utils/dbConnect.js';
import userRoutes from './Routes/UserRoutes.js';
import Adminroutes from './Routes/AdminRoutes.js';
import StoreRoutes from './Routes/StoreRoutes.js';
import useRoutes from './Routes/useRoutes.js';

const app = express();

connectDB();


app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/use', useRoutes);
app.use('/admin', Adminroutes);
app.use('/store', StoreRoutes);
app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 