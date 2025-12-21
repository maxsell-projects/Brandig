import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProjectView from "./pages/ProjectView"; // Seu antigo Index.tsx

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Rota de Login */}
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard (Protegido - idealmente faríamos um PrivateRoute, mas simples funciona) */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Rota Pública do Projeto (ex: site.com/p/nike) */}
          <Route path="/p/:slug" element={<ProjectView />} />

          {/* Redireciona a raiz para login ou dashboard */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;