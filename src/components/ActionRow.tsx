import React from 'react';
import {
  Button
} from 'semantic-ui-react';

import ResultLabel from './ResultLabel';
import { GuessResult } from '../classes/GuessResult';

type ActionRowProps = {
  active: boolean,
  result: GuessResult,
  gameOver: boolean,
  rowSubmit: () => void
}

const ActionRow: React.FC<ActionRowProps> = ({active, result, gameOver, rowSubmit}: ActionRowProps) => {
  let actionContent: React.ReactElement = <span></span>;

  //show result metrics
  if (result) {
    const rrColor = result.rightRight ? 'green' : 'grey';
    const rwColor = result.rightWrong ? 'orange' : 'grey';
    actionContent = (
      <span>
        <ResultLabel
          color={rrColor}
          value={result.rightRight}
          text='right colour, right position'/>
        <ResultLabel
          color={rwColor}
          value={result.rightWrong}
          text='right colour, wrong position'/>
      </span>
    );
  } else if (!gameOver && active) { //show submit button if we're still playing
    actionContent = (
      <Button
        color="green"
        circular
        icon="checkmark"
        size="small"
        onClick={rowSubmit} />
    );
  }

  return actionContent;
}

export default ActionRow;
