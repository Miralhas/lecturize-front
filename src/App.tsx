import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';
import { AuthProvider } from './contexts/auth-context';
import Demo from './demo';
import Sidebar from "./components/sidebar";

const queryClient = new QueryClient();

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <div className="xl:grid xl:grid-cols-3 min-h-screen p-3">
            <Sidebar />
            <Demo />
          </div>
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
