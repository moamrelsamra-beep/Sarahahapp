import { PORT } from "../config/config.service.js";
import express from "express";
import connectDB from "./DB/connectionDB.js";
import userModel from "./DB/models/user.model.js";
import router from "./modules/users/user.controller.js";
import cors from "cors";
import connectionRedis from "./DB/connection.redis.js";
import messageRouter from "./modules/messages/message.controller.js";
import rateLimit from "express-rate-limit"
import helmet from 'helmet'
const app = express();


const port = PORT;

const limiter = rateLimit({
  windowMs: 60*1000,
  limit: 5,
 message:{
   success: false,
   message: "Game over!!"
},
  standardHeaders: true,
  legacyHeaders: false,
  //skip:{req} => req.path == "/messages",
  skipSuccessfulRequests: true
});

const bootstrap = async () => {
  app.use(limiter)
  app.use(helmet())
  app.use(express.json());

  app.set("case sensitive routing",true)
    app.set("strict routing",true)

  app.use(cors({
    origin: "*"
  }))
  
  app.get("/", (req, res) =>
    res.status(200).json({ msg: "Welcome to Sarahah app.....!!!" }),
  );

  await connectDB();
  await connectionRedis();

  app.use("/users", router);
  app.use("/messages", messageRouter);

  app.use("{/*demo}", (req, res) => {
    res.status(404).json({
      message: `req with url:${req.originalUrl} with method:${req.method} not found`,
      status: 404,
    });
  });

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: err.message, stack: err.stack });
  });

  app.listen(port, () => console.log(`App is listening on port ${port}`));
};

export default bootstrap;
