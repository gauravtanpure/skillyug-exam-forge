import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (!formData.role) {
      toast({
        title: "Error",
        description: "Please select a role",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate signup - in real app, this would be an API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account Created",
        description: "Your account has been created successfully!",
      });
      
      if (formData.role === "admin") {
        navigate("/admin/dashboard");
      } else {
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

  const handleRoleChange = (value: string) => {
    setFormData({
      ...formData,
      role: value,
    });
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start your learning journey with Skillyug"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              className="pl-10"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

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
          <Label htmlFor="role">Select Role</Label>
          <Select onValueChange={handleRoleChange} required>
            <SelectTrigger>
              <SelectValue placeholder="Choose your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
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

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="pl-10 pr-10"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 px-3"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary hover:text-primary-hover font-medium transition-colors"
          >
            Sign in here
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Signup;