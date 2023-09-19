import { useState } from 'react';
import { AddIcon } from '@/icons/icons';
import QuestionField from './QuestionField';
import { QuestionsData } from '@/data/questionsData';
import styles from './Questions.module.css';

export default function Questions() {

  const [questions, setQuestions] = useState<QuestionsData[]>([]);

  return (
    <div className={styles.container}>
        <div className={styles.title}>
        <div className={styles.header}>
          Practice Questions
        </div>
        <AddIcon />
        </div>
        <div className={styles.table}>
            <div className={styles['table-header']}>
                <div className={styles.section}>
                id
                </div>
                <div className={styles['md-section']}>
                Title
                </div>
                <div className={styles['lg-section']}>
                Description
                </div>
                <div className={styles.section}>
                Category
                </div>
                <div className={styles.section}>
                Complexity
                </div>
            </div>
            <div className={styles.line} />
            <div>
              {
                questions.map(question =>
                <QuestionField
                question={question}
                />)
              }
            </div>
        </div>
    </div>
  );
}