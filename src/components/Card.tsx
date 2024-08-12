import { useDrag } from 'react-dnd';

import { cardImages } from '../utils';

interface CardProps {
  id: string;
  index: number;
  rank: string;
  isFaceUp: boolean;
  columnId: number;
  suit: string;
}

const Card: React.FC<CardProps> = ({
  index,
  rank,
  isFaceUp,
  suit,
  id,
  columnId,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'CARD',
      item: { id, index, columnId },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [id, index, columnId, isFaceUp]
  );

  let imgSrc: string;

  if (isFaceUp) {
    const suitImages = cardImages[suit];
    if (typeof suitImages === 'object') {
      imgSrc = suitImages[rank];
    } else {
      imgSrc = cardImages.back as string;
    }
  } else {
    imgSrc = cardImages.back as string;
  }

  return (
    <div
      ref={isFaceUp ? drag : null}
      className={`
        h-[165px]
        relative
        z-10
        ${isDragging ? 'opacity-60' : ''}
        ${index !== 0 ? '-mt-32' : ''}
      `}
    >
      <img
        src={imgSrc}
        alt={isFaceUp ? `${rank} of spades` : 'Card back'}
        className={`h-full w-full object-contain ${
          !isFaceUp ? 'object-cover' : 'object-contain'
        }`}
      />
    </div>
  );
};

export default Card;
