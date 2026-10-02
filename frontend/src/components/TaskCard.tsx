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
            <p>Статус: {statusLabels[task.status]}</p>
            <p>Приоритет: {priorityLabels[task.priority]}</p>
            <p>Срок: {task.dueDate}</p>
        </article>
    )
}