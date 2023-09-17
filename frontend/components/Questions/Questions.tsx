import QuestionField from "./QuestionField";
import styles from "./Questions.module.css";
import { useState } from "react";
import QuestionForm from "./QuestionForm";
import {
  IoIosAddCircleOutline,
  IoIosCloseCircleOutline,
  IoIosTrash,
} from "react-icons/io";

export default function Questions() {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.header}>Practice Questions</div>

        <button onClick={toggleModal} className={styles.button}>
          <IoIosAddCircleOutline size={40} />
        </button>

        {modal && (
          <div className={styles.overlay}>
            <div className={styles["modal-content"]}>
              <div className={styles["button-container"]}>
                <button onClick={toggleModal} className={styles.button}>
                  <IoIosCloseCircleOutline size={40} />
                </button>
              </div>
              <QuestionForm />
            </div>
          </div>
        )}
      </div>
      <div className={styles.table}>
        <div className={styles["table-header"]}>
          <div className={styles.section}>id</div>
          <div className={styles["md-section"]}>Title</div>
          <div className={styles["lg-section"]}>Description</div>
          <div className={styles.section}>Category</div>
          <div className={styles.section}>Complexity</div>
        </div>
        <div className={styles.line} />
        <div className={styles["table-header"]}>
          <QuestionField
            id={1}
            title={"123"}
            description={"123"}
            category={["123"]}
            complexity={"123"}
          />
          {/* TODO: fix spacing between trash and questions */}
          <button>
            <IoIosTrash size={20} className={styles.button} />
          </button>
        </div>
      </div>
    </div>
  );
}
