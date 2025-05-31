import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './QuizArea.css';

const QuizArea = ({ conventions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const generateQuestion = () => {
    // ここでランダムな単語と命名規則で問題と選択肢を生成するロジック
    const exampleWords = ["test", "variable", "name"];
    const correctConventionId = conventions[Math.floor(Math.random() * conventions.length)].id;
    let correctAnswerText = "";
    // 仮の変換ロジック (本来はnamingUtilsを使う)
    if (correctConventionId === 'camelCase') correctAnswerText = "testVariableName";
    else if (correctConventionId === 'pascalCase') correctAnswerText = "TestVariableName";
    else if (correctConventionId === 'snakeCase') correctAnswerText = "test_variable_name";
    else correctAnswerText = "test-variable-name";


    const options = conventions.map(c => ({
      id: c.id,
      name: c.name.replace(/[\u{1F300}-\u{1FADF}]/gu, '').trim() // 絵文字除去
    }));
    // シャッフル
    options.sort(() => Math.random() - 0.5);


    setCurrentQuestion({
      text: `「${correctAnswerText}」これは何ケース？`,
      correctAnswer: correctConventionId,
      options: options,
    });
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  useEffect(() => {
    if (conventions && conventions.length > 0) {
        generateQuestion();
    }
  }, [conventions]); // conventionsが利用可能になったら最初の問題を生成

  const handleAnswer = (optionId) => {
    setSelectedAnswer(optionId);
    if (optionId === currentQuestion.correctAnswer) {
      setIsCorrect(true);
      // 正解アニメーションや次の問題へ
      setTimeout(generateQuestion, 1500); // 1.5秒後に次の問題
    } else {
      setIsCorrect(false);
      // 不正解アニメーション
    }
  };

  if (!currentQuestion) return <div className="quiz-loading">クイズ準備中...</div>;

  return (
    <motion.div
      className="quiz-area"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h4>💡 クイズタイム！ 💡</h4>
      <p className="quiz-question">{currentQuestion.text}</p>
      <div className="quiz-options">
        {currentQuestion.options.map((opt) => (
          <motion.button
            key={opt.id}
            onClick={() => handleAnswer(opt.id)}
            className={`quiz-option-button ${selectedAnswer === opt.id ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
            disabled={selectedAnswer !== null}
            whileHover={{ scale: selectedAnswer === null ? 1.05 : 1 }}
            whileTap={{ scale: selectedAnswer === null ? 0.95 : 1 }}
          >
            {opt.name}
          </motion.button>
        ))}
      </div>
      {isCorrect === true && <motion.p className="feedback correct-feedback" initial={{scale:0.5, opacity:0}} animate={{scale:1, opacity:1}}>🎉 正解！ 🎉</motion.p>}
      {isCorrect === false && <motion.p className="feedback incorrect-feedback" initial={{x:-10, opacity:0}} animate={{x:0, opacity:1}} transition={{type:'spring', stiffness:500}}>🤔 残念！正解は「{conventions.find(c=>c.id === currentQuestion.correctAnswer)?.name.replace(/[\u{1F300}-\u{1FADF}]/gu, '').trim()}」だよ</motion.p>}
    </motion.div>
  );
};

export default QuizArea;