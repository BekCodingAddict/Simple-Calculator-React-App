import { ACTION } from "./App";

export default function OperationButton({ dispach, operation }) {
  return (
    <button
      onClick={() =>
        dispach({ type: ACTION.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}
