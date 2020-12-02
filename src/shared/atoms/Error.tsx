import React from "react";
import Colors from "../Colors";
import styled from "@emotion/styled";

const Container = styled.div`
  position: relative;
`;

const ErrorMessage = styled.div`
  position: absolute;
  top: 5px;
  color: ${Colors.Red};
  font-size: 0.6rem;
  text-align: left;
  display: none;

  &.error-show {
    display: block;
  }
`;

const Error = ({ message }: { message: string | null }) => {
  return (
    <Container>
      <ErrorMessage className={message ? "error-show" : null}>
        {message}
      </ErrorMessage>
    </Container>
  );
};

export default Error;

// El monto no puede ser mayor a S/. 19,600
// El monto no puede ser menor a S/. 1,500
