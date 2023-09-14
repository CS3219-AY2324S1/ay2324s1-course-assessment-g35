import styles from './QuestionField.module.css';

interface QuestionFieldProps {
    id: number;
    title: string;
    description: string;
    category: string;
    complexity: string;
}

export default function QuestionField(props: QuestionFieldProps) {
    return (
    <div className={styles.main}>
        <div className={styles['table-content']}>
            <div className={styles.section}>
                {props.id}
            </div>
            <div className={styles['md-section']}>
                {props.title}
            </div>
            <div className={styles['lg-section']}>
                {props.description}
            </div>
            <div className={styles.section}>
            {props.category}
            </div>
            <div className={styles.section}>
            {props.complexity}
            </div>
        </div>
    </div>
    )
}