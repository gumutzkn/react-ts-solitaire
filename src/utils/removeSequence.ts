import { Card } from '../types/types';

export const removeSequence = (column: Card[]): Card[] => {
  const openCards = column.filter((card) => card.isFaceUp);
  const closedCards = column.filter((card) => !card.isFaceUp);

  return closedCards.concat(
    openCards.slice(0, openCards.length - 13)
  );
};
