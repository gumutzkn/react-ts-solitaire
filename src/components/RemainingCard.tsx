import { useGameContext } from '../context/GameContext';

import back from '../assets/card-backgrounds/back9.jpg';

const RemainingCard: React.FC = () => {
  const { handleRemainingCardClick } = useGameContext();

  return (
    <div
      onClick={handleRemainingCardClick}
      className='h-[170px] w-[120px] cursor-pointer -ml-36'
    >
      <img
        src={back}
        alt='Card back'
        className='h-full w-full object-cover'
      />
    </div>
  );
};

export default RemainingCard;
