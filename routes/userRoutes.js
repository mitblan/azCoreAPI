//===================================================================
// AzerothCoreAPI
// userRoutes.js
// www.azerothcore.org
// Written by Mitchell Blankenship
//===================================================================

//===================================================================
// Dependencies
//===================================================================
import express from 'express'
import { getUsers, registerUser, authUser, logoutUser, getProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route( '/' ).get( getUsers ).post( registerUser )
router.post( '/login', authUser )
router.post( '/logout', protect, logoutUser )
router.get('/profile', protect, getProfile)

export default router