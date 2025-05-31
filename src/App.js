import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import NamingConventionSelector from './components/NamingConventionSelector';
import DescriptionArea from './components/DescriptionArea';
import WordInputFields from './components/WordInputFields';
import TransformButton from './components/TransformButton';
import ResultDisplay from './components/ResultDisplay';
import QuizArea from './components/QuizArea'; // クイズエリアをインポート
import { toCamelCase, toPascalCase, toSnakeCase, toKebabCase } from './utils/namingUtils';

// NamingConventionSelectorで定義したものと合わせる
const conventionsForQuiz = [
  { id: 'camelCase', name: 'キャメル🐪' },
  { id: 'pascalCase', name: 'パスカル🐫' },
  { id: 'snakeCase', name: 'スネーク🐍' },
  { id: 'kebabCase', name: 'ケバブ🍢' },
];


function App() {
  const [selectedConvention, setSelectedConvention] = useState('camelCase'); // 初期選択
  const [words, setWords] = useState(['user', 'name', '']); // 単語入力の初期値
  const [transformedName, setTransformedName] = useState('');
  const [showConfetti, setShowConfetti] = useState(false); // 紙吹雪アニメーション用

  const handleTransform = () => {
    const validWords = words.filter(word => word.trim() !== '');
    if (validWords.length === 0) {
      setTransformedName('');
      return;
    }

    let result = '';
    switch (selectedConvention) {
      case 'camelCase':
        result = toCamelCase(validWords);
        break;
      case 'pascalCase':
        result = toPascalCase(validWords);
        break;
      case 'snakeCase':
        result = toSnakeCase(validWords);
        break;
      case 'kebabCase': // おまけ
        result = toKebabCase(validWords);
        break;
      default:
        result = '不明な規則です';
    }
    setTransformedName(result);

    // 変換成功時にアニメーションを発動
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000); // 2秒後に非表示
  };

  // 単語が変更されたら、変換結果をクリアする (任意)
  useEffect(() => {
    setTransformedName('');
  }, [words, selectedConvention]);

  return (
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
        />
        <DescriptionArea convention={selectedConvention} />
        <WordInputFields words={words} onWordChange={setWords} />
        <TransformButton
          onClick={handleTransform}
          isDisabled={words.every(word => word.trim() === '')}
        />
        <ResultDisplay result={transformedName} convention={selectedConvention} />
        {/* 紙吹雪エフェクト (framer-motionで簡易的に) */}
        {showConfetti && (
          <motion.div
            className="confetti-container" // CSSでposition:absoluteとoverflow:hiddenを設定
            style={{
              position: 'fixed',
              top: 0, left: 0, width: '100%', height: '100%',
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
                  position: 'absolute',
                  width: 10, height: 20,
                  backgroundColor: `hsl(${Math.random() * 360}, 100%, 70%)`, // ランダムな色
                  borderRadius: '50%',
                }}
              />
            ))}
          </motion.div>
        )}
        <QuizArea conventions={conventionsForQuiz} />
      </main>
      <footer className="App-footer">
        <p>楽しく学ぼう！</p>
      </footer>
    </motion.div>
  );
}

export default App;