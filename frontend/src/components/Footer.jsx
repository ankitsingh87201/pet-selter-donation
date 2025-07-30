import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-center px-4 py-6 text-sm text-gray-700 border-t w-full  bottom-0 z-10">
      <div className="flex justify-center gap-6 mt-0 flex-wrap">
        <Link to="/terms" className="text-blue-600 hover:underline">Terms & Conditions</Link>
        <Link to="/policy" className="text-blue-600 hover:underline">Privacy Policy</Link>
        <Link to="/donate" className="text-blue-600 hover:underline">Donate</Link>
        <Link to="/contact" className="text-blue-600 hover:underline">Contact</Link>
      </div>
      <br />
      <p>© {currentYear} Pet Shelter. All rights reserved.</p>
       <span>created by-</span>
        <a
          href="https://www.instagram.com/im._.ankiiit?igsh=MjJjczVjYWtzNHdh"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          <span>im._.ankiiit</span>
        </a>
      
    </footer>
  );
};

export default Footer;
