import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 text-center mt-10">
      <p>© {new Date().getFullYear()} Fine Media. All Rights Reserved.</p>
      <p className="text-sm mt-1">
        LED Wall & Event Support Services - Tamil Nadu
      </p>
    </footer>
  );
};

export default Footer;
