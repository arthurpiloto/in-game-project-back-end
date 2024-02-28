import JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const createJWT = async (data: any) => {
    const token = JWT.sign(
        { id: data.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: '5d' }
    );
    const id = data.id;

    return { status: 200, token: token, user_id: id }
}

export const validateJwt = async (data: string) => {
    let jwtStatus;
    JWT.verify(data, process.env.SECRET as string, (err, decode) => {
        if (err) {
            jwtStatus = false;
        } else {
            jwtStatus = true;
        }
    });
    return jwtStatus;
}

export const verifyJwt = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers['x-access-token'];
    const authenticatedToken = await validateJwt(token as string);

    if (authenticatedToken) {
        next();
    } else {
        return res.status(401).end();
    }
}
