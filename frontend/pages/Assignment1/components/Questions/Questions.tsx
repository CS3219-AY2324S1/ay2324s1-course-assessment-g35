import { useEffect, useState } from "react";
import QuestionField from "./QuestionField";
import { QuestionsData } from "../../data/questionsData";
import data from "../../data/questions.json";
import styles from "./Questions.module.css";
import { IoIosAddCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";
import QuestionForm from "./QuestionForm";

export default function Questions() {
  const [questions, setQuestions] = useState<QuestionsData[]>([]);
  const [nextId, setNextId] = useState(21 + questions.length);

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  function initializeQuestionsInLocalStorage(
    questionsArray: QuestionsData[]
  ): void {
    if (typeof Storage === "undefined") {
      console.log("Local storage is not supported by this browser.");
      return;
    }

    const hasQuestionsInitialized = localStorage.getItem(
      "questions_initialized"
    );
    if (hasQuestionsInitialized) {
      return;
    }

    questionsArray.forEach((question: QuestionsData) => {
      const existingQuestion = localStorage.getItem(
        `question_${question.title}`
      );
      if (!existingQuestion) {
        localStorage.setItem(
          `question_${question.title}`,
          JSON.stringify(question)
        );
      }
    });

    localStorage.setItem(`questions_initialized`, JSON.stringify("true"));
  }

  function retrieveQuestionsFromLocalStorage(): QuestionsData[] {
    const questions: QuestionsData[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key && key.startsWith("question_")) {
        const jsonString = localStorage.getItem(key);

        if (jsonString) {
          const question: QuestionsData = JSON.parse(jsonString);
          questions.push(question);
        }
      }
    }

    questions.sort((a, b) => a.id - b.id);

    return questions;
  }

  useEffect(() => {
    localStorage.clear();
    const questionsArray = data as QuestionsData[];
    initializeQuestionsInLocalStorage(questionsArray);
    setQuestions(retrieveQuestionsFromLocalStorage());
  }, []);

  function addQuestion(newQuestion: QuestionsData) {
    localStorage.setItem(
      `question_${newQuestion.title}`,
      JSON.stringify(newQuestion)
    );
    setQuestions([...questions, newQuestion]);
    setNextId(nextId + 1);
    toggleModal();
  }

  function deleteQuestion(deleteQuestion: QuestionsData) {
    const deleteQuestionTitle = deleteQuestion.title;
    const deleteQuestionId = deleteQuestion.id;

    const deleteQuestionKey = `question_${deleteQuestion.title}`;
    if (!localStorage.getItem(deleteQuestionKey)) {
      return;
    } else {
      localStorage.removeItem(deleteQuestionKey);
      let filteredQuestions = questions.filter(
        (question) => question.title != deleteQuestionTitle
      );
      filteredQuestions.forEach((question) => {
        if (question.id > deleteQuestionId) {
          question.id -= 1;
        }
      });
      setQuestions(filteredQuestions);
      setNextId(nextId - 1);
    }
  }

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
              <QuestionForm
                addQuestion={addQuestion}
                nextId={nextId}
                existingQuestions={questions}
              />
            </div>
          </div>
        )}
      </div>
      <div className={styles.table}>
        <div className={styles["table-header"]}>
          <div className={styles.section}>id</div>
          <div className={styles["md-section"]}>Title</div>
          <div className={styles["lg-section"]}>Description</div>
          <div className={styles["md-section"]}>Category</div>
          <div className={styles["md-section"]}>Complexity</div>
          <div className={styles.section}> </div>
        </div>
        <div className={styles.line} />
        {questions.map((question) => (
          <QuestionField
            key={question.id}
            question={question}
            deleteQuestion={deleteQuestion}
          />
        ))}
      </div>
    </div>
  );
}