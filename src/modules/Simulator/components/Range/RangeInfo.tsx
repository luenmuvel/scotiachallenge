import React from "react";
import styled from "@emotion/styled";
import Colors from "../../../../shared/Colors/index";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const QuotasSelected = styled.p`
  color: ${Colors.sliderColor};
  font-weight: 700;
`;

const QuotasMax = styled.p`
  font-size: 0.8rem;
  color: ${Colors.infoColor};
`;

export const RangeInfo = ({
  n_quotes,
  max_quotes,
}: {
  n_quotes: number;
  max_quotes: number;
}) => {
  return (
    <Container>
      <QuotasSelected>{n_quotes} Cuotas</QuotasSelected>
      <QuotasMax>Máximo: {max_quotes}</QuotasMax>
    </Container>
  );
};
