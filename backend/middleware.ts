
import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import "dotenv/config";

export interface AuthRequest extends Request {
    userId?: string;
}


const JWT_SECRET = process.env.JWT_SECRET!;
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const header = req.headers["authorization"];


    if (!header) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {

        const response = jwt.verify(header, JWT_SECRET) as JwtPayload;


        (req as any).userId = response._id;

        next();
    } catch (e) {
        res.status(403).json({
            message: "You are not logged in"
        });
    }
}