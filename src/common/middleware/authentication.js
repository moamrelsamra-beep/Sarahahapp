import jwt from "jsonwebtoken";
import { findOne } from "../../DB/db.service.js"; 
import  userModel from "../../DB/models/user.model.js";

export const authentication = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Error("Token not exist", { cause: 404 });
  }

  const decoded = jwt.verify(authorization, "mohamed123");
  if (!decoded?.id) {
    throw new Error("Token not valid", { cause: 400 });
  }
  const user = await findOne({
    model: userModel,
    filter: {
      _id: decoded.id,
    },
  });
  if (!user) {
    throw new Error("User not Exixt", { cause: 400 });
  }
  req.user = user;

  next();
};
