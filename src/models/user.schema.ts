import { Schema, model, Document, Types } from 'mongoose';
import validator from 'validator';
import mongoosePaginate from "mongoose-paginate-v2";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Interface for User document
export interface UserDocument extends Document {
  email: string;
  password: string;
  username: string;
  role: 'admin' | 'user';
  emailVerified: boolean;
  skills: Types.ObjectId[];
  workExperiences: Types.ObjectId[];
  projects: Types.ObjectId[];
  profile: Types.ObjectId;
  tokens: { token: string }[];
  generateAuthToken(): Promise<string>;
}


// User Schema
const userSchema = new Schema<UserDocument>({
  username: {
    type: String,
    require: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value: string) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(value: string) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password must not include "password"')
      }
    }
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, { timestamps: true });

userSchema.plugin(mongoosePaginate)

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens
  return userObject
}

// hash password before save
userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

userSchema.methods.generateAuthToken = async function () {
  const user = this

  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET as string)

  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

userSchema.virtual('profiles', {
  ref: "Profile",
  localField: '_id',
  foreignField: 'userId'
})
userSchema.virtual('skills', {
  ref: "Skill",
  localField: '_id',
  foreignField: 'userId'
})
userSchema.virtual('educations', {
  ref: "Education",
  localField: '_id',
  foreignField: 'userId'
})
userSchema.virtual('projects', {
  ref: "Project",
  localField: '_id',
  foreignField: 'userId'
})
userSchema.virtual('socialMedias', {
  ref: "SocialMedia",
  localField: '_id',
  foreignField: 'userId'
})
userSchema.virtual('workExperiences', {
  ref: "WorkExperience",
  localField: '_id',
  foreignField: 'userId'
})

export const UserSchema = model<UserDocument>('User', userSchema);
