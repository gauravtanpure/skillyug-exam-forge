import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText, AlertCircle, CheckCircle, Users, Calendar } from "lucide-react";

// Mock test data
const testData = {
  1: {
    id: 1,
    title: "Mathematics - Algebra",
    description: "Comprehensive test covering algebraic expressions, equations, and problem-solving",
    duration: 120, // minutes
    questions: 50,
    maxMarks: 100,
    passingMarks: 40,
    date: "2024-01-15",
    time: "10:00 AM",
    attempts: 1,
    instructions: [
      "Read all questions carefully before attempting",
      "Each question carries equal marks unless specified",
      "There is no negative marking for wrong answers",
      "You can review and change your answers before submitting",
      "Use the question palette to navigate between questions",
      "Submit the test before time runs out",
      "Calculator is not allowed for this test",
      "Ensure stable internet connection throughout the test"
    ]
  },
  2: {
    id: 2,
    title: "Physics - Mechanics",
    description: "Test covering Newton's laws, motion, and energy concepts",
    duration: 90,
    questions: 40,
    maxMarks: 80,
    passingMarks: 32,
    date: "2024-01-18",
    time: "2:00 PM",
    attempts: 1,
    instructions: [
      "Read all questions carefully before attempting",
      "Some questions may have multiple correct answers",
      "Negative marking: -0.25 marks for each wrong answer",
      "Use the formula sheet provided in the exam interface",
      "You can mark questions for review and come back later",
      "Submit the test before time runs out",
      "Calculator is allowed for numerical problems",
      "Diagrams are provided where necessary"
    ]
  }
};

const TestInstructions = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  
  const test = testData[Number(testId) as keyof typeof testData];

  if (!test) {
    return (
      <DashboardLayout userRole="student">
        <div className="flex items-center justify-center min-h-[400px]">
          <Card>
            <CardContent className="text-center p-6">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Test Not Found</h2>
              <p className="text-muted-foreground mb-4">The requested test could not be found.</p>
              <Button onClick={() => navigate("/dashboard")}>
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  const handleStartTest = () => {
    navigate(`/exam/${testId}`);
  };

  return (
    <DashboardLayout userRole="student">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Test Header */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{test.title}</CardTitle>
                <CardDescription className="text-base">
                  {test.description}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="ml-4">
                {test.attempts} Attempt{test.attempts > 1 ? 's' : ''} Allowed
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Test Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Clock className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-semibold">{test.duration} minutes</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <FileText className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Questions</p>
                <p className="font-semibold">{test.questions} Questions</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <CheckCircle className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Marks</p>
                <p className="font-semibold">{test.maxMarks} Marks</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Passing Marks</p>
                <p className="font-semibold">{test.passingMarks} Marks</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Test Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Test Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{test.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-medium">{test.time}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Test Instructions
            </CardTitle>
            <CardDescription>
              Please read all instructions carefully before starting the test
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {test.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-medium text-primary">{index + 1}</span>
                  </div>
                  <p className="text-sm">{instruction}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </Button>
          
          <Button 
            onClick={handleStartTest}
            className="px-8"
          >
            Start Test
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TestInstructions;