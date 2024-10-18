import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URI || "mongodb://localhost:27017/";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
export const disconnectFromDatabase = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDatabase;
