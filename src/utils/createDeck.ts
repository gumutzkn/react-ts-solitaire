import { Card } from '../types/types';

export const createDeck = (suitOption: 1 | 2 | 4): Card[] => {
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

  switch (suitOption) {
    case 1:
      // 1 suit seçiliyse her karttan 8 tane oluştur
      for (let rank of ranks) {
        for (let i = 0; i < 8; i++) {
          deck.push({
            rank,
            suit: 'spades',
            id: `spades-${rank}-${i}`,
            isFaceUp: false,
          });
        }
      }
      break;

    case 2:
      // 2 suit seçiliyse her suitten 4'er tane kart oluştur
      const twoSuits = ['hearts', 'spades'];
      for (let suit of twoSuits) {
        for (let rank of ranks) {
          for (let i = 0; i < 4; i++) {
            deck.push({
              rank,
              suit,
              id: `${suit}-${rank}-${i}`,
              isFaceUp: false,
            });
          }
        }
      }
      break;

    case 4:
      // 4 suit seçiliyse her suitten 2'şer tane kart oluştur
      const fourSuits = ['hearts', 'spades', 'diamonds', 'clubs'];
      for (let suit of fourSuits) {
        for (let rank of ranks) {
          for (let i = 0; i < 2; i++) {
            deck.push({
              rank,
              suit,
              id: `${suit}-${rank}-${i}`,
              isFaceUp: false,
            });
          }
        }
      }
      break;

    default:
      throw new Error('Invalid suit option');
  }

  return deck;
};
