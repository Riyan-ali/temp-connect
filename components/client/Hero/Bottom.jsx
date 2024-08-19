import { open_sans } from "@/app/fonts/font";
import styles from "./styles.module.scss";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

const Bottom = ({ tabHandler, activeTab, submitButtonRef, id }) => {
  return (
    <div className={`${styles.bottom} ${open_sans.className}`}>
      {activeTab > 1 ? (
        <button className={styles.back} onClick={() => tabHandler("prev")}>
          <FaArrowLeft />
          Previous
        </button>
      ) : (
        <button style={{ visibility: "hidden" }}></button>
      )}
      {activeTab == 3 ? (
        <Link href={`/c/${id}`}>
          <button className={styles.next}>
            Start Chatting
            <FaArrowRight />
          </button>
        </Link>
      ) : activeTab === 2 ? (
        <button
          type="button"
          className={styles.next}
          onClick={() => submitButtonRef.current.click()}
        >
          {id ? (
            <>
              Update
              <FaArrowRight />
            </>
          ) : (
            <>
              Submit
              <FaArrowRight />
            </>
          )}
        </button>
      ) : (
        <button className={styles.next} onClick={() => tabHandler("next")}>
          Next
          <FaArrowRight />
        </button>
      )}
    </div>
  );
};

export default Bottom;
