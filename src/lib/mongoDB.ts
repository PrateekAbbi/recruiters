import mongoose from "mongoose";

let isConnected = false; // Track connection status

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("✅ MongoDB already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI || "", {
      dbName: "RecruitersDB", // ✅ Set database name
    });

    isConnected = true;
    console.log("🚀 MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};
