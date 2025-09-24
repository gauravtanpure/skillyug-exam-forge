import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login - in real app, this would be an API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock login logic
      if (formData.email === "admin@skillyug.com") {
        toast({
          title: "Login Successful",
          description: "Welcome back, Admin!",
        });
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        navigate("/dashboard");
      }
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue your learning journey"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="pl-10"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="pl-10 pr-10"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 px-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <Link
            to="/forgot-password"
            className="text-primary hover:text-primary-hover transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-primary hover:text-primary-hover font-medium transition-colors"
          >
            Sign up here
          </Link>
        </div>

        {/* Demo credentials */}
        <div className="mt-6 p-3 bg-muted rounded-lg text-xs text-muted-foreground">
          <p className="font-medium mb-1">Demo Credentials:</p>
          <p>Student: any email / password</p>
          <p>Admin: admin@skillyug.com / any password</p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;