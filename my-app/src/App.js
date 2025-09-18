
import './App.css';
import Header from './components/Header.js';
import OIP from './assets/OIP.webp';

function App() {
    return (
        <div className="app-container">
            <Header />
            {<div> About us!</div>}
        <div className="flex-container">
    <div className="row">
        <span className="flex-item">Welcome!</span>
        </div>
        <div className="row">
            
        <img src={OIP} className="UHHHTEMP" alt="TEMP" style={{ opacity: 0.01 }} />
        </div>
</div>
  </div>

        
    );
}

export default App;
