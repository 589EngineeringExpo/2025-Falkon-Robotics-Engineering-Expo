import { useState } from "react";
import "../App.css";
import Popup from "./Popup.js";
import "../components/Popip.css";
//I gave up on this, i was just trying to reuse some code from the old sidebar but ehhhhhhhhhhh i kinda fucked it up
function Volunteerpanel() {
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
     </>
  );
}

export default Volunteerpanel;