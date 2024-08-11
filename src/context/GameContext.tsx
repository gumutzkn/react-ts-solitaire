import {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react';

import {
  createDeck,
  shuffleDeck,
  isSequenceComplete,
  removeSequence,
  cardValue,
} from '../utils';
import { Card, GameContextProps } from '../types/types';

const GameContext = createContext<GameContextProps | undefined>(
  undefined
);

interface GameProviderProps {
  children: React.ReactNode;
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const [columns, setColumns] = useState<Card[][]>([]);
  const [remainingCardsDeck, setRemainingCardsDeck] = useState<
    Card[]
  >([]);
  const [visibleRemainingCards, setVisibleRemainingCards] = useState<
    null[]
  >([]);
  const [countSequence, setCountSequence] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isModelOpen, setIsModelOpen] = useState<boolean>(true);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);
  const [isColumnEmpty, setIsColumnEmpty] = useState<boolean>(false);
  const cardFlipRef = useRef<HTMLAudioElement>(null);
  const shuffleSoundRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const deck = createDeck();
    const shuffled = shuffleDeck(deck);

    const dealtCards = shuffled.slice(0, 54);
    const remainingCardsDeck = shuffled.slice(54); // Kalan 50 kart

    const newColumns = [];
    for (let i = 0; i < 10; i++) {
      const start = i < 4 ? i * 6 : 24 + (i - 4) * 5;
      const end = start + (i < 4 ? 6 : 5);
      newColumns.push(dealtCards.slice(start, end));
    }

    // En alttaki kartları aç
    newColumns.forEach((column) => {
      if (column.length > 0) {
        column[column.length - 1].isFaceUp = true;
      }
    });

    setColumns(newColumns);
    setRemainingCardsDeck(remainingCardsDeck);
    setVisibleRemainingCards(Array(5).fill(null));
  }, []);

  const handleDrop = (
    cardId: string,
    fromColumnId: number,
    toColumnId: number
  ) => {
    setColumns((prevColumns) => {
      const fromColumn = prevColumns[fromColumnId];
      const toColumn = prevColumns[toColumnId];

      if (!fromColumn || !toColumn) return prevColumns;

      // Taşınacak kartın indexini bul
      const cardIndex = fromColumn.findIndex(
        (card) => card.id === cardId
      );
      const cardsToMove = fromColumn.slice(cardIndex); // Taşınacak kart ve sonrasındaki kartlar

      if (cardsToMove.length === 0) return prevColumns;

      // Seçilen kartın altındaki kartların sırayla azalan olup olmadığını kontrol et
      for (let i = 0; i < cardsToMove.length - 1; i++) {
        if (
          cardValue(cardsToMove[i].rank) !==
          cardValue(cardsToMove[i + 1].rank) + 1
        ) {
          return prevColumns;
        }
      }

      const lastCardInToColumn = toColumn[toColumn.length - 1];

      if (
        lastCardInToColumn &&
        cardValue(cardsToMove[0].rank) !==
          cardValue(lastCardInToColumn.rank) - 1
      ) {
        return prevColumns;
      }

      // Taşınacak kartları 'fromColumn' içinden çıkar
      const updatedFromColumn = fromColumn.slice(0, cardIndex);
      // Taşınacak kartları 'toColumn' içine ekle
      let updatedToColumn = [...toColumn, ...cardsToMove];

      // Eğer 'fromColumn' içinde kart kalmışsa, en üstteki kartı açık yap
      if (updatedFromColumn.length > 0) {
        updatedFromColumn[updatedFromColumn.length - 1].isFaceUp =
          true;
      }

      // K'den A'ya kadar sıralı olup olmadığını kontrol et
      if (isSequenceComplete(updatedToColumn)) {
        updatedToColumn = removeSequence(updatedToColumn);
        setCountSequence((prev) => prev + 1);
      }

      // Yeni sütunları state'te güncelle
      return prevColumns.map((column, index) => {
        if (index === fromColumnId) return updatedFromColumn;
        if (index === toColumnId) {
          if (updatedToColumn.length > 0) {
            // Eğer yeni column içinde kart kaldıysa, en alttaki kartı açık yap
            updatedToColumn[updatedToColumn.length - 1].isFaceUp =
              true;
          }
          if (cardFlipRef.current) {
            cardFlipRef.current.play();
          }
          return updatedToColumn;
        }
        return column;
      });
    });
  };

  const handleRemainingCardClick = () => {
    if (remainingCardsDeck.length === 0) return;

    // Kart dağıtımı öncesinde tüm sütunları kontrol et
    const isAnyColumnEmpty = columns.some(
      (column) => column.length === 0
    );

    if (isAnyColumnEmpty) {
      setIsColumnEmpty(true);
      return;
    }

    setIsColumnEmpty(false);

    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      const newCards = remainingCardsDeck.slice(0, 10);

      // Dağıtılan her kartı açık yap
      const updatedNewCards = newCards.map((card) => ({
        ...card,
        isFaceUp: true,
      }));

      for (let i = 0; i < 10; i++) {
        if (newColumns[i]) {
          newColumns[i] = [...newColumns[i], updatedNewCards[i]];
        } else {
          newColumns[i] = [updatedNewCards[i]];
        }
      }

      // Kart dağıtıldıktan sonra sıralı kartları kontrol et
      newColumns.forEach((column, columnIndex) => {
        if (isSequenceComplete(column)) {
          newColumns[columnIndex] = removeSequence(column);
        }
      });

      return newColumns;
    });

    setRemainingCardsDeck((prev) => prev.slice(10));
    setVisibleRemainingCards((prev) => prev.slice(0, -1));
  };

  return (
    <GameContext.Provider
      value={{
        columns,
        remainingCardsDeck,
        handleDrop,
        handleRemainingCardClick,
        visibleRemainingCards,
        countSequence,
        cardFlipRef,
        shuffleSoundRef,
        isGameWon,
        setIsGameWon,
        isGameStarted,
        setIsGameStarted,
        isModelOpen,
        setIsModelOpen,
        isPaused,
        setIsPaused,
        isColumnEmpty,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = (): GameContextProps => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error(
      'useGameContext must be used within a GameProvider'
    );
  }
  return context;
};
