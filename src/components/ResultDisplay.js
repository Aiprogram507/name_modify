// src/components/ResultDisplay.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ResultDisplay.css';

const ResultDisplay = ({ result, convention }) => {
  if (!result) {
    return <p className="result-placeholder">ここに変身結果が表示されるよ！</p>;
  }

  const getAnimatedSpans = (text, type) => {
    let parts = [];
    switch (type) {
      case 'camelCase':
        parts = text.replace(/([A-Z])/g, ' $1').trim().split(' ');
        return parts.map((word, wordIndex) => (
          <span key={wordIndex} style={{ display: 'inline-block' }}>
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={`${char}-${wordIndex}-${charIndex}`}
                style={{ display: 'inline-block' }}
                initial={{ opacity: 0, y: (wordIndex > 0 && charIndex === 0) ? 15 : -10, scale: (wordIndex > 0 && charIndex === 0) ? 0.5 : 1 }}
                animate={{ opacity: 1, y: 0, scale: (wordIndex > 0 && charIndex === 0) ? [1, 1.3, 1] : 1 }}
                transition={{
                  delay: (wordIndex * word.length + charIndex) * 0.06,
                  duration: (wordIndex > 0 && charIndex === 0) ? 0.6 : 0.3, // アニメーション時間
                  // type: "spring" ではなく、ease や times で調整
                  ease: (wordIndex > 0 && charIndex === 0) ? "anticipate" : "easeOut", // 例: anticipate は少し溜めてから動く
                  times: (wordIndex > 0 && charIndex === 0) ? [0, 0.7, 1] : undefined, // キーフレームのタイミング
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ));

      case 'snakeCase': // こちらは元々 spring を複雑なキーフレームで使っていなかったので、問題なければそのまま
        parts = text.split('');
        return parts.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            style={{ display: 'inline-block', color: char === '_' ? 'limegreen' : 'inherit' }}
            initial={{ opacity: 0, x: char === '_' ? -20 : (Math.random() - 0.5) * 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.05,
              duration: char === '_' ? 0.5 : 0.3,
              type: char === '_' ? "spring" : "easeOut", // springは2キーフレームならOK
              stiffness: char === '_' ? 100 : undefined,
            }}
          >
            {char === '_' ? <strong>{char}</strong> : char}
          </motion.span>
        ));

      case 'pascalCase':
        parts = text.replace(/([A-Z])/g, ' $1').trim().split(' ');
        return parts.map((word, wordIndex) => (
          <span key={wordIndex} style={{ display: 'inline-block' }}>
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={`${char}-${wordIndex}-${charIndex}`}
                style={{ display: 'inline-block', fontWeight: charIndex === 0 ? 'bold' : 'normal' }}
                initial={{ opacity: 0, y: charIndex === 0 ? 20 : -10, scale: charIndex === 0 ? 0.3 : 1 }}
                animate={{ opacity: 1, y: 0, scale: charIndex === 0 ? [1, 1.4, 1] : 1 }}
                transition={{
                  delay: (wordIndex * word.length + charIndex) * 0.05,
                  duration: 0.6, // アニメーション時間
                  // type: "spring" ではなく、ease や times で調整
                  ease: "easeInOut", // 例: easeInOut
                  times: [0, 0.5, 1], // キーフレームのタイミング (0%で1, 50%で1.4, 100%で1に戻る)
                }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ));

      case 'kebabCase': // こちらも元々 spring を複雑なキーフレームで使っていなかったので、問題なければそのまま
        parts = text.split('');
        return parts.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            style={{ display: 'inline-block', color: char === '-' ? 'tomato' : 'inherit' }}
            initial={{ opacity: 0, rotate: char === '-' ? 90 : 0, scale: char === '-' ? 0.2 : 1 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{
              delay: index * 0.07,
              duration: 0.4,
              type: "spring", // springは2キーフレームならOK
            }}
          >
            {char === '-' ? <strong>{char}</strong> : char}
          </motion.span>
        ));

      default:
        return text.split('').map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03, duration: 0.2 }}
            style={{ display: 'inline-block' }}
          >
            {char}
          </motion.span>
        ));
    }
  };

  const animatedResult = (
    <motion.div
      key={convention + result}
      className="result-text"
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
    >
      {getAnimatedSpans(result, convention)}
    </motion.div>
  );

  return (
    <div className="result-display-container">
      <AnimatePresence mode="wait">
        {animatedResult}
      </AnimatePresence>
    </div>
  );
};

export default ResultDisplay;