import React, { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { Title, LabelStyled, Checkbox, LabelText } from './Labels.styled';

export function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);

  const updateLabelHandler = (lbl: string, checked: boolean) => {
    updateLabel({ label: lbl, checked: !checked });
  };

  return (
    <>
      <Title>Labels:</Title>
      {labels.map(({ label: lbl, checked }, idx) => (
        <LabelStyled key={idx}>
          <Checkbox
            type="checkbox"
            checked={checked}
            onChange={() => updateLabelHandler(lbl, checked)}
            style={{ accentColor: lbl }}
          />
          <LabelText>{lbl}</LabelText>
        </LabelStyled>
      ))}
    </>
  );
}
