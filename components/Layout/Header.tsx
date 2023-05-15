import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">TODO App</div>
      </div>
    </header>
  );
};

export default Header;
