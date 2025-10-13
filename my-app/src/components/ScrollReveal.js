import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  baseOpacity = 0,
  enableBlur = true,
  blurStrength = 10,
  lineGap = '50vh', // how much scroll distance between lines
}) => {
  const containerRef = useRef(null);

  // Split text by newlines
  const lines = useMemo(() => {
    if (typeof children !== 'string') return [];
    return children.split(/\r?\n/).filter(line => line.trim() !== '');
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const lineEls = el.querySelectorAll('.scroll-line');

    lineEls.forEach((line, i) => {
      const startPos = `${i * 100}% top`;
      const endPos = `${(i + 1) * 100}% top`;

      gsap.fromTo(
        line,
        { opacity: baseOpacity, filter: enableBlur ? `blur(${blurStrength}px)` : 'none' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'power1.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
          },
        }
      );

      // fade back out
      gsap.to(line, {
        opacity: 0,
        filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
        ease: 'power1.in',
        scrollTrigger: {
          trigger: line,
          start: 'top 30%',
          end: 'top 0%',
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [baseOpacity, enableBlur, blurStrength]);

  return (
    <div ref={containerRef} className="scroll-reveal-container">
      {lines.map((line, i) => (
        <div className="scroll-line" key={i}>
          {line}
        </div>
      ))}
    </div>
  );
};

export default ScrollReveal;

