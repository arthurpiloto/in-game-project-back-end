import jwt from "jsonwebtoken";
import { User } from '../models/global';
import { Request, Response, NextFunction } from "express";

export const createJWT = async (data: User) => {
    const token = jwt.sign(
        { id: data.id }, process.env.SECRET as string, { expiresIn: '5d' }
    );
    const id = data.id;

    return {  }
}

const validateJwt = async (data: string) => {
    let jwtStatus;
    jwt.verify(data, process.env.SECRET as string, (err, decode) => {
        if (err) {
            jwtStatus = false
        } else {
            jwtStatus = true
        }
    });
    return jwtStatus;
}

const verifyJwt = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['x-access-token'];
    const authenticatedToken = await validateJwt(token)

    if(authenticatedToken) {
        next()
    } else {
        return response.status(401).end()
    }
}
