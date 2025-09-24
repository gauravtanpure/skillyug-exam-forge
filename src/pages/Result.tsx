import { useParams, useLocation, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Clock, CheckCircle, XCircle, AlertCircle, Download, BarChart3 } from "lucide-react";

// Mock test data
const testData = {
  1: {
    id: 1,
    title: "Mathematics - Algebra",
    duration: 120,
    maxMarks: 100,
    passingMarks: 40,
  }
};

const Result = () => {
  const { testId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const test = testData[Number(testId) as keyof typeof testData];
  const { score, totalQuestions, answers } = location.state || { score: 0, totalQuestions: 0, answers: {} };

  if (!test) {
    return (
      <DashboardLayout userRole="student">
        <div className="flex items-center justify-center min-h-[400px]">
          <Card>
            <CardContent className="text-center p-6">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Result Not Found</h2>
              <Button onClick={() => navigate("/dashboard")}>
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const percentage = Math.round((score / totalQuestions) * 100);
  const isPassed = percentage >= (test.passingMarks / test.maxMarks) * 100;
  const unattempted = totalQuestions - Object.keys(answers).length;
  const attempted = Object.keys(answers).length;
  const correct = score;
  const wrong = attempted - correct;

  return (
    <DashboardLayout userRole="student">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Result Header */}
        <Card className={`${isPassed ? 'border-success' : 'border-warning'}`}>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {isPassed ? (
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-success" />
                </div>
              ) : (
                <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-warning" />
                </div>
              )}
            </div>
            <CardTitle className="text-2xl mb-2">
              {isPassed ? "Congratulations!" : "Keep Trying!"}
            </CardTitle>
            <CardDescription className="text-base">
              {test.title}
            </CardDescription>
            <div className="flex justify-center mt-4">
              <Badge variant={isPassed ? "secondary" : "destructive"} className="text-lg px-4 py-2">
                {isPassed ? "PASSED" : "FAILED"}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">{percentage}%</div>
              <p className="text-muted-foreground">Overall Score</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-success mb-2">{correct}</div>
              <p className="text-muted-foreground">Correct Answers</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-destructive mb-2">{wrong}</div>
              <p className="text-muted-foreground">Wrong Answers</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="text-center p-6">
              <div className="text-3xl font-bold text-muted-foreground mb-2">{unattempted}</div>
              <p className="text-muted-foreground">Unattempted</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Performance Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>Correct</span>
                  </div>
                  <span className="font-medium">{correct}/{totalQuestions}</span>
                </div>
                <Progress value={(correct / totalQuestions) * 100} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-destructive" />
                    <span>Wrong</span>
                  </div>
                  <span className="font-medium">{wrong}/{totalQuestions}</span>
                </div>
                <Progress value={(wrong / totalQuestions) * 100} className="h-2" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-muted-foreground" />
                    <span>Unattempted</span>
                  </div>
                  <span className="font-medium">{unattempted}/{totalQuestions}</span>
                </div>
                <Progress value={(unattempted / totalQuestions) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Test Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Test Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-semibold">{totalQuestions}</div>
                  <div className="text-sm text-muted-foreground">Total Questions</div>
                </div>
                
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-semibold">{test.duration} min</div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                </div>
                
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-semibold">{test.maxMarks}</div>
                  <div className="text-sm text-muted-foreground">Max Marks</div>
                </div>
                
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-semibold">{test.passingMarks}</div>
                  <div className="text-sm text-muted-foreground">Passing Marks</div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Accuracy Rate</span>
                  <span className="text-sm font-medium">{attempted > 0 ? Math.round((correct / attempted) * 100) : 0}%</span>
                </div>
                <Progress value={attempted > 0 ? (correct / attempted) * 100 : 0} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Analysis</CardTitle>
            <CardDescription>
              Detailed breakdown of your performance across different topics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center border border-dashed rounded-lg">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="w-8 h-8 mx-auto mb-2" />
                <p>Performance analysis chart will be displayed here</p>
                <p className="text-sm">Topic-wise breakdown and trends</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="flex-1 sm:flex-none"
          >
            Back to Dashboard
          </Button>
          
          <Button
            variant="outline"
            className="flex-1 sm:flex-none gap-2"
            onClick={() => {
              // Mock download functionality
              alert("Report download feature will be implemented with backend integration");
            }}
          >
            <Download className="w-4 h-4" />
            Download Report
          </Button>
          
          <Button
            onClick={() => navigate("/results")}
            className="flex-1 sm:flex-none"
          >
            View All Results
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Result;