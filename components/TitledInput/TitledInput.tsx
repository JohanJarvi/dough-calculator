import { ChangeEvent } from "react";
import styles from "./TitledInput.module.css";

export const TitledInput = (props: {
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

  return (
    <div className={styles.container}>
      <div className={styles.item}>{props.title}</div>
      <div className={styles.item}>
        <input
          className={props.type === "checkbox" ? styles.checkbox : styles.input}
          type={props.type || "number"}
          min={props.min}
          max={props.max}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};
