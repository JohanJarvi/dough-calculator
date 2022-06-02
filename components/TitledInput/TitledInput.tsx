import { ChangeEvent } from "react";
import { CalculatorInputs } from "../../types.d";
import styles from "./TitledInput.module.css";

export const TitledInput = (props: {
  id: CalculatorInputs;
  title: string;
  valueUpdated: Function;
  type?: string;
  min?: string;
  max?: string;
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (props.type === "checkbox") {
      props.valueUpdated(event.target.checked);
    } else {
      props.valueUpdated(event.target.value);
    }
  };

  const handleOnClick = () => {
    switch (props.id) {
      case CalculatorInputs.TotalFlour:
        console.log("Total Flour!");
        break;
      case CalculatorInputs.DoughHydration:
        console.log("Dough Hydration!");
        break;
      case CalculatorInputs.LevainHydration:
        console.log("Levain Hydration!");
        break;
      case CalculatorInputs.Salt:
        console.log("Salt!");
        break;
      case CalculatorInputs.Levain:
        console.log("Levain!");
        break;
      case CalculatorInputs.Yeast:
        console.log("Yeast!");
        break;
      default:
        console.log("Some unmapped one");
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.item}>{props.title}</div>
        <div className={styles.item}>
          <input
            className={
              props.type === "checkbox" ? styles.checkbox : styles.input
            }
            type={props.type || "number"}
            min={props.min}
            max={props.max}
            onChange={handleInputChange}
          />
          <span
            id={props.title}
            className={styles.icon}
            onClick={handleOnClick}
          >
            &#63;
          </span>
        </div>
      </div>
    </div>
  );
};
