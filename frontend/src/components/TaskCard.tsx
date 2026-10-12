import { Link } from 'react-router'
import type { Task, TaskPriority, TaskStatus } from '../types/task'

export const statusLabels: Record<TaskStatus, string> = {
    todo: 'К выполнению',
    in_progress: 'В работе',
    done: 'Выполнено',
}

export const priorityLabels: Record<TaskPriority, string> = {
    low: 'Низкий',
    medium: 'Средний',
    high: 'Высокий',
}

type TaskCardProps = { task: Task }

export function TaskCard({ task }: TaskCardProps) {
    return (
        <article className="task-card">
            <h2>
                <Link to={`/tasks/${task.id}`}>{task.title}</Link>
            </h2>
            <p>{task.description}</p>
            <div className="badges">
                <span className={`badge badge-status-${task.status}`}>
                    {statusLabels[task.status]}
                </span>
                <span className={`badge badge-priority-${task.priority}`}>
                    {priorityLabels[task.priority]}
                </span>
                {task.tag && <span className="badge badge-tag">#{task.tag}</span>}
            </div>
            <p className="task-card-date">Срок: {task.dueDate}</p>
        </article>
    )
}