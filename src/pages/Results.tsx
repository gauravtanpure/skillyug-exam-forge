import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, TrendingUp, Calendar, Download, Eye, BarChart3 } from "lucide-react";

// Mock data for test results
const testResults = [
  {
    id: 1,
    title: "Chemistry - Organic",
    date: "2024-01-10",
    score: 85,
    maxScore: 100,
    percentage: 85,
    duration: 135,
    questions: 60,
    correct: 51,
    wrong: 6,
    unattempted: 3,
    rank: 12,
    totalParticipants: 45,
    status: "passed"
  },
  {
    id: 2,
    title: "Biology - Genetics", 
    date: "2024-01-08",
    score: 92,
    maxScore: 100,
    percentage: 92,
    duration: 98,
    questions: 50,
    correct: 46,
    wrong: 3,
    unattempted: 1,
    rank: 3,
    totalParticipants: 38,
    status: "passed"
  },
  {
    id: 3,
    title: "English - Grammar",
    date: "2024-01-05",
    score: 78,
    maxScore: 100,
    percentage: 78,
    duration: 52,
    questions: 40,
    correct: 31,
    wrong: 7, 
    unattempted: 2,
    rank: 18,
    totalParticipants: 42,
    status: "passed"
  },
  {
    id: 4,
    title: "Mathematics - Calculus",
    date: "2024-01-03",
    score: 65,
    maxScore: 100,
    percentage: 65,
    duration: 142,
    questions: 55,
    correct: 36,
    wrong: 15,
    unattempted: 4,
    rank: 25,
    totalParticipants: 48,
    status: "passed"
  },
  {
    id: 5,
    title: "Physics - Thermodynamics",
    date: "2024-01-01",
    score: 58,
    maxScore: 100,
    percentage: 58,
    duration: 108,
    questions: 45,
    correct: 26,
    wrong: 16,
    unattempted: 3,
    rank: 32,
    totalParticipants: 41,
    status: "failed"
  }
];

const Results = () => {
  const averageScore = testResults.reduce((acc, result) => acc + result.percentage, 0) / testResults.length;
  const totalTests = testResults.length;
  const passedTests = testResults.filter(result => result.status === "passed").length;
  const bestScore = Math.max(...testResults.map(result => result.percentage));

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Test Results</h1>
            <p className="text-muted-foreground">Track your performance and progress</p>
          </div>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export Results
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTests}</div>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageScore.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Overall performance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round((passedTests / totalTests) * 100)}%</div>
              <p className="text-xs text-muted-foreground">{passedTests}/{totalTests} passed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bestScore}%</div>
              <p className="text-xs text-muted-foreground">Personal best</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
            <CardDescription>
              Your score progression over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center border border-dashed rounded-lg">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="w-8 h-8 mx-auto mb-2" />
                <p>Performance trend chart will be displayed here</p>
                <p className="text-sm">Score progression and analytics</p>
              </div>  
            </div>
          </CardContent>
        </Card>

        {/* Results Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Results</CardTitle>
            <CardDescription>
              Complete history of your test performances
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Rank</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{result.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {result.questions} questions • {result.duration} min
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {result.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {result.score}/{result.maxScore}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {result.percentage}%
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2 min-w-[120px]">
                        <div className="flex justify-between text-sm">
                          <span>Accuracy</span>
                          <span>{Math.round((result.correct / result.questions) * 100)}%</span>
                        </div>
                        <Progress value={(result.correct / result.questions) * 100} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium">#{result.rank}</div>
                        <div className="text-sm text-muted-foreground">
                          of {result.totalParticipants}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={result.status === "passed" ? "default" : "destructive"}>
                        {result.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Results;