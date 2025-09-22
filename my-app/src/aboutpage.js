import './App.css';
import Header from './components/Header.js';
import { Link } from 'react-router-dom';
//alllinks are temporary i will put that in the header later
export function aboutpage() {
    return (
        <div className="app-container">
            <Header />
            <div>{/* placeholder */}</div>
            <div className="flex-container">
                <div className="row">
                    <span className="flex-item">Welcome!</span>
                </div>
            </div>
            <div
  style={{
    display: 'flex',
    gap: '200px',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
    fontSize: '24px',
    lineHeight: '1.5',
  }}
>
  <div className="flex-container">
    <span> This is the about page!</span>
  </div>
        </div>
         <div className="flex-container">
    <span><Link to = "/">Home</Link></span>
    <span><Link to = "aboutpage">about us!</Link></span>
    <span><Link to = "Event">Event page!</Link></span>
  </div>
        </div>
    );
}

export default aboutpage;