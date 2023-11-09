import { QuestionsData } from "../../data/questionsData";
import styles from "./QuestionField.module.css";
import { IoIosTrash, IoIosCloseCircleOutline } from "react-icons/io";
import { useState } from "react";
import QuestionModal from "./QuestionModal";

interface QuestionFieldProps {
  question: QuestionsData;
  deleteQuestion: (question: QuestionsData) => void;
}

export default function QuestionField({
  question,
  deleteQuestion,
}: QuestionFieldProps) {
  const [questionModal, setQuestionModal] = useState(false);
  const openQuestionModal = () => {
    setQuestionModal(true);
  }

  const closeModal = () => {
    setQuestionModal(false);
  };

  return (
    <>
      {questionModal && (
        <div className={styles.overlay}>
          <div className={styles["modal-content"]}>
            <div className={styles["button-container"]}>
              <button onClick={closeModal} className={styles.button}>
                <IoIosCloseCircleOutline size={40} />
              </button>
            </div>
            <QuestionModal title={question.title} description={question.description} />
          </div>
        </div>
      )}
      
      <div className={styles["table-content"]}>
        <div className={styles.section}>{question.id}</div>
        <div className={styles["title-section"]} onClick={openQuestionModal}>{question.title}</div>
        <div className={styles["md-section"]}>{question.categories}</div>
        <div className={styles["md-section"]}>{question.complexity}</div>
        <div className={styles.section}>
          <button>
              <IoIosTrash
                size={20}
                className={styles.button}
                onClick={() => deleteQuestion(question)}
              />
            </button>
        </div>
      </div>
      <div className={styles.line} />
    </>
  );
}
