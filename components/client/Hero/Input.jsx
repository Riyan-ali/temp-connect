import { source_sans_3 } from "@/app/fonts/font";
import styles from "./styles.module.scss";
import { ErrorMessage, useField } from "formik";

const Input = (props) => {
  const [field, meta] = useField(props);

  return (
    <div
      className={`${styles.input} ${
        meta.touched && meta.error ? styles.error : ""
      }`}
    >
      <div>
        <label className={source_sans_3.className} htmlFor={props.htmlFor}>
          {props.labeltext}
        </label>
        <input
          className={source_sans_3.className}
          type={field.type}
          placeholder={props.placeholder}
          name={field.name}
          {...field}
          {...props}
        />
      </div>

      <div className={`${styles.errortext} ${source_sans_3.className}`}>
        <ErrorMessage name={field.name} />
      </div>
    </div>
  );
};

export default Input;
