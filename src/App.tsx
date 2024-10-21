import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from './contexts/auth-context';
import Demo from './demo';
import Sidebar from "./components/sidebar";
import { toast } from "sonner";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.log(query);
      toast.error("Something went wrong. Try again later!", {
        description: error.message
      });
      
    }
  }),
  defaultOptions: {
    queries: {
      staleTime: 2 * 60 * 1000 // 2 minutes
    }
  }
});

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
