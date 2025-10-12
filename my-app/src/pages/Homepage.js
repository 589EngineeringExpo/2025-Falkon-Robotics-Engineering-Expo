import '../App.css';
import ScrollReveal from '../components/ScrollReveal.js';
import '../components/ScrollReveal.css';
export function Homepage() {
<ScrollReveal
  baseOpacity={0}
  enableBlur={true}
  baseRotation={5}
  blurStrength={10}
>
</ScrollReveal>

    return (
       <div className="app-container">
            <div className="row">
                <span className="flex-item">Welcome!</span>
            </div>
            <div style={{ height: "0vh" }}></div>
            <div className="row">

            </div>
    <ScrollReveal
>
  When does a man die? When he is hit by a bullet? No! When he suffers a disease?
  No! When he ate a soup made out of a poisonous mushroom?
  No! A man dies when he is forgotten!
</ScrollReveal>

            <div style={{ height: "100vh" }}></div>

        </div>
        
    );
    
}

        

export default Homepage;