
import React from 'react';

interface SyntaxProps {
  children: React.ReactNode;
  type: 'keyword' | 'type' | 'variable' | 'value' | 'comment' | 'string' | 'method' | 'operator' | 'brace';
}

export const Syntax: React.FC<SyntaxProps> = ({ children, type }) => {
  const colors = {
    keyword: 'text-pink-400',
    type: 'text-orange-300',
    variable: 'text-blue-300',
    value: 'text-purple-400',
    comment: 'text-gray-500 italic',
    string: 'text-green-400',
    method: 'text-yellow-200',
    operator: 'text-blue-400',
    brace: 'text-gray-300'
  };

  return <span className={`${colors[type]} font-mono`}>{children}</span>;
};
