// src/components/ResultDisplay.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import './ResultDisplay.css';

const ResultDisplay = ({ result, convention }) => {
  const containerControls = useAnimation(); // コンテナのアニメーション制御用
  const [previousResult, setPreviousResult] = useState(result); // 結果クリアを検知するため

  // a. 結果表示エリアの登場前フラッシュ
  useEffect(() => {
    if (result) { // 新しい結果が表示されるとき
      containerControls.start({
        backgroundColor: ["#555", "#888", "#444"], // 一瞬明るくなるような色の変化
        transition: { duration: 0.3, times: [0, 0.1, 1] },
      });
    }
    // b. 結果クリア時のアニメーションのために前の結果を保持
    if (result === '' && previousResult !== '') {
        // ここでパーティクルアニメーションをトリガーすることもできる (後述)
    }
    setPreviousResult(result);
  }, [result, containerControls, previousResult]);

  let animatedResultContent;

  if (result) {
      // (前回のエラー修正後の getAnimatedSpans 関数をここに配置)
      const getAnimatedSpans = (text, type) => {
        // ... (キャメルケース、スネークケースなどのアニメーションロジック) ...
        // (前回提案・修正したコードをそのまま使用)
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
          case 'snakeCase':
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
          case 'kebabCase':
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
                key={`${char}-${index}`} initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03, duration: 0.2 }}
                style={{ display: 'inline-block' }}
              >{char}</motion.span>
            ));
        }
      };

  animatedResultContent = (
        <motion.div
          key={convention + result}
          className="result-text"
          initial={{ opacity: 0.5, scale: 0.9 }} // 登場時の初期状態
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, transition: {duration: 0.15} }} // 退場アニメーション
          transition={{ duration: 0.25 }}
        >
          {getAnimatedSpans(result, convention)}
        </motion.div>
      );
    } else if (previousResult) { // 結果がクリアされたが、直前まで結果があった場合
      // b. クリア時のパーティクルアニメーション (簡易版)
      // 直前の文字列を元にパーティクルを生成
      animatedResultContent = (
          <motion.div
              key={"particles-" + previousResult} // ユニークなキー
              className="result-text" // スタイルは既存のものを流用するか専用に
              exit={{ opacity:0 }} // このコンテナ自体はすぐ消える
          >
              {previousResult.split('').map((char, i) => (
                  <motion.span
                      key={`particle-${i}`}
                      style={{ display: 'inline-block', position: 'relative' }} // 親に対して相対的
                      initial={{ opacity: 1, x:0, y:0 }}
                      animate={{
                          opacity: 0,
                          x: (Math.random() - 0.5) * 150, // ランダムな方向に飛ぶ
                          y: (Math.random() - 0.5) * 100,
                          scale: Math.random() * 0.5 + 0.2,
                          rotate: (Math.random() - 0.5) * 360,
                      }}
                      transition={{
                          duration: Math.random() * 0.5 + 0.3, // ランダムな継続時間
                          delay: Math.random() * 0.1, // 少し遅延させてバラバラ感を出す
                          ease: "easeOut"
                      }}
                  >
                      {char}
                  </motion.span>
              ))}
          </motion.div>
      );
    } else {
      animatedResultContent = <p className="result-placeholder">ここに変身結果が表示されるよ！</p>;
    }
  
  
    return (
      <motion.div // ★コンテナに animate prop を追加
        className="result-display-container"
        animate={containerControls} // ★制御用コントロールを接続
      >
        <AnimatePresence mode="wait">
          {animatedResultContent}
        </AnimatePresence>
      </motion.div>
    );
  };

export default ResultDisplay;