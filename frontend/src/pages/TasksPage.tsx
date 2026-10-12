import { useState } from 'react'
import { Link } from 'react-router'
import { TaskCard, statusLabels } from '../components/TaskCard'
import type { Task, TaskStatus } from '../types/task'

type TasksPageProps = { tasks: Task[] }

export function TasksPage({ tasks }: TasksPageProps) {
    const [status, setStatus] = useState<TaskStatus | 'all'>('all')

    const visibleTasks = tasks.filter(
        (task) => status === 'all' || task.status === status
    )

    return (
        <section>
            <div className="page-header">
                <h1>Мои задачи</h1>
                <Link to="/tasks/new" className="btn btn-primary">Добавить задачу</Link>
            </div>

            <div className="filter-bar">
                <label htmlFor="status-filter">Статус:</label>
                <select
                    id="status-filter"
                    value={status}
                    onChange={(e) => {
                        const value = e.target.value
                        if (
                            value === 'all' ||
                            value === 'todo' ||
                            value === 'in_progress' ||
                            value === 'done'
                        ) {
                            setStatus(value)
                        }
                    }}
                >
                    <option value="all">Все</option>
                    <option value="todo">{statusLabels.todo}</option>
                    <option value="in_progress">{statusLabels.in_progress}</option>
                    <option value="done">{statusLabels.done}</option>
                </select>
                <button type="button" className="btn" onClick={() => setStatus('all')}>
                    Сбросить фильтр
                </button>
            </div>

            {tasks.length === 0 ? (
                <p className="empty-state">Задач пока нет. Создайте первую.</p>
            ) : visibleTasks.length === 0 ? (
                <p className="empty-state">Нет задач с выбранным статусом.</p>
            ) : (
                <div className="task-list">
                    {visibleTasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            )}
        </section>
    )
}