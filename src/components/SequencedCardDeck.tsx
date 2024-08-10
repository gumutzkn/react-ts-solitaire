import _K from '../assets/spades/K.png';

const SequencedCardDeck: React.FC = () => {
  return (
    <div className='h-[170px] w-[120px] rounded overflow-hidden border-8 border-gray-400'>
      <img
        src={_K}
        alt='King of spades'
        className='h-full w-full object-cover'
      />
    </div>
  );
};

export default SequencedCardDeck;
