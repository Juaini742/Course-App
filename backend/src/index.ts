import dotenv from "dotenv";
dotenv.config();
import express from "express";
// import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/router";
// import path from "path";

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// app.use("*", (_req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
// });

app.use("/api", router);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server Running on PORT ${process.env.SERVER_PORT}`);
});
