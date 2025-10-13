import '../App.css';
import ScrollReveal from '../components/ScrollReveal';
import '../components/ScrollReveal.css';

export function Homepage() {
  return (
    <p style={{ color: '#000000ff' }}>
    <div className="app-container" style={{ minHeight: "400vh", paddingTop: "100px" }}>
         <span className="flex-item">=====================================================</span>
      <ScrollReveal
       enableBlur={true}
        blurStrength={10}
>
{`Hello! Please scroll down
We are Falkon robotic.
a high school led robotics team.
Our mission is to educate everyone interested about STEAM.
This event is a carnival style event meant for K–12th grade.
All booths will either have an activity or be a community booth.`}
      </ScrollReveal>
      <span className="flex-item">=====================================================</span>
    </div>
    </p>
  );
}

export default Homepage;

