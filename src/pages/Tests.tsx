import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, Users, Calendar, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for available tests
const availableTests = [
  {
    id: 1,
    title: "Mathematics - Algebra",
    description: "Comprehensive test covering algebraic expressions, equations, and problem-solving",
    duration: 120,
    questions: 50,
    maxMarks: 100,
    difficulty: "Intermediate",
    status: "available",
    enrolled: 45,
    date: "2024-01-15",
    time: "10:00 AM"
  },
  {
    id: 2,
    title: "Physics - Mechanics", 
    description: "Test covering Newton's laws, motion, and energy concepts",
    duration: 90,
    questions: 40,
    maxMarks: 80,
    difficulty: "Beginner",
    status: "available",
    enrolled: 32,
    date: "2024-01-18",
    time: "2:00 PM"
  },
  {
    id: 3,
    title: "Chemistry - Organic",
    description: "Advanced organic chemistry concepts and reactions",
    duration: 150,
    questions: 60,
    maxMarks: 120,
    difficulty: "Advanced",
    status: "completed",
    enrolled: 28,
    date: "2024-01-10",
    time: "9:00 AM"
  },
  {
    id: 4,
    title: "English - Grammar",
    description: "Grammar rules, sentence structure, and language usage",
    duration: 60,
    questions: 30,
    maxMarks: 60,
    difficulty: "Beginner",
    status: "upcoming",
    enrolled: 52,
    date: "2024-01-25",
    time: "3:00 PM"
  }
];

const Tests = () => {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "secondary";
      case "Intermediate": return "default";
      case "Advanced": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "default";
      case "completed": return "secondary";
      case "upcoming": return "outline";
      default: return "secondary";
    }
  };

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Available Tests</h1>
            <p className="text-muted-foreground">Choose from our comprehensive test library</p>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">All Tests</Button>
              <Button variant="outline" size="sm">Available</Button>
              <Button variant="outline" size="sm">Completed</Button>
              <Button variant="outline" size="sm">Upcoming</Button>
              <Button variant="outline" size="sm">Beginner</Button>
              <Button variant="outline" size="sm">Intermediate</Button>
              <Button variant="outline" size="sm">Advanced</Button>
            </div>
          </CardContent>
        </Card>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableTests.map((test) => (
            <Card key={test.id} className="hover:shadow-card-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{test.title}</CardTitle>
                    <CardDescription>{test.description}</CardDescription>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge variant={getDifficultyColor(test.difficulty)}>
                      {test.difficulty}
                    </Badge>
                    <Badge variant={getStatusColor(test.status)}>
                      {test.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Test Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{test.duration} min</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span>{test.questions} questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{test.enrolled} enrolled</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{test.maxMarks} marks</span>
                  </div>
                </div>

                {/* Schedule */}
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Schedule:</span>
                    <span className="font-medium">{test.date} at {test.time}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {test.status === "available" && (
                    <Button 
                      className="flex-1 gap-2"
                      onClick={() => navigate(`/test-instructions/${test.id}`)}
                    >
                      <Play className="w-4 h-4" />
                      Take Test
                    </Button>
                  )}
                  {test.status === "completed" && (
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => navigate(`/result/${test.id}`)}
                    >
                      View Results
                    </Button>
                  )}
                  {test.status === "upcoming" && (
                    <Button variant="outline" className="flex-1" disabled>
                      Coming Soon
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Tests;