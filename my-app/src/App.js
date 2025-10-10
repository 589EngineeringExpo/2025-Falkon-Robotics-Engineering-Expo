import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "././Homepage";
import About from "./About";
import Contact from "./Contact";
function App() {
    return (

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
