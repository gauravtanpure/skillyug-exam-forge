import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface QuestionStatus {
  id: number;
  status: "unattempted" | "attempted" | "review" | "current";
}

interface QuestionPaletteProps {
  questions: QuestionStatus[];
  onQuestionSelect: (questionId: number) => void;
  currentQuestion: number;
}

export const QuestionPalette = ({ 
  questions, 
  onQuestionSelect, 
  currentQuestion 
}: QuestionPaletteProps) => {
  const getStatusCounts = () => {
    return {
      unattempted: questions.filter(q => q.status === "unattempted").length,
      attempted: questions.filter(q => q.status === "attempted").length,
      review: questions.filter(q => q.status === "review").length,
    };
  };

  const statusCounts = getStatusCounts();

  const getQuestionButtonClass = (question: QuestionStatus) => {
    const baseClass = "w-10 h-10 text-sm font-medium transition-all";
    
    if (question.id === currentQuestion) {
      return cn(baseClass, "question-current");
    }
    
    switch (question.status) {
      case "attempted":
        return cn(baseClass, "question-attempted");
      case "review":
        return cn(baseClass, "question-review");
      default:
        return cn(baseClass, "question-unattempted");
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Question Palette</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Legend */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 question-unattempted rounded"></div>
              <span>Unattempted</span>
            </div>
            <span className="font-medium">{statusCounts.unattempted}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 question-attempted rounded"></div>
              <span>Attempted</span>
            </div>
            <span className="font-medium">{statusCounts.attempted}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 question-review rounded"></div>
              <span>For Review</span>
            </div>
            <span className="font-medium">{statusCounts.review}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 question-current rounded"></div>
              <span>Current</span>
            </div>
            <span className="font-medium">1</span>
          </div>
        </div>

        <hr className="border-border" />

        {/* Question Grid */}
        <div className="grid grid-cols-5 gap-2">
          {questions.map((question) => (
            <Button
              key={question.id}
              variant="ghost"
              className={getQuestionButtonClass(question)}
              onClick={() => onQuestionSelect(question.id)}
            >
              {question.id}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};