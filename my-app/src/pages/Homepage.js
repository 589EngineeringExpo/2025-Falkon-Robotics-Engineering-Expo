import '../App.css';
import OIP from '../assets/OIP.webp';

export function Homepage() {
    return (
       <div className="app-container">
            <div className="row">
                <span className="flex-item">Welcome!</span>
            </div>
            <div className="row">
                <img 
                    src={OIP} 
                    className="UHHHTEMP" 
                    alt="TEMP" 
                    style={{ opacity: 0.01 }} 
                />
            </div>
        </div>
    );
}

        

export default Homepage;