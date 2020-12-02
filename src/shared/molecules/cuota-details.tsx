import React, { ReactNode } from "react";
import styled from "@emotion/styled";

const CuotaDetails = ({ children }: { children: ReactNode }) => {
  const Details = styled.ul`
    display: flex;
    list-style: none;
    justify-content: space-around;
    margin-top: 20px;
  `;
  return <Details>{children}</Details>;
};

export default CuotaDetails;
