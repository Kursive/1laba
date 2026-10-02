import { Link, useParams } from 'react-router'
import { priorityLabels, statusLabels } from '../components/TaskCard'
import { tasks } from '../data/tasks'

export function TaskDetailsPage() {
    const { id } = useParams()
    const task = tasks.find((item) => item.id === id)

    if (!task) {
        return (
            <section>
                <h1>Задача не найдена</h1>
                <Link to="/tasks">К списку задач</Link>
            </section>
        )
    }

    return (
        <section>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <p>Статус: {statusLabels[task.status]}</p>
            <p>Приоритет: {priorityLabels[task.priority]}</p>
            <p>Срок: {task.dueDate}</p>
            <p>Тег: {task.tag}</p>
            <Link to="/tasks">К списку задач</Link>
        </section>
    )
}