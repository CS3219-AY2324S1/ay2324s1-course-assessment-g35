import { AddIcon } from '@/icons/icons';
import QuestionField from './QuestionField';
import styles from './Questions.module.css';

export default function Questions() {
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
                <QuestionField
                id={1}
                title={'123'}
                description={'123'}
                category={['123']}
                complexity={'123'}
                />
            </div>
        </div>
    </div>
  );
}