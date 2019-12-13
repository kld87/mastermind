import React from 'react';

import Peg from './Peg';

type PegRowProps = {
  pegs: Array<number | null>,
  pegClick?: (pegIndex: number, color: number,) => void,
  mask?: boolean,
  colorBlind: boolean
}

class PegRow extends React.Component<PegRowProps> {
  pegClick = (pegIndex: number) => (color: number) => {
    if (this.props.pegClick) {
      this.props.pegClick(pegIndex, color);
    }
  }

  render() {
    const pegElements = new Array<React.ReactElement>();
    if (this.props.pegs) {
      this.props.pegs.map((v, i) => pegElements.push(
        <Peg
          key={i}
          color={v}
          pegClick={this.props.pegClick ? this.pegClick(i) : undefined}
          mask={this.props.mask}
          colorBlind={this.props.colorBlind}>
        </Peg>
      ));
    }

    return (
      <div>
       {pegElements}
      </div>
    );
  }
}

export default PegRow;
