import { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import "./style.css";

export const ACTION = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTION.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperant: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperant === "0") return state;
      if (payload.digit === "." && state.currentOperant.includes("."))
        return state;
      return {
        ...state,
        currentOperant: `${state.currentOperant || ""}${payload.digit}`,
      };
    case ACTION.CLEAR:
      return {};
    case ACTION.CHOOSE_OPERATION:
      if (state.currentOperant === null && state.previousOperant == null) {
        return state;
      }
      if (state.currentOperant == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousOperant == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperant: state.currentOperant,
          currentOperant: null,
        };
      }
      return {
        ...state,
        previousOperant: evaluate(state),
        operation: payload.operation,
        currentOperant: null,
      };
    case ACTION.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperant == null ||
        state.previousOperant == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previousOperant: null,
        operation: null,
        currentOperant: evaluate(state),
      };
    case ACTION.DELETE_DIGIT:
      if (state.overwrite)
        return {
          ...state,
          overwrite: false,
          currentOperant: null,
        };
      if (state.currentOperant == null) return state;
      if (state.currentOperant.length === 1) {
        return {
          ...state,
          currentOperant: null,
        };
      }
      return {
        ...state,
        currentOperant: state.currentOperant.slice(0, -1),
      };
  }
}

function evaluate({ currentOperant, previousOperant, operation }) {
  const prev = parseFloat(previousOperant);
  const current = parseFloat(currentOperant);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
  }
  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("eng-us", {
  maximumFractionDigits: 0,
});

function formatOperant(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}
function App() {
  const [{ currentOperant, previousOperant, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="pervious-operand">
          {formatOperant(previousOperant)} {operation}
        </div>
        <div className="current-operand">{formatOperant(currentOperant)}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTION.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTION.DELETE_DIGIT })}>
        DEL
      </button>
      <OperationButton operation="/" dispach={dispatch} />
      <DigitButton digit="1" dispach={dispatch} />
      <DigitButton digit="2" dispach={dispatch} />
      <DigitButton digit="3" dispach={dispatch} />
      <OperationButton operation="*" dispach={dispatch} />
      <DigitButton digit="4" dispach={dispatch} />
      <DigitButton digit="5" dispach={dispatch} />
      <DigitButton digit="6" dispach={dispatch} />
      <OperationButton operation="+" dispach={dispatch} />
      <DigitButton digit="7" dispach={dispatch} />
      <DigitButton digit="8" dispach={dispatch} />
      <DigitButton digit="9" dispach={dispatch} />
      <OperationButton operation="-" dispach={dispatch} />
      <DigitButton digit="." dispach={dispatch} />
      <DigitButton digit="0" dispach={dispatch} />
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTION.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
