import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { QuestionPalette, QuestionStatus } from "@/components/exam/QuestionPalette";
import { Timer } from "@/components/exam/Timer";
import { ChevronLeft, ChevronRight, Flag, Send, Menu, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Mock exam data
const examData = {
  1: {
    id: 1,
    title: "Mathematics - Algebra",
    duration: 120,
    questions: [
      {
        id: 1,
        type: "single",
        question: "What is the value of x in the equation 2x + 5 = 15?",
        options: ["x = 5", "x = 10", "x = 7.5", "x = 2.5"],
        correctAnswer: 0
      },
      {
        id: 2,
        type: "single", 
        question: "Simplify: (3x + 2)(x - 4)",
        options: ["3x² - 10x - 8", "3x² + 14x - 8", "3x² - 10x + 8", "3x² + 10x - 8"],
        correctAnswer: 0
      },
      {
        id: 3,
        type: "multiple",
        question: "Which of the following are quadratic equations? (Select all that apply)",
        options: ["x² + 3x + 2 = 0", "2x + 5 = 0", "x² - 4 = 0", "x³ + x = 0"],
        correctAnswers: [0, 2]
      },
      {
        id: 4,
        type: "single",
        question: "What is the discriminant of the quadratic equation x² - 6x + 9 = 0?",
        options: ["0", "36", "18", "-36"],
        correctAnswer: 0
      },
      {
        id: 5,
        type: "single",
        question: "Factor: x² - 9",
        options: ["(x - 3)(x + 3)", "(x - 9)(x + 1)", "(x - 3)²", "Cannot be factored"],
        correctAnswer: 0
      }
    ]
  }
};

const Exam = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const exam = examData[Number(testId) as keyof typeof examData];
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [questionStatuses, setQuestionStatuses] = useState<QuestionStatus[]>([]);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showPalette, setShowPalette] = useState(false);

  // Initialize question statuses
  useEffect(() => {
    if (exam) {
      const statuses = exam.questions.map((_, index) => ({
        id: index + 1,
        status: index === 0 ? "current" as const : "unattempted" as const
      }));
      setQuestionStatuses(statuses);
    }
  }, [exam]);

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="text-center p-6">
            <h2 className="text-xl font-semibold mb-2">Exam Not Found</h2>
            <p className="text-muted-foreground mb-4">The requested exam could not be found.</p>
            <Button onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = exam.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === exam.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const updateQuestionStatus = (questionIndex: number, status: QuestionStatus['status']) => {
    setQuestionStatuses(prev => 
      prev.map(q => 
        q.id === questionIndex + 1 
          ? { ...q, status }
          : q.id === currentQuestionIndex + 1 && q.status === "current"
          ? { ...q, status: answers[currentQuestionIndex + 1] ? "attempted" : "unattempted" }
          : q
      )
    );
  };

  const handleAnswerChange = (value: string | string[]) => {
    const questionId = currentQuestion.id;
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    // Update question status to attempted
    updateQuestionStatus(currentQuestionIndex, "attempted");
  };

  const goToQuestion = (questionIndex: number) => {
    // Update current question status
    updateQuestionStatus(currentQuestionIndex, answers[currentQuestion.id] ? "attempted" : "unattempted");
    
    setCurrentQuestionIndex(questionIndex);
    
    // Update new question status to current
    updateQuestionStatus(questionIndex, "current");
    
    setShowPalette(false);
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      goToQuestion(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      goToQuestion(currentQuestionIndex - 1);
    }
  };

  const handleMarkForReview = () => {
    updateQuestionStatus(currentQuestionIndex, "review");
    toast({
      title: "Marked for Review",
      description: `Question ${currentQuestion.id} has been marked for review.`,
    });
  };

  const handleSubmit = () => {
    setShowSubmitDialog(true);
  };

  const confirmSubmit = () => {
    // Calculate score (mock scoring)
    let score = 0;
    exam.questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (question.type === "single" && userAnswer === question.correctAnswer?.toString()) {
        score += 1;
      } else if (question.type === "multiple" && userAnswer && question.correctAnswers) {
        const userAnswers = userAnswer.sort();
        const correctAnswers = question.correctAnswers.map(String).sort();
        if (JSON.stringify(userAnswers) === JSON.stringify(correctAnswers)) {
          score += 1;
        }
      }
    });

    // Navigate to results with score
    navigate(`/result/${testId}`, { 
      state: { 
        score, 
        totalQuestions: exam.questions.length,
        answers 
      } 
    });
  };

  const handleTimeUp = () => {
    toast({
      title: "Time's Up!",
      description: "Your exam has been automatically submitted.",
      variant: "destructive",
    });
    confirmSubmit();
  };

  const handleQuestionSelect = (questionId: number) => {
    goToQuestion(questionId - 1);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPalette(!showPalette)}
              className="lg:hidden"
            >
              <Menu className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-semibold">{exam.title}</h1>
          </div>
          
          <Timer initialMinutes={exam.duration} onTimeUp={handleTimeUp} />
        </div>
      </header>

      <div className="flex">
        {/* Question Palette - Desktop */}
        <div className="hidden lg:block w-80 p-4">
          <QuestionPalette
            questions={questionStatuses}
            onQuestionSelect={handleQuestionSelect}
            currentQuestion={currentQuestionIndex + 1}
          />
        </div>

        {/* Question Palette - Mobile Overlay */}
        {showPalette && (
          <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
            <div className="absolute top-0 right-0 h-full w-80 bg-card p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">Question Palette</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPalette(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <QuestionPalette
                questions={questionStatuses}
                onQuestionSelect={handleQuestionSelect}
                currentQuestion={currentQuestionIndex + 1}
              />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 lg:pr-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Question {currentQuestion.id} of {exam.questions.length}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkForReview}
                  className="gap-2"
                >
                  <Flag className="w-4 h-4" />
                  Mark for Review
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Question */}
              <div className="prose max-w-none">
                <p className="text-base leading-relaxed">{currentQuestion.question}</p>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.type === "single" ? (
                  <RadioGroup
                    value={answers[currentQuestion.id] || ""}
                    onValueChange={handleAnswerChange}
                  >
                    {currentQuestion.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox
                          id={`option-${index}`}
                          checked={(answers[currentQuestion.id] || []).includes(index.toString())}
                          onCheckedChange={(checked) => {
                            const currentAnswers = answers[currentQuestion.id] || [];
                            const newAnswers = checked
                              ? [...currentAnswers, index.toString()]
                              : currentAnswers.filter((a: string) => a !== index.toString());
                            handleAnswerChange(newAnswers);
                          }}
                        />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstQuestion}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex gap-2">
              {isLastQuestion ? (
                <Button
                  onClick={handleSubmit}
                  className="gap-2 bg-accent hover:bg-accent-hover"
                >
                  <Send className="w-4 h-4" />
                  Submit Test
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Test?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit your test? You won't be able to make any changes after submission.
              <br /><br />
              <strong>Answered:</strong> {Object.keys(answers).length} of {exam.questions.length} questions
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSubmit}>
              Submit Test
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Exam;