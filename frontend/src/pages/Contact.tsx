import React from 'react';
import { Users, Code2, Brain, Presentation as PresentationScreen, Terminal } from 'lucide-react';

interface Volunteer {
  name: string;
  role: string;
  email: string;
  phone: string;
}

interface EventSection {
  name: string;
  icon: React.ReactNode;
  volunteers: Volunteer[];
  color: string;
}

function Contact() {
  const eventSections: EventSection[] = [
    {
      name: "Code Hunt",
      icon: <Code2 className="w-8 h-8" />,
      color: "from-purple-600 to-indigo-600",
      volunteers: [
        { name: "Alex Johnson", role: "Lead Coordinator", email: "alex.j@vcode.com", phone: "+1 (555) 101-2301" },
        { name: "Sarah Chen", role: "Technical Support", email: "sarah.c@vcode.com", phone: "+1 (555) 101-2302" },
        { name: "Mike Ross", role: "Assistant Coordinator", email: "mike.r@vcode.com", phone: "+1 (555) 101-2303" },
        { name: "Emma Wilson", role: "Registration Lead", email: "emma.w@vcode.com", phone: "+1 (555) 101-2304" },
        { name: "David Kim", role: "Event Support", email: "david.k@vcode.com", phone: "+1 (555) 101-2305" }
      ]
    },
    {
      name: "Coding Arena",
      icon: <Terminal className="w-8 h-8" />,
      color: "from-red-600 to-orange-600",
      volunteers: [
        { name: "Rachel Green", role: "Arena Manager", email: "rachel.g@vcode.com", phone: "+1 (555) 101-2306" },
        { name: "Chris Evans", role: "Technical Judge", email: "chris.e@vcode.com", phone: "+1 (555) 101-2307" },
        { name: "Lisa Wang", role: "Participant Support", email: "lisa.w@vcode.com", phone: "+1 (555) 101-2308" },
        { name: "Tom Hardy", role: "Systems Admin", email: "tom.h@vcode.com", phone: "+1 (555) 101-2309" },
        { name: "Nina Patel", role: "Challenge Designer", email: "nina.p@vcode.com", phone: "+1 (555) 101-2310" }
      ]
    },
    {
      name: "Technical Quiz",
      icon: <Brain className="w-8 h-8" />,
      color: "from-green-600 to-teal-600",
      volunteers: [
        { name: "James Wilson", role: "Quiz Master", email: "james.w@vcode.com", phone: "+1 (555) 101-2311" },
        { name: "Sophia Lee", role: "Question Curator", email: "sophia.l@vcode.com", phone: "+1 (555) 101-2312" },
        { name: "Ryan Cooper", role: "Score Keeper", email: "ryan.c@vcode.com", phone: "+1 (555) 101-2313" },
        { name: "Maya Singh", role: "Technical Verifier", email: "maya.s@vcode.com", phone: "+1 (555) 101-2314" },
        { name: "Kevin Zhang", role: "Support Staff", email: "kevin.z@vcode.com", phone: "+1 (555) 101-2315" }
      ]
    },
    {
      name: "Poster Presentation",
      icon: <PresentationScreen className="w-8 h-8" />,
      color: "from-blue-600 to-cyan-600",
      volunteers: [
        { name: "Emily Brown", role: "Presentation Lead", email: "emily.b@vcode.com", phone: "+1 (555) 101-2316" },
        { name: "Daniel Park", role: "Layout Coordinator", email: "daniel.p@vcode.com", phone: "+1 (555) 101-2317" },
        { name: "Anna Martinez", role: "Design Judge", email: "anna.m@vcode.com", phone: "+1 (555) 101-2318" },
        { name: "Lucas Kim", role: "Technical Support", email: "lucas.k@vcode.com", phone: "+1 (555) 101-2319" },
        { name: "Grace Liu", role: "Participant Guide", email: "grace.l@vcode.com", phone: "+1 (555) 101-2320" }
      ]
    },
    {
      name: "Hackathon",
      icon: <Users className="w-8 h-8" />,
      color: "from-pink-600 to-rose-600",
      volunteers: [
        { name: "Mark Thompson", role: "Hackathon Director", email: "mark.t@vcode.com", phone: "+1 (555) 101-2321" },
        { name: "Julia Chen", role: "Mentor Coordinator", email: "julia.c@vcode.com", phone: "+1 (555) 101-2322" },
        { name: "Sam Rodriguez", role: "Technical Mentor", email: "sam.r@vcode.com", phone: "+1 (555) 101-2323" },
        { name: "Olivia Kim", role: "Project Evaluator", email: "olivia.k@vcode.com", phone: "+1 (555) 101-2324" },
        { name: "Peter Chang", role: "Resource Manager", email: "peter.c@vcode.com", phone: "+1 (555) 101-2325" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent animate-pulse">
            VCODE Contact Information
          </h1>
          <p className="text-gray-400 text-xl">
            Connect with our dedicated event volunteers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventSections.map((section, index) => (
            <div
              key={section.name}
              className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 border border-gray-800"
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.2}s forwards`,
                opacity: 0
              }}
            >
              <div className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${section.color} mb-6 mx-auto shadow-lg shadow-purple-500/20 animate-bounce-slow`}>
                {section.icon}
              </div>
              
              <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {section.name}
              </h2>
              
              <div className="space-y-4">
                {section.volunteers.map((volunteer) => (
                  <div
                    key={volunteer.email}
                    className="bg-gradient-to-r from-gray-900 to-black rounded-lg p-4 hover:from-gray-800 hover:to-gray-900 transition-all duration-300 border border-gray-800/50 hover:border-purple-500/30 group"
                  >
                    <h3 className="font-semibold text-lg group-hover:text-purple-400 transition-colors">
                      {volunteer.name}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300">{volunteer.role}</p>
                    <div className="mt-2 text-sm space-y-1">
                      <p className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer">
                        {volunteer.email}
                      </p>
                      <p className="text-gray-500 group-hover:text-gray-400">
                        {volunteer.phone}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contact;