// src/App.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import NamingConventionSelector from './components/NamingConventionSelector';
import DescriptionArea from './components/DescriptionArea';
import WordInputFields from './components/WordInputFields';
import TransformButton from './components/TransformButton';
import ResultDisplay from './components/ResultDisplay';
import QuizArea from './components/QuizArea';
import { toCamelCase, toPascalCase, toSnakeCase, toKebabCase } from './utils/namingUtils';

const conventions = [
  { id: 'camelCase', name: 'キャメル🐪', color: '#f39c12', gradientColor: 'rgba(243, 156, 18, 0.3)' },
  { id: 'pascalCase', name: 'パスカル🐫', color: '#e67e22', gradientColor: 'rgba(230, 126, 34, 0.3)' },
  { id: 'snakeCase', name: 'スネーク🐍', color: '#2ecc71', gradientColor: 'rgba(46, 204, 113, 0.3)' },
  { id: 'kebabCase', name: 'ケバブ🍢', color: '#e74c3c', gradientColor: 'rgba(231, 76, 60, 0.3)' },
  //{ id: 'default', name: 'デフォルト', color: '#95a5a6', gradientColor: 'rgba(149, 165, 166, 0.2)'}
];

function App() {
  const [selectedConvention, setSelectedConvention] = useState('camelCase');
  const [words, setWords] = useState(['user', 'name', '']);
  const [transformedName, setTransformedName] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [backgroundGradient, setBackgroundGradient] = useState('');

  const handleTransform = () => {
    const validWords = words.filter(word => word.trim() !== '');
    if (validWords.length === 0) {
      setTransformedName('');
      return;
    }
    let result = '';
    switch (selectedConvention) {
      case 'camelCase': result = toCamelCase(validWords); break;
      case 'pascalCase': result = toPascalCase(validWords); break;
      case 'snakeCase': result = toSnakeCase(validWords); break;
      case 'kebabCase': result = toKebabCase(validWords); break;
      default: result = '不明な規則です';
    }
    setTransformedName(result);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  // 単語入力時に変換結果をクリア
  useEffect(() => {
    setTransformedName('');
  }, [words, selectedConvention]);

  // 命名規則選択時に背景エフェクトを実行
  useEffect(() => {
    const currentTheme = conventions.find(c => c.id === selectedConvention);
    if (currentTheme) {
      setBackgroundGradient(
        `radial-gradient(circle, ${currentTheme.gradientColor} 0%, transparent 70%)`
      );
      const timer = setTimeout(() => {
        setBackgroundGradient('');
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [selectedConvention]); // ★ 依存配列を selectedConvention のみに変更

  return (
    <div className="app-container">
      <AnimatePresence>
        {backgroundGradient && (
          <motion.div
            key="background-effect"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.5 }}
            exit={{ opacity: 0, scale: 2, transition: { duration: 0.4, ease: "easeIn" } }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
              background: backgroundGradient, zIndex: -1, pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>
      
      <motion.div
        className="App"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <header className="App-header">
          <h1>👑 名付けマスターへの道！ 👑</h1>
        </header>
        <main className="App-main">
          <NamingConventionSelector
            selectedConvention={selectedConvention}
            onSelectConvention={setSelectedConvention}
            // conventions={conventions} // ★ NamingConventionSelector が conventions を使うなら渡す
          />
          <DescriptionArea
            convention={selectedConvention}
            conventions={conventions} // ★ DescriptionArea に conventions を渡す
          />
          <WordInputFields words={words} onWordChange={setWords} />
          <TransformButton
            onClick={handleTransform}
            isDisabled={words.every(word => word.trim() === '')}
          />
          <ResultDisplay result={transformedName} convention={selectedConvention} />
          {showConfetti && (
            <motion.div
              className="confetti-container"
              style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                pointerEvents: 'none', zIndex: 9999, overflow: 'hidden'
              }}
            >
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -20, opacity: 1, x: Math.random() * window.innerWidth, scale: Math.random() * 0.5 + 0.5 }}
                  animate={{ y: window.innerHeight + 50, opacity: 0, rotate: Math.random() * 720 }}
                  transition={{ duration: Math.random() * 2 + 1, delay: Math.random() * 0.5, ease: "linear" }}
                  style={{
                    position: 'absolute', width: 10, height: 20,
                    backgroundColor: `hsl(${Math.random() * 360}, 100%, 70%)`,
                    borderRadius: '50%',
                  }}
                />
              ))}
            </motion.div>
          )}
          <QuizArea conventions={conventions} /> {/* ★ conventionsForQuiz の代わりに conventions を使う例 */}
        </main>
        
      </motion.div>
    </div>
  );
}

export default App;