import styles from "./QuestionModal.module.css";
 
interface QuestionModalProps {
  title: String;
  description: String;
}

export default function QuestionModal({ title, description }:QuestionModalProps) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <pre className={styles.description}>{description}</pre>
    </div>
  );
}
