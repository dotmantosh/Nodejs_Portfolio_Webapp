import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserSchema } from '../models/user.schema';
interface ExtendedRequest extends Request {
  token?: string;
  user?: any; // Update the type based on your UserSchema
}

type Secret = string | Buffer | { key: string; passphrase: string; };


const auth = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        // Extract token from Authorization header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        // Verify the token using the JWT_SECRET
        const decoded = jwt.verify(token as string, process.env.JWT_SECRET);

        // Find user based on decoded token
        const user = await UserSchema.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error('User not found');
        }

        // Attach token and user to request object for future use
        req.token = token;
        req.user = user;

        next(); // Proceed to the next middleware
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' });
    }
};

export default auth;