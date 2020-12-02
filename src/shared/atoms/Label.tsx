import React, { ReactNode } from "react";
import styled from "@emotion/styled";

const Label = ({
  size,
  children,
  center,
}: {
  size: string;
  children: ReactNode;
  center?: boolean;
}) => {
  const Content = styled.span`
    display: block;
    font-weight: bold;
    font-size: ${size}rem;
    padding-top: 1px;
    text-align: ${center ? "center" : "left"};
  `;

  return <Content>{children}</Content>;
};

export default Label;
