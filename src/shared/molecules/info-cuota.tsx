import React, { ReactNode } from "react";

const InfoCuotas = ({ children }: { children: ReactNode }) => {
  return (
    <div className="info-quota">
      <div className="info-quota--description">{children}</div>
    </div>
  );
};

export default InfoCuotas;
