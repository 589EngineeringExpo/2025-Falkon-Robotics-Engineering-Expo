import './App.css';
import Header from './components/Header.js';
import OIP from './assets/OIP.webp';
import { Link } from 'react-router-dom';
//alllinks are temporary i will put that in the header later
export function Homepage() {
    return (
        <div className="app-container">
            <Header />
            {<div>About us!</div>}
        <div className="flex-container">
    <div className="row">
        <span className="flex-item">Welcome!</span>
        </div>
        <div className="row">
            
        <img src={OIP} className="UHHHTEMP" alt="TEMP" style={{ opacity: 0.01 }} />
        </div>
</div>
<div
  style={{
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px', 
  }}
>
  <div className="flex-container">
    <span><Link to = "/">Home</Link></span>
    <span><Link to = "aboutpage">about us!</Link></span>
    <span><Link to = "Event">Event page!</Link></span>
  </div>
</div>
</div>
 
    );
}

        

export default Homepage;