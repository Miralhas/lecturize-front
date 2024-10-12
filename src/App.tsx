import './App.css';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Demo from './demo';
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/toggle';
import { Toaster } from './components/ui/toaster';

const queryClient = new QueryClient();

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <ModeToggle />
        <Demo />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
