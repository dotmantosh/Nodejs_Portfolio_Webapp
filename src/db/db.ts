import mongoose, { ConnectOptions } from "mongoose";

const connectDB = async () => {
  console.log(process.env.MONGODB_URI);
  

  const conn = await mongoose.connect(process.env.MONGODB_URI || '');

  console.log(`Mongodb Connected: ${conn.connection.host}`);
};

export default connectDB;