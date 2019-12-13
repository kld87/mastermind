import React from 'react';
import _ from 'lodash';
import {
  Segment,
  Header,
  Divider,
  Icon
} from 'semantic-ui-react';

import TargetRow from './TargetRow';
import BoardControls from './BoardControls';
import Board from './Board';
import { GuessResult } from '../classes/GuessResult';
import { Options } from '../classes/Options';

type GameState = {
  target: Array<number>,
  guesses: Array<Array<number | null>>,
  results: Array<GuessResult>,
  activeRow: number,
  gameOver: boolean,
  options: Options
}

class Game extends React.Component<{}, GameState> {
  colorNum = 8;

  constructor(props: {}) {
    super(props);
    this.state = this.newGameState();
  }

  newGameState(): GameState {
    //game options
    const options = this.state ? {...this.state.options} : new Options();

    //build our guess array
    const guesses = Array<Array<number | null>>();
    for (let i = 0; i < options.rowNum; i++) {
      guesses.push(Array(options.pegNum).fill(null));
    }

    return {
      target: Array.from({length: options.pegNum}, v => _.random(0, this.colorNum - 1)),
      guesses: guesses,
      results: Array<GuessResult>(options.rowNum),
      activeRow: 0,
      gameOver: false,
      options: options
    };
  }

  //handle the result of submittin new game options
  optionsClick = (options: Options) => {
    //if # of pegs or rows changes, we have to start a new game
    if (options.pegNum !== this.state.options.pegNum || options.rowNum !== this.state.options.rowNum) {
      this.setState({options: {...options}}, () => {
        this.setState(this.newGameState())
      });
    } else {
      this.setState({options: {...options}});
    }
  }

  //handdle user selecting a peg colour
  pegClick = (rowIndex: number, pegIndex: number, color: number) => {
    //update state w/ new peg value
    const guesses = _.cloneDeep(this.state.guesses);
    guesses[rowIndex][pegIndex] = color;

    this.setState({
      guesses: guesses
    });
  }

  //handle user submitting a row, evaluate the result
  rowSubmit = (rowIndex: number) => {
    if (this.state.guesses[rowIndex].includes(null)) {
      alert('Please complete the guess row');
      return;
    }

    //compute our scores
    const result = this.checkGuess(rowIndex);
    const results = this.state.results.concat();
    results.splice(this.state.activeRow, 1, result);

    //game over?
    if (result.rightRight === this.state.options.pegNum) { //won?
      this.setState({
        gameOver: true,
        results: results,
      });
      alert("CONGRATS, YOU WIN!");
    } else if (rowIndex === this.state.options.rowNum - 1) { //lost?
      this.setState({
        gameOver: true,
        results: results,
      });
      alert("SORRY, YOU LOSE!");
    } else { //move to next row and update guesses
      this.setState({
        results: results,
        activeRow: this.state.activeRow + 1
      })
    }
  }

  checkGuess(rowIndex: number): GuessResult {
    //copy guess/target to break references
    const target = this.state.target.concat() as Array<number | null>;
    const guess = this.state.guesses[rowIndex].concat() as Array<number | null>;

    //check "right color, right place" AKA R/R
    const rightRight = guess.reduce((t: number, v, i) => {
      if (guess[i] === target[i]) { //same color in the same spot between guess and target
        //remove from both spots as to not impact the R/W count logic below
        guess[i] = null;
        target[i] = null;
        t++;
      }
      return t;
    }, 0);

    //check "right color, wrong place", AKA R/W
    const rightWrong = guess.reduce((t: number, v, i) => {
      if (guess[i] !== null && target.includes(guess[i])) {
        //remove from target as to not double-count in future iterations...
        //eg. if the target has one black, and the guess was all black (except in the right spot), they get 1 R/W peg, not 4
        target[ target.indexOf(guess[i]) ] = null;
        t++;
      }
      return t;
    }, 0);

    //yield R/R & R/W result
    return {
      rightRight,
      rightWrong
    };
  }

  forfeitClick = () => {
    this.setState({
      gameOver: true
    })
  }

  newClick = () => {
    this.setState(this.newGameState());
  }

  render() {
    return (
      <div className="game-container">
        <Segment textAlign="center">

          <Header size="huge"><em>SUPER MASTERMIND!</em></Header>

          <BoardControls
            forfeitClick={this.forfeitClick}
            newClick={this.newClick}
            optionsClick={this.optionsClick}
            gameOver={this.state.gameOver}
            colorBlind={this.state.options.colorBlind}/>

          <Divider />

          <div>Guess the colour pattern:</div>

          <TargetRow
            target={this.state.target}
            gameOver={this.state.gameOver}
            colorBlind={this.state.options.colorBlind}/>

        </Segment>

        <Board
          guesses={this.state.guesses}
          pegClick={this.pegClick}
          activeRow={this.state.activeRow}
          rowSubmit={this.rowSubmit}
          results={this.state.results}
          gameOver={this.state.gameOver}
          colorBlind={this.state.options.colorBlind}/>

        <div>
          <a href="//kevindawe.ca" title="kevindawe.ca">
            <Icon name="globe" size="large"/>
          </a>
          <a href="https://github.com/kld87/mastermind" title="kld87 on github">
            <Icon name="github" size="large"/>
          </a>
        </div>

      </div>
    );
  }
}

export default Game;
