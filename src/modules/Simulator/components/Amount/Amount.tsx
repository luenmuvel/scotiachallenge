import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

import Error from "../../../../shared/atoms/Error";
import Colors from "../../../../shared/Colors";
import { Label, TextBox } from "../../../../shared/atoms";
import { isKeyNotValid, handleValidOperation } from "../../Utils/library";

const Notice = styled.p`
  text-align: left;
  color: ${Colors.infoColor};
  font-size: ${Colors.infoSize};
  margin-top: 8px;
`;

const Subtitle = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  text-align: left;
  padding: 20px 0;
`;

const Amount = ({ min, max }: { min: number; max: number }) => {
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    // console.log("Amount changed ->", amount);
  }, [amount]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isKeyNotValid(e.key)) {
      e.preventDefault();
    } else {
      handleValidOperation(e, amount, setAmount);
    }
  };
  return (
    <div className="enter-amount">
      <Subtitle>
        <Label size="0.8">Ingresa un monto</Label>
      </Subtitle>

      <TextBox handleKeyDown={handleKeyDown} />

      <Notice>
        Mínimo {min} - Máximo {max}
      </Notice>
      <Error message="" />
    </div>
  );
};

export default Amount;
