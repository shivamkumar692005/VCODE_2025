import mongoose, { Schema, Document } from "mongoose";

interface ITeamMember {
    name: string;
    email: string;
    registrationNo: string;
    phoneNo: string;
    section: string;
    year: number;
    img: string;
    
}

interface IHackathon extends Document {
    teamName: string;
    teamNo: string;
    problemStatement: string;
    participants: ITeamMember[];
    gitHubLink: string;
    deploedLink: string;
    status: string;
}


const HackathonTeamSchema = new Schema({
    teamName: { type: String, unique: true},
    teamNo : { type: String, required: true },
    problemStatement: { type: String },
    participants: [
        {
            name: { type: String, required: true },
            registrationNo: { type: String, required: true },
            phoneNo: { type: String, required: true },
            section: { type: String, required: true },
            year: { type: Number, required: true },
            img: { type: String },
        },
    ],
    gitHubLink: { type: String},
    deploedLink: { type: String },
    uiux: { type: Number, default: 0 },
    backend: { type: Number, default: 0 },
    frontend: { type: Number, default: 0 },
    deployed: { type: Number, default: 0 },
});



const Hackathon = mongoose.model<IHackathon>("Hackathon", HackathonTeamSchema);

export default Hackathon;   


