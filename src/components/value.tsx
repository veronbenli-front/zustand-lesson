import type { FC } from "react";
import { useCounter } from "../store/use-counter-store";

const Value: FC = () => {
  const counter = useCounter()

  return <h2>{counter}</h2>;
};

export default Value;
