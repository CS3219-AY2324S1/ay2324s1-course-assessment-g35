import { useEffect, useState } from "react";
import QuestionField from "./QuestionField";
import { QuestionsData } from "../../data/questionsData";
import data from "../../data/questions.json";
import styles from "./Questions.module.css";
import { IoIosAddCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";
import QuestionForm from "./QuestionForm";
import axios from "axios";

export default function Questions() {
  const [questions, setQuestions] = useState<QuestionsData[]>([]);
  const [nextId, setNextId] = useState(21 + questions.length);
  
  const [formModal, setFormModal] = useState(false);
  const [questionModal, setQuestionModal] = useState(false);

  const [canDelete, setCanDelete] = useState<boolean>(false);

  const openFormModal = () => {
    setFormModal(true);
  }
  const openQuestionModal = () => {
    setQuestionModal(true);
  }

  const closeModal = () => {
    setFormModal(false);
    setQuestionModal(false);
  };

  function getAndSetRole() {
        // get token and decode it, get role from decoded token
        const role = localStorage.getItem("role");
        console.log("role: ", role);
        setCanDelete(role === "ADMIN");
  }

  function getQuestionsFromBackend() {
    // add token to header
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `${token}`,
    };
    axios.get("http://localhost:8001/assignment/all", { headers }).then((response) => {
      console.log("response: ", response);
      setQuestions(response.data);
    }).catch((error) => {
      console.log("error: ", error);
    });
  }

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

    questions.sort((a, b) => a._id - b._id);

    return questions;
  }

  useEffect(() => {
    // localStorage.clear();
    // const questionsArray = data as QuestionsData[];
    // initializeQuestionsInLocalStorage(questionsArray);
    // setQuestions(retrieveQuestionsFromLocalStorage());

    // return () => {
    //   console.log("Questions component unmounted.");
    //   localStorage.clear(); // NOTE: role might be cleared upon refresh
    // }
    getAndSetRole();
    getQuestionsFromBackend();
  }, []);

  function addQuestion(newQuestion: QuestionsData) {
    // localStorage.setItem(
    //   `question_${newQuestion.title}`,
    //   JSON.stringify(newQuestion)
    // );
    // setQuestions([...questions, newQuestion]);
    // setNextId(nextId + 1);
    // closeModal();

    // add token to header
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `${token}`,
    };

    const body = {
      title: newQuestion.title,
      tags: newQuestion.tags,
      difficulty: newQuestion.difficulty,
      description: newQuestion.description,
    };

    axios.post("http://localhost:8001/assignment/add", body, { headers }).then((response) => {
      closeModal();
      getQuestionsFromBackend();
    }).catch((error) => {
      console.log("error: ", error);
    });
  }

  function deleteQuestion(deleteQuestion: QuestionsData) {
    const deleteQuestionTitle = deleteQuestion.title;
    const deleteQuestionId = deleteQuestion._id;

    const deleteQuestionKey = `question_${deleteQuestion.title}`;
    if (!localStorage.getItem(deleteQuestionKey)) {
      return;
    } else {
      localStorage.removeItem(deleteQuestionKey);
      let filteredQuestions = questions.filter(
        (question) => question.title != deleteQuestionTitle
      );
      filteredQuestions.forEach((question) => {
        if (question._id > deleteQuestionId) {
          question._id -= 1;
        }
      });
      setQuestions(filteredQuestions);
      setNextId(nextId - 1);
    }
  }

  function deleteQuestionFromBackend(id: string) {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `${token}`,
    };

    axios.delete(`http://localhost:8001/assignment/delete/${id}`, { headers }).then((response) => {
      getQuestionsFromBackend();
      closeModal();
    }).catch((error) => {
      console.log("error: ", error);
    });

  }



  return (
    <div className={styles.container}>
      <div className={styles.title}>

        {canDelete ? (
          <div className={styles.header}>Role: ADMIN. You can add and delete questions.</div>
        ) : (
          <div className={styles.header}>Role: USER. You can only view questions.</div>
        )}


        {/* condition to add based on canDelete */}
        {canDelete ? (
          <><div className={styles.header}>Add question</div><button onClick={openFormModal} className={styles.button}>
            <IoIosAddCircleOutline size={40} />
          </button></>
        ) : (
          <div className={styles.header}>CAN'T ADD</div>
        )}

        {formModal && (
          <div className={styles.overlay}>
            <div className={styles["modal-content"]}>
              <div className={styles["button-container"]}>
                <button onClick={closeModal} className={styles.button}>
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
          <div className={styles["md-section"]}>Category</div>
          <div className={styles["md-section"]}>Complexity</div>
          <div className={styles.section}> </div>
        </div>
        <div className={styles.line} />
        {questions.map((question) => (
          <QuestionField
            key={question._id}
            question={question}
            deleteQuestion={deleteQuestionFromBackend}
            canDelete={canDelete}
          />
        ))}
      </div>
    </div>
  );
}