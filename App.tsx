import { TasksProvider } from '@/context';
import RootNavigator from '@/navigation';
import { ThemeProvider } from '@/theme/Theme';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ThemeProvider>
        <TasksProvider>
        <RootNavigator />
        </TasksProvider>
      </ThemeProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
