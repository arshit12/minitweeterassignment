import express from 'express';
import {createTweet,deleteTweet,editTweet} from '../controllers/tweet.controllers.js';
import isAuthenticated from '../auth/auth.js';

const router = express.Router();

router.post('/create',isAuthenticated,createTweet);
router.delete('/delete/:id',isAuthenticated,deleteTweet);
router.put('/edit/:id',isAuthenticated,editTweet);
