import type { Task } from '../types/task'

export const tasks: Task[] = [
    {
        id: 't1',
        title: 'Подготовить план проекта',
        description: 'Описать основной сценарий приложения.',
        status: 'todo',
        dueDate: '2026-10-01',
        priority: 'high',
        tag: 'Учёба',
    },
    {
        id: 't2',
        title: 'Настроить репозиторий',
        description: 'Создать README и структуру папок проекта.',
        status: 'done',
        dueDate: '2026-09-15',
        priority: 'medium',
        tag: 'Проект',
    },
    {
        id: 't3',
        title: 'Сверстать список задач',
        description: 'Вывести карточки задач из массива данных.',
        status: 'in_progress',
        dueDate: '2026-10-10',
        priority: 'high',
        tag: 'Проект',
    },
    {
        id: 't4',
        title: 'Подготовиться к лабораторной по алгоритмам',
        description: 'Повторить сортировки и оценку сложности.',
        status: 'todo',
        dueDate: '2026-10-05',
        priority: 'medium',
        tag: 'Учёба',
    },
    {
        id: 't5',
        title: 'Прочитать документацию React Router',
        description: 'Разобраться с вложенными маршрутами и useParams.',
        status: 'in_progress',
        dueDate: '2026-10-03',
        priority: 'low',
        tag: 'Учёба',
    },
]