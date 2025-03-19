import React, { useEffect, useState } from "react";
interface Participant {
    name: string;
    email: string;
    registrationNo: string;
    phoneNo: string;
    section: string;
    year: string;
  }
const ParticipantsList = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch("http://localhost:3000/"); // Backend API URL
        if (!response.ok) throw new Error("Failed to fetch participants");

        const data = await response.json();
        setParticipants(data);
        setLoading(false);
      } catch (err:any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  if (loading) return <p>Loading participants...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-3">Registered Participants</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Event Name</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Registration No</th>
            <th className="border p-2">Phone No</th>
            <th className="border p-2">Section</th>
            <th className="border p-2">Year</th>
          </tr>
        </thead>
        <tbody>
          {participants.length > 0 ? (
            participants.map((event, index) =>
              event.participants.map((participant, pIndex) => (
                <tr key={`${index}-${pIndex}`} className="text-center">
                  <td className="border p-2">{event.eventName}</td>
                  <td className="border p-2">{participant.name}</td>
                  <td className="border p-2">{participant.email}</td>
                  <td className="border p-2">{participant.registrationNo}</td>
                  <td className="border p-2">{participant.phoneNo}</td>
                  <td className="border p-2">{participant.section}</td>
                  <td className="border p-2">{participant.year}</td>
                </tr>
              ))
            )
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-3">
                No participants registered yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipantsList;
