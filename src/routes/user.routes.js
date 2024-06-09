import express from 'express';
import {Register,Login,Logout,getMyProfile,getOtherProfile,follow,unfollow} from '../controllers/user.controllers.js';
import isAuthenticated from '../auth/auth.js';

const router = express.Router();

router.post('/register',Register);
router.post('/login',Login);
router.get('/logout',Logout);
router.get('/me',isAuthenticated,getMyProfile);
router.get('/user/:id',isAuthenticated,getOtherProfile);
router.post('/follow/:id',isAuthenticated,follow);
router.post('/unfollow/:id',isAuthenticated,unfollow);