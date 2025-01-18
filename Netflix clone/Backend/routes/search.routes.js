import express from 'express'

const router=express.Router()

router.get('/person/:query',searchPerson)
router.get('/movie/:query',searchMovies)
router.get('/tv/:query',searchTv);



export default router;