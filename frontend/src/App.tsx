import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeProvider";
import { ErrorBoundary } from "./components/shared/ErrorBoundary";
import { router } from "./router/router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
      // Don't rely on the browser's online/offline detection to gate
      // requests — it's unreliable in some sandboxed/embedded contexts
      // and this app has no offline-first requirements.
      networkMode: "always",
    },
    mutations: {
      networkMode: "always",
    },
  },
});

export default function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
