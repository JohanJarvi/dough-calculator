import { ChangeEvent, useEffect, useState } from "react";
import styles from "./TitledRadioInput.module.css";

export const TitledRadioInput = (props: {
  title: string;
  valueUpdated: Function;
}) => {
  const [desired, setDesired] = useState(false);

  useEffect(() => {
    props.valueUpdated(desired);
  }, [desired]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "yes") {
      setDesired(event.target.checked);
    } else {
      setDesired(!event.target.checked);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>{props.title}</div>
      <div className={styles.items}>
        <div className={styles.item}>Yes: </div>
        <div className={styles.item}>
          <input
            id="yes-radio"
            className={styles.input}
            type="radio"
            value="yes"
            name="yes"
            checked={desired}
            onChange={handleOnChange}
          />
        </div>
        <div className={styles.item}>No:</div>
        <div className={styles.item}>
          <input
            id="no-radio"
            className={styles.input}
            type="radio"
            value="no"
            name="no"
            checked={!desired}
            onChange={handleOnChange}
          />
        </div>
      </div>
    </div>
  );
};
