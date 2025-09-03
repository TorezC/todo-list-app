import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Pressable, ActivityIndicator, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTasks } from '@/hooks/useTasks';
import { useAppTheme } from '@/theme/Theme';
import { RootStackParamList } from '@/navigation';
import TaskItem from '@/components/TaskItem';
import { useTasksContext } from '@/context';
import { useThemeColors } from '@/theme/useThemeColors';

const TaskListScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'TaskList'>) => {
    const { visible, toggleTask, deleteTask, setFilter, filter, sortByDue, setQuery, query, counts, loading, setSortByDue } = useTasksContext();
    const { theme, toggle } = useAppTheme();
    const colors = useThemeColors();
    const listStyles = styles({ colors })

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable onPress={toggle} accessibilityLabel="Toggle theme">
                    <Text style={{ color: colors.text }}>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</Text>
                </Pressable>
            )
        });
    }, [navigation, theme]);

    return (
        <View style={listStyles.container}>
            <View style={{ marginVertical: 10 }}>
                <TextInput
                    placeholder="Search tasks..."
                    value={query}
                    onChangeText={setQuery}
                    placeholderTextColor={colors.placeholder}
                    style={listStyles.input}
                />
            </View>
            <View style={listStyles.toolbar}>
                <Pressable style={[listStyles.chip, filter === 'all' && listStyles.chipActive]} onPress={() => setFilter('all')}><Text style={listStyles.chipText}>All ({counts.total})</Text></Pressable>
                <Pressable style={[listStyles.chip, filter === 'incomplete' && listStyles.chipActive]} onPress={() => setFilter('incomplete')}><Text style={listStyles.chipText}>Incomplete ({counts.incomplete})</Text></Pressable>
                <Pressable style={[listStyles.chip, filter === 'completed' && listStyles.chipActive]} onPress={() => setFilter('completed')}><Text style={listStyles.chipText}>Completed ({counts.completed})</Text></Pressable>
                <Pressable style={[
                    listStyles.chip,
                    sortByDue && listStyles.chipActive
                ]} onPress={() => setSortByDue((prev: boolean) => !prev)}><Text style={listStyles.chipText}>{sortByDue ? "Sorted by Due" : "Sort by Due"}</Text></Pressable>
            </View>

            {loading ? (
                <ActivityIndicator size="large" style={{ marginTop: 40 }} />
            ) : (
                <FlatList
                    data={visible}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TaskItem task={item} onToggle={() => toggleTask(item.id)} onDelete={() => deleteTask(item.id)} />
                    )}
                    ListEmptyComponent={<Text style={listStyles.empty}>No tasks found</Text>}
                    contentContainerStyle={{ paddingBottom: 80 }}
                />
            )}

            <Pressable
                style={listStyles.fab}
                onPress={() => navigation.navigate('AddTask')}
            >
                <Text style={listStyles.fabText}>＋</Text>
            </Pressable>
        </View>
    );
}

export default TaskListScreen

const styles = ({ colors }: any) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 12
    },
    toolbar: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginBottom: 12
    },
    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 8,
        padding: 15,
        color: colors.text
    },
    chip: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#aaa'
    },
    chipActive: {
        backgroundColor: colors.borderBackground
    },
    chipText: {
        color: colors.text
    },
    empty: {
        textAlign: 'center',
        marginTop: 30,
        fontSize: 16,
        color: colors.text,
        opacity: 0.6
    },
    fab: {
        position: 'absolute',
        bottom: 70,
        right: 20,
        backgroundColor: '#2e7d32',
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fabText: {
        color: 'white',
        fontSize: 28
    },
    label: {
        fontWeight: '600',
        marginTop: 10
    }
});
