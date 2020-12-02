import React from "react";
import Colors from "../../shared/Colors/index";
import styled from "@emotion/styled";

const Item = styled.li`
  flex: 1;
  border-right: 1.6px dotted ${Colors.mainColor};
  &:last-child {
    border-right: 0;
  }
`;

const Title = styled.h3`
  font-size: 0.75rem;
  font-weight: 300;
  text-align: center;
`;

const TextValue = styled.span`
  display: block;
  padding-top: 10px;
  font-weight: bold;
  font-size: 0.9rem;
  text-align: center;
`;

const CuotaItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <Item>
      <Title>{title}</Title>
      <TextValue>{value}</TextValue>
    </Item>
  );
};

export default CuotaItem;
