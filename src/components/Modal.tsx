import { useGameContext } from '../context/GameContext';

const Modal = () => {
  const {
    setIsGameStarted,
    setIsModelOpen,
    isPaused,
    setIsPaused,
    isGameWon,
  } = useGameContext();

  const handleStartModal = () => {
    setIsGameStarted(true);
    setIsModelOpen(false);
  };

  const handleContinueModal = () => {
    setIsModelOpen(false);
    setIsGameStarted(true);
    setIsPaused(false);
  };

  const handleRestartGame = () => {
    window.location.reload();
  };

  if (isGameWon) {
    return (
      <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black/75'>
        <div className='max-w-md p-8 rounded-lg relative bg-white shadow-2xl shadow-indigo-50'>
          <h1 className='font-bold text-3xl text-center mt-4'>
            Congratulations! You won the game!
          </h1>
          <button
            onClick={handleRestartGame}
            className='rounded-md px-4 py-3 block mx-auto font-bold mt-7 text-base bg-black text-white outline-none'
          >
            Restart Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black/75'>
      <div className='max-w-md p-8 rounded-lg relative bg-white shadow-2xl shadow-indigo-50'>
        <h1 className='font-bold text-3xl text-center mt-4'>
          {isPaused
            ? 'Game is paused. Do you want to continue?'
            : 'Welcome to Solitaire Game!'}
        </h1>
        <button
          onClick={isPaused ? handleContinueModal : handleStartModal}
          className='rounded-md px-4 py-3 block mx-auto font-bold mt-7 text-base bg-black text-white outline-none'
        >
          {isPaused ? 'Countinue Game' : 'Start Game'}
        </button>
      </div>
    </div>
  );
};

export default Modal;
