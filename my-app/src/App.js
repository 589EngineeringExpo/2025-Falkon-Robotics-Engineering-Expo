
import './App.css';
import Header from './components/Header.js';
import OIP from './assets/OIP.webp';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import  AboutPage  from './aboutpage.js';
import  Homepage  from './Homepage.js';
import  Event  from './Event.js';
function App() {
    return (
//DONOTTOUCHPLEASETHISISHELDUPBYGLUE
    <span>
      <Router>
        <Routes>
          <Route path="/"element ={<Homepage/>} />
          <Route path="aboutpage"element ={<AboutPage/>} />
          <Route path="Event"element ={<Event/>} />
        </Routes>
      </Router>
    </span>
  
    );
}

export default App;
