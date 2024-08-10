import { useDrag } from 'react-dnd';

import _1 from '../assets/spades/A.png';
import _2 from '../assets/spades/2.png';
import _3 from '../assets/spades/3.png';
import _4 from '../assets/spades/4.png';
import _5 from '../assets/spades/5.png';
import _6 from '../assets/spades/6.png';
import _7 from '../assets/spades/7.png';
import _8 from '../assets/spades/8.png';
import _9 from '../assets/spades/9.png';
import _10 from '../assets/spades/10.png';
import J from '../assets/spades/J.png';
import Q from '../assets/spades/Q.png';
import K from '../assets/spades/K.png';
import back from '../assets/card-backgrounds/back9.jpg';

const cardImages: { [key: string]: string } = {
  A: _1,
  2: _2,
  3: _3,
  4: _4,
  5: _5,
  6: _6,
  7: _7,
  8: _8,
  9: _9,
  10: _10,
  J,
  Q,
  K,
  back,
};

interface CardProps {
  id: string;
  index: number;
  rank: string;
  isFaceUp: boolean;
  columnId: number;
}

const Card: React.FC<CardProps> = ({
  index,
  rank,
  isFaceUp,
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

  const imgSrc = isFaceUp ? cardImages[rank] : cardImages.back;

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
