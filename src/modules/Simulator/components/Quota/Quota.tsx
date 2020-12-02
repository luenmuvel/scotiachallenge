import React, { useContext } from "react";
import { Text, Label } from "../../../../shared/atoms/index";
import { SimulatorContext } from "./../../Context/SimulatorContext";
import {
  InfoCuotas,
  CuotaDetails,
  CuotaItem,
} from "../../../../shared/molecules";

const Quota = () => {
  const { amount, quotes, tea, date } = useContext(SimulatorContext);

  return (
    <InfoCuotas>
      <Text>Tu cuota mensual será</Text>
      <Label size={"1.4"} center>
        {amount}
      </Label>
      <CuotaDetails>
        <CuotaItem title="Cuotas" value={quotes} />
        <CuotaItem title="TEA" value={`${tea} %`} />
        <CuotaItem title="Pago 1a cuota" value={date} />
      </CuotaDetails>
    </InfoCuotas>
  );
};

export default Quota;
