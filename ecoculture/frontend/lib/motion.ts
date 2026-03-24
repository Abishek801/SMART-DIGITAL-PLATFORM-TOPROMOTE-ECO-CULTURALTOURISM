export const springConfigs = {
  gentle: { stiffness: 60, damping: 20, mass: 1 },
  snappy: { stiffness: 300, damping: 30, mass: 0.8 },
  bouncy: { stiffness: 400, damping: 15, mass: 1 },
  sluggish: { stiffness: 40, damping: 25, mass: 2 },
};

export const transitionStates = {
  sectionEnter: {
    initial: { y: 40, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { ease: "easeOut", duration: 0.7 }
  }
};
