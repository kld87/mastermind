import React from 'react';
import {
  Icon,
  Segment
} from 'semantic-ui-react';

import GuessRow from './GuessRow';
import { GuessResult } from '../classes/GuessResult';

type GuessBlockProps = {
  guesses: Array<Array<number | null>>,
  pegClick: (rowIndex: number, pegIndex: number, color: number) => void,
  activeRow: number,
  rowSubmit: (rowIndex: number) => void,
  results: Array<GuessResult>,
  gameOver: boolean,
  colorBlind: boolean
}

class GuessBlock extends React.Component<GuessBlockProps> {
  renderRow(i: number): React.ReactElement {
    return (
      <GuessRow
        key={i}
        guess={this.props.guesses[i]}
        rowIndex={i}
        pegClick={this.props.pegClick}
        active={i === this.props.activeRow}
        rowSubmit={this.props.rowSubmit}
        result={this.props.results[i]}
        gameOver={this.props.gameOver}
        colorBlind={this.props.colorBlind}>
      </GuessRow>
    );
  }

  render() {
    const rows = new Array<React.ReactElement>();

    //build our rows, truncating from last ... active when appropriate
    let i = this.props.guesses.length - 1;
    while (i >= 0) {
      rows.push(this.renderRow(i));
      if (this.props.activeRow < i - 1) { //truncate rows between active and last
        rows.push(
          <div key='ellipses' className="ellipses-row">
            <Icon name='ellipsis horizontal'/>
          </div>);
        i = this.props.activeRow;
      } else {
        i--;
      }
    }

    return (
      <Segment>
        {rows}
      </Segment>
    );
  }
}

export default GuessBlock;
