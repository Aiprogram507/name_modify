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

  // キャラクターアニメーションの定義
  const characterAnimation = {
    initial: { y: 0, scaleY: 1 },
    animate: {
      y: [0, -3, 0, 2, 0], // わずかに浮遊する感じ
      scaleY: [1, 1, 1, 0.1, 1, 1, 1], // 瞬き (scaleYを0.1にすると潰れる)
      transition: {
        y: {
          duration: 3, // 浮遊アニメーションの周期
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "loop", // "mirror" だと往復
        },
        scaleY: {
          duration: 2.5, // 瞬きアニメーションの周期
          repeat: Infinity,
          repeatDelay: 1.5, // 瞬きの間隔
          ease: "easeInOut",
          times: [0, 0.4, 0.45, 0.5, 0.55, 0.95, 1] // 瞬きのタイミングを細かく制御
        }
      }
    }
  };
  // 瞬きだけならもっとシンプルに
  const blinkAnimation = {
    scaleY: [1, 0.1, 1],
    transition: {
        duration: 0.3,
        repeat: Infinity,
        repeatDelay: Math.random() * 3 + 2, // ランダムな間隔で瞬き
        times: [0, 0.5, 1]
    }
  }


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
          key={`${convention}-char`} // キーをユニークに保つ
          variants={characterAnimation} // 複雑なループアニメーション
          // animate={blinkAnimation} // 瞬きだけならこちら
          initial="initial" // variants を使う場合は文字列で指定
          animate="animate"   // variants を使う場合は文字列で指定
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