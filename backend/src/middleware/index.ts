import {NextFunction, Request, Response} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_token"];
  if (!token) {
    return next(new Error("Authorization is missing"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    console.log(error);

    if (error instanceof jwt.TokenExpiredError) {
      res.clearCookie("auth_token");
    }

    res.status(401).json({message: "Unauthorized"});
  }
};

export default verifyToken;
