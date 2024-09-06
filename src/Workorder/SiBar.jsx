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
  FaChevronDown,
} from "react-icons/fa";

const SiBar = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isWorkOrderOpen, setIsWorkOrderOpen] = useState(false);

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
      className={`flex ${isMinimized ? "w-20" : "w-64"
        }  bg-gradient-to-l from-[#004C88] to-[#3771A0] text-white transition-all duration-300`}
    >
      <div className="flex flex-col justify-between">
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto pt-32">
          <ul className="space-y-0.5">
            {[{ to: "/", icon: FaTachometerAlt, label: "Dashboard" },
            {
              to: "#",
              icon: FaChevronDown,
              label: "Work Order",
              onClick: () => setIsWorkOrderOpen(!isWorkOrderOpen),
              isSubMenu: true
            },
            { to: "/analytics", icon: FaChartLine, label: "Analytics" },
            { to: "/reports", icon: FaFileAlt, label: "Reports" },
            { to: "/user-control", icon: FaUser, label: "User Control" },
            { to: "/settings", icon: FaCog, label: "Settings" }
            ].map(({ to, icon: Icon, label, onClick, isSubMenu }, index) => (
              <li
                key={index}
                className={`flex flex-col items-start cursor-pointer py-4 ${isMinimized ? "px-3" : "px-14"} rounded-xl ${isMinimized ? "" : "bg-custom-blue"
                  } hover:text-white transition-all duration-200`}
              >
                <Link
                  to={to}
                  className="flex items-center w-full"
                  onClick={onClick}
                >
                  <Icon className={`mx-auto text-xl ${isMinimized ? "text-white" : ""}`} />
                  <span className={`${isMinimized ? "hidden" : "block"} ml-3`}>
                    {label}
                  </span>
                </Link>
                {/* {isSubMenu && (
                  <button
                    onClick={onClick}
                    className=""
                  >
                    <FaChevronDown
                      className={`transition-transform ${isWorkOrderOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                )} */}
                {isSubMenu && isWorkOrderOpen && !isMinimized && (
                  <ul className="ml-4">
                    <li>
                      <Link to="work-order" className="flex items-center pt-1 px-1">
                        <span className="ml-3">Work Order</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="part" className="flex items-center py-1 px-1 ">
                        <span className="ml-3">Part</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="product" className="flex items-center py-1 px-1 ">
                        <span className="ml-3">Product</span>
                      </Link>
                    </li>
                  </ul>
                )}

              </li>
            ))}
          </ul>
        </nav>

        {/* Exit Button */}
        <div className="p-4 border-gray-700">
          <button
            className={`flex items-center ${isMinimized ? "px-3 py-2" : "px-14 py-3 ml-10"
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
