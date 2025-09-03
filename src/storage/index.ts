import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '@/types';


const KEY = 'RN_TODO_TASKS_V1';


export async function loadTasks(): Promise<Task[]> {
    try {
        const raw = await AsyncStorage.getItem(KEY);
        return raw ? (JSON.parse(raw) as Task[]) : [];
    } catch (e) {
        console.warn('Failed to load tasks', e);
        return [];
    }
}


export async function saveTasks(tasks: Task[]): Promise<void> {
    try {
        await AsyncStorage.setItem(KEY, JSON.stringify(tasks));
    } catch (e) {
        console.warn('Failed to save tasks', e);
    }
}