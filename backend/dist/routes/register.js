"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EventRegistration_1 = __importDefault(require("../models/EventRegistration"));
const router = express_1.default.Router();
const eventParticipants = {
    "Coding Challenge": 1,
    "Hackathon": 5,
    "Poster Presentation": 1,
    "Technical Quiz": 4,
    "Code Hunt": 3,
};
router.get("/", (req, res) => {
    res.send("Hello World!");
});
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            if (!participant.name ||
                !participant.email ||
                !participant.registrationNo ||
                !participant.phoneNo ||
                !participant.section ||
                !participant.year) {
                return res.status(400).json({
                    error: "All participant fields are required.",
                });
            }
        }
        for (const participant of participants) {
            if (participant.phoneNo.length !== 10 ||
                participant.registrationNo.length !== 10 ||
                !participant.phoneNo.match(/^\d+$/)) {
                return res.status(400).json({
                    error: "Invalid phone number or registration number. length should be 10",
                });
            }
        }
        const registration = new EventRegistration_1.default({
            eventName,
            participants,
        });
        yield registration.save();
        return res.status(201).json({
            message: "Registration successful",
            registration,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
