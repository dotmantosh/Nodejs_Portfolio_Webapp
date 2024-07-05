import mongoose from "mongoose";

const connectDB = async () => {
  // console.log(process.env.MONGODB_URI);

  // const conn = await mongoose.connect(process.env.MONGODB_URI_DEV as string);
  const conn = await mongoose.connect(process.env.MONGODB_URI as string);

  console.log(`Mongodb Connected: ${conn.connection.host}`);
};

export default connectDB;