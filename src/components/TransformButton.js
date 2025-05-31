// src/components/TransformButton.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TransformButton.css'; // CSSも必要に応じて調整

const TransformButton = ({ onClick, isDisabled }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (!isDisabled && !isAnimating) { // アニメーション中は多重実行を防ぐ
      setIsAnimating(true);
      onClick(); // 親コンポーネントのonClickを実行

      // アニメーションの持続時間に合わせてisAnimatingをfalseに戻す
      // パーティクルアニメーションが最長で1秒程度かかることを想定
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000); // 1秒
    }
  };

  // 「✨」アイコンのアニメーション定義
  const magicIconVariants = {
    rest: {
      scale: 1,
      rotate: 0,
      color: '#FFD700', // 通常時の色 (金色など)
    },
    animate: { // クリック時
      scale: [1, 1.6, 1.2, 1.8, 1], // 振動するようなスケール変化
      rotate: [0, -20, 20, -10, 10, 0], // 杖を振るような回転
      color: ['#FFD700', '#FFFACD', '#FFD700', '#FFFFE0', '#FFD700'], // 色もキラキラさせる
      transition: {
        duration: 0.6, // アイコンアニメーションの時間
        ease: "easeInOut",
      },
    },
  };

  // パーティクルの設定
  const numParticles = 12; // パーティクルの数

  const particleVariants = {
    initial: { // 初期状態 (ボタンの中心あたりを想定)
      opacity: 0,
      scale: 0,
      x: 0,
      y: 0,
    },
    animate: (i) => { // iは各パーティクルのインデックス
      const angle = (i / numParticles) * (2 * Math.PI); // 放射状に広がるための角度
      const radius = Math.random() * 40 + 30; // 飛び散る距離 (30pxから70px)
      return {
        opacity: [1, 0.8, 0],
        scale: [Math.random() * 0.5 + 0.3, Math.random() * 0.3, 0.1], // 最初少し大きく、だんだん小さく
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        rotate: Math.random() * 360, // ランダムに回転
        transition: {
          duration: Math.random() * 0.6 + 0.4, // 0.4秒から1秒で消える
          delay: Math.random() * 0.1, // 少しずつタイミングをずらす
          ease: "easeOut",
        },
      };
    },
    exit: { // AnimatePresenceによる退場アニメーション (今回は使わないが一応)
        opacity:0,
        scale:0
    }
  };


  return (
    <div style={{ position: 'relative', display: 'inline-block' }}> {/* ボタンのコンテナ */}
      {/* パーティクルエフェクトコンテナ */}
      {/* AnimatePresenceを使う場合は、isAnimatingでラップされた要素の表示・非表示を管理 */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            style={{
              position: 'absolute',
              left: '50%', // ボタンの中心
              top: '50%',  // ボタンの中心
              width: '1px', // 中心点なのでサイズはほぼ不要
              height: '1px',
              zIndex: 10, // ボタンより手前
            }}
          >
            {[...Array(numParticles)].map((_, i) => (
              <motion.div
                key={i}
                className="particle" // CSSで基本スタイルも設定可能
                variants={particleVariants}
                initial="initial"
                animate="animate"
                // exit="exit" // 必要なら
                custom={i} // variantsの関数にインデックスを渡す
                style={{
                  position: 'absolute', // 親(中心点)からの相対位置
                  width: '10px', // パーティクルのサイズ
                  height: '10px',
                  borderRadius: '50%',
                  // キラキラした色 (hslで色相をランダムにするとカラフルに)
                  backgroundColor: `hsl(${Math.random() * 60 + 210}, 100%, ${Math.random() * 30 + 60}%)`, // 青～紫～ピンク系の明るい色
                  // backgroundColor: `hsl(${Math.random() * 360}, 100%, 70%)`, // 完全ランダムカラー
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 元のボタン */}
      <motion.button
        className="transform-button"
        onClick={handleClick}
        disabled={isDisabled || isAnimating} // アニメーション中も無効化
        whileHover={{ scale: (isDisabled || isAnimating) ? 1 : 1.05, boxShadow: (isDisabled || isAnimating) ? "none" : "0px 0px 15px rgba(255,223,0,0.7)" }}
        whileTap={{ scale: (isDisabled || isAnimating) ? 1 : 0.95 }}
        animate={{ // isAnimating中のボタン自体のスタイルは任意
          backgroundColor: isDisabled ? '#aaa' : (isAnimating ? '#f0c400' : '#ffdf00'), // アニメ中は少し暗くするなど
          color: isDisabled ? '#666' : '#333',
          boxShadow: isDisabled ? "none" : "0px 0px 8px rgba(255,223,0,0.5)",
        }}
        transition={{ duration: 0.2 }}
        style={{ position: 'relative', zIndex: 1 }} // パーティクルコンテナより奥だが、他の要素よりは手前
      >
        <motion.span
          style={{ display: 'inline-block', marginRight: '5px' }}
          variants={magicIconVariants}
          animate={isAnimating ? "animate" : "rest"}
        >
          ✨
        </motion.span>
        魔法をかける！
        <motion.span
          style={{ display: 'inline-block', marginLeft: '5px' }}
          variants={magicIconVariants}
          animate={isAnimating ? "animate" : "rest"}
        >
          ✨
        </motion.span>
      </motion.button>
    </div>
  );
};


export default TransformButton;