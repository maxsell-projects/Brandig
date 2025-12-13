import { useEffect, useState } from 'react';

const AmbientGlow = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate position based on scroll
  const yOffset = 30 + (scrollY * 0.05);
  const xOffset = 50 + Math.sin(scrollY * 0.001) * 10;

  return (
    <>
      {/* Primary Glow */}
      <div 
        className="ambient-glow"
        style={{
          top: `${yOffset}%`,
          left: `${xOffset}%`,
        }}
      />
      
      {/* Secondary Glow (smaller, different position) */}
      <div 
        className="ambient-glow"
        style={{
          top: `${60 + (scrollY * 0.03)}%`,
          left: `${30 + Math.cos(scrollY * 0.002) * 15}%`,
          width: '40vw',
          height: '40vw',
          maxWidth: '500px',
          maxHeight: '500px',
          opacity: 0.4,
        }}
      />
    </>
  );
};

export default AmbientGlow;
