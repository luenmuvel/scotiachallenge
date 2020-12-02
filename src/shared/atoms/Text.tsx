import React, { ReactNode } from "react";
import styled from "@emotion/styled";

const TextCenter = styled.p`
  font-size: 0.79rem;
  text-align: center;
`;

const Text = ({ children }: { children: ReactNode }) => {
  return <TextCenter>{children}</TextCenter>;
};

export default Text;
