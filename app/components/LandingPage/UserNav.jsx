import { useState } from "react";
import Link from "next/link";

function UserNav() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleClose = () => {
    setDropdownOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-gray-800 focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-gray-800"></div>
      </button>
      {dropdownOpen && (
        <div className="absolute top-full left-0 mt-2 bg-gray-800 rounded shadow-lg">
          <Link
            href="/dashboard/training"
            className="block px-4 py-2 text-white"
            onClick={toggleClose}
          >
            Training
          </Link>
          <Link
            onClick={toggleClose}
            href="/dashboard/health"
            className="block px-4 py-2 text-white"
          >
            Nutrition
          </Link>
          <Link
            onClick={toggleClose}
            href="/dashboard/gear"
            className="block px-4 py-2 text-white"
          >
            Gear
          </Link>
          <Link
            onClick={toggleClose}
            href="/dashboard/injuryprevention"
            className="block px-4 py-2 text-white"
          >
            Injury Prevention
          </Link>
          <Link
            className="block px-4 py-2 text-white"
            onClick={toggleClose}
            href="/dashboard/profile"
          >
            Profile
          </Link>
        </div>
      )}
    </div>
  );
}

export default UserNav;
