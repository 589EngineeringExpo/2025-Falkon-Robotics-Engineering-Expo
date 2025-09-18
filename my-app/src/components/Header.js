import React from 'react';
import './Header.css';
import logo from '../assets/logo.avif';
function Header() {
    
    return (
        
        <header className="header">
            <img 
              src={logo} 
              className="App-logo" 
              alt="logo" 
              style={{ width: "100px", height: "auto", animation: "none" }}
            />
        </header>
    );
}

export default Header;




