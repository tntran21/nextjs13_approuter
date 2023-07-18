import mongoose from "mongoose";

let isConnected = false; // Track connection status

const connectToDatabase = async () => {
  mongoose.set("strictQuery", false);

  if (isConnected) {
    console.log("MongoDB: Already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("MongoDB: Connected");
  } catch (error) {
    console.log("MongoDB: Connection failed", error);
  }
};
