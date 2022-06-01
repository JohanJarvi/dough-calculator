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
      {props.type !== "checkbox" ? (
        <div className={styles.item}>{props.title}</div>
      ) : null}
      <div className={styles.item}>
        {props.type === "checkbox" ? <span>{props.title}</span> : null}
        <input
          className={styles.input}
          type={props.type || "number"}
          min={props.min}
          max={props.max}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};
