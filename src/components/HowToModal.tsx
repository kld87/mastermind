import React from 'react';
import {
  Button,
  Modal,
  Header
} from 'semantic-ui-react';


class HowToModal extends React.Component {
  state = {
    open: false
  };

  toggleModal = (open: boolean) => () => this.setState({open});

  render() {
    return (
      <Modal
        open={this.state.open}
        size="tiny"
        centered={false}
        trigger={
          <Button
            color="orange"
            size="tiny"
            basic
            onClick={this.toggleModal(true)}>
            How to Play
          </Button>
        }>
      <Modal.Header>How to Play</Modal.Header>

        <Modal.Content>
          <Header>tl;dr</Header>
          <p>There is a hidden pattern of colours (top of the game) which you have to guess. Submit your guess by picking a colour combination at the bottom by clicking on colour "pegs". The game will let you know how close your guess was (click the circles next to your guess), then continue trying to deduce the pattern before you run out of tries (12).</p>

          <Header>Instructions</Header>
          <ol>
            <li>You're trying to guess a hidden pattern of 5 (by default) coloured "pegs", displayed at the top of the game</li>
            <li>There are 8 colours, which may be present 0-n times in the hidden pattern (ie. colours may be repeated)</li>
            <li>You submit a guess by setting and submitting a pattern towards the bottom of the board</li>
            <li>After submitting, you get two metrics back:</li>
            <li>Green: "right colour, right position" means you have a peg of the correct colour in the correct position</li>
            <li>Orange: "right colour, wrong position" means you have a peg of the correct colour, but in the wrong position</li>
            <li>For example, if the pattern is RBGGG and you submit RGYYY, the "R" is right/right as a correct guess, and the G is right/wrong (since it's in the pattern, but not in the second position).</li>
            <li>Continue submitting guesses while trying to deduce the hidden pattern</li>
            <li>By default, you have 12 guesses before you lose the game</li>
            <li>You can adjust the number of pegs and guesses via the options</li>
            <li>"Colour blind mode" can be enabled via the options, it will put numbers on the pegs from 0-7, so the game doesn't rely on colours</li>
            <li>Try different combinations and review your previous submissions to help you deduce the hidden pattern</li>
            <li>You can forfeit the game to reveal the hidden pattern</li>
            <li>Good luck!</li>
          </ol>
        </Modal.Content>

        <Modal.Actions>
          <Button
            color='green'
            onClick={this.toggleModal(false)}>
            Got It!
          </Button>
        </Modal.Actions>

      </Modal>
    );
  }
}

export default HowToModal;