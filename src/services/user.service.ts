import { UserDocument, UserSchema } from "../models/user.schema";
import bcrypt from 'bcryptjs'
import { IChangePasswordBody } from "../interfaces/IPassword";

class UserService {

  static async findByCredentials(email: string, password: string) {
    const user = await UserSchema.findOne({ email })

    if (!user) {
      // console.log("email : ", user)
      throw new Error('unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      console.log("password ", isMatch)
      throw new Error('Unable to login')
    }

    return user
  }

  static async findOne(condition: object) {
    try {
      return await UserSchema.findOne(condition)
    } catch (error) {
      throw new Error(`Error finding user: ${error}`)
    }
  }

  static async findByUserName(username: string) {
    const user = await UserSchema.findOne({ username })
    if (!user) {
      throw new Error("user with the username not found")
    }
    return user
  }
  static async findByEmail(email: string) {
    const user = await UserSchema.findOne({ email })
    if (!user) {
      throw new Error("user with the email not found")
    }
    return user
  }

  static async updateUserProfilePicture(id: string, payload: UserDocument) {
    const user = await UserSchema.findById(id)
    if (!user) {
      throw new Error("user with the username not found")
    }
    user.imageId = payload.imageId
    user.imageUrl = payload.imageUrl
    user.save()
    return user
  }

  static async changePassword(userInfo: UserDocument, body: IChangePasswordBody) {
    const user = await UserSchema.findOne({ _id: userInfo._id })

    if (!user) {
      // console.log("email : ", user)
      throw new Error('user not found')
    }
    const isMatch = await bcrypt.compare(body.password, user.password)
    if (!isMatch) {
      console.log("password ", isMatch)
      throw new Error('Could not change Password!')
    }
    // const hashedPassword = await bcrypt.hash(body.password, 8)
    // const updatedUser = await UserSchema.findOneAndUpdate(
    //   { _id: userInfo._id },
    //   { $set: { password: hashedPassword } },
    //   { new: true }
    // );
    user.password = body.newPassword
    const updatedUser = await user.save()

    return updatedUser;
  }

  static async getAllUsers() {
    return await UserSchema.find()
  }

}

export default UserService