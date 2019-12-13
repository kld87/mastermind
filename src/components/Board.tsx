import React from 'react';

import GuessBlock from './GuessBlock';
import { GuessResult } from '../classes/GuessResult';

type BoardProps = {
  guesses: Array<Array<number | null>>,
  pegClick: (rowIndex: number, pegIndex: number, color: number) => void,
  activeRow: number,
  rowSubmit: (rowIndex: number) => void,
  results: Array<GuessResult>,
  gameOver: boolean,
  colorBlind: boolean
}

const Board: React.FC<BoardProps> = ({guesses, pegClick, rowSubmit, activeRow, results, gameOver, colorBlind}: BoardProps) => {
  return (
    <GuessBlock
      guesses={guesses}
      pegClick={pegClick}
      activeRow={activeRow}
      rowSubmit={rowSubmit}
      results={results}
      gameOver={gameOver}
      colorBlind={colorBlind}/>
  );
}

export default Board;
