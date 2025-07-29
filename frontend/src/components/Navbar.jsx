import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const navLinkClass = ({ isActive }) =>
    `block px-4 py-2 rounded ${
      isActive ? "text-orange-600 font-semibold" : "text-gray-700"
    } hover:text-orange-600 transition`;

  const handleDonateClick = () => {
    navigate("/donate");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="px-4 py-3 flex justify-between items-center max-w-full mx-auto">
        <NavLink
          to="/"
          className="text-xl font-bold text-orange-600 hover:text-orange-700 transition"
        >
          🐾 Pet Shelter
        </NavLink>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-4 items-center">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
          <button
            onClick={() => navigate("/donors")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            View Donors
          </button>
          <button
            onClick={handleDonateClick}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
          >
            Donate Now
          </button>
        </div>

        {/* Mobile menu toggle button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-orange-600 focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <NavLink to="/" className={navLinkClass} onClick={toggleMenu}>
            Home
          </NavLink>

          <NavLink to="/contact" className={navLinkClass} onClick={toggleMenu}>
            Contact
          </NavLink>
          <button
            onClick={() => {
              toggleMenu();
              navigate("/donors");
            }}
            className="block text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition w-full text-left"
          >
            View Donors
          </button>
          <button
            onClick={() => {
              toggleMenu();
              handleDonateClick();
            }}
            className="block text-white bg-orange-500 px-4 py-2 rounded hover:bg-orange-600 transition w-full text-left"
          >
            Donate Now
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
