import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { DIRECTIONS } from '../utils/gameConstants';
import type { Direction } from '../types/game';

interface MobileControlsProps {
  onDirectionChange: (direction: Direction) => void;
}

const MobileControls: React.FC<MobileControlsProps> = ({ onDirectionChange }) => {
  return (
    <div className="fixed bottom-4 right-4 grid grid-cols-3 gap-2 bg-black/20 p-2 rounded-lg">
      <div className="col-start-2">
        <button
          className="w-12 h-12 flex items-center justify-center bg-[#32cd32] rounded-lg"
          onClick={() => onDirectionChange(DIRECTIONS.UP)}
        >
          <ArrowUp className="text-white" />
        </button>
      </div>
      <div className="col-start-1 col-span-3 grid grid-cols-3 gap-2">
        <button
          className="w-12 h-12 flex items-center justify-center bg-[#32cd32] rounded-lg"
          onClick={() => onDirectionChange(DIRECTIONS.LEFT)}
        >
          <ArrowLeft className="text-white" />
        </button>
        <button
          className="w-12 h-12 flex items-center justify-center bg-[#32cd32] rounded-lg"
          onClick={() => onDirectionChange(DIRECTIONS.DOWN)}
        >
          <ArrowDown className="text-white" />
        </button>
        <button
          className="w-12 h-12 flex items-center justify-center bg-[#32cd32] rounded-lg"
          onClick={() => onDirectionChange(DIRECTIONS.RIGHT)}
        >
          <ArrowRight className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default MobileControls;