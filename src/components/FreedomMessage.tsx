import React, { useEffect, useState } from 'react';
import { useGameAudio } from '../hooks/useGameAudio';
import CelebrationScreen from './CelebrationScreen';

interface FreedomMessageProps {
  show: boolean;
}

const FreedomMessage: React.FC<FreedomMessageProps> = ({ show }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const { playVictoryMusic } = useGameAudio();

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      playVictoryMusic();
      
      // Start fade out after 3 seconds
      const fadeTimeout = setTimeout(() => {
        setIsVisible(false);
        // Show celebration screen after freedom message fades
        setShowCelebration(true);
      }, 3000);

      return () => clearTimeout(fadeTimeout);
    }
  }, [show, playVictoryMusic]);

  if (!show) return null;

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="flex">
            {'FREEDOM!'.split('').map((letter, index) => (
              <span
                key={index}
                className="text-[15vw] font-bold transition-opacity duration-1000"
                style={{
                  color: `hsl(${index * 45}, 100%, 50%)`,
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: `${index * 100}ms`
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      )}
      {showCelebration && <CelebrationScreen />}
    </>
  );
};

export default FreedomMessage;