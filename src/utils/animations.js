// GSAP Animation Configurations

export const fadeInUp = {
  y: 50,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out'
};

export const fadeIn = {
  opacity: 0,
  duration: 0.6,
  ease: 'power2.out'
};

export const staggerCards = {
  y: 30,
  opacity: 0,
  duration: 0.6,
  ease: 'power2.out',
  stagger: 0.1
};

export const scaleIn = {
  scale: 0.8,
  opacity: 0,
  duration: 0.5,
  ease: 'back.out(1.7)'
};

export const slideInLeft = {
  x: -50,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out'
};

export const slideInRight = {
  x: 50,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out'
};

export const hoverScale = {
  scale: 1.05,
  duration: 0.3,
  ease: 'power2.out'
};

export const hoverGlow = {
  boxShadow: '0 20px 60px rgba(0, 217, 255, 0.6)',
  duration: 0.3,
  ease: 'power2.out'
};