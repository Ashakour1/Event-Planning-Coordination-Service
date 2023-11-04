import express from 'express';
import registerAdmin   from '../controllers/adminController.js';
const router = express.Router();



router.post('/',registerAdmin);


export default router;