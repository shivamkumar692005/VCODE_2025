import express, { Router, Request, Response } from "express";
import EventRegistration from "../models/EventRegistration";

const router: Router = express.Router();

const eventParticipants: { [key: string]: number } = {
  "Coding Challenge": 1,
  "Hackathon": 5,
  "Poster Presentation": 1,
  "Technical Quiz": 1,
  "Code Hunt": 3,
};

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

router.post("/", async (req: any, res: any) => {
  try {
    const { eventName, participants } = req.body;

    if (!eventParticipants[eventName]) {
      return res.status(400).json({ error: "Invalid event name" });
    }

    if (eventName !== "Hackathon") {
      if (participants.length !== eventParticipants[eventName]) {
        return res.status(400).json({
          error: `This event requires ${eventParticipants[eventName]} participants.`,
        });
      }
    }


    for (const participant of participants) {
      if (
        !participant.name ||
        !participant.email ||
        !participant.registrationNo ||
        !participant.phoneNo ||
        !participant.section ||
        !participant.year
      ) {
        return res.status(400).json({
          error: "All participant fields are required.",
        });
      }
    }

    for (const participant of participants) {
      if (
        participant.phoneNo.length !== 10 ||
        participant.registrationNo.length !== 10 ||
        !participant.phoneNo.match(/^\d+$/) 
      ) {
        return res.status(400).json({
          error: "Invalid phone number or registration number. length should be 10",
        });
      }
    }

    const registration = new EventRegistration({
      eventName,
      participants,

    });

    await registration.save();
    return res.status(201).json({
      message: "Registration successful",
      registration,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
