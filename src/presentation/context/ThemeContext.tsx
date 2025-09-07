import { createContext, PropsWithChildren } from 'react';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { adaptNavigationTheme, MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import merge from 'deepmerge';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

export const ThemeContext = createContext({
  isDark: false,
  theme: CombinedDefaultTheme,
    toggleTheme: () => {},
});

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <ThemeContext.Provider
          value={{
            isDark,
            theme,
            toggleTheme: () => {},
          }}
        >
          {children}
        </ThemeContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  );
};
