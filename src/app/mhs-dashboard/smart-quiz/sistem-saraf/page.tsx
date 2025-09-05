
"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Bot, Check, Clock, Loader2, Send, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { getQuizFeedback, GetQuizFeedbackInput } from "@/ai/flows/get-quiz-feedback";
import { Input } from "@/components/ui/input";

const quizQuestions = [
    {
        id: 1,
        type: "Pilihan Ganda",
        question: "Bagian otak mana yang bertanggung jawab untuk mengatur keseimbangan dan koordinasi motorik?",
        options: ["Cerebrum", "Cerebellum", "Medulla Oblongata", "Pons"],
        correctAnswer: "Cerebellum",
    },
    {
        id: 2,
        type: "Essay",
        question: "Jelaskan proses transmisi sinyal saraf melalui sinapsis kimiawi, sebutkan minimal 3 neurotransmitter yang terlibat!",
        correctAnswer: "Proses transmisi sinyal di sinapsis kimiawi dimulai saat potensial aksi mencapai terminal akson, memicu pelepasan neurotransmitter dari vesikel sinaptik ke celah sinaptik. Neurotransmitter ini kemudian berikatan dengan reseptor di neuron pascasinaptik, yang dapat menyebabkan depolarisasi (eksitasi) atau hiperpolarisasi (inhibisi). Contoh neurotransmitter: Asetilkolin, Dopamin, Serotonin.",
    },
    {
        id: 3,
        type: "Pilihan Ganda",
        question: "Neuron sensorik membawa informasi dari... ke...",
        options: ["PNS ke CNS", "CNS ke PNS", "Otot ke Kelenjar", "CNS ke Otot"],
        correctAnswer: "PNS ke CNS",
    },
];

type Answer = {
    questionId: number;
    answer: string;
    isCorrect: boolean | null;
};

type ChatMessage = {
    role: "user" | "ai";
    content: string;
};

