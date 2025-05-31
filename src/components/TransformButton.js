// src/components/TransformButton.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TransformButton.css'; // CSSも必要に応じて調整

const TransformButton = ({ onClick, isDisabled }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (!isDisabled) {
      setIsClicked(true); // アニメーションを開始
      onClick(); // 親コンポーネントのonClickを実行
    }
  };

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {/* 衝撃波エフェクト */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            key="shockwave"
            className="shockwave" // CSSでスタイルを定義
            initial={{ scale: 0, opacity: 0.7 }}
            animate={{ scale: 3, opacity: 0 }} // ボタンのサイズに合わせてscale調整
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onAnimationComplete={() => setIsClicked(false)} // アニメーション完了後にリセット
            style={{
              position: 'absolute',
              // ボタンの中心に配置されるように調整が必要な場合がある
              // width/heightはボタンより少し大きめから始めると良い
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 223, 0, 0.5)', // ボタンの色に合わせるか、魔法っぽい色
              zIndex: -1, // ボタンの背面に表示
            }}
          />
        )}
      </AnimatePresence>

      {/* 元のボタン */}
      <motion.button
        className="transform-button"
        onClick={handleClick}
        disabled={isDisabled}
        whileHover={{ scale: isDisabled ? 1 : 1.05, boxShadow: isDisabled ? "none" : "0px 0px 15px rgba(255,223,0,0.7)" }}
        whileTap={{ scale: isDisabled ? 1 : 0.95 }}
        animate={{
          backgroundColor: isDisabled ? '#aaa' : '#ffdf00',
          color: isDisabled ? '#666' : '#333',
          boxShadow: isDisabled ? "none" : "0px 0px 8px rgba(255,223,0,0.5)",
        }}
        transition={{ duration: 0.2 }}
        style={{ zIndex: 1 }} // ボタンを手前に
      >
        ✨ 魔法をかける！ ✨
      </motion.button>
    </div>
  );
};

export default TransformButton;