import mongoose from "mongoose";
import express from "express";
import registerRoute from "./routes/register";
import EventRegistration from "./models/EventRegistration";
import cors from "cors";
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb://127.0.0.1:27017/vocde";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

connectDB();


app.get("/", async (req, res) => {
    try {
      const registrations = await EventRegistration.find(); 
      res.status(200).json(registrations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch participants" });
    }
  });

app.use('/api/register', registerRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
