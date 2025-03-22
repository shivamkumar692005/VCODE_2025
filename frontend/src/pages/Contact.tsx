import React from "react";
import {
  Users,
  Code2,
  Brain,
  Presentation as PresentationScreen,
  Terminal,
} from "lucide-react";

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
        { name: "Mouneendra Vanka", role: "Lead Coordinator", email: "221FA04063@gamil.com", phone: "9948224580" },
        { name: "Shivam Kumar", role: "Coordinator", email: "221FA04118@gmail.com", phone: "9390756186" },
        { name: "Yaswanth Pothuri", role: "Coordinator", email: "221Fa04128@gmail.com", phone: "8096868869" },
        { name: "Abhirama Raju", role: "Coordinator", email: "221FA04096@gmail.com", phone: "8919057567" },
        { name: "Poorna Sai", role: "Coordinator", email: "221FA04150@gmail.com", phone: "7671936211" }
      ]
    },
    {
      name: "Coding Arena",
      icon: <Terminal className="w-8 h-8" />,
      color: "from-red-600 to-orange-600",
      volunteers: [
        { name: "Mouneendra Vanka", role: "Lead Coordinator", email: "221FA04063@gamil.com", phone: "9948224580" },
        { name: "Anushka Singh", role: "Coordinator", email: "221FA04505@gmail.com", phone: "9263256335" },
        { name: "Manoj kumar", role: "Coordinator", email: "221Fa04095@gmail.com", phone: "9014850215" },
        { name: "Chandana", role: "Coordinator", email: "221FA04099@gmail.com", phone: "7993086359" },
        { name: "Poorna Sai", role: "Coordinator", email: "221FA04150@gmail.com", phone: "7671936211" }
      ]
    },
    {
      name: "Technical Quiz",
      icon: <Brain className="w-8 h-8" />,
      color: "from-green-600 to-teal-600",
      volunteers: [
        { name: "Mouneendra Vanka", role: "Lead Coordinator", email: "221FA04063@gamil.com", phone: "9948224580" },
        { name: "Srilatha Reddy", role: "Coordinator", email: "221FA04135@gmail.com", phone: "7601059546" },
        { name: "Manoj kumar", role: "Coordinator", email: "221Fa04095@gmail.com", phone: "9014850215" },
        { name: "Sai Kiran", role: "Coordinator", email: "221FA04156@gmail.com", phone: "6281381153" },
        { name: "Prasanth Kumar", role: "Coordinator", email: "221FA04421@gmail.com", phone: "7673928208" }
      ]
    },
    {
      name: "Poster Presentation",
      icon: <PresentationScreen className="w-8 h-8" />,
      color: "from-blue-600 to-cyan-600",
      volunteers: [
        { name: "Mouneendra Vanka", role: "Lead Coordinator", email: "221FA04063@gamil.com", phone: "9948224580" },
       { name: "Poorna Sai", role: "Coordinator", email: "221FA04150@gmail.com", phone: "7671936211" },
        { name: "Manoj kumar", role: "Coordinator", email: "221Fa04095@gmail.com", phone: "9014850215" },
        { name: "Sai Kiran", role: "Coordinator", email: "221FA04156@gmail.com", phone: "6281381153" },
        { name: "Prasanth Kumar", role: "Coordinator", email: "221FA04421@gmail.com", phone: "7673928208" }
      ],
    },
    {
      name: "Hackathon",
      icon: <Users className="w-8 h-8" />,
      color: "from-pink-600 to-rose-600",
      volunteers: [
        { name: "Mouneendra Vanka", role: "Lead Coordinator", email: "221FA04063@gamil.com", phone: "9948224580" },
         { name: "Venkata Kamya", role: "Coordinator", email: "221FA04399@gmail.com", phone: "7993577382" },
         { name: "Shivam Kumar", role: "Coordinator", email: "221FA04118@gmail.com", phone: "9390756186" },
         { name: "Sai Kiran", role: "Coordinator", email: "221FA04156@gmail.com", phone: "6281381153" },
         { name: "Divya Gupta", role: "Coordinator", email: "221FA04507@gmail.com", phone: "7857961610" }
       ]
    },
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
                opacity: 0,
              }}
            >
              <div
                className={`flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${section.color} mb-6 mx-auto shadow-lg shadow-purple-500/20 animate-bounce-slow`}
              >
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
                    <p className="text-gray-400 group-hover:text-gray-300">
                      {volunteer.role}
                    </p>
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
