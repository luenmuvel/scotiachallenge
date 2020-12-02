import React, { createContext, useState, ReactNode, useEffect } from "react";
import {
  fetchCampaign,
  formatDate,
  formatTea,
  formatAmount,
  randomNumber,
  fetchMonthlyAmount,
} from "../Utils/library";

export const SimulatorContext = createContext(null);

const SimulatorProvider = ({ children }: { children: ReactNode }) => {
  // Estado a manipular en el formulario
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(null);
  const [amount, setAmount] = useState(null);
  const [quotes, setQuotes] = useState(1);
  const [tea, setTea] = useState(null);
  const [date, setDate] = useState(null);

  // Llamamos a la API al cargar la página.
  // asignamos un valor por defecto al monto
  useEffect(() => {
    setCampaign();
    setAmount("0");
  }, []);

  const setCampaign = async () => {
    const campaign = await fetchCampaign();
    setMin(campaign.min_quota);
    setMax(campaign.max_quota);
    setTea(formatTea(campaign.tea));
    setDate(formatDate(campaign.payment_date));
  };

  const setMonthlyAmount = async () => {
    const amount = await fetchMonthlyAmount();
    const newAmount = randomNumber(amount.value);
    setAmount(formatAmount(newAmount));
  };

  return (
    <SimulatorContext.Provider
      value={{
        min,
        max,
        amount,
        quotes,
        tea,
        date,
        setAmount,
        setQuotes,
        setMin,
        setMax,
        setMonthlyAmount,
      }}
    >
      {children}
    </SimulatorContext.Provider>
  );
};

export default SimulatorProvider;
