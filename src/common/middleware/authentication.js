import jwt from "jsonwebtoken";
import  userModel from "../../DB/models/user.model.js";
import * as dbService from "../../DB/service/db.service.js"
import { ACCESS_TOKEN_SIGNATURE } from "../../../config/config.service.js";

export const authentication = async (req, res, next) => {
  // const { authorization } = req.headers;

  if (!authorization) {
    throw new Error("Token not exist", { cause: 404 });
  }

  const decoded = jwt.verify(authorization, ACCESS_TOKEN_SIGNATURE);

  if (!decoded?.id) {
    return res.status(400).json({message: "Invalid Token"})
  }
  const user = await userModel.findById(decoded.id)
  if (!user) {
    throw new Error("User not Exixt", { cause: 400 });
  }
       if (user?.isConfirmed) {
    throw new Error("User not Confirmed Yet", { cause: 400 });
  }
      
  if(user?.changeCredentialAt?.getTime() > decoded?.iat * 1000){
throw new Error("Token expire  you must log in again", {cause:400})
  }


   if( await ttl (`revoke_token::${user._id}::${decoded.jti}`)>0){
    throw new Error ("InValid revoked token, you should login again")
   }

  req.user = user;
  req.decoded = decoded
  next();
};
