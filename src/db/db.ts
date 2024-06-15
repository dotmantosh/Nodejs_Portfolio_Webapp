import mongoose from "mongoose";

const connectDB = async () => {
  // console.log(process.env.MONGODB_URI_DEV);


  const conn = await mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI_PROD as string : process.env.MONGODB_URI_DEV as string);

  console.log(`Mongodb Connected: ${conn.connection.host}`);
};

export default connectDB;