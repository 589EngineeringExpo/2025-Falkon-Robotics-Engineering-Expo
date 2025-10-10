import './App.css';
import Header from './components/Header.js';
////this will be deleted later when i feel like it
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

<div className="flex-container"></div>
   <div className="container">
   <span>   <p className="left-aligned">Ryan.</p></span>
  <span>    <p className="right-aligned">WheatSeed </p></span>
  <span>    <p className="left-aligned">james.</p></span>
    </div>
</div>


    );
}

export default aboutpage;