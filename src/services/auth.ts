import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export class AuthServices {
  static async HashPassword(password: string) {
    const salt = await bcrypt.genSalt(12);
    const passwordHashed = await bcrypt.hash(password, salt);
    return passwordHashed;
  }

  static async ComparePassword(newPass: string, originalPass: string) {
    const passwordMatch = await bcrypt.compare(newPass, originalPass);
    return passwordMatch;
  }

  static GenerateToken(user: any) {
    const secret = process.env.SECRET || "secret";
    const token = jwt.sign({ user }, secret);
    return token;
  }

  static verifyToken(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers["authorization"];
    const token = authToken && authToken.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }
    try {
      jwt.verify(token, process.env.SECRET || "secret");
      next();
    } catch (err) {
      return res.status(403).json({ msg: "Invalid token" });
    }
  }
}
