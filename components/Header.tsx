
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="p-4 border-b border-gray-700/50 shadow-lg bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
      <h1 className="text-2xl md:text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
        AI Website Weaver
      </h1>
    </header>
  );
};
