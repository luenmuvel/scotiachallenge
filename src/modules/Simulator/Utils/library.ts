import axios from "axios";
import { ICampaign, IMonthlyAmount } from "../interfaces/SimulatorInterfaces";

/**
 * @description Se crea un método que me permitirá añadir strings en una posición de una cadena. Éste método es usado para formatear las monedas con comas.
 * @param {number} index Representa la posición donde se añadirá el string.
 * @param {string} str Es el string que será modificado
 * @returns {string}
 */
const insertAt = (index: number, amount: string, str: string) => {
  return amount.slice(0, index) + str + amount.slice(index);
};

/**
 * @description Se crea el método removeLast de la clase String para remover la última posición de un String
 * @returns {string}
 */
const removeLast = (amount: string) => {
  const strToArr = amount.split("");
  strToArr.pop();
  const arrToStr = strToArr.join("");
  return arrToStr;
};

const fetchCampaign = async () => {
  const response = await axios({
    method: "get",
    url: "http://localhost:3000/campaign",
  });
  return <ICampaign>response.data;
};
const fetchMonthlyAmount = async () => {
  const response = await axios({
    method: "get",
    url: "http://localhost:3000/monthly_amount",
  });
  return <IMonthlyAmount>response.data;
};

const formatDate = (date: string) => {
  const formatedDate = new Date(date).toDateString().split(" ");
  return `${formatedDate[2]} ${formatedDate[1]}`;
};

const formatTea = (tea: number) => {
  return parseFloat(tea.toFixed(2));
};

const formatAmount = (amount: string) => {
  const integerAmount = getIntegerAmount(amount);
  var len = integerAmount.length;
  if (len > 3) {
    const amountString = String(amount);
    switch (len) {
      case 4:
        return insertAt(1, amountString, ",");
        break;
      case 5:
        return insertAt(2, amountString, ",");
        break;
      default:
        return amountString;
    }
  }
  return amount;
};

const getIntegerAmount = (amount: string) => {
  amount = String(amount);
  if (amount.indexOf(".") !== -1) {
    amount = amount.split(".")[0];
  }
  return amount;
};

/**
 * @description Se recibe el parámetro amount para obtener un número aleatorio fixado a 2 decimales.
 * @param {number} amount Representa el monto que el usuario ingresa en el cuadro de texto.
 * @returns {string}
 */
const randomNumber = (amount: number) => {
  return (Math.random() * (amount - (amount - 50)) + (amount - 50)).toFixed(2);
};

/**
 * @description Define las teclas no numéricas permitidas en las pulsaciones del usuario.
 */
export const admitedKeys = ["Backspace", "Delete", "Tab"];

const isKeyNotValid = (key: string) => {
  return !/^[0-9,\.]+$/.test(key) && !admitedKeys.includes(key);
};

/**
 * @description Éste método tiene por finalidad averiguar si el usuario ya ingresó un punto. En caso de haberlo hecho, se debe impedir que añada otro punto.
 * @returns {boolean}
 */
const noPoints = (amount: string) => {
  const total = (amount.match(/\./g) || []).length;
  return total === 0;
};

/**
 * @description Permite añadir la tecla pulsada a una variable en memoria.
 * @param {string} key
 * El 'key' es usado para concatenar con el 'temporalAmount'
 * @returns {void}
 */
const addKey = (key: string, amount: string, setAmount: Function) => {
  const tempAmount = amount ? amount + key : key;
  setAmount(tempAmount);
};

/**
 * @description Este método nos permite añadir la tecla pulsada a una variable que usaremos
 * para hacer validaciones.
 * @param {Object} e
 * El parámetro "e" contiene la tecla pulsada, además de los eventos propios del 'keydown'
 * @returns {void}
 */
const addTemporalAmount = (
  e: KeyboardEvent,
  amount: string,
  setAmount: Function
) => {
  /**
   * Si la key es punto y no hay puntos en el monto temporal
   */
  if (e.key === "." && noPoints(amount)) {
    addKey(e.key, amount, setAmount);
  } else if (!admitedKeys.includes(e.key)) {
    /**
     * Si la tecla es numérica o punto y
     * Si solo aún no hay puntos en el monto
     */
    addKey(e.key, amount, setAmount);
  }
};

/**
 * @description Método 'semaforo' que permite ejecutar acciones según la tecla admitida (no numérica) presionada.
 * @param {Object} e Contiene la tecla pulsada por el usuario
 * @returns {string}
 */
const handleAdmitedKey = (
  e: KeyboardEvent,
  amount: string,
  setAmount: Function
) => {
  // handleShortCuts(e);
  switch (e.key) {
    case "Backspace":
      let temporal;
      // @ts-ignore
      if (e.ctrlKey) {
        temporal = "";
      } else {
        temporal = removeLast(amount);
      }
      setAmount(temporal);
      return temporal;
      break;
    default:
      return e.key;
  }
};

// const handleShortCuts = (e: KeyboardEvent) => {
// }

/**
 * @description Permite conocer si el monto ingresado tiene algún punto decimal.
 * @returns {boolean}
 */
const hasDecimalPart = (amount: string) => {
  return !(amount.indexOf(".") === -1);
};

/**
 * @description Este método es usado para validar que hayan decimales en el monto y en caso haya más de un punto decimal, lo quita.
 * @returns {boolean}
 */
const moreThanOneDot = (amount: string, setAmount: Function) => {
  let excededLimit = false;
  console.log("moreThanOneDot", amount);
  if (hasDecimalPart(amount)) {
    const parts = amount.split(".");
    if (parts[1].length > 2) {
      excededLimit = true;
      const temporalAmount = removeLast(amount);
      setAmount(temporalAmount);
    }
  }
  return excededLimit;
};

/**
 * @description Método "semáforo" que permite operar sobre acciones válidas del usuario al momento de pulsar las teclas.
 * @param {Object} e Contiene la pulsación de la tecla por parte del usuario.
 * @returns {void}
 */
const handleValidOperation = (
  e: KeyboardEvent,
  amount: string,
  setAmount: Function
) => {
  // validar que no hayan más de 1 punto decimal. Sino bloquearlo.
  // manejar correctamente las teclas admitidas que no sean numéricas.
  // añadir el monto temporal
  // manejar errores (no bloqueante)
  addTemporalAmount(e, amount, setAmount);
  handleAdmitedKey(e, amount, setAmount);
  // handleAmountErrors();
  // // @ts-ignore
  const isValid = moreThanOneDot(amount, setAmount);
  // if (isValid) {
  //   e.preventDefault();
  // }
};

export {
  fetchCampaign,
  formatDate,
  formatTea,
  fetchMonthlyAmount,
  randomNumber,
  isKeyNotValid,
  handleValidOperation,
  formatAmount,
};
