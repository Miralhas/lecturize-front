import './App.css';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Demo from './demo';
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/toggle';
import { Toaster } from './components/ui/toaster';
import { AuthProvider } from './contexts/auth-context';
import { LectureProvider } from './contexts/lectures-context';

const queryClient = new QueryClient();

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LectureProvider>
            <ModeToggle />
            <Demo />
            <Toaster />
          </LectureProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
