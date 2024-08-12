import { useEffect } from 'react';

import {
  Card,
  CardContainer,
  RemainingCardContainer,
  RemainingCard,
  SequencedCardDeck,
} from './';

import { useGameContext } from '../context/GameContext';

const GameBoard = () => {
  const {
    columns,
    visibleRemainingCards,
    countSequence,
    setIsGameWon,
    setIsModelOpen,
    setIsGameStarted,
    isColumnEmpty,
    suitOption,
  } = useGameContext();

  useEffect(() => {
    const winningSequences =
      suitOption === 1 ? 8 : suitOption === 2 ? 4 : 2;

    if (countSequence === winningSequences) {
      setIsGameWon(true);
      setIsModelOpen(true);
      setIsGameStarted(false);
    }
  }, [countSequence, suitOption]);

  return (
    <div className='w-[98%] md:w-[90%] min-h-[calc(100vh-72px)] mx-auto py-3 flex flex-col justify-between gap-10'>
      <div className='card-container flex justify-between'>
        {columns.map((column, columnIndex) => (
          <CardContainer key={columnIndex} columnId={columnIndex}>
            {column.map((card, cardIndex) => (
              <Card
                key={card.id}
                id={card.id}
                rank={card.rank}
                suit={card.suit}
                index={cardIndex}
                isFaceUp={card.isFaceUp}
                columnId={columnIndex}
              />
            ))}
          </CardContainer>
        ))}
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          {Array.from({ length: countSequence }).map((_, index) => (
            <SequencedCardDeck key={index} />
          ))}
        </div>
        <div className='relative'>
          {isColumnEmpty && (
            <div className='absolute -top-16 right-64 w-[300px] py-3 pl-5 text-white rounded-lg bg-black/70'>
              Herhangi bir sütun boşken kart dağıtamazsınız!
            </div>
          )}
          <RemainingCardContainer>
            {visibleRemainingCards.map((_, index) => (
              <RemainingCard key={index} />
            ))}
          </RemainingCardContainer>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
