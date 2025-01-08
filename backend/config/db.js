import mongoose from "mongoose";

let connectedState = false;

export const connectDatabase = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.log("🔴 MongoDB URI is not initialised");
      process.exit(1);
    }

    if (connectedState) {
      console.log("🟢 MongoDB is already connected");
    }

    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`🟢 MongoDB Connected: ${connect.connection.host}`);
    connectedState = true;
  } catch (error) {
    console.log(`🔴 Error: ${error.message}`);
    process.exit(1);
  }

  mongoose.connection.on("disconnected", () => {
    console.log("🔴 MongoDB has been disconnected");
    connectedState = false;
  });

  process.on("SIGINT", async () => {
    if (connectedState) {
      await mongoose.connection.close();
      console.log("🟡 MongoDB Connection has closed due to app termination");
      process.exit(0);
    }
  });
};
