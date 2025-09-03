import { useTasksContext } from "@/context";
import { useTasks } from "@/hooks/useTasks";
import { RootStackParamList } from "@/navigation";
import { useThemeColors } from "@/theme/useThemeColors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export function AddTaskScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'AddTask'>) {
    const colors = useThemeColors();
    const taskAddStyles = styles({ colors })
  const { addTask } = useTasksContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');


  const saveTask = () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Task title cannot be empty');
      return;
    }
    if (dueDate && !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
      Alert.alert('Validation', 'Due date must be in YYYY-MM-DD format');
      return;
    }
    const dueAt = dueDate
    addTask({ title, description, dueAt });
    navigation.goBack();
  };

  return (
    <View style={taskAddStyles.container}>
      <Text style={taskAddStyles.label}>Title *</Text>
      <TextInput
        placeholder="Enter task title"
        placeholderTextColor={colors.placeholder}
        style={taskAddStyles.input}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={taskAddStyles.label}>Description</Text>
      <TextInput
        style={[taskAddStyles.input, taskAddStyles.multiline]}
        placeholder="Optional description"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor={colors.placeholder}
        multiline
      />

      <Text style={taskAddStyles.label}>Due Date (YYYY-MM-DD)</Text>
      <TextInput
        style={taskAddStyles.input}
        placeholder="2025-09-10"
        value={dueDate}
        placeholderTextColor={colors.placeholder}
        onChangeText={setDueDate}
      />

      <Pressable style={taskAddStyles.primaryBtn} onPress={saveTask}>
        <Text style={taskAddStyles.primaryText}>Save Task</Text>
      </Pressable>
    </View>
  );
}

const styles = ({colors}: any) => StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 12 
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
    label: { 
        fontWeight: '600', 
        marginTop: 10,
        color: colors.text
    },
    multiline: { 
        minHeight: 80, 
        textAlignVertical: 'top' 
    },
    primaryBtn: { 
        backgroundColor: '#2e7d32', 
        marginTop: 20, 
        padding: 14, 
        borderRadius: 10, 
        alignItems: 'center' 
    },
    primaryText: { 
        color: '#ffffff', 
        fontWeight: '600' 
    },
});