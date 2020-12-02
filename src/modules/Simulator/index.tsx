import "./../styles/simulator.scss";
import React from "react";
import Amount from "./components/Amount/Amount";
import Header from "./components/Header/Header";
import Quota from "./components/Quota/Quota";
import Range from "./components/Range/Range";
import Container from "./template/container";
import SimulatorProvider from "./Context/SimulatorContext";

const Simulator = () => {
  return (
    <Container>
      <Header title="Simula tu cuota" />
      <SimulatorProvider>
        <Quota />
        <Amount min={1500} max={1950} />
        <Range />
      </SimulatorProvider>
    </Container>
  );
};

export default Simulator;
