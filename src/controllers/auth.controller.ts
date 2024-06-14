import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service";
import { UserDocument, UserSchema } from "../models/user.schema";
import crypto from 'crypto'
import nodemailer from "nodemailer"
// import { ExtendedRequest } from "../middlewares/auth.middleware";
export interface RequestWithUser extends Request {
  user: UserDocument; // Assuming token is a string
}
interface Token {
  token: string
}
// interface RequestWithToken extends RequestWithUser {
//   token: string; // Assuming token is a string
// }

// interface AuthenticatedRequest extends Request {
//   user: { // Define the type of res.locals.user here
//     tokens: { token: string }[],
//     save: () => Promise<void> // Assuming save() returns a Promise<void>
//   }
// }

class AuthController {

  static async loginUser(req: Request, res: Response, next: NextFunction) {
    try {

      const user = await UserService.findByCredentials(req.body.email, req.body.password)
      console.log(req.body)
      // if (user.role !== 'user') {
      //   throw new Error()
      // }
      const token = await user.generateAuthToken()
      res.send({ user, token })
    } catch (e) {
      console.log(e)
      next(e)
    }
  }

  static async signUpUser(req: Request, res: Response, next: NextFunction) {
    const { username, email, password } = req.body;
    console.log(req.body)
    try {

      const existingEmail = await UserSchema.findOne({ email });
      console.log('existingEmail :', existingEmail)
      if (existingEmail) {
        // console.log('existingEmailInIf :', existingEmail)
        // console.log("email already in use")
        res.status(400).json({ message: 'Email is already in use' });
        return;
      }

      // Check if username already exists
      const existingUsername = await UserSchema.findOne({ username });
      if (existingUsername) {
        res.status(400).json({ message: 'Username is already in use' });
        return;
      }

      const newUser = {
        username,
        email,
        password,
        role: "user"
      }

      const user = new UserSchema(newUser)
      await user.save()
      // const token = await user.generateAuthToken()
      res.status(201).send({ user })
    } catch (e) {
      console.log(e)
      next(e)
    }
  }


  static async logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
      res.locals.user.tokens = res.locals.user.tokens.filter((token: Token) => token.token !== res.locals.token)
      await res.locals.user.save()
      res.send()
    } catch (e) {
      next(e)
    }
  }
  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      // const result = await UserService.getAllUsers()
      // let user;
      // user = {}
      // res.json(user)
    } catch (error) {
      next(error)
    }
  }

  static async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const user = res.locals.user
      const body = {
        password: req.body.password,
        newPassword: req.body.newPassword
      }
      await UserService.changePassword(user, body)

      res.status(200).send({ message: "password changed successfully" })
    } catch (error) {
      next(error)
    }
  }

  static async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      // Find user by email
      const user = await UserSchema.findOne({ email });
      // console.log(user)
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Generate a reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

      // Set token and expiration on user
      user.resetPasswordToken = resetTokenHash;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      await user.save();

      // Send email
      const resetUrl = `${process.env.APP_URL}/reset-password/${resetToken}`;
      const message = `
        <h1 
          style="background: linear-gradient(to right, #13b0f5, #e70faa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 30px;
          text-align: center;"
        >
          MPW Password Reset
        </h1>
        <p
          style="text-align: center; margin-bottom: 30px; font-size: 16px;"
        >
          You requested a password reset. Please click the button below or copy and paste the link to your browser:
        </p>
        <a 
        style="text-align: center; display:block; width: max-content; margin: 0 auto; margin-bottom: 30px; padding: 10px 20px; border-radius: 5px; background: #13b0f5; color: #fff; text-decoration: none;" 
        href="${resetUrl}">
          CLICK TO RESET PASSWORD
        </a>
        <a 
          style="text-align: center; display:block;" 
          href="${resetUrl}">${resetUrl}
        </a>
      `;

      const transporter = nodemailer.createTransport({
        service: 'gmail', // or any other email service
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: user.email,
        subject: 'MPW Password Reset Request',
        html: message,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: 'Email sent' });
    } catch (error) {
      console.log(error)
      next(error);
    }
  }

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.params;
      const { password } = req.body;

      // Hash the token
      const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');

      // Find user by token and check if token is not expired
      const user = await UserService.findOne({
        resetPasswordToken: resetTokenHash,
        resetPasswordExpires: { $gt: Date.now() }
      });

      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }

      // Hash the new password
      // const salt = await bcrypt.genSalt(10);
      // const hashedPassword = await bcrypt.hash(password, salt);

      // Update user's password
      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      next(error);
    }
  }

  static async validateResetToken(req: Request, res: Response, next: NextFunction) {

    const { token } = req.params;

    try {
      const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');
      console.log('Hashed Token:', resetTokenHash);

      // Find the user by the reset token
      const user = await UserSchema.findOne({ resetPasswordToken: resetTokenHash });

      // console.log('User Found:', user);

      if (!user) {
        // console.log("user not found")
        return res.status(400).json({ message: 'Invalid token' });
      }

      // Check if the token has expired
      if (user.resetPasswordExpires && user.resetPasswordExpires < Date.now()) {
        // console.log("Token Expired")
        return res.status(400).json({ message: 'Token has expired' });
      }

      // If valid, return success response
      res.status(200).json({ message: 'Valid token' });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController