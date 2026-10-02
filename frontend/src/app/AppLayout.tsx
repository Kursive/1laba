import { NavLink, Outlet } from 'react-router'

const appTitle: string = 'Task Tracker'

export function AppLayout() {
    return (
        <div className="app">
            <header>
                <p className="app-title">{appTitle}</p>
                <p>Личные задачи, сроки и прогресс.</p>
                <nav aria-label="Основная навигация">
                    <NavLink to="/tasks" end>Задачи</NavLink>
                    <NavLink to="/tasks/new">Создать</NavLink>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}