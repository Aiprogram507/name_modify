import React from 'react';
import { motion } from 'framer-motion';
import './TransformButton.css';

const TransformButton = ({ onClick, isDisabled }) => {
  return (
    <motion.button
      className="transform-button"
      onClick={onClick}
      disabled={isDisabled}
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255,223,0,0.7)" }}
      whileTap={{ scale: 0.95 }}
      animate={{
        backgroundColor: isDisabled ? '#aaa' : '#ffdf00', // 金色っぽい色
        color: isDisabled ? '#666' : '#333',
        boxShadow: isDisabled ? "none" : "0px 0px 8px rgba(255,223,0,0.5)",
      }}
      transition={{ duration: 0.2 }}
    >
      ✨ 魔法をかける！ ✨
    </motion.button>
  );
};

export default TransformButton;