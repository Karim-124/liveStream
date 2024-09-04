import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaChartLine,
  FaFileAlt,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaChevronLeft,
} from "react-icons/fa";

const SiBar = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMinimized(true);
      } else {
        setIsMinimized(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`flex ${
        isMinimized ? "w-20" : "w-64"
      }  bg-gradient-to-l from-[#004C88] to-[#3771A0] text-white transition-all duration-300`}
    >
      <div className="flex flex-col justify-between h-full">
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto pt-32">
          <ul className="space-y-0.5">
            {[
              { to: "/", icon: FaTachometerAlt, label: "Dashboard" },
              { to: "work-order", icon: FaClipboardList, label: "Work Order" },
              { to: "/analytics", icon: FaChartLine, label: "Analytics" },
              { to: "/reports", icon: FaFileAlt, label: "Reports" },
              { to: "/user-control", icon: FaUser, label: "User Control" },
              { to: "/settings", icon: FaCog, label: "Settings" }
            ].map(({ to, icon: Icon, label }, index) => (
              <li
                key={index}
                className={`flex items-center py-4 ${
                  isMinimized ? "px-3" : "px-14"
                } rounded-xl ${
                  isMinimized ? "" : "bg-custom-blue"
                }`}
              >
                <Link to={to} className="flex items-center w-full">
                  <Icon className={`mx-auto text-xl ${isMinimized ? "text-white" : ""}`} />
                  <span className={`${isMinimized ? "hidden" : "block"} ml-3`}>
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Exit Button */}
        <div className="p-4 border-gray-700">
          <button
            className={`flex items-center ${
              isMinimized ? "px-3 py-2" : "px-14 py-3 ml-10"
            } rounded-xl ${isMinimized ? "bg-[#004C88]" : "bg-[#732F46]"}`}
          >
            <FaSignOutAlt className={`mx-auto text-xl ${isMinimized ? "text-white" : ""}`} />
            <span className={`${isMinimized ? "hidden" : "block"} `}>
              Exit
            </span>
          </button>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white p-2"
          >
            {isMinimized ? <FaBars /> : <FaChevronLeft />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SiBar;
