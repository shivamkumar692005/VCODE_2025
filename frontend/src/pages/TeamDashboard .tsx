import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Team {
  _id: string;
  teamNo: number;
  teamName: string;
  problemStatement: string;
  gitHubLink: string;
  deploedLink: string;
  participants: {
    name: string;
    registrationNo: string;
    year: number;
    section: string;
    img?: string;
  }[];
  status:string;
}

const TeamListPage = ({ setUser }: { setUser: (team:Team) => void }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const limit = 10;
  const totalPages = 6;
  const navigate = useNavigate();

  const fetchTeams = async () => {
    try {
      const response = await axios.get(
        `https://vcode-m6ni.onrender.com/api/hackathon/?page=${page}&limit=${limit}`
      );
      setTeams(response.data || []);
    } catch (error) {
      console.error("Failed to fetch teams:", error);
    }
  };

  const fetchTeamByRegno = async (regno: string) => {
    try {
      const response = await axios.get(`https://vcode-m6ni.onrender.com/api/hackathon/reg/${regno}`);
      setTeams(response.data ? [response.data] : []);
    } catch (error) {
      console.error("Team not found:", error);
      setTeams([]);
    }
  };

  useEffect(() => {
    if (!searchValue) {
      fetchTeams();
    }
  }, [page, searchValue]);

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      fetchTeamByRegno(searchValue.trim());
    } else {
      fetchTeams();
    }
  };

  return (
    <div className="p-6">
      {/* Search Field */}
      <form onSubmit={handleSearch} className="flex items-center gap-4 mb-6 ">
        <input
          type="text"
          placeholder="Enter Registration No"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="px-4 py-2 rounded w-full max-w-sm bg-gray-700 text-white placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Search
        </button>
        {searchValue && (
          <button
            onClick={() => {
              setSearchValue("");
              fetchTeams();
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Clear Search
          </button>
        )
        }
      </form>

      {/* Pagination Controls */}
      {!searchValue && (
        <div className="flex justify-center items-center gap-4 mt-6 mb-10">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-white">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teams.length > 0 ? (
          teams.map((team: Team) => (
            <div key={team._id} className="bg-gray-800 p-4 rounded-lg shadow">
              <div className="flex justify-between items-center">
                <h2 className="text-white text-xl font-semibold">
                  {team.teamName || "Unnamed Team"}
                </h2>
                <span className="text-yellow-400">Team No: {team.teamNo}</span>
              </div>
              <p className="text-white mt-2 font-medium">
                Problem Statement: {team.problemStatement}
              </p>
              <p className="text-white mt-4 font-medium">Team Members</p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {team.participants?.map((member, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-700 text-white p-2 rounded flex gap-2 items-center"
                  >
                    {member.img ? (
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-500"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm">
                        N/A
                      </div>
                    )}

                    <div>
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm">{member.registrationNo}</p>
                      <p className="text-sm">
                        Year {member.year}, Section {member.section}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* {team.status === "notUpdated" && (
                <button
                onClick={() => {navigate(`/update/${team._id}`); setUser(team);}}
                className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded"
              >
                Update Details
              </button>
              )
                } */}
              
            </div>
          ))
        ) : (
          <p className="text-white col-span-2 text-center">No teams found.</p>
        )}
      </div>
    </div>
  );
};

export default TeamListPage;
