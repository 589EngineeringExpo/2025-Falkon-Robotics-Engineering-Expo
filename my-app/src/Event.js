///HOLLYSHITHOWDOIFUCKTSUPSOBADLY?!?!??!?!!?!?!ignore
import './App.css';
import Header from './components/Header.js';
import { Link } from 'react-router-dom';

export function Event() {
    return (
               <div className="app-container">
            <Header />
            {<div>About us!</div>}
             <div className="flex-container">
    <span><Link to = "/">Home</Link></span>
    <span><Link to = "aboutpage">about us!</Link></span>
    <span><Link to = "Event">Event page!</Link></span>
  </div>
            </div>

            );
}

export default Event;