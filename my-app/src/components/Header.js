import React from 'react';
import './Header.css';
import logo from '../assets/logo.avif';
import { Link } from 'react-router-dom';
function Header() {
    
    return (
        
        <header className="header">
            <img 
              src={logo} 
              className="App-logo" 
              alt="logo" 
              style={{ width: "100px", height: "auto", animation: "none" }}
            />
                       <div
  style={{
    display: 'flex',
    gap: '200px',
    justifyContent: 'right',
    alignItems: 'right',
    minHeight: '100px',
    fontSize: '500px',
    lineHeight: '5.5',
  }}
></div>
            <div className="flex-container">
        <span><Link to = "/">Home</Link></span>
    <span><Link to = "/Event">Event Map!</Link></span>
    </div>
        </header>
    );
}

export default Header;




