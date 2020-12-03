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

const stopTimeout = (interval: NodeJS.Timeout) => {
  clearTimeout(interval);
};

const removeChars = (currency: string, amount: string) => {
  let newAmount = amount;
  if (amount) {
    currency = currencySymbol(currency);
    if (amount.indexOf(currency) !== -1) {
      newAmount = amount
        .replace(currency, "")
        .replace(/,/gi, "")
        .replace(/\s/gi, "");
    }
  } else {
    newAmount = "";
  }
  return newAmount;
};

const formatAmount = (currency: string, amount: string) => {
  const integerAmount = getIntegerAmount(amount);
  var len = integerAmount.length;
  if (len > 3) {
    const amountString = String(amount);
    switch (len) {
      case 4:
        return `${currencySymbol(currency)} ${insertAt(1, amountString, ",")}`;
        break;
      case 5:
        return `${currencySymbol(currency)} ${insertAt(2, amountString, ",")}`;
        break;
      default:
        return amountString;
    }
  }
  return amount;
};

/**
 * @description Método que da formato a la moneda con la que esté trabajando el usuario
 * @param {string} type Es un parámetro que puede contener 'PEN' o 'USD'.
 * @returns {string}
 */
const currencySymbol = (type: string) => {
  const symbols: { [key: string]: string } = {
    PEN: "S/.",
    USD: "$",
  };
  return symbols[type];
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
const addKey = (key: string, amount: string) => {
  const newAmount = amount === null ? key : amount + key;
  return newAmount;
};

/**
 * @description Este método nos permite añadir la tecla pulsada a una variable que usaremos
 * para hacer validaciones.
 * @param {Object} e
 * El parámetro "e" contiene la tecla pulsada, además de los eventos propios del 'keydown'
 * @returns {void}
 */
const addTemporalAmount = (e: KeyboardEvent, amount: string) => {
  let newAmount = amount;
  /**
   * Si la key es punto y no hay puntos en el monto temporal
   */
  if (e.key === "." && noPoints(amount)) {
    newAmount = addKey(e.key, amount);
  } else if (!admitedKeys.includes(e.key)) {
    /**
     * Si la tecla es numérica o punto y
     * Si solo aún no hay puntos en el monto
     */
    newAmount = addKey(e.key, amount);
  }
  return newAmount;
};

/**
 * @description Método 'semaforo' que permite ejecutar acciones según la tecla admitida (no numérica) presionada.
 * @param {Object} e Contiene la tecla pulsada por el usuario
 * @returns {string}
 */
const handleAdmitedKey = (e: KeyboardEvent, amount: string) => {
  switch (e.key) {
    case "Backspace":
      let newAmount;
      // @ts-ignore
      if (e.ctrlKey) {
        newAmount = "";
      } else {
        newAmount = removeLast(amount);
      }
      return newAmount;
      break;
    default:
      return amount;
  }
};

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
const moreThanOneDot = (amount: string) => {
  let excededLimit = false;
  if (hasDecimalPart(amount)) {
    const parts = amount.split(".");
    // Si tenemos más de un punto
    if (parts.length > 2) {
      excededLimit = true;
    }
  }
  return excededLimit;
};

const onlyTwoDecimals = (e: KeyboardEvent, amount: string) => {
  if (hasDecimalPart(amount)) {
    const amountParts = amount.split(".");
    if (amountParts[1].length > 2) {
      amount = removeLast(amount);
      e.preventDefault();
    }
  }
  return amount;
};

const handleDots = (e: KeyboardEvent, amount: string) => {
  // verifica que no hayan más de un punto decimal. Si hay lo remueve
  const isValid = moreThanOneDot(amount);
  if (isValid) {
    amount = removeLast(amount);
    e.preventDefault();
  }

  amount = onlyTwoDecimals(e, amount);
  return amount;
};

/**
 * @description Método "semáforo" que permite operar sobre acciones válidas del usuario al momento de pulsar las teclas.
 * @param {Object} e Contiene la pulsación de la tecla por parte del usuario.
 * @returns {void}
 */
const handleValidOperation = (e: KeyboardEvent, amount: string) => {
  let newAmount;
  newAmount = addTemporalAmount(e, amount);
  newAmount = handleAdmitedKey(e, newAmount);
  newAmount = handleDots(e, newAmount);
  return newAmount;
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
  removeChars,
  stopTimeout,
};
