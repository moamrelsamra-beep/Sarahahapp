import express from "express";
import connectDB from "./DB/connectionDB.js";
import userModel from "./DB/models/user.model.js";
import router from "./modules/user.controller.js";
import cors from "cors"
const app = express();
const port = 3000;

const bootstrap = async () => {
  app.use(express.json());
  app.use(cors({
    origin: "*"
  }))
  app.get("/", (req, res) =>
    res.status(200).json({ msg: "Welcome to Sarahah app.....!!!" }),
  );

  await connectDB();

  app.use("/users", router);

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
