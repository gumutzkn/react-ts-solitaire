import { Card } from '../types/types';

const sequence = [
  'K',
  'Q',
  'J',
  '10',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
  'A',
];

export const isSequenceComplete = (column: Card[]): boolean => {
  const openCards = column.filter((card) => card.isFaceUp);

  let sequenceIndex = 0;
  let matchedCount = 0;
  let currentSuit: string | null = null;

  for (let card of openCards) {
    if (
      card.rank === sequence[sequenceIndex] &&
      (currentSuit === null || card.suit === currentSuit)
    ) {
      matchedCount++;
      sequenceIndex++;
      currentSuit = card.suit;

      if (matchedCount === 13) {
        return true;
      }
    } else {
      matchedCount = 0;
      sequenceIndex = 0;
      currentSuit = null;
    }
  }

  return false;
};
