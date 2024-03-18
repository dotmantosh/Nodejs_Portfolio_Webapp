import { UserDocument } from "./src/models/user.schema"
import { Request } from "express"
declare global {
  namespace Express {
    interface Request {
      user: UserDocument,
      token: string
    }
  }
}