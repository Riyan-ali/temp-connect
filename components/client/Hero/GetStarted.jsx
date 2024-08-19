"use client";
import { open_sans, source_sans_3 } from "@/app/fonts/font";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";

const GetStarted = ({ base_url, id }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy");
      });
  };

  return (
    <div className={`${styles.start} ${source_sans_3.className}`}>
      <span>{`${base_url}/c/${id}`}</span>
      <div>
        <button
          className={open_sans.className}
          onClick={() => copyToClipboard(`${base_url}/c/${id}`)}
        >
          Copy chat link
        </button>
        <button
          className={open_sans.className}
          onClick={() =>
            copyToClipboard(id)
          }
        >
          Copy chat code
        </button>
      </div>
    </div>
  );
};

export default GetStarted;
