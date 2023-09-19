import { useState } from 'react';
import QuestionField from './QuestionField';
import { QuestionsData } from '@/data/questionsData';
import styles from './Questions.module.css';
import {
  IoIosAddCircleOutline,
  IoIosCloseCircleOutline,
} from "react-icons/io";
import QuestionForm from './QuestionForm';

export default function Questions() {

  const [questions, setQuestions] = useState<QuestionsData[]>([]);

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
          {/* <QuestionField
            question={}}
          /> */}
        </div>
      </div>
    </div>
  );
}
