import { QuestionsData } from "../../data/questionsData";
import styles from "./QuestionField.module.css";
import { IoIosTrash } from "react-icons/io";

interface QuestionFieldProps {
  question: QuestionsData;
  deleteQuestion: (question: QuestionsData) => void
}

export default function QuestionField({ question, deleteQuestion }: QuestionFieldProps) {
  const correctUser = true
  return (
    <>
      {/* // <div className={styles.table}> */}
        <div className={styles["table-content"]}>
          <div className={styles.section}>{question.id}</div>
          <div className={styles["md-section"]}>{question.title}</div>
          <div className={styles["lg-section"]}>{question.description}</div>
          <div className={styles["md-section"]}>{question.categories}</div>
          <div className={styles["md-section"]}>{question.complexity}</div>
          <div className={styles.section}>
            {correctUser && (<button>
              <IoIosTrash 
                size={20} 
                className={styles.button}
                onClick={() => deleteQuestion(question)}
              />
            </button>
            )}
          </div>
        </div>
        <div className={styles.line} />
      </>
  );
}