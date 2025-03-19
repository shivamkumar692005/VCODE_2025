import React, { useState } from "react";

interface Participant {
  name: string;
  email: string;
  registrationNo: string;
  phoneNo: string;
  section: string;
  year: string;
}

const RegistrationForm: React.FC = () => {
  const [eventName, setEventName] = useState<string>("");
  const [participants, setParticipants] = useState<Participant[]>([
    { name: "", email: "", registrationNo: "", phoneNo: "", section: "", year: "" },
  ]);
  const [contactEmail, setContactEmail] = useState<string>("");

  // Allowed participant count per event
  const eventParticipants: Record<string, number> = {
    "Coding Challenge": 1,
    Hackathon: 3,
    "Poster Presentation": 3,
    "Technical Quiz": 2,
    "Web Hackathon": 3,
    "Code Hunt": 1,
  };

  // Handle input change for participants
  const handleParticipantChange = (index: number, field: keyof Participant, value: string) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index][field] = value;
    setParticipants(updatedParticipants);
  };

  // Add a new participant
  const addParticipant = () => {
    if (eventName && participants.length < eventParticipants[eventName]) {
      setParticipants([
        ...participants,
        { name: "", email: "", registrationNo: "", phoneNo: "", section: "", year: "" },
      ]);
    } else {
      alert(`Max ${eventParticipants[eventName] || "0"} participants allowed for ${eventName}`);
    }
  };

  // Remove a participant
  const removeParticipant = (index: number) => {
    const updatedParticipants = participants.filter((_, i) => i !== index);
    setParticipants(updatedParticipants);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!eventName) {
      alert("Please select an event.");
      return;
    }
    if (participants.length !== eventParticipants[eventName]) {
      alert(`This event requires ${eventParticipants[eventName]} participants.`);
      return;
    }

    const formData = { eventName, participants, contactEmail };

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration Successful!");
        console.log(data);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Failed to register", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-xl font-bold mb-4">Event Registration</h2>
      <form onSubmit={handleSubmit}>
        {/* Event Name Dropdown */}
        <div className="mb-4">
          <label className="block font-medium">Event Name:</label>
          <select
            className="w-full border rounded p-2"
            value={eventName}
            onChange={(e) => {
              setEventName(e.target.value);
              setParticipants([{ name: "", email: "", registrationNo: "", phoneNo: "", section: "", year: "" }]);
            }}
          >
            <option value="">Select an Event</option>
            {Object.keys(eventParticipants).map((event) => (
              <option key={event} value={event}>
                {event} (Max {eventParticipants[event]} Participants)
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic Participant Fields */}
        {participants.map((participant, index) => (
          <div key={index} className="mb-4 p-4 border rounded bg-gray-100">
            <h3 className="font-semibold">Participant {index + 1}</h3>
            <input
              className="w-full border p-2 mb-2"
              type="text"
              placeholder="Name"
              value={participant.name}
              onChange={(e) => handleParticipantChange(index, "name", e.target.value)}
              required
            />
            <input
              className="w-full border p-2 mb-2"
              type="email"
              placeholder="Email"
              value={participant.email}
              onChange={(e) => handleParticipantChange(index, "email", e.target.value)}
              required
            />
            <input
              className="w-full border p-2 mb-2"
              type="text"
              placeholder="Registration No"
              value={participant.registrationNo}
              onChange={(e) => handleParticipantChange(index, "registrationNo", e.target.value)}
              required
            />
            <input
              className="w-full border p-2 mb-2"
              type="text"
              placeholder="Phone No"
              value={participant.phoneNo}
              onChange={(e) => handleParticipantChange(index, "phoneNo", e.target.value)}
              required
            />
            <input
              className="w-full border p-2 mb-2"
              type="text"
              placeholder="Section"
              value={participant.section}
              onChange={(e) => handleParticipantChange(index, "section", e.target.value)}
              required
            />
            <input
              className="w-full border p-2 mb-2"
              type="number"
              placeholder="Year"
              value={participant.year}
              onChange={(e) => handleParticipantChange(index, "year", e.target.value)}
              required
            />

            {participants.length > 1 && (
              <button
                type="button"
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => removeParticipant(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}

        {/* Add More Participants Button */}
        {eventName && participants.length < eventParticipants[eventName] && (
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            onClick={addParticipant}
          >
            Add More Participants
          </button>
        )}

        {/* Contact Email */}
        <div className="mb-4">
          <label className="block font-medium">Contact Email:</label>
          <input
            className="w-full border p-2"
            type="email"
            placeholder="Team Leader Email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Submit Registration
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
