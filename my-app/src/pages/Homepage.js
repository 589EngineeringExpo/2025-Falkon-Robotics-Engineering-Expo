import '../App.css';
import ScrollReveal from '../components/ScrollReveal';
import '../components/ScrollReveal.css';
import MagicBento from '../components/MagicBento.js';
import '../components/MagicBento.css';


export function Homepage() {
  return (
    <p style={{ color: '#000000ff' }}>
    <div className="app-container" style={{ minHeight: "400vh", paddingTop: "100px" }}>
         <span className="flex-item">=====================================================</span>
      <ScrollReveal
       baseOpacity={0}
       enableBlur={true}
       baseRotation={5}
       blurStrength={10}
>
  {/* scroll is not ready for mobile view*/}
{`Hello! Please scroll down
We are Falkon robotic.
a high school led robotics team.
Our mission is to educate everyone interested about STEAM.
This event is a carnival style event meant for K–12th grade.
All booths will either have an activity or be a community booth.`}
      </ScrollReveal>
      <span className="flex-item">=====================================================</span>
    </div>
      {/* MagicBento is not ready for mobile view+ is not positioned correctly nor does have any of the info needed currently*/}
    <MagicBento 
  textAutoHide={true}
  enableStars={true}
  enableSpotlight={true}
  enableBorderGlow={true}
  enableTilt={true}
  enableMagnetism={true}
  clickEffect={true}
  spotlightRadius={300}
  particleCount={12}
  glowColor="132, 0, 255"
/>

    </p>
  );
}

export default Homepage;

