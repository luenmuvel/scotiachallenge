import React from "react";
import styled from "@emotion/styled";
import Colors from "../../shared/Colors/index";

const Container = styled.div`
  & input {
    width: 100%;
    padding: 5px;
    -moz-appearance: textfield;
    padding-left: 0;
    border: none;
    border-bottom: 1px solid ${Colors.mainColor};
    color: ${Colors.mainColor};
    outline: none;
  }

  & input::-webkit-outer-spin-button,
  & input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const TextBox = ({
  textValue,
  handleKeyDown,
  handleBlur,
  handleChange,
  handleFocus,
}: {
  textValue: string;
  handleKeyDown: Function;
  handleBlur: Function;
  handleChange: Function;
  handleFocus: Function;
}) => {
  const value = textValue ? textValue : "";
  return (
    <Container>
      <input
        type="tel"
        value={value}
        placeholder="Ingrese un monto"
        onKeyDown={(e) => handleKeyDown(e)}
        onBlur={(e) => handleBlur(e)}
        onChange={() => handleChange()}
        onFocus={(e) => handleFocus(e)}
      />
    </Container>
  );
};

export default TextBox;
