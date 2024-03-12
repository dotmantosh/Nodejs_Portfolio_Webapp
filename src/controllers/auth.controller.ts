import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service";

class AuthController {
  static async loginUser(req: Request, res: Response, next: NextFunction){
    try {
      // const result = await UserService.getAllUsers()
      let user;
      user = {}
      res.json(user)
    } catch (error) {
      next(error)
    }
  }

  static async signUpUser(req: Request, res: Response, next: NextFunction){
    try {
      // const result = await UserService.getAllUsers()
      let user;
      user = {}
      res.json(user)
    } catch (error) {
      next(error)
    }
  }

  static async changePassword(req: Request, res: Response, next: NextFunction){
    try {
      // const result = await UserService.getAllUsers()
      let user;
      user = {}
      res.json(user)
    } catch (error) {
      next(error)
    }
  }

  static async forgotPassword(req: Request, res: Response, next: NextFunction){
    try {
      // const result = await UserService.getAllUsers()
      let user;
      user = {}
      res.json(user)
    } catch (error) {
      next(error)
    }
  }

  static async resetPassord(req: Request, res: Response, next: NextFunction){
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