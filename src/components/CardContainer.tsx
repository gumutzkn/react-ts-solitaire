import { useDrop } from 'react-dnd';

import { useGameContext } from '../context/GameContext';

import cardFlipSound from '../assets/card-sounds/card_drop.mp3';

interface CardContainerProps {
  children: React.ReactNode;
  columnId: number;
}

const CardContainer: React.FC<CardContainerProps> = ({
  children,
  columnId,
}) => {
  const { handleDrop, cardFlipRef } = useGameContext();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: (item: { id: string; columnId: number }) => {
      handleDrop(item.id, item.columnId, columnId);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`w-[110px] relative
        z-10 ${
          !children ? 'rounded-2xl border-4 border-slate-500' : ''
        } ${isOver ? 'bg-yellow-200' : ''}
      `}
    >
      <audio
        ref={cardFlipRef}
        src={cardFlipSound}
        style={{ display: 'none' }}
      />
      {children}
    </div>
  );
};

export default CardContainer;
