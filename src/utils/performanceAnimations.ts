interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

interface Shape {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  type: 'circle' | 'square' | 'triangle';
}

export const generateOptimizedParticles = (count: number, width: number, height: number): Particle[] => {
  const particles: Particle[] = [];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2
    });
  }

  return particles;
};

export const generateOptimizedShapes = (count: number, width: number, height: number): Shape[] => {
  const shapes: Shape[] = [];
  const types: Shape['type'][] = ['circle', 'square', 'triangle'];

  for (let i = 0; i < count; i++) {
    shapes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 80 + 40,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.5,
      type: types[Math.floor(Math.random() * types.length)]
    });
  }

  return shapes;
};

export const updateParticles = (particles: Particle[], width: number, height: number): Particle[] => {
  return particles.map(particle => {
    let newX = particle.x + particle.speedX;
    let newY = particle.y + particle.speedY;

    if (newX < 0 || newX > width) particle.speedX *= -1;
    if (newY < 0 || newY > height) particle.speedY *= -1;

    return {
      ...particle,
      x: newX,
      y: newY
    };
  });
};

export const updateShapes = (shapes: Shape[]): Shape[] => {
  return shapes.map(shape => ({
    ...shape,
    rotation: shape.rotation + shape.rotationSpeed
  }));
};
