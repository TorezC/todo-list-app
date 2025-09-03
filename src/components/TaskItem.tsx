import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Task } from '@/types';
import { useThemeColors } from '@/theme/useThemeColors';


type Props = {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
};


export default function TaskItem({ task, onToggle, onDelete }: Props) {
    const colors = useThemeColors();
    const taskStyles = styles({ colors })
    return (
        <View style={[taskStyles.row, task.completed && taskStyles.completed]}
            accessibilityRole="button"
            accessibilityState={{ checked: task.completed }}>
            <Pressable onPress={() => onToggle(task.id)} style={taskStyles.checkbox}>
                <Text style={taskStyles.checkboxLabel}>{task.completed ? '✓' : ''}</Text>
            </Pressable>
            <View style={taskStyles.content}>
                <Text numberOfLines={2} style={[taskStyles.title, task.completed && taskStyles.titleCompleted]}>{task.title}</Text>
                {!!task.description && <Text numberOfLines={2} style={taskStyles.desc}>{task.description}</Text>}
                {!!task.dueAt && (
                    <Text style={taskStyles.due}>Due: {new Date(task.dueAt).toDateString()}</Text>
                )}
            </View>
            <Pressable onPress={() => onDelete(task.id)} accessibilityLabel="Delete task">
                <Text style={taskStyles.delete}>Delete</Text>
            </Pressable>
        </View>
    );
}


const styles = ({ colors }: any) => StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        gap: 12,
        marginBottom: 10
    },
    completed: { opacity: 0.6 },
    checkbox: {
        width: 28,
        height: 28,
        borderRadius: 6,
        borderColor: colors.border,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkboxLabel: { fontSize: 16, fontWeight: '700', color: colors.text  },
    content: { flex: 1, },
    title: { fontSize: 16, fontWeight: '700', color: colors.text },
    titleCompleted: { textDecorationLine: 'line-through' },
    desc: { opacity: 0.8, marginTop: 2, color: colors.text },
    due: { marginTop: 4, fontSize: 12, opacity: 0.8, color: colors.text },
    delete: { fontSize: 18, color: 'red' }
});