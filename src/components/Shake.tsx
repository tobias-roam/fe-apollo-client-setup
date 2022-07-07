import React from 'react';
import { motion } from 'framer-motion';

const Shake: React.FC<React.PropsWithChildren> = ({ children }) => (
  <motion.div
    animate={{
      translateX: [-2, 0, 2],
      translateY: [-1, 0, 1],
      transition: {
        repeat: Infinity,
        duration: Math.random() * 0.007 + 0.023
      }
    }}
  >{children}</motion.div>
);
export default Shake