import type { FC } from "react";
import { incrementCounter, decrementCounter } from "../store/use-counter-store";


const ButtonsContainer: FC = () => {

  return (
    <div className="card">
      <button onClick={incrementCounter}>Увеличить число</button>
      <button onClick={decrementCounter}>Уменьшить число</button>
    </div>
  );
};

export default ButtonsContainer;
