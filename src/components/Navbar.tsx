import { useState, useEffect, useRef } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa6';
import { GiCard5Spades } from 'react-icons/gi';
import { useGameContext } from '../context/GameContext';

const Navbar: React.FC = () => {
  const {
    isGameStarted,
    setIsGameStarted,
    setIsModelOpen,
    setIsPaused,
  } = useGameContext();
  const [seconds, setSeconds] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  useEffect(() => {
    if (isGameStarted) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isGameStarted]);

  const handleStart = () => {
    setIsGameStarted(true);
  };

  const handlePause = () => {
    setIsGameStarted(false);
    setIsModelOpen(true);
    setIsPaused(true);
  };

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(
      seconds
    ).padStart(2, '0')}`;
  };

  return (
    <nav className='w-[90%] mx-auto px-3 bg-black/70 h-[72px] text-white flex rounded-lg items-center justify-between'>
      <div className='flex items-center font-bold text-xl gap-1 cursor-pointer'>
        <GiCard5Spades size={30} />
        Solitaire
      </div>
      <div className='text-xl font-bold'>{formatTime(seconds)}</div>
      <div className='cursor-pointer flex'>
        {isGameStarted ? (
          <FaPause size={30} onClick={handlePause} />
        ) : (
          <FaPlay size={30} onClick={handleStart} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
