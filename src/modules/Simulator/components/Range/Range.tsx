import React, { useContext, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { RangeInfo } from "./RangeInfo";
import { Label } from "../../../../shared/atoms";
import InputRange from "../../../../shared/atoms/InputRange";
import { SimulatorContext } from "./../../Context/SimulatorContext";

const Subtitle = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  text-align: left;
  padding: 20px 0;
`;

const Range = () => {
  const { min, max, setQuotes, setMonthlyAmount } = useContext(
    SimulatorContext
  );
  const [minQuote, setMinQuote] = useState(1);

  /**
   * Seteamos el Min Quote que aparecerá en la parte inferior
   */
  useEffect(() => {
    setMinQuote(min);
  }, []);

  /**
   * @description Nos permite manejar el evento de arrastre del range
   * @param value el valor que recogemos del input al momento de hacer 'input' o 'change'
   */
  const handleInput = (value: string) => {
    setQuotes(value);
    setMinQuote(parseInt(value));
  };

  const handleMouseUp = (value: string) => {
    setMonthlyAmount();
  };

  return (
    <div className="range">
      <Subtitle>
        <Label size="0.8">Elige el número de cuotas</Label>
      </Subtitle>
      <div className="range--field">
        <InputRange
          min={min}
          max={max}
          handleInput={handleInput}
          handleMouseUp={handleMouseUp}
        />
      </div>
      <RangeInfo n_quotes={minQuote} max_quotes={max} />
    </div>
  );
};

export default Range;
