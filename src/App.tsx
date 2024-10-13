import './App.css';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Demo from './demo';
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/toggle';
import { Toaster } from './components/ui/toaster';
import { AuthProvider } from './contexts/auth-context';

const queryClient = new QueryClient();

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ModeToggle />
          <Demo />
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
