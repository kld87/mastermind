import React from 'react';
import {
    Button,
    Popup,
    SemanticCOLORS
} from 'semantic-ui-react';


type PegProps = {
  color: number | null,
  pegClick?: (color: number) => void,
  mask?: boolean,
  colorBlind: boolean
}

class Peg extends React.Component<PegProps> {
  state = {
    open: false
  };

  colors: Array<SemanticCOLORS> = [
      'red',
      'yellow',
      'orange',
      'green',
      'blue',
      'purple',
      'pink',
      'brown',
  ];

  togglePeg = (open: boolean) => () => this.setState({open});

  onClick = (color: number) => () => {
    this.setState({open: false});
    if (this.props.pegClick) {
      this.props.pegClick(color);
    }
  }

  render() {
    const buttonColor = this.props.color !== null && !this.props.mask
      ? this.colors[this.props.color]
      : undefined;

    //peg element
    const peg = buttonColor
      ? (
          <Button
            disabled={!this.props.pegClick}
            color={buttonColor}>
            {this.props.colorBlind ? this.props.color : ''}
          </Button>
        )
      : <Button color="grey" disabled={!this.props.pegClick}>{this.props.mask ? '?' : ''}</Button>;

    //interactable? wrap in a popup
    let popupPeg: React.ReactElement | undefined;
    if (this.props.pegClick) {
      let toggles = Array.from({length: 8}).map((v, i) => (
          <Button
            key={i}
            onClick={this.onClick(i)}
            color={this.colors[i]}>
            {this.props.colorBlind ? i : ''}
          </Button>
      ));

      //form selection popup
      popupPeg = (
        <Popup
          trigger={peg}
          content={
            <div className="peg-popup-container">
              {toggles}
            </div>
          }
          on='click'
          open={this.state.open}
          onOpen={this.togglePeg(true)}
          onClose={this.togglePeg(false)}
          color={buttonColor}/>
        );
    }

    return popupPeg ? popupPeg : peg;
  }
}

export default Peg;
