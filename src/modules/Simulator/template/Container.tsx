import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <div className="simulator">{children}</div>;
};

export default Container;
