/* eslint-disable @typescript-eslint/no-unused-vars */
import  { useState } from "react";
import axios from "axios";
import { Loader2, UserPlus, UserMinus, Github, Globe, Upload, X } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const HackathonForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamNo, setTeamNo] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [gitHubLink, setGitHubLink] = useState("");
  const [deploedLink, setDeploedLink] = useState("");
  const [status, setStatus] = useState("");
  const [uiux, setUiux] = useState(0);
  const [backend, setBackend] = useState(0);
  const [frontend, setFrontend] = useState(0);
  const [deployed, setDeployed] = useState(0);

  const navigate = useNavigate();


  const problemStatements = [
    "Smart Digital Election & Feedback Platform for Campus Organizations",
    "Student coding Profile Tracker",
    "ClubHub",
    "Lost & Found Portal",
    "AgriCommerce",
    "Study Resource Hub",
    "Digital Complaint & Feedback Portal",
    "Vignan Mid Exam Evaluation",
    'CampusVoice',
    "Waste Management& Recycling Portal"
  ];

  const [participants, setParticipants] = useState([
    { name: "", registrationNo: "", phoneNo: "", section: "", year: "", img: null, imgPreview: "" },
  ]);
//   @typescript-eslint/no-explicit-any
  const handleParticipantChange = (index: number, field: string, value: any) => {
    const updated = [...participants];
    if (field === "img" && value) {
      updated[index].imgPreview = URL.createObjectURL(value);
    }
    updated[index][field] = value;
    setParticipants(updated);
  };

  const removeImage = (index: number) => {
    const updated = [...participants];
    if (updated[index].imgPreview) {
      URL.revokeObjectURL(updated[index].imgPreview);
    }
    updated[index].img = null;
    updated[index].imgPreview = "";
    setParticipants(updated);
  };

  const addParticipant = () => {
    if (participants.length < 6) {
      setParticipants([...participants, { name: "", registrationNo: "", phoneNo: "", section: "", year: "", img: null, imgPreview: "" }]);
    }
  };

  const removeParticipant = (index: number) => {
    if (participants.length > 4) {
      if (participants[index].imgPreview) {
        URL.revokeObjectURL(participants[index].imgPreview);
      }
      setParticipants(participants.filter((_, i) => i !== index));
    }
  };
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("teamName", teamName);
    formData.append("teamNo", teamNo);
    formData.append("problemStatement", problemStatement);
    formData.append("gitHubLink", gitHubLink);
    formData.append("deploedLink", deploedLink);
    formData.append("status", status);
    formData.append("uiux", String(uiux));
    formData.append("backend", String(backend));
    formData.append("frontend", String(frontend));
    formData.append("deployed", String(deployed));
    participants.forEach((p, i) => {
      if (p.img) formData.append("images", p.img);
    });

    formData.append("participants", JSON.stringify(participants.map(({ img, imgPreview, ...rest }) => rest)));

    try {
      const res = await axios.post("https://vcode-m6ni.onrender.com/api/hackathon", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      setTeamName("");
      setTeamNo("");
      setProblemStatement("");
      setGitHubLink("");
      setDeploedLink("");
      setStatus("");
      setUiux(0);
      setBackend(0);
      setFrontend(0);
      setDeployed(0);
      setParticipants([{ name: "", registrationNo: "", phoneNo: "", section: "", year: "", img: null, imgPreview: "" }]);
      toast.success("Team submitted successfully! 🎉");
      navigate("/team");

    } catch (error) {
      console.error(error);
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Hackathon Team Submission
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Team Name *"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full bg-gray-800/50 p-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Team No *"
                required
                value={teamNo}
                onChange={(e) => setTeamNo(e.target.value)}
                className="w-full bg-gray-800/50 p-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
            </div>
          </div>

          <div>
          <label>Problem Statement *</label>
          <select
            value={problemStatement}
            onChange={(e) => setProblemStatement(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          >
            <option value="">Select Problem Statement</option>
            {problemStatements.map((ps) => (
              <option key={ps} value={ps}>
                {ps}
              </option>
            ))}
          </select>
        </div>

          <div className="bg-gray-800/30 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <UserPlus size={20} />
              Participants (Min 4, Max 6)
            </h2>
            {participants.map((participant, index) => (
              <div key={index} className="mb-4 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={participant.name}
                    onChange={(e) => handleParticipantChange(index, "name", e.target.value)}
                    className="bg-gray-700/50 p-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Registration No"
                    required
                    value={participant.registrationNo}
                    onChange={(e) => handleParticipantChange(index, "registrationNo", e.target.value)}
                    className="bg-gray-700/50 p-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Phone No"
                    required
                    value={participant.phoneNo}
                    onChange={(e) => handleParticipantChange(index, "phoneNo", e.target.value)}
                    className="bg-gray-700/50 p-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Section"
                    required
                    value={participant.section}
                    onChange={(e) => handleParticipantChange(index, "section", e.target.value)}
                    className="bg-gray-700/50 p-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Year"
                    required
                    value={participant.year}
                    onChange={(e) => handleParticipantChange(index, "year", e.target.value)}
                    className="bg-gray-700/50 p-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  />
                  <div className="relative">
                    {participant.imgPreview ? (
                      <div className="relative group">
                        <img
                          src={participant.imgPreview}
                          alt={`Preview for ${participant.name || 'participant'}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleParticipantChange(index, "img", e.target.files?.[0])}
                          className="hidden"
                          id={`file-${index}`}
                        />
                        <label
                          htmlFor={`file-${index}`}
                          className="flex items-center gap-2 cursor-pointer bg-gray-700/50 p-2 rounded-lg border border-gray-600 hover:bg-gray-600/50 transition-all"
                        >
                          <Upload size={16} />
                          Upload Photo
                        </label>
                      </>
                    )}
                  </div>
                </div>
                {participants.length > 4 && (
                  <button
                    type="button"
                    onClick={() => removeParticipant(index)}
                    className="flex items-center gap-2 text-red-400 hover:text-red-300 mt-2 transition-colors"
                  >
                    <UserMinus size={16} />
                    Remove
                  </button>
                )}
              </div>
            ))}
            {participants.length < 6 && (
              <button
                type="button"
                onClick={addParticipant}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                <UserPlus size={16} />
                Add Member
              </button>
            )}
          </div>

          <div className="bg-gray-800/30 p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Optional Fields</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <Github size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="GitHub Link"
                  value={gitHubLink}
                  onChange={(e) => setGitHubLink(e.target.value)}
                  className="w-full pl-10 bg-gray-800/50 p-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <Globe size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Deployed Link"
                  value={deploedLink}
                  onChange={(e) => setDeploedLink(e.target.value)}
                  className="w-full pl-10 bg-gray-800/50 p-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                />
              </div>
              <input
                type="number"
                placeholder="UI/UX Score"
                value={uiux}
                onChange={(e) => setUiux(Number(e.target.value))}
                className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
              <input
                type="number"
                placeholder="Backend Score"
                value={backend}
                onChange={(e) => setBackend(Number(e.target.value))}
                className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
              <input
                type="number"
                placeholder="Frontend Score"
                value={frontend}
                onChange={(e) => setFrontend(Number(e.target.value))}
                className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
              <input
                type="number"
                placeholder="Deployment Score"
                value={deployed}
                onChange={(e) => setDeployed(Number(e.target.value))}
                className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Submitting...
              </>
            ) : (
              "Submit Team"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HackathonForm;
