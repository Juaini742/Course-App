import express from "express";
import verifyToken from "../middleware";
import {
  addMimberCourse,
  addNim,
  getAllCourse,
  getAllNims,
  getNim,
  getOneCourse,
  getUser,
  logout,
} from "../controllers/controller";
const router = express.Router();
const authRouter = require("./router.auth");

router.use("/public", authRouter);
router.get("/public/nims", getAllNims);

// secured
router.use([verifyToken]);
router.get("/secured/user", getUser);
router.post("/secured/logout", logout);
router.get("/secured/nim", getNim);
router.post("/secured/nim", addNim);
router.get("/secured/getAllCourse", getAllCourse);
router.get("/secured/getOneCourse/:id", getOneCourse);
router.post("/secured/addMemberCourse/:id", addMimberCourse);

export default router;
