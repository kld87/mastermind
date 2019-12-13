import React from 'react';
import {
  Popup,
  Label,
  SemanticCOLORS
} from 'semantic-ui-react';

type ResultLabelProps = {
  color: SemanticCOLORS,
  value: number,
  text: string
}

const ResultLabel: React.FC<ResultLabelProps> = ({color, value, text}: ResultLabelProps) => {
  return (
    <Popup
      trigger={
        <Label
          color={color}
          circular
          className="result-button">
          {value}
        </Label>
      }
      content={text}
      basic/>
  );
}

export default ResultLabel;
