import { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../App.css";
import logo from "../assets/expo2025.png";
import Popup from "../components/Popup.js";
import "../components/Popip.css";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false); 

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
            style={{ width: "45px", height: "60px", cursor: "pointer" }} 
          />
        </Link>
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
             style={{ width: "45px", height: "60px", cursor: "pointer" }}
           />
         </Link>

         {/* This is the log in button */}
         <div className="nav-item">
           <button onClick={() => setLoginPopup(true)}>Log In</button>
         </div>
         {/* end of login */}
       </li>

          {SidebarData.map((item, index) => {
          const isExternal = item.path.startsWith("http");    
          return (
            <li key={index} className={item.cName}>
              {isExternal ? (
                <a
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{item.title}</span>
                </a>
              ) : (
                <Link to={item.path}>
                  <span>{item.title}</span>
                </Link>
              )}
            </li>
          );
        })}

        </ul>
        {/* This is the log in render */}
      </nav>
            <Popup trigger={loginPopup} setTrigger={setLoginPopup}>
              <h3>Log In</h3>
         <form className="login-form">
           <div className="form-group">
             <label htmlFor="username">Username</label>
             <input
               type="text"
               id="username"
               name="username"
               placeholder="Enter username"
             />
           </div>
           <div className="form-group">
             <label htmlFor="password">Password</label>
             <input
               type="password"
               id="password"
               name="password"
               placeholder="Enter password"
             />
           </div>
         <button type="submit">Log In</button>
  </form>
      </Popup>
    </>

  );
}

export default Navbar;