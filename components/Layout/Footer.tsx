import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 px-6">
      <div className="container mx-auto">
        <p className="text-center">
          &copy; {new Date().getFullYear()} TODO App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
