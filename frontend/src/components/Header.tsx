import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for menu toggle
import HeaderButton from "./HeaderButton";
// import HeaderButton from "./HeaderButton";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full h-auto p-4 bg-transparent text-white flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
      {/* Logo */}
      <div className="w-28 h-8">
        <Link to={"/"} className="flex items-center justify-center">
        <img src="https://res.cloudinary.com/dcalf4l66/image/upload/v1742632868/logo_udb1an.png" alt="Logo" className="w-full h-full" />
        </Link>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center gap-10 text-rose-400 text-xl font-mono font-bold">
        <Link to="/" className="hover:text-blue-400 px-3 py-2 rounded-md">Home</Link>
        <Link to="/events" className="hover:text-blue-400 px-3 py-2 rounded-md">Events</Link>
        {/* <Link to="/register" className="hover:text-blue-400 px-3 py-2 rounded-md">Register</Link> */}
        <Link to="/team" className="hover:text-blue-400 px-3 py-2 rounded-md">Teams</Link>
        <Link to="/contact" className="hover:text-blue-400 px-3 py-2 rounded-md">Contact Us</Link>
        <Link to="/hackathon" className="hover:text-blue-400 px-3 py-2 rounded-md">Hackathon</Link>
        <Link to="/hackathonboard" className="hover:text-blue-400 px-3 py-2 rounded-md">for-board</Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (No Animation, Just Appears on Click) */}
      {menuOpen && (
        <div className="absolute top-12 right-4 bg-black text-white p-4 rounded-lg shadow-lg flex flex-col gap-4 md:hidden">
          <Link to="/" className="hover:text-blue-400 px-3 py-2 rounded-md" onClick={() => setMenuOpen(false)}>Home</Link>
          {/* <Link to="/events" className="hover:text-blue-400 px-3 py-2 rounded-md" onClick={() => setMenuOpen(false)}>Rgister</Link> */}
          <Link to="/team" className="hover:text-blue-400 px-3 py-2 rounded-md" onClick={() => setMenuOpen(false)}>Team</Link>
          <Link to="/hackathon" className="hover:text-blue-400 px-3 py-2 rounded-md" onClick={() => setMenuOpen(false)}>Hackathon</Link>
          <Link to="/events" className="hover:text-blue-400 px-3 py-2 rounded-md" onClick={() => setMenuOpen(false)}>Register</Link>
          <Link to="/events" className="hover:text-blue-400 px-3 py-2 rounded-md" onClick={() => setMenuOpen(false)}>Events</Link>
          <Link to="/contact" className="hover:text-blue-400 px-3 py-2 rounded-md" onClick={() => setMenuOpen(false)}>Contact Us</Link>
          {/* <Link to="/hackathonboard" className="hover:text-blue-400 px-3 py-2 rounded-md" onClick={() => setMenuOpen(false)}>for-board</Link> */}
        </div>
      )}

      {/* Call-to-Action Button */}
      <div className="hidden md:block">
        <HeaderButton url={'/events'} />
      </div>
    </nav>
  );
};

export default Header;
