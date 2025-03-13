import mongoose from "mongoose";

const mongoURI = "mongodb://127.0.0.1:27017/auroraBabyDB"; // Use your desired DB name

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit process on failure
  }
};

export default connectDB; 
