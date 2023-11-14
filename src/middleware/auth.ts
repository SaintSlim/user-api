import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Normally secret key shoudld be store in dotenv file
const secretKey = 'secret-key';

export function authenticateToken(req: Request | any, res: Response,  next: NextFunction) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, secretKey, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden'})
        }

        req.user = user;
        next();
    })
}