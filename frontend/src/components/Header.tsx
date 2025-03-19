import { Link } from "react-router-dom";
import HeaderButton from "./HeaderButton";

const Header = () => {
  return (
    <nav className="w-full h-auto p-4 bg-transparent text-white flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
      {/* Logo */}
      <div className="w-28 h-8">
        <img src="/logo.png" alt="Logo" className="w-full h-full" />
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-18 text-rose-400 text-xl font-mono font-bold">
        <Link to="/" className="hover:text-blue-400">
          Home
        </Link>
        <Link to="/events" className="hover:text-blue-400">
          Events
        </Link>
        <Link to="/contact" className="hover:text-blue-400">
          Contact Us
        </Link>
      </div>

      <HeaderButton url={'/events'}/>
    </nav>
  );
};

export default Header;
