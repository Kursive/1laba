import { Link, useNavigate, useParams } from 'react-router'
import { priorityLabels, statusLabels } from '../components/TaskCard'
import type { Task } from '../types/task'

type TaskDetailsPageProps = {
    tasks: Task[]
    onDelete: (id: string) => void
}

export function TaskDetailsPage({ tasks, onDelete }: TaskDetailsPageProps) {
    const { id } = useParams()
    const navigate = useNavigate()
    const task = tasks.find((item) => item.id === id)

    if (!task) {
        return (
            <section>
                <h1>Задача не найдена</h1>
                <Link to="/tasks" className="btn">К списку задач</Link>
            </section>
        )
    }

    return (
        <section>
            <h1>{task.title}</h1>
            <p>{task.description}</p>

            <dl className="task-details-meta">
                <dt>Статус</dt>
                <dd>
                    <span className={`badge badge-status-${task.status}`}>
                        {statusLabels[task.status]}
                    </span>
                </dd>
                <dt>Приоритет</dt>
                <dd>
                    <span className={`badge badge-priority-${task.priority}`}>
                        {priorityLabels[task.priority]}
                    </span>
                </dd>
                <dt>Срок</dt>
                <dd>{task.dueDate}</dd>
                <dt>Тег</dt>
                <dd>{task.tag}</dd>
            </dl>

            <div className="task-actions">
                <Link to={`/tasks/${task.id}/edit`} className="btn btn-primary">
                    Редактировать
                </Link>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                        if (window.confirm(`Удалить задачу «${task.title}»?`)) {
                            onDelete(task.id)
                            navigate('/tasks', { replace: true })
                        }
                    }}
                >
                    Удалить
                </button>
                <Link to="/tasks" className="btn">К списку задач</Link>
            </div>
        </section>
    )
}