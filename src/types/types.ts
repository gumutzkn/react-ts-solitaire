export interface Card {
  rank: string;
  id: string;
  isFaceUp: boolean;
}

export interface GameContextProps {
  columns: Card[][];
  remainingCardsDeck: Card[];
  visibleRemainingCards: null[];
  countSequence: number;
  handleDrop: (
    cardId: string,
    fromColumnId: number,
    toColumnId: number
  ) => void;
  handleRemainingCardClick: () => void;
  shuffleSoundRef: React.RefObject<HTMLAudioElement>;
  cardFlipRef: React.RefObject<HTMLAudioElement>;
  isGameWon: boolean;
  setIsGameWon: React.Dispatch<React.SetStateAction<boolean>>;
  isGameStarted: boolean;
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  isModelOpen: boolean;
  setIsModelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isPaused: boolean;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
}
