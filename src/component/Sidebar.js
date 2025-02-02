import React, { useState } from "react";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {isSidebarOpen && (
        <div
          className="bg-light border-end position-relative"
          style={{ width: "250px", minHeight: "100vh" }}
        >
          <div className="p-4">
            <h4 className="text-center">Menu</h4>
            <ul className="list-unstyled">
              <li className="mb-3">
                <a
                  href="/application/admin"
                  className="text-decoration-none text-dark"
                >
                  Applications
                </a>
              </li>
              {/* <li className="mb-3">
                <a
                  href="/client/add/project"
                  className="text-decoration-none text-dark"
                >
                  ADD Project
                </a>
              </li>
              <li className="mb-3">
                <a
                  href="/client/show/project"
                  className="text-decoration-none text-dark"
                >
                  Display Projects
                </a>
              </li> */}
            </ul>
          </div>
          {/* Cross Button to Toggle Sidebar */}
          <button
            className="btn btn-close position-absolute"
            style={{ top: "10px", right: "10px" }}
            onClick={toggleSidebar}
          ></button>
        </div>
      )}

      {!isSidebarOpen && (
        <button className="btn btn-success m-3" onClick={toggleSidebar}>
          +
        </button>
      )}
    </div>
  );
};

export default Sidebar;
