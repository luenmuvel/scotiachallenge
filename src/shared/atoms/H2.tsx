import React, { ReactNode } from "react";
import Colors from "../../shared/Colors/index";
import styled from "@emotion/styled";

const Subtitle = styled.h2`
  color: ${Colors.mainColor};
  text-align: left;
  font-size: 1.3rem;
  font-weight: 700;

  &::after {
    content: "";
    display: block;
    width: 26px;
    height: 1.6px;
    background-color: ${Colors.Red};
    margin-top: 10px;
  }
`;

const H2 = ({ children }: { children: ReactNode }) => {
  return <Subtitle>{children}</Subtitle>;
};

export default H2;
