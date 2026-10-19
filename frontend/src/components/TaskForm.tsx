import { useState } from 'react'
import type { FormEvent } from 'react'
import type { TaskDraft } from '../types/task'
import { useTags } from '../hooks/useTags'
import { priorityLabels, statusLabels } from './TaskCard'

type TaskFormProps = {
    initialValues: TaskDraft
    onSave: (draft: TaskDraft) => void
    onCancel: () => void
}

export function TaskForm(props: TaskFormProps) {
    const [draft, setDraft] = useState<TaskDraft>(() => ({ ...props.initialValues }))
    const [error, setError] = useState('')
    const { load, retry } = useTags()

    const tags = load.status === 'success' ? load.data : []
    const selectedTagExists = tags.some((tag) => tag.id === draft.tag)
    const canSave = load.status === 'success' && selectedTagExists

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!canSave) {
            setError('Дождитесь справочника и выберите доступный тег.')
            return
        }

        const title = draft.title.trim()
        if (title.length < 3 || title.length > 100) {
            setError('Название должно содержать от 3 до 100 символов.')
            return
        }
        if (!draft.dueDate) {
            setError('Укажите срок задачи.')
            return
        }
        if (draft.status === 'done' && draft.description.trim() === '') {
            setError('У завершённой задачи должно быть описание результата.')
            return
        }

        setError('')
        props.onSave({ ...draft, title })
    }

    return (
        <form className="task-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
                <label htmlFor="task-title">Название</label>
                <input
                    id="task-title"
                    value={draft.title}
                    required
                    onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                />
            </div>

            <div className="field">
                <label htmlFor="task-description">Описание</label>
                <textarea
                    id="task-description"
                    value={draft.description}
                    onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                />
            </div>

            <div className="field">
                <label htmlFor="task-date">Срок</label>
                <input
                    id="task-date"
                    type="date"
                    value={draft.dueDate}
                    required
                    onChange={(e) => setDraft({ ...draft, dueDate: e.target.value })}
                />
            </div>

            <div className="field">
                <label htmlFor="task-tag">Тег</label>
                <select
                    id="task-tag"
                    value={draft.tag}
                    required
                    disabled={load.status !== 'success' || tags.length === 0}
                    onChange={(e) => setDraft({ ...draft, tag: e.target.value })}
                >
                    <option value="">Выберите тег</option>
                    {draft.tag !== '' && !selectedTagExists && (
                        <option value={draft.tag} disabled>
                            Текущий код: {draft.tag} — выберите доступный тег
                        </option>
                    )}
                    {tags.map((tag) => (
                        <option key={tag.id} value={tag.id}>{tag.name}</option>
                    ))}
                </select>

                {load.status === 'loading' && (
                    <p className="form-status" role="status">Загружаем теги…</p>
                )}

                {load.status === 'error' && (
                    <div className="form-status form-status-error">
                        <p role="alert">{load.message}</p>
                        <button type="button" className="btn" onClick={retry}>
                            Повторить
                        </button>
                    </div>
                )}

                {load.status === 'success' && tags.length === 0 && (
                    <div className="form-status">
                        <p role="status">Тегов пока нет. Сохранение недоступно.</p>
                        <button type="button" className="btn" onClick={retry}>
                            Повторить
                        </button>
                    </div>
                )}

                {load.status === 'success' && tags.length > 0 &&
                    draft.tag !== '' && !selectedTagExists && (
                        <p className="form-status" role="status">
                            Прежний тег не найден в справочнике. Выберите доступный.
                        </p>
                    )}
            </div>

            <div className="field-row">
                <div className="field">
                    <label htmlFor="task-status">Статус</label>
                    <select
                        id="task-status"
                        value={draft.status}
                        onChange={(e) => {
                            const status = e.target.value
                            if (status === 'todo' || status === 'in_progress' || status === 'done') {
                                setDraft({ ...draft, status })
                            }
                        }}
                    >
                        <option value="todo">{statusLabels.todo}</option>
                        <option value="in_progress">{statusLabels.in_progress}</option>
                        <option value="done">{statusLabels.done}</option>
                    </select>
                </div>

                <div className="field">
                    <label htmlFor="task-priority">Приоритет</label>
                    <select
                        id="task-priority"
                        value={draft.priority}
                        onChange={(e) => {
                            const priority = e.target.value
                            if (priority === 'low' || priority === 'medium' || priority === 'high') {
                                setDraft({ ...draft, priority })
                            }
                        }}
                    >
                        <option value="low">{priorityLabels.low}</option>
                        <option value="medium">{priorityLabels.medium}</option>
                        <option value="high">{priorityLabels.high}</option>
                    </select>
                </div>
            </div>

            {error && <p className="form-error" role="alert">{error}</p>}

            <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={!canSave}>
                    Сохранить
                </button>
                <button type="button" className="btn" onClick={props.onCancel}>
                    Отмена
                </button>
            </div>
        </form>
    )
}