import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Tests from "./pages/Tests";
import Results from "./pages/Results";
import Profile from "./pages/Profile";
import TestInstructions from "./pages/TestInstructions";
import Exam from "./pages/Exam";
import Result from "./pages/Result";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Student Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/results" element={<Results />} />  
          <Route path="/profile" element={<Profile />} />
          <Route path="/test-instructions/:testId" element={<TestInstructions />} />
          <Route path="/exam/:testId" element={<Exam />} />
          <Route path="/result/:testId" element={<Result />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
