import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_inner wrapper_inner">
        <div className="footer_left">
          <a>Privacy</a>
          <a>Contact</a>
          <a>Colormind API</a>
        </div>
        <div className="footer_right">
          <a
            target="_blank"
            href="https://www.linkedin.com/in/zach-pinfold-a28b7168/"
          >
            Built by Zach Pinfold
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
