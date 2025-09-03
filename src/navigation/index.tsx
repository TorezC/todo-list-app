import { AddTaskScreen } from "@/screens/AddTaskScreen";
import TaskListScreen from "@/screens/TaskListScreen";
import { useAppTheme } from "@/theme/Theme";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
    TaskList: undefined;
    AddTask: undefined;
};


const Stack = createNativeStackNavigator<RootStackParamList>();


function RootNavigator() {
    const { theme } = useAppTheme();
    return (
        <NavigationContainer theme={theme === 'light' ? DefaultTheme : DarkTheme}>
            <Stack.Navigator>
                <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'Tasks' }} />
                <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Add Task' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigator