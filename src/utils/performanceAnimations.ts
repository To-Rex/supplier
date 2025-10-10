// Performance-optimized animation utilities
export const getOptimizedAnimationStyle = (
  left: number,
  top: number,
  delay: number,
  duration: number,
  scale: number
) => ({
  left: `${left}%`,
  top: `${top}%`,
  animationDelay: `${delay}s`,
  animationDuration: `${duration}s`,
  transform: `scale(${scale}) translateZ(0)`, // Force GPU acceleration
  willChange: 'transform, opacity', // Optimize for animation
  backfaceVisibility: 'hidden' as const, // Prevent flickering
});

export const getOptimizedFloatStyle = (
  left: number,
  top: number,
  animationDuration: number,
  animationDelay: number,
  spinDuration: number
) => ({
  left: `${left}%`,
  top: `${top}%`,
  animation: `float ${animationDuration}s ease-in-out ${animationDelay}s infinite`,
  willChange: 'transform',
  backfaceVisibility: 'hidden' as const,
  transform: 'translateZ(0)', // Force GPU layer
});

// Reduce animation count while maintaining visual impact
export const generateOptimizedParticles = (count: number = 12) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      ...getOptimizedAnimationStyle(
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 3, // Shorter delay range
        2 + Math.random() * 2, // Shorter duration range
        0.7 + Math.random() * 0.8 // Smaller scale range
      )
    });
  }
  return particles;
};

export const generateOptimizedShapes = (count: number = 6) => {
  const shapes = [];
  for (let i = 0; i < count; i++) {
    shapes.push({
      id: i,
      ...getOptimizedFloatStyle(
        Math.random() * 100,
        Math.random() * 100,
        4 + Math.random() * 3, // Shorter float duration
        Math.random() * 2, // Shorter delay
        8 + Math.random() * 6 // Shorter spin duration
      )
    });
  }
  return shapes;
};

// Performance monitoring
export const useAnimationPerformance = () => {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    const checkPerformance = () => {
      if (performance.now() > 16) { // If frame time > 16ms
        console.warn('Animation performance issue detected');
      }
    };
    
    window.requestIdleCallback(checkPerformance);
  }
};
