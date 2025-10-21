import { Variants } from 'framer-motion';

// Fade in from bottom with slight delay
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: 'easeOut' 
    } 
  },
};

// Fade in from bottom with stagger for multiple elements
export const fadeInUpStagger: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: 'easeOut',
      staggerChildren: 0.1 
    } 
  },
};

// Hero title animation with letter spacing
export const heroTitle: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    letterSpacing: '0.2em'
  },
  visible: { 
    opacity: 1, 
    y: 0,
    letterSpacing: '0em',
    transition: { 
      duration: 0.8, 
      ease: 'easeOut' 
    } 
  },
};

// Scale in animation for buttons and cards
export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.5, 
      ease: 'easeOut' 
    } 
  },
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -50 
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.6, 
      ease: 'easeOut' 
    } 
  },
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 50 
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.6, 
      ease: 'easeOut' 
    } 
  },
};

// Floating animation for decorative elements
export const float: Variants = {
  animate: {
    y: [0, -15, 0],
    rotate: [0, 5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Button hover animation
export const buttonHover = {
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

// Card hover animation
export const cardHover = {
  hover: { 
    scale: 1.02,
    y: -5,
    transition: { duration: 0.3 }
  }
};

// Page transition
export const pageTransition: Variants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: 'easeOut' 
    } 
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    transition: { 
      duration: 0.3, 
      ease: 'easeIn' 
    } 
  }
};
