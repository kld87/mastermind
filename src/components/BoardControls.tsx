import React from 'react';
import {
  Button
} from 'semantic-ui-react';

import OptionsModal from './OptionsModal';
import HowToModal from './HowToModal';
import { Options } from '../classes/Options';

type BoardControlsProps  = {
  newClick: () => void,
  forfeitClick: () => void,
  optionsClick: (options: Options) => void,
  gameOver: boolean,
  colorBlind: boolean
}

const BoardControls: React.FC<BoardControlsProps> = ({forfeitClick, newClick, optionsClick, gameOver, colorBlind}: BoardControlsProps) => {
  return (
    <div>

      <Button
        color="green"
        size="tiny"
        basic={!gameOver}
        onClick={newClick}>
        New Game
      </Button>

      <Button
        color="red"
        size="tiny"
        basic={gameOver}
        onClick={forfeitClick}>
        Forfeit
      </Button>

      <HowToModal />

      <OptionsModal
        optionsClick={optionsClick}
        colorBlind={colorBlind}/>

    </div>
  );
}

export default BoardControls;
