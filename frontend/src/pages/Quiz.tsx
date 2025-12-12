import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Award,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const quizData = {
  id: "quiz-1",
  title: "HTML Fundamentals Quiz",
  description: "Test your knowledge of HTML basics covered in this section.",
  courseTitle: "Complete Web Development Bootcamp 2024",
  timeLimit: 10, // minutes
  passingScore: 70,
  questions: [
    {
      id: "q1",
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyper Transfer Markup Language",
        "Home Tool Markup Language",
      ],
      correctAnswer: 0,
    },
    {
      id: "q2",
      question: "Which HTML element is used for the largest heading?",
      options: ["<heading>", "<h6>", "<h1>", "<head>"],
      correctAnswer: 2,
    },
    {
      id: "q3",
      question: "What is the correct HTML element for inserting a line break?",
      options: ["<break>", "<lb>", "<br>", "<newline>"],
      correctAnswer: 2,
    },
    {
      id: "q4",
      question: "Which HTML attribute specifies an alternate text for an image?",
      options: ["title", "src", "alt", "longdesc"],
      correctAnswer: 2,
    },
    {
      id: "q5",
      question: "Which HTML element defines the document's body?",
      options: ["<content>", "<body>", "<main>", "<section>"],
      correctAnswer: 1,
    },
    {
      id: "q6",
      question: "What is the correct HTML for creating a hyperlink?",
      options: [
        "<a url='http://example.com'>",
        "<link href='http://example.com'>",
        "<a href='http://example.com'>",
        "<hyperlink='http://example.com'>",
      ],
      correctAnswer: 2,
    },
    {
      id: "q7",
      question: "Which HTML element is used to define an unordered list?",
      options: ["<ol>", "<ul>", "<list>", "<li>"],
      correctAnswer: 1,
    },
    {
      id: "q8",
      question: "What is the correct HTML for making a checkbox?",
      options: [
        "<input type='check'>",
        "<checkbox>",
        "<input type='checkbox'>",
        "<check>",
      ],
      correctAnswer: 2,
    },
    {
      id: "q9",
      question: "Which HTML element is used to specify a footer for a document?",
      options: ["<bottom>", "<section>", "<footer>", "<end>"],
      correctAnswer: 2,
    },
    {
      id: "q10",
      question: "What is the correct HTML element for playing video files?",
      options: ["<media>", "<movie>", "<video>", "<play>"],
      correctAnswer: 2,
    },
  ] as Question[],
};

