import React from 'react';

import PegRow from './PegRow';

type TargetProps = {
  target: Array<number>,
  gameOver: boolean,
  colorBlind: boolean
}

const TargetRow: React.FC<TargetProps> = ({target, gameOver, colorBlind}: TargetProps) => {
  return (
    <div className='flex-row'>
      <div className="count-row"></div>
      <div className="peg-row">
        <PegRow
          pegs={target}
          mask={!gameOver}
          colorBlind={colorBlind}>
        </PegRow>
      </div>
      <div className="action-row"></div>
    </div>
  );
}

export default TargetRow;
