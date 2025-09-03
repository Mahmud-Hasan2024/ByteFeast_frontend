import { GiChefToque } from "react-icons/gi";
import {
  AiOutlineTwitter,
  AiOutlineYoutube,
  AiOutlineFacebook,
} from "react-icons/ai";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-primary text-primary-content p-10">
      <div className="flex flex-col items-center gap-4">
        {/* Logo + Text */}
        <div className="flex flex-col items-center gap-2">
          <GiChefToque size={50} className="text-amber-400" />
          <p className="font-bold text-center">
            ByteFeast Dining Co.
            <br />
            Providing quality foods since 2025
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <Link to="#" className="text-amber-400 hover:text-amber-200">
            <AiOutlineTwitter size={24} />
          </Link>
          <Link to="#" className="text-amber-400 hover:text-amber-200">
            <AiOutlineYoutube size={24} />
          </Link>
          <Link to="#" className="text-amber-400 hover:text-amber-200">
            <AiOutlineFacebook size={24} />
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-center">
          Copyright © {new Date().getFullYear()} - All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;