import React from 'react';
import BunnyGame from './components/BunnyGame';

function App() {
  return (
    <div className="w-screen h-screen bg-[#ff00ff] flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full max-w-[1200px] max-h-[800px] m-4">
        <BunnyGame />
      </div>
    </div>
  );
}

export default App;