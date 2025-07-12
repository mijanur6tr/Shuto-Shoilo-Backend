import express from 'express';
import { loginAdmin } from '../controllers/adminControllers.js';


const AdminRouter = express.Router();

AdminRouter.post('/login', loginAdmin);


export  {AdminRouter};
