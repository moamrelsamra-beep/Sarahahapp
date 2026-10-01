import {Router} from "express"
import * as US from "./user.service.js"

const router = Router()

router.post('/signup',US.signUp)
router.post('/login',US.login)
router.post('/profile',US.getProfile)
router.post('/signUp/gmail',US.signUpWithGmail)


export default router