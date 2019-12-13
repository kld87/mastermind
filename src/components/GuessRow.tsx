import React from 'react';

import PegRow from './PegRow';
import ActionRow from './ActionRow';
import { GuessResult } from '../classes/GuessResult';

type GuessRowProps = {
  guess: Array<number | null>,
  rowIndex: number,
  pegClick: (rowIndex: number, pegIndex: number, color: number) => void,
  rowSubmit: (rowIndex: number) => void,
  active: boolean,
  result: GuessResult,
  gameOver: boolean,
  colorBlind: boolean
}

class GuessRow extends React.Component<GuessRowProps> {
  pegClick = (pegIndex: number, color: number) => {
    this.props.pegClick(this.props.rowIndex, pegIndex, color);
  }

  rowSubmit = () => {
    this.props.rowSubmit(this.props.rowIndex);
  }

  render() {
    const className = this.props.active ? 'flex-row active-row' : 'flex-row'; //highlight active row?

    return (
      <div className={className}>

       <div className="count-row">
         #{this.props.rowIndex + 1}
       </div>

       <div className='peg-row'>
         <PegRow
           pegs={this.props.guess}
           pegClick={this.props.active && !this.props.gameOver ? this.pegClick : undefined}
           colorBlind={this.props.colorBlind}>
         </PegRow>
       </div>

       <div className="action-row">
         <ActionRow
           active={this.props.active}
           result={this.props.result}
           gameOver={this.props.gameOver}
           rowSubmit={this.rowSubmit}/>
       </div>

      </div>
    );
  }
}

export default GuessRow;
