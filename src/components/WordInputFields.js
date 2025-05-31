import React from 'react';
import { motion } from 'framer-motion';
import './WordInputFields.css';

const WordInputFields = ({ words, onWordChange }) => {
  const handleInputChange = (index, value) => {
    const newWords = [...words];
    newWords[index] = value;
    onWordChange(newWords);
  };

  return (
    <div className="word-inputs">
      {words.map((word, index) => (
        <motion.input
          key={index}
          type="text"
          placeholder={`ワード${index + 1}`}
          value={word}
          onChange={(e) => handleInputChange(index, e.target.value)}
          className="word-input"
          whileFocus={{ scale: 1.05, borderColor: '#55aaff' }}
        />
      ))}
    </div>
  );
};

export default WordInputFields;