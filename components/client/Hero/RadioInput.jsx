import { source_sans_3 } from "@/app/fonts/font";
import styles from "./styles.module.scss";

const RadioInput = (props) => {
  return (
    <div className={`${styles.radio} ${source_sans_3.className}`}>
      <label className={styles.mainlabel} htmlFor={props.for}>{props.label}</label>
      {props.options.map((data, i) => (
        <>
          <input
          key={i}
            type="radio"
            id={data.name}
            name={data.name}
            value={data.value}
            checked={props.checked === data.value}
            onChange={props.radioChangeHandler}
          />
          <label htmlFor={data.name}>{data.label}</label>
        </>
      ))}
    </div>
  );
};

export default RadioInput;
