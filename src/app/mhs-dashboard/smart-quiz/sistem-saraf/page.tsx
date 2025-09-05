"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Bot, Check, Loader2, Send, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { getQuizFeedback, GetQuizFeedbackInput } from "@/ai/flows/get-quiz-feedback";

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


    const currentQuestion = quizQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;

    const handleAnswerSubmit = async () => {
        let studentAnswer = currentQuestion.type === "Pilihan Ganda" ? selectedOption : essayAnswer;
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
        setShowFeedback(true);

        const aiFeedbackPrompt: GetQuizFeedbackInput = {
            question: currentQuestion.question,
            studentAnswer: studentAnswer,
            correctAnswer: currentQuestion.correctAnswer,
            accuracy: isCorrect ? 1 : 0,
            completeness: 0.8, speed: 0.7, effort: 0.9, learningProgress: 0.6, engagement: 0.85, learningBehavior: 0.75
        };

        const result = await getQuizFeedback(aiFeedbackPrompt);
        setChatMessages([{ role: "ai", content: result.feedback }]);
    };

    const handleNextQuestion = () => {
        setShowFeedback(false);
        setSelectedOption("");
        setEssayAnswer("");
        setChatMessages([]);
        if (!isLastQuestion) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Handle quiz completion
            alert("Quiz Selesai!");
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
        <div className="container mx-auto p-4 flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Quiz: Sistem Saraf</CardTitle>
                    <CardDescription>Soal {currentQuestionIndex + 1} dari {quizQuestions.length}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Progress value={progress} className="mb-6" />
                    <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>

                    {currentQuestion.type === "Pilihan Ganda" && (
                        <RadioGroup value={selectedOption} onValueChange={setSelectedOption} disabled={showFeedback}>
                            {currentQuestion.options.map((option, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option} id={`option-${index}`} />
                                    <Label htmlFor={`option-${index}`}>{option}</Label>
                                </div>
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
                        Jawab & Lihat Feedback
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
                                    {chatMessages.map((msg, index) => (
                                        <div key={index} className={cn("flex items-start gap-3", msg.role === 'user' && 'justify-end')}>
                                            {msg.role === 'ai' && (
                                                <Avatar className="w-8 h-8 border">
                                                    <AvatarFallback>AI</AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className={cn("p-3 rounded-lg max-w-[85%]", msg.role === 'ai' ? 'bg-muted' : 'bg-primary text-primary-foreground')}>
                                                <p className="text-sm">{msg.content}</p>
                                            </div>
                                            {msg.role === 'user' && (
                                                <Avatar className="w-8 h-8 border">
                                                    <AvatarFallback>SM</AvatarFallback>
                                                </Avatar>
                                            )}
                                        </div>
                                    ))}
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
                                    disabled={isSendingMessage}
                                />
                                <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" disabled={isSendingMessage}>
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
