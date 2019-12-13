import React from 'react';
import {
  Button,
  Modal,
  Form,
  Checkbox
} from 'semantic-ui-react';

import { Options } from '../classes/Options';

type OptionsModalProps = {
  optionsClick: (options: Options) => void,
  colorBlind: boolean
}

class OptionsModal extends React.Component<OptionsModalProps> {
  state = {
    options: {
      colorBlind: this.props.colorBlind,
      rowNum: 12,
      pegNum: 5
    },
    open: false
  };

  toggleModal = (open: boolean) => () => this.setState({open});

  handleColorBlindChange = (e: React.FormEvent, { checked }: any) => {
    const options = {...this.state.options};
    options.colorBlind = checked;
    this.setState({options});
  }

  handleInputChange = (e: React.FormEvent, { name, value }: any) => {
    const options = {...this.state.options};
    options[name as 'pegNum' | 'rowNum'] = parseInt(value); //this is annoying re: TS
    this.setState({options});
  }

  acceptModal = () => {
    this.props.optionsClick(this.state.options);
    this.setState({open: false});
  }

  render() {
    return (
      <Modal
        open={this.state.open}
        size="mini"
        centered={false}
        trigger={
          <Button
            color="black"
            size="tiny"
            basic
            onClick={this.toggleModal(true)}>
            Options
          </Button>
        }>
      <Modal.Header>Options</Modal.Header>

        <Modal.Content>
          <Form>

            <Form.Field>
              <label>Display</label>
              <Checkbox
                label='Colour blind mode'
                name='colorBlind'
                checked={this.state.options.colorBlind}
                onChange={this.handleColorBlindChange} />
            </Form.Field>

            <Form.Field>
              <label>Number of pegs*</label>
              <Form.Input
                name='pegNum'
                type='number'
                min={1}
                max={12}
                value={this.state.options.pegNum}
                onChange={this.handleInputChange}/>
            </Form.Field>

            <Form.Field>
              <label>Number of guesses*</label>
              <Form.Input
                name='rowNum'
                type='number'
                min={4}
                max={99}
                value={this.state.options.rowNum}
                onChange={this.handleInputChange}/>
            </Form.Field>

          </Form>
          <small>*Changing these options will restart the game, and may result in some unusual UI quirks. The game is meant to be played with 4 (Mastermind) or 5 (Super Mastermind) pegs.</small>
        </Modal.Content>

        <Modal.Actions>

          <Button
            color='orange'
            basic
            onClick={this.toggleModal(false)}>
            Cancel
          </Button>

          <Button
            color='green'
            onClick={this.acceptModal}>
            Accept
          </Button>

        </Modal.Actions>

      </Modal>
    );
  }

}

export default OptionsModal;