export default function QuizPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
    const [answers, setAnswers] = React.useState<Answer[]>([]);
    const [selectedOption, setSelectedOption] = React.useState<string>("");
    const [essayAnswer, setEssayAnswer] = React.useState<string>("");
    const [showFeedback, setShowFeedback] = React.useState(false);

    const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([]);
    const [chatInput, setChatInput] = React.useState("");
    const [isSendingMessage, setIsSendingMessage] = React.useState(false);
    const [isAwaitingFeedback, setIsAwaitingFeedback] = React.useState(false);
    const [timeLeft, setTimeLeft] = React.useState(30 * 60); // 30 minutes in seconds


    const currentQuestion = quizQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
    const isQuizFinished = isLastQuestion && showFeedback;

    React.useEffect(() => {
        // Timer only runs when the user is answering a question (showFeedback is false)
        // and the quiz is not finished yet.
        if (showFeedback || isQuizFinished) {
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    alert("Waktu Habis!");
                    // Handle time up logic here, e.g., auto-submit
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        // Cleanup function to clear the interval when the component unmounts
        // or when the dependencies (showFeedback, isQuizFinished) change.
        return () => clearInterval(timer);
    }, [showFeedback, isQuizFinished]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };


    const handleAnswerSubmit = async () => {
        let studentAnswer = currentQuestion.type === "Pilihan Ganda" ? selectedOption : essayAnswer;
        if (!studentAnswer) return;

        setShowFeedback(true);
        setIsAwaitingFeedback(true);

        let isCorrect = studentAnswer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
        // Simple check for essay, not robust
        if (currentQuestion.type === 'Essay') {
            isCorrect = studentAnswer.length > 10; 
        }

        const newAnswer: Answer = {
            questionId: currentQuestion.id,
            answer: studentAnswer,
            isCorrect: isCorrect,
        };
        setAnswers([...answers, newAnswer]);

        const aiFeedbackPrompt: GetQuizFeedbackInput = {
            question: currentQuestion.question,
            studentAnswer: studentAnswer,
            correctAnswer: currentQuestion.correctAnswer,
            accuracy: isCorrect ? 1 : 0,
            completeness: 0.8, speed: 0.7, effort: 0.9, learningProgress: 0.6, engagement: 0.85, learningBehavior: 0.75
        };

        try {
            const result = await getQuizFeedback(aiFeedbackPrompt);
            setChatMessages([{ role: "ai", content: result.feedback }]);
        } catch (error) {
            setChatMessages([{ role: "ai", content: "Maaf, terjadi kesalahan saat mengambil feedback dari AI." }]);
            console.error(error);
        } finally {
            setIsAwaitingFeedback(false);
        }
    };

    const handleNextQuestion = () => {
        setShowFeedback(false);
        setSelectedOption("");
        setEssayAnswer("");
        setChatMessages([]);
        if (!isLastQuestion) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // In a real app, you would navigate to a results page.
            alert("Quiz Selesai! Anda akan diarahkan ke halaman hasil.");
        }
    };
    
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const newUserMessage: ChatMessage = { role: "user", content: chatInput };
        setChatMessages(prev => [...prev, newUserMessage]);
        setChatInput("");
        setIsSendingMessage(true);

        // A mock AI response for chat. In a real app, this would call the AI.
        setTimeout(() => {
            const aiResponse: ChatMessage = { role: "ai", content: "Itu pertanyaan yang bagus! Cerebellum memang krusial untuk koordinasi motorik halus, seperti menulis atau bermain musik, selain keseimbangan. Bagian lain seperti cerebrum lebih ke fungsi luhur seperti berpikir dan bahasa." };
            setChatMessages(prev => [...prev, aiResponse]);
            setIsSendingMessage(false);
        }, 1500);
    };


    return (
        <div className="container mx-auto p-4 flex flex-col gap-6 max-w-4xl">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Quiz: Sistem Saraf</CardTitle>
                        <div className="flex items-center gap-4">
                             <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="w-5 h-5" />
                                <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                             </div>
                             <CardDescription>Soal {currentQuestionIndex + 1} dari {quizQuestions.length}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Progress value={progress} className="mb-6" />
                    <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>

                    {currentQuestion.type === "Pilihan Ganda" && (
                        <RadioGroup value={selectedOption} onValueChange={setSelectedOption} disabled={showFeedback} className="space-y-2">
                            {currentQuestion.options.map((option, index) => (
                                <Label key={index} htmlFor={`option-${index}`} className={cn(
                                    "flex items-center space-x-3 p-3 rounded-lg border transition-colors",
                                    "cursor-pointer hover:bg-muted",
                                    selectedOption === option && "bg-muted border-primary",
                                    showFeedback && option === currentQuestion.correctAnswer && "bg-green-100 border-green-400",
                                    showFeedback && selectedOption === option && option !== currentQuestion.correctAnswer && "bg-red-100 border-red-400"
                                )}>
                                    <RadioGroupItem value={option} id={`option-${index}`} />
                                    <span>{option}</span>
                                </Label>
                            ))}
                        </RadioGroup>
                    )}

                    {currentQuestion.type === "Essay" && (
                        <Textarea
                            placeholder="Ketik jawaban Anda di sini..."
                            className="min-h-[150px]"
                            value={essayAnswer}
                            onChange={(e) => setEssayAnswer(e.target.value)}
                            disabled={showFeedback}
                        />
                    )}
                </CardContent>
            </Card>

            {!showFeedback ? (
                <div className="flex justify-end">
                    <Button onClick={handleAnswerSubmit} disabled={currentQuestion.type === "Pilihan Ganda" ? !selectedOption : !essayAnswer}>
                        Jawab & Lihat Feedback <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bot className="w-6 h-6 text-primary" /> Brainstorming dengan AI
                            </CardTitle>
                            <CardDescription>
                                Jawaban Anda sudah tersimpan. Sekarang, ayo diskusi dengan AI!
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col h-[400px]">
                            <ScrollArea className="flex-1 pr-4">
                                <div className="space-y-4">
                                    {isAwaitingFeedback ? (
                                        <div className="flex items-start gap-3">
                                            <Avatar className="w-8 h-8 border bg-primary text-primary-foreground"><AvatarFallback>AI</AvatarFallback></Avatar>
                                            <div className="bg-muted p-3 rounded-lg flex items-center"><Loader2 className="w-5 h-5 animate-spin mr-2"/> AI sedang menganalisis jawabanmu...</div>
                                        </div>
                                    ) : (
                                        chatMessages.map((msg, index) => (
                                            <div key={index} className={cn("flex items-start gap-3", msg.role === 'user' && 'justify-end')}>
                                                {msg.role === 'ai' && (
                                                    <Avatar className="w-8 h-8 border bg-primary text-primary-foreground">
                                                        <AvatarFallback>AI</AvatarFallback>
                                                    </Avatar>
                                                )}
                                                <div className={cn("p-3 rounded-lg max-w-[85%]", msg.role === 'ai' ? 'bg-muted' : 'bg-primary text-primary-foreground')}>
                                                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                                </div>
                                                {msg.role === 'user' && (
                                                    <Avatar className="w-8 h-8 border">
                                                        <AvatarFallback>SM</AvatarFallback>
                                                    </Avatar>
                                                )}
                                            </div>
                                        ))
                                    )}
                                    {isSendingMessage && (
                                         <div className="flex items-start gap-3">
                                            <Avatar className="w-8 h-8 border"><AvatarFallback>AI</AvatarFallback></Avatar>
                                            <div className="bg-muted p-3 rounded-lg flex items-center"><Loader2 className="w-5 h-5 animate-spin"/></div>
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>
                            <form onSubmit={handleSendMessage} className="relative mt-4">
                                <Input
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    placeholder="Tanya apa saja tentang soal ini..."
                                    className="pr-12"
                                    disabled={isSendingMessage || isAwaitingFeedback}
                                />
                                <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" disabled={isSendingMessage || isAwaitingFeedback}>
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="bg-muted/30">
                        <CardHeader>
                            <CardTitle>Analisis Jawaban</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label>Jawaban Anda:</Label>
                                <div className="p-3 rounded-md border bg-background flex justify-between items-start">
                                    <p className="text-muted-foreground">{answers.find(a => a.questionId === currentQuestion.id)?.answer}</p>
                                    {answers.find(a => a.questionId === currentQuestion.id)?.isCorrect ? <Check className="w-5 h-5 text-green-500" /> : <X className="w-5 h-5 text-red-500" />}
                                </div>
                            </div>
                            <div>
                                <Label>Jawaban yang Benar:</Label>
                                 <div className="p-3 rounded-md border bg-background">
                                    <p className="text-muted-foreground">{currentQuestion.correctAnswer}</p>
                                </div>
                            </div>
                            <Button onClick={handleNextQuestion} className="w-full">
                                {isLastQuestion ? "Selesaikan Quiz" : "Lanjut ke Soal Berikutnya"}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}

    