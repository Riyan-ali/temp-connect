import { open_sans } from "@/app/fonts/font";
import styles from "./styles.module.scss";

const Steps = ({activeTab}) => {

  return (
    <div className={styles.stepper}>

      <div>
        <span className={`${styles.circle} ${open_sans.className} ${
            activeTab > 1 ? styles.completed : activeTab === 1 ? styles.active : ""
          }`}>1</span>
        <span className={open_sans.className} >Create</span>
      </div>

      <div>
        <span className={`${styles.circle} ${open_sans.className} ${
            activeTab > 2 ? styles.completed : activeTab === 2 ? styles.active : ""
          }`}>2</span>
        <span className={open_sans.className} >Configure</span>
      </div>

      <div>
        <span className={`${styles.circle} ${open_sans.className} ${
            activeTab === 3 ? styles.active : ""
          }`}>3</span>
        <span className={open_sans.className} >Get Started</span>
      </div>
      
    </div>
  );
};

export default Steps;
