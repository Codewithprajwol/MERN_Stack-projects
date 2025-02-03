import express from 'express'
import { authCheck, createUser, loginUser, logoutUser } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router=express.Router();

router.post('/signup',createUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.get('/authcheck',protectRoute,authCheck)

export default router;