import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service";
import { UserDocument, UserSchema } from "../models/user.schema";

export interface RequestWithUser extends Request {
  user: UserDocument; // Assuming token is a string
}
interface RequestWithToken extends Request, RequestWithUser {
  token: string; // Assuming token is a string
}

class AuthController {

  static async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.findByCredentials(req.body.email, req.body.password)
      if (user.role !== 'user') {
        throw new Error()
      }
      const token = await user.generateAuthToken()
      res.send({ user, token })
    } catch (e) {
      next(e)
    }
  }

  static async signUpUser(req: Request, res: Response, next: NextFunction) {
    req.body.type = 'user'
    const user = new UserSchema(req.body)
    try {
      await user.save()
      const token = await user.generateAuthToken()
      res.status(201).send({ user, token })
    } catch (e) {
      next(e)
    }
  }


  static async logoutUser(req: RequestWithToken, res: Response, next: NextFunction) {
    try {

      req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
      await req.user.save()
      res.send()
    } catch (e) {
      next(e)
    }
  }
  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      // const result = await UserService.getAllUsers()
      let user;
      user = {}
      res.json(user)
    } catch (error) {
      next(error)
    }
  }

  static async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      // const result = await UserService.getAllUsers()
      let user;
      user = {}
      res.json(user)
    } catch (error) {
      next(error)
    }
  }

  static async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      // const result = await UserService.getAllUsers()
      let user;
      user = {}
      res.json(user)
    } catch (error) {
      next(error)
    }
  }

  static async resetPassord(req: Request, res: Response, next: NextFunction) {
    try {
      // const result = await UserService.getAllUsers()
      let user;
      user = {}
      res.json(user)
    } catch (error) {
      next(error)
    }
  }

}

export default AuthController