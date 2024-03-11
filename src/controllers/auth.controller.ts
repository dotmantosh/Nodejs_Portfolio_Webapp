import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service";

class AuthController {
  static async getUsers(req: Request, res: Response, next: NextFunction){
    try {
      const result = await UserService.getAllUsers()
      res.json(result)
    } catch (error) {
      next(error)
    }
  }
}

export default AuthController