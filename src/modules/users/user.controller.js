import {Router} from "express"
import * as US from "./user.service.js"
import { authentication } from "../../common/middleware/authentication.js"
import { authorization } from "../../common/middleware/authorization.js"
import { Validation } from "../../common/middleware/validation.js"
import {RoleEnum} from "../../common/enum/user.enum.js"
import {signUpSchema} from "./user.validation.js"
import {multerLocal} from "../../common/middleware/multer.js"

const router = Router()

//  router.post('/signup',
//     multerLocal({customTypes: ["image/png", "image/jpeg"]})
//     .fields([{ name: "attachments", maxCount: 4 },
//              { name: "attachment", maxCount: 2 }
//     ]),Validation(signUpSchema),US.signUp)

router.post(
  '/signup',
  multerLocal({customPath: "users", customTypes: ["image/png", "image/jpeg", "image/jpg"]}).fields([
    { name: "attachments", maxCount: 4 },
    { name: "attachment", maxCount: 2 }
  ]),
  Validation(signUpSchema),
  US.signUp
);
router.post('/login',US.login)
router.post('/profile',authentication,authorization( [RoleEnum.user] ),US.getProfile)
router.post('/signUp/gmail',US.signUpWithGmail)


export default router