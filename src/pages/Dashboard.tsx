import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Trophy, TrendingUp, BookOpen, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for student dashboard
const upcomingTests = [
  {
    id: 1,
    title: "Mathematics - Algebra",
    date: "2024-01-15",
    time: "10:00 AM",
    duration: "2 hours",
    questions: 50,
    status: "upcoming"
  },
  {
    id: 2,
    title: "Physics - Mechanics",
    date: "2024-01-18",
    time: "2:00 PM",
    duration: "1.5 hours",
    questions: 40,
    status: "upcoming"
  }
];

const recentResults = [
  {
    id: 1,
    title: "Chemistry - Organic",
    score: 85,
    maxScore: 100,
    date: "2024-01-10",
    status: "passed"
  },
  {
    id: 2,
    title: "Biology - Genetics",
    score: 92,
    maxScore: 100,
    date: "2024-01-08",
    status: "passed"
  },
  {
    id: 3,
    title: "English - Grammar",
    score: 78,
    maxScore: 100,
    date: "2024-01-05",
    status: "passed"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();

  const averageScore = recentResults.reduce((acc, result) => acc + result.score, 0) / recentResults.length;

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-primary rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome back, Student!</h1>
          <p className="text-white/90">Ready to continue your learning journey?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageScore.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">+5.2% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48.5</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rank</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#15</div>
              <p className="text-xs text-muted-foreground">Out of 120 students</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Tests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Upcoming Tests
              </CardTitle>
              <CardDescription>
                Your scheduled assessments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingTests.map((test) => (
                <div key={test.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h3 className="font-medium">{test.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {test.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {test.time}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {test.questions} questions • {test.duration}
                    </p>
                  </div>
                  <Button 
                    onClick={() => navigate(`/test-instructions/${test.id}`)}
                    size="sm"
                  >
                    Start Test
                  </Button>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/tests")}
              >
                View All Tests
              </Button>
            </CardContent>
          </Card>

          {/* Recent Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Recent Results
              </CardTitle>
              <CardDescription>
                Your latest test performances
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentResults.map((result) => (
                <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{result.title}</h3>
                      <Badge variant="secondary">
                        {result.score}/{result.maxScore}
                      </Badge>
                    </div>
                    <Progress 
                      value={(result.score / result.maxScore) * 100} 
                      className="h-2"
                    />
                    <p className="text-sm text-muted-foreground">{result.date}</p>
                  </div>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/results")}
              >
                View All Results
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>
              Your progress over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center border border-dashed rounded-lg">
              <div className="text-center text-muted-foreground">
                <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                <p>Performance chart will be displayed here</p>
                <p className="text-sm">Integration with charting library needed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;