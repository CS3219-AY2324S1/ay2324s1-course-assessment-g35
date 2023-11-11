import { QuestionsData } from "../../data/questionsData";
import styles from "./QuestionField.module.css";
import { IoIosTrash, IoIosCloseCircleOutline } from "react-icons/io";
import { useState } from "react";
import QuestionModal from "./QuestionModal";

interface QuestionFieldProps {
  question: QuestionsData;
  deleteQuestion: (id: string) => void;
  canDelete: boolean;
}

export default function QuestionField({
  question,
  deleteQuestion,
  canDelete,
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
        <div className={styles.section}>{question._id}</div>
        <div className={styles["title-section"]} onClick={openQuestionModal}>{question.title}</div>
        <div className={styles["md-section"]}>{question.tags}</div>
        <div className={styles["md-section"]}>{question.difficulty}</div>
        <div className={styles.section}>
          {/* if else statement */}
          {canDelete ? (
            <button
              onClick={() => deleteQuestion(question._id)}
              className={styles.button}
            >
              <IoIosTrash size={40} />
            </button>
          ) : (
            <div>CAN'T DLT</div>
          )}
        </div>
      </div>
      <div className={styles.line} />
    </>
  );
}
