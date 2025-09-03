// theme/useThemeColors.ts
import { useAppTheme } from "./Theme";


const lightColors = {
  background: "#fff",
  text: "#000",
  inputBackground: "#f9f9f9",
  borderBackground: '#dddddddd',
  inputText: "#000",
  placeholder: "#555",
  border: "#000",
};

const darkColors = {
  background: "#000",
  borderBackground: '#908d8ddd',
  text: "#fff",
  inputBackground: "#222",
  inputText: "#fff",
  placeholder: '#dddddddd',  
  border: "#555",
};


export function useThemeColors() {
  const { theme } = useAppTheme();
  return theme === "dark" ? darkColors : lightColors;
}
