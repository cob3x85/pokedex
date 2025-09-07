import { StackNavigator } from './presentation/navigator/StackNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeContextProvider } from './presentation/context/ThemeContext';

const queryClient = new QueryClient();
export const PokedexApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <StackNavigator />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
};
