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

  let matchedCount = 0;
  let currentSuit: string | null = null;

  for (let card of openCards) {
    if (matchedCount === 0) {
      if (card.rank === sequence[matchedCount]) {
        matchedCount++;
        currentSuit = card.suit;
      }
    } else {
      if (
        card.rank === sequence[matchedCount] &&
        card.suit === currentSuit
      ) {
        matchedCount++;
      } else if (
        card.rank === sequence[0] &&
        card.suit === currentSuit
      ) {
        // Eğer K ile tekrar başlıyorsa, matchedCount'u sıfırlayıp tekrar dene
        matchedCount = 1;
      } else {
        // Sıralama bozuldu, tekrar sıfırla
        matchedCount = 0;
        currentSuit = null;
      }
    }

    if (matchedCount === 13) {
      return true;
    }
  }

  return false;
};
