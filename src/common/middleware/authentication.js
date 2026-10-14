import jwt from "jsonwebtoken";
import  userModel from "../../DB/models/user.model.js";
import * as dbService from "../../DB/service/db.service.js"
export const authentication = async (req, res, next) => {
  // const { authorization } = req.headers;

  // if (!authorization) {
  //   throw new Error("Token not exist", { cause: 404 });
  // }

  // const decoded = jwt.verify(authorization, "mohamed@123");
const { authorization } = req.headers;

if (!authorization) {
  throw new Error("Token not exist", { cause: 401 });
}

const [prefix, token] = authorization.split(" ");
if (prefix !== "Bearer" || !token) {
  throw new Error("Invalid token format", { cause: 401 });
}

const decoded = jwt.verify(token, "mohamed@123");

  if (!decoded?.id) {
    throw new Error("Token not valid", { cause: 400 });
  }
  const user = await dbService.findOne({
    model: userModel,
    filter: {
      _id: decoded.id,
    },
  });
  if (!user) {
    throw new Error("User not Exixt", { cause: 400 });
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
