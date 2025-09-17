import React from 'react';
import './Header.css';
import logo from './logo.avif';
function Header() {
    
    return (
        
        <header className="header">
            <img 
              src={logo} 
              className="App-logo" 
              alt="logo" 
              style={{ animation: 'none' }} 
            />
        </header>
    );
}

export default Header;




