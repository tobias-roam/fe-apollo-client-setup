import React from 'react';
import { motion } from 'framer-motion';

const SlideDown: React.FC<React.PropsWithChildren> = ({ children }) => (
  <motion.div animate={{
    translateY: 0,
    opacity: 1,
  }} initial={{
    translateY: '-50vh',
    opacity: 0,
  }}>{children}</motion.div>
);
export default SlideDown