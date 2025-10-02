import { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../App.css";
import logo from "../assets/logo.avif";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      {/* Top bar with logo to toggle sidebar */}
      <div className="navbar">
        <Link to="#" className="menu-bars" onClick={showSidebar}>
          <img 
            src={logo} 
            alt="Logo" 
            className="logo-icon" 
            style={{ width: "40px", height: "40px", cursor: "pointer" }} 
          />
        </Link>
      </div>
      {/* This is the log in stuff*/}
      <div className = "Login">
        
      </div>
      {/* Sidebar menu */}
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <img 
                src={logo} 
                alt="Logo" 
                className="logo-icon" 
                style={{ width: "40px", height: "40px", cursor: "pointer" }} 
              />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;