import { ProfileSchema } from './../models/profile.schema';

class ProfileService {

  static async findById (id: string){
    return await ProfileSchema.findById(id)
  }
}

export default ProfileService