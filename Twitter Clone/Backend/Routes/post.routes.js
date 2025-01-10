import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js'
import { commentOnPost, createPost, deletePost, getAllPost, getFollowingPosts, getLikedPost, getUserPosts, likeUnlikePost } from '../controllers/post.controller.js';

const router=express.Router()

router.get('/getAllPost',protectRoute,getAllPost)
router.get('/following',protectRoute,getFollowingPosts)
router.get('/likes/:id',protectRoute,getLikedPost)
router.get('/user/:username',protectRoute,getUserPosts)
router.post('/create',protectRoute,createPost)
router.delete('/:id',protectRoute,deletePost)
router.post('/like/:id',protectRoute,likeUnlikePost)
router.post('/comment/:id',protectRoute,commentOnPost)


export default router;