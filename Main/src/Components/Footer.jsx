import React from "react";
import { FaGithub, FaReact } from "react-icons/fa";
import { FiHeart, FiArrowUp } from "react-icons/fi";
import "./Css/Footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footerContent">

        {/* Brand */}
        <div className="footerBrand">
          <div className="footerLogo">
            <FaReact />
            <span>100 React Mini Projects</span>
          </div>

          <p>
            Learn React by building small, practical projects
            from basics to advanced.
          </p>
        </div>

        {/* Links */}
        <div className="footerLinks">
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <FaGithub />
            GitHub
          </a>
        </div>

        {/* Back to top */}
        <button
          className="backToTop"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <FiArrowUp />
        </button>
      </div>

      <div className="footerBottom">
        <span>
          © {new Date().getFullYear()} 100 React Mini Projects by <strong> Bhaskar kumar </strong>
        </span>

        <span className="madeWith">
          Made with <FiHeart /> using React
        </span>
      </div>
    </footer>
  );
};

export default Footer;