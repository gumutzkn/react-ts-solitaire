import React, { useEffect, useRef } from 'react';

import victorySound from '../assets/card-sounds/victory.mp3';

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
    completedSequences,
  } = useGameContext();

  const victoryAudioRef = useRef(new Audio(victorySound));

  useEffect(() => {
    if (countSequence === 8) {
      setIsGameWon(true);
      setIsModelOpen(true);
      setIsGameStarted(false);

      if (victoryAudioRef.current) {
        victoryAudioRef.current.play();
      }
    }
  }, [countSequence]);

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
          {completedSequences.map((suit, index) => (
            <SequencedCardDeck key={index} suit={suit} />
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

export default React.memo(GameBoard);
