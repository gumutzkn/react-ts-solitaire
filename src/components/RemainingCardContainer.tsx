import { useGameContext } from '../context/GameContext';

import shuffleSound from '../assets/card-sounds/shuffle-cards.mp3';

interface RemainingCardContainerProps {
  children: React.ReactNode;
}

const RemainingCardContainer: React.FC<RemainingCardContainerProps> =
  ({ children }) => {
    const { shuffleSoundRef } = useGameContext();

    const handlePlayAudio = () => {
      if (shuffleSoundRef.current) {
        shuffleSoundRef.current.play();
      }
    };

    return (
      <div onClick={handlePlayAudio} className='flex'>
        <audio
          ref={shuffleSoundRef}
          src={shuffleSound}
          style={{ display: 'none' }}
        />
        {children}
      </div>
    );
  };

export default RemainingCardContainer;
