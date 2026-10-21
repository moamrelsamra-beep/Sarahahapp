import {Router} from "express"
import * as US from "./message.service.js"
import { authentication } from "../../common/middleware/authentication.js"
import { Validation } from "../../common/middleware/validation.js"
import {multerLocal} from "../../common/middleware/multer.js"
import * as MV from "./message.validation.js"
import { Multer_Enum } from "../../common/enum/multer.enum.js"

const messageRouter = Router()




messageRouter.post("/",multerLocal({customPath: "users", customTypes:Multer_Enum.images}).array("attachments", 3)
  ,Validation(MV.createMessageSchema),
  US.createMessage
);


export default messageRouter