import styles from "./styles.module.scss";

const CircleLoader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default CircleLoader;
