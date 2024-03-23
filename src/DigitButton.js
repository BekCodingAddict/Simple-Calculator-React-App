import { ACTION } from "./App";

export default function DigitButton({ dispach, digit }) {
  return <button onClick={() => dispach({type:ACTION.ADD_DIGIT,payload:{digit}})}>{digit}</button>;
}
