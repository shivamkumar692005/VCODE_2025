import mongoose from "mongoose";
import express from "express";
import registerRoute from "./routes/register";
import EventRegistration from "./models/EventRegistration";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONNGO_URL || "";

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

app.get("/", (req, res) => {
  res.send("Hello World!");
})


app.get("/adminshivam", async (req, res) => {
    try {
      const registrations = await EventRegistration.find(); 
      res.status(200).json(registrations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch participants" });
    }
  });

app.use('/api/register', registerRoute);

app.use('/*', (req, res) => {
  res.status(404).send('404 Not Found1');
  });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
