import styles from "./TitledInput.module.css";

export const TitledInput = (props: {
  title: string;
  valueUpdated: Function;
  min?: string;
  max?: string;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>{props.title}</div>
      <div className={styles.item}>
        <input
          className={styles.input}
          type="number"
          min={props.min}
          max={props.max}
          onChange={(e) => props.valueUpdated(e.target.value)}
        />
      </div>
    </div>
  );
};
