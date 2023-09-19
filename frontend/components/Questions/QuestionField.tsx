import { QuestionsData } from '@/data/questionsData';
import styles from './QuestionField.module.css';
import { IoIosTrash } from "react-icons/io";

interface QuestionFieldProps {
    question: QuestionsData
}

export default function QuestionField({ question }: QuestionFieldProps) {
    return (
    <div className={styles.main}>
        <div className={styles['table-content']}>
            <div className={styles.section}>
                {question.id}
            </div>
            <div className={styles['md-section']}>
                {question.title}
            </div>
            <div className={styles['lg-section']}>
                {question.description}
            </div>
            <div className={styles.section}>
            {question.categories}
            </div>
            <div className={styles.section}>
            {question.complexity}
            </div>
            <div>
            <IoIosTrash size={20} className={styles.button} />
            </div>
        </div>
    </div>
    )
}