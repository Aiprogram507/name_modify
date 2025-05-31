import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './DescriptionArea.css';

const descriptions = {
  camelCase: {
    title: '🐪 キャメルケースとは？',
    text: '最初の単語は小文字で、以降の単語の先頭を大文字でつなげるよ！ (例: userName)',
    char: '🐪',
  },
  pascalCase: {
    title: '🐫 パスカルケースとは？',
    text: 'すべての単語の先頭を大文字でつなげるよ！ (例: UserName)',
    char: '🐫',
  },
  snakeCase: {
    title: '🐍 スネークケースとは？',
    text: '単語をアンダースコア(_)でつなげ、全て小文字だよ！ (例: user_name)',
    char: '🐍',
  },
  kebabCase: {
    title: '🍢 ケバブケースとは？',
    text: '単語をハイフン(-)でつなげ、全て小文字だよ！ (例: user-name)',
    char: '🍢',
  },
  default: {
    title: '🤔 命名規則を選んでね！',
    text: '上のボタンから好きな命名規則を選んでみよう！',
    char: '✨',
  }
};

const DescriptionArea = ({ convention }) => {
  const currentDesc = descriptions[convention] || descriptions.default;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={convention || 'default'}
        className="description-area"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <motion.span
          className="description-char"
          key={`${convention}-char`}
          initial={{ scale: 0.5, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        >
          {currentDesc.char}
        </motion.span>
        <h3>{currentDesc.title}</h3>
        <p>{currentDesc.text}</p>
      </motion.div>
    </AnimatePresence>
  );
};

export default DescriptionArea;