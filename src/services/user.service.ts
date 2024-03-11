import { UserSchema } from "../models/user.schema";
import bcrypt from 'bcryptjs'

class UserService {

  static async findByCredentials(email:string, password:string){
    const user = await UserSchema.findOne({email})
  
    if(!user){
      throw new Error('unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      throw new Error('Unable to login')
    }

    return user
  }


  static async findByUserName(username: string) {
    const user = await UserSchema.findOne({username})
    if(!user){
      throw new Error("user with the username not found")
    }
    return user
  }

  static async getAllUsers(){
    return await UserSchema.find()
  }

}

export default UserService