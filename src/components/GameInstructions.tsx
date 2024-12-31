import React from 'react';

const GameInstructions: React.FC = () => {
  return (
    <div className="fixed top-4 left-4 bg-[#32cd32] p-4 rounded-lg text-black font-['VT323'] text-xl max-w-xs">
      <h2 className="text-2xl mb-2">How to Play:</h2>
      <ul className="list-disc list-inside">
        <li>Use Arrow Keys or on-screen controls</li>
        <li>Collect all the dots to win</li>
        <li>Avoid hitting the walls</li>
      </ul>
    </div>
  );
};

export default GameInstructions;