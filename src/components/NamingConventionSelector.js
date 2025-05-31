import React from 'react';
import { motion } from 'framer-motion';
import './NamingConventionSelector.css'; // スタイルは別途作成

const conventions = [
  { id: 'camelCase', name: 'キャメル🐪', color: '#f39c12' },
  { id: 'pascalCase', name: 'パスカル🐫', color: '#e67e22' },
  { id: 'snakeCase', name: 'スネーク🐍', color: '#2ecc71' },
  { id: 'kebabCase', name: 'ケバブ🍢', color: '#e74c3c' }, // おまけ
];

const NamingConventionSelector = ({ selectedConvention, onSelectConvention }) => {
  return (
    <div className="naming-selector">
      {conventions.map((conv) => (
        <motion.button
          key={conv.id}
          className={`selector-button ${selectedConvention === conv.id ? 'selected' : ''}`}
          onClick={() => onSelectConvention(conv.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            backgroundColor: selectedConvention === conv.id ? conv.color : '#ddd',
            color: selectedConvention === conv.id ? '#fff' : '#333',
          }}
          transition={{ duration: 0.3 }}
        >
          {conv.name}
        </motion.button>
      ))}
    </div>
  );
};

export default NamingConventionSelector;