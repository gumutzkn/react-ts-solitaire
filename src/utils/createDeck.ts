import { Card } from '../types/types';

export const createDeck = (): Card[] => {
  const ranks = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
  ];
  const deck: Card[] = [];

  for (let rank of ranks) {
    for (let i = 0; i < 8; i++) {
      // Her karttan 8 tane
      deck.push({ rank, id: `${rank}-${i}`, isFaceUp: false });
    }
  }

  return deck;
};
