import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserSchema } from '../models/user.schema';

import { UserDocument } from '../models/user.schema';
// export interface ExtendedRequest extends Request {
//     token?: string;
//     user: UserDocument;
// }

type Secret = string | Buffer | { key: string; passphrase: string; };


const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract token from Authorization header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        // Verify the token using the JWT_SECRET
        const decoded = jwt.verify(token as string, process.env.JWT_SECRET as Secret) as JwtPayload;

        // Find user based on decoded token
        const user = await UserSchema.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error('User not found');
        }

        // Attach token and user to request object for future use
        req.token = token as string;
        req.user = user as UserDocument;

        next(); // Proceed to the next middleware
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' });
    }
};

export default isAuthenticated;