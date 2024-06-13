import { Request, Response } from "express";
const {
  User,
  User_details,
  Nim,
  Course,
  Course_mimber,
} = require("../db/models");
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export type CourseType = {
  id: string;
  title: string;
  name: string;
  rate: number;
  mimber: number;
  description: string;
};

export default (_req: Request, res: Response) => {
  res.send("<h1>Hello World!</h1>");
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const newPassword = await bcryptjs.hash(password, 8);

    const user = await User.create({
      id: crypto.randomUUID(),
      username,
      email,
      password: newPassword,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Something error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      res.status(400).json({ message: "Email not found" });
      return;
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 86400000,
    });

    await User_details.create({
      id: crypto.randomUUID(),
      user_id: user.id,
      token,
    });

    res.status(200).json({ userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something error" });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;

    const data = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!data) {
      throw { name: "Id User Tidak Ditemukan" };
    }

    const user = {
      id: data.id,
      username: data.username,
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "none",
  });

  const userId = req.userId;

  const user = await User_details.findOne({ user_id: userId });

  await user.destroy();

  res.send("OKE");
};

export const getNim = async (_req: Request, res: Response): Promise<void> => {
  try {
    const nimData = await Nim.findAll();

    res.status(200).json(nimData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something error" });
  }
};

export const getAllNims = async (_req: Request, res: Response) => {
  try {
    const nimData = await Nim.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      attributes: { exclude: ["userId"] },
    });

    res.status(200).json(nimData);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

export const addNim = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nim } = req.body;

    const existingNim = await Nim.findOne({ where: { nim: nim } });

    if (existingNim) {
      if (existingNim.userId === null) {
        existingNim.userId = req.userId;
        await existingNim.save();
        res.status(201).json({ message: "NIM added successfully" });
      } else {
        res.status(400).json({ message: "User already take this nim" });
      }
    } else {
      res.status(400).json({ message: "Your nim is wrong" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something error" });
  }
};

export const getAllCourse = async (_req: Request, res: Response) => {
  try {
    const data = await Course.findAll();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something error" });
  }
};
export const addMimberCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const courseId = req.params.id;
    const userId = req.userId;
    const existingMimber = await Course_mimber.findOne({
      where: {
        userid: userId,
        courseId: courseId,
      },
    });

    if (existingMimber) {
      res.status(400).json({ error: "User already follows this course" });
      return;
    }

    const mimber = await Course_mimber.create({
      id: crypto.randomUUID(),
      userid: userId,
      courseId: courseId,
    });

    await Course.increment(
      { mimber: 1 },
      { where: { id: courseId }, defaults: { mimber: 0 } }
    );

    res.status(200).json(mimber);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something error" });
  }
};

type MimbersType = {
  map(
    arg0: (item: MimbersType) => Promise<{ id: any; username: any } | null>
  ): any;
  userid: string;
};
export const getOneCourse = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data: CourseType = await Course.findByPk(id);

    const mimbers: MimbersType = await Course_mimber.findAll({
      where: {
        courseId: id,
      },
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
    });

    const mimberData = await Promise.all(
      mimbers.map(async (item: MimbersType) => {
        const userData = await User.findOne({
          where: { id: item.userid },
          attributes: ["id", "username"],
        });
        return userData
          ? { id: userData.id, username: userData.username }
          : null;
      })
    );

    const finalData = {
      id: data.id,
      title: data.title,
      name: data.name,
      rate: data.rate,
      mimbers: mimberData,
      description: data.description,
    };

    res.status(200).json(finalData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something error" });
  }
};
