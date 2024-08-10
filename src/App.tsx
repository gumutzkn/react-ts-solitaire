import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useGameContext } from './context/GameContext';

import { GameBoard, Modal, Navbar } from './components';

const App: React.FC = () => {
  const { isModelOpen } = useGameContext();
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='relative'>
        {isModelOpen && <Modal />}
        <Navbar />
        <GameBoard />
      </div>
    </DndProvider>
  );
};

export default App;