const Quiz = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(quizData.questions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quizData.timeLimit * 60);

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const answeredCount = answers.filter((a) => a !== null).length;
  const progressPercent = (answeredCount / quizData.questions.length) * 100;

  // Calculate score
  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData.questions[index].correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: quizData.questions.length,
      percentage: Math.round((correct / quizData.questions.length) * 100),
    };
  };

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const goToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const submitQuiz = () => {
    const unanswered = answers.filter((a) => a === null).length;
    if (unanswered > 0) {
      toast({
        title: "Incomplete Quiz",
        description: `You have ${unanswered} unanswered question(s). Please answer all questions before submitting.`,
        variant: "destructive",
      });
      return;
    }
    setShowResults(true);
  };

  const retakeQuiz = () => {
    setAnswers(new Array(quizData.questions.length).fill(null));
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setTimeRemaining(quizData.timeLimit * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const score = calculateScore();
  const passed = score.percentage >= quizData.passingScore;

  if (showResults) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Result Header */}
              <Card variant="elevated" className="p-8 text-center mb-8">
                <div
                  className={`inline-flex p-4 rounded-full mb-4 ${
                    passed ? "bg-success/10" : "bg-destructive/10"
                  }`}
                >
                  {passed ? (
                    <Award className="h-12 w-12 text-success" />
                  ) : (
                    <XCircle className="h-12 w-12 text-destructive" />
                  )}
                </div>

                <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
                  {passed ? "Congratulations!" : "Keep Learning!"}
                </h1>
                <p className="text-muted-foreground mb-6">
                  {passed
                    ? "You've successfully passed the quiz!"
                    : "You didn't pass this time, but don't give up!"}
                </p>

                {/* Score Display */}
                <div className="flex items-center justify-center gap-8 mb-6">
                  <div>
                    <p className="text-5xl font-bold text-foreground">{score.percentage}%</p>
                    <p className="text-sm text-muted-foreground">Your Score</p>
                  </div>
                  <div className="h-16 w-px bg-border" />
                  <div>
                    <p className="text-5xl font-bold text-foreground">
                      {score.correct}/{score.total}
                    </p>
                    <p className="text-sm text-muted-foreground">Correct Answers</p>
                  </div>
                </div>

                <Badge variant={passed ? "success" : "destructive"} className="mb-6">
                  {passed ? "PASSED" : "FAILED"} - Passing score: {quizData.passingScore}%
                </Badge>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {passed ? (
                    <>
                      <Button variant="default" asChild>
                        <Link to={`/courses/${courseId}/certificate`}>
                          <Award className="h-4 w-4" />
                          Get Certificate
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to={`/courses/${courseId}`}>
                          Back to Course
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="default" onClick={retakeQuiz}>
                        <RotateCcw className="h-4 w-4" />
                        Retake Quiz
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to={`/courses/${courseId}/learn`}>
                          Review Lessons
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </Card>

              {/* Question Review */}
              <Card variant="outline" className="p-6">
                <h2 className="font-heading text-lg font-semibold mb-4">Question Review</h2>
                <div className="space-y-4">
                  {quizData.questions.map((q, index) => {
                    const userAnswer = answers[index];
                    const isCorrect = userAnswer === q.correctAnswer;
                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-lg border ${
                          isCorrect ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium text-foreground mb-2">
                              {index + 1}. {q.question}
                            </p>
                            <p className="text-sm">
                              <span className="text-muted-foreground">Your answer: </span>
                              <span className={isCorrect ? "text-success" : "text-destructive"}>
                                {q.options[userAnswer as number]}
                              </span>
                            </p>
                            {!isCorrect && (
                              <p className="text-sm">
                                <span className="text-muted-foreground">Correct answer: </span>
                                <span className="text-success">{q.options[q.correctAnswer]}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Quiz Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Link to={`/courses/${courseId}`} className="hover:text-primary">
                {quizData.courseTitle}
              </Link>
              <span>/</span>
              <span>Quiz</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {quizData.title}
            </h1>
            <p className="text-muted-foreground">{quizData.description}</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Quiz Area */}
            <div className="lg:col-span-2">
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card variant="elevated" className="p-6 sm:p-8">
                  {/* Question Number */}
                  <div className="flex items-center justify-between mb-6">
                    <Badge variant="secondary">
                      Question {currentQuestionIndex + 1} of {quizData.questions.length}
                    </Badge>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{formatTime(timeRemaining)}</span>
                    </div>
                  </div>

                  {/* Question */}
                  <h2 className="text-xl font-semibold text-foreground mb-6">
                    {currentQuestion.question}
                  </h2>

                  {/* Options */}
                  <div className="space-y-3 mb-8">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full p-4 text-left rounded-lg border transition-all ${
                          answers[currentQuestionIndex] === index
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50 hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              answers[currentQuestionIndex] === index
                                ? "border-primary bg-primary"
                                : "border-muted-foreground"
                            }`}
                          >
                            {answers[currentQuestionIndex] === index && (
                              <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      onClick={() => goToQuestion(currentQuestionIndex - 1)}
                      disabled={currentQuestionIndex === 0}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Previous
                    </Button>

                    {currentQuestionIndex === quizData.questions.length - 1 ? (
                      <Button variant="default" onClick={submitQuiz}>
                        Submit Quiz
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        onClick={() => goToQuestion(currentQuestionIndex + 1)}
                      >
                        Next
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progress */}
              <Card variant="elevated" className="p-5">
                <h3 className="font-semibold mb-3">Progress</h3>
                <div className="mb-2">
                  <Progress value={progressPercent} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {answeredCount} of {quizData.questions.length} answered
                </p>
              </Card>

              {/* Question Navigator */}
              <Card variant="elevated" className="p-5">
                <h3 className="font-semibold mb-3">Questions</h3>
                <div className="grid grid-cols-5 gap-2">
                  {quizData.questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToQuestion(index)}
                      className={`w-full aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                        currentQuestionIndex === index
                          ? "bg-primary text-primary-foreground"
                          : answers[index] !== null
                          ? "bg-success/20 text-success border border-success/30"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Info */}
              <Card variant="outline" className="p-5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-warning flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium text-foreground mb-1">Quiz Rules</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Passing score: {quizData.passingScore}%</li>
                      <li>All questions must be answered</li>
                      <li>You can retake the quiz if you fail</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Quiz;
