import React, { useState, useContext } from "react";
import styled from "@emotion/styled";

import Error from "../../../../shared/atoms/Error";
import Colors from "../../../../shared/Colors";
import { Label, TextBox } from "../../../../shared/atoms";
import { SimulatorContext } from "./../../Context/SimulatorContext";
import {
  isKeyNotValid,
  handleValidOperation,
  formatAmount,
  removeChars,
  stopTimeout,
} from "../../Utils/library";

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
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(null);
  const { currency, minAmount, maxAmount, setMonthlyAmount } = useContext(
    SimulatorContext
  );
  // let timer: NodeJS.Timeout = null;

  const validateAmount = () => {
    if (parseFloat(amount) < minAmount) {
      setError("El monto no puede ser menor a S/. 1,500");
    } else if (parseFloat(amount) > maxAmount) {
      setError("El monto no puede ser mayor a S/. 19,600");
    } else {
      setError("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isKeyNotValid(e.key)) {
      e.preventDefault();
    } else {
      const newAmount = handleValidOperation(e, amount);
      setAmount(newAmount);
    }
  };

  const handleBlur = (e: KeyboardEvent) => {
    const newAmount = formatAmount(currency, amount);
    setAmount(newAmount);
  };

  const handleChange = () => {
    stopTimeout(timer);
    const timeout = setTimeout(() => {
      validateAmount();
      setMonthlyAmount();
    }, 700);
    setTimer(timeout);
  };

  const handleFocus = (e: KeyboardEvent) => {
    const newAmount = removeChars(currency, amount);
    setAmount(newAmount);
  };

  return (
    <div className="enter-amount">
      <Subtitle>
        <Label size="0.8">Ingresa un monto</Label>
      </Subtitle>

      <TextBox
        textValue={amount}
        handleKeyDown={handleKeyDown}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleFocus={handleFocus}
      />

      <Notice>
        Mínimo {min} - Máximo {max}
      </Notice>
      <Error message={error} />
    </div>
  );
};

export default Amount;
