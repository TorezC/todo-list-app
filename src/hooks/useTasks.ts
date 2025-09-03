import { useCallback, useEffect, useMemo, useState } from 'react';
import { Task, Filter } from '@/types';
import { loadTasks, saveTasks } from '@/storage';


function uid() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
}


export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<Filter>('all');
    const [query, setQuery] = useState('');
    const [sortByDue, setSortByDue] = useState(false);
    const [loading, setLoading] = useState(true);


    // Load on mount
    useEffect(() => {
        (async () => {
            const data = await loadTasks();

            setTasks(data);
            setLoading(false);
        })();
    }, []);


    // Persist whenever tasks change
    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);


    const addTask = useCallback(({ title, description, dueAt }: { title: string, description?: string, dueAt?: any }) => {
        const t: Task = { id: uid(), title: title.trim(), description, completed: false, createdAt: Date.now(), dueAt };

        setTasks(prev => [t, ...prev]);
    }, []);


    const toggleTask = useCallback((id: string) => {
        setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
    }, []);


    const deleteTask = useCallback((id: string) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    }, []);



    const visible = useMemo(() => {
        let list = tasks;
        if (filter === 'completed') list = list.filter(t => t.completed);
        if (filter === 'incomplete') list = list.filter(t => !t.completed);
        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter(t => t.title.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q));
        }
        if (sortByDue) {

            list = [...list].sort((a, b) => {
                const aDue = a.dueAt ? new Date(a.dueAt).getTime() : Infinity;
                const bDue = b.dueAt ? new Date(b.dueAt).getTime() : Infinity;
                return aDue - bDue;
            });
        } else {
            list = [...list].sort((a, b) => b.createdAt - a.createdAt);
        }
        
        return list;
    }, [tasks, filter, query, sortByDue]);


    const counts = useMemo(() => ({
        total: tasks.length,
        completed: tasks.filter(t => t.completed).length,
        incomplete: tasks.filter(t => !t.completed).length,
    }), [tasks]);


    return { tasks, visible, addTask, toggleTask, deleteTask, setFilter, filter, setQuery, query, sortByDue, setSortByDue, counts, loading };
}