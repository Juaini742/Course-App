import dotenv from "dotenv";
dotenv.config();
// import express, { Request, Response } from "express";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/router";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    // origin: process.env.FRONTEND_URL,
    origin: true,
    credentials: true,
  })
);

// app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api", router);

// app.use("*", (_req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
// });

app.listen(process.env.SERVER_PORT || 8000, () => {
  console.log(`Server Running on PORT ${process.env.SERVER_PORT || 8000}`);
});
