import { Router } from 'express'
import { login, me, register } from '../controllers/authController.js'
import { asyncHandler } from '../middlewares/asyncHandler.js'
import { protect } from '../middlewares/protect.js'
import { validateLogin, validateRegister } from '../middlewares/validateAuth.js'

const router = Router()

router.post('/signup', validateRegister, asyncHandler(register))
router.post('/login', validateLogin, asyncHandler(login))
router.get('/me', protect, asyncHandler(me))

export default router
