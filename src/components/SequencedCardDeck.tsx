import _K_spades from '../assets/spades/K.png';
import _K_hearts from '../assets/hearts/K.png';
import _K_diamonds from '../assets/diamonds/K.png';
import _K_clubs from '../assets/clubs/K.png';

type SequencedCardDeckProps = {
  suit: 'spades' | 'hearts' | 'diamonds' | 'clubs';
};

const SequencedCardDeck: React.FC<SequencedCardDeckProps> = ({
  suit,
}) => {
  const cardImage = (() => {
    switch (suit) {
      case 'spades':
        return _K_spades;
      case 'hearts':
        return _K_hearts;
      case 'diamonds':
        return _K_diamonds;
      case 'clubs':
        return _K_clubs;
      default:
        return _K_spades;
    }
  })();

  return (
    <div className='h-[170px] w-[120px] rounded overflow-hidden border-8 border-gray-400'>
      <img
        src={cardImage}
        alt='King of spades'
        className='h-full w-full object-cover'
      />
    </div>
  );
};

export default SequencedCardDeck;
