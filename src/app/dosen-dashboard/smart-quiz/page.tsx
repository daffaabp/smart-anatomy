
"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Bot, FileUp, PlusCircle, Trash2, Pencil, Eye, Send, Loader2, Settings, Copy, Clock, Users, Shuffle } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { aiChat, AIChatInput } from "@/ai/flows/ai-chat-interface"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const initialGeneratedQuestions = [
    { type: "Pilihan Ganda", question: "Bagian otak mana yang bertanggung jawab untuk mengatur keseimbangan dan koordinasi motorik?", options: ["Cerebrum", "Cerebellum", "Medulla Oblongata", "Pons"], answer: "Cerebellum" },
    { type: "Essay", question: "Jelaskan proses transmisi sinyal saraf melalui sinapsis kimiawi." , answer: "Prosesnya melibatkan pelepasan neurotransmitter dari terminal akson..."},
    { type: "Benar/Salah", question: "Saraf otonom simpatis memicu respons 'fight or flight'.", answer: "Benar" },
]

type ChatMessage = {
    role: "user" | "ai";
    content: string;
};

type Question = {
    type: string;
    question: string;
    options?: string[];
    answer?: string;
}

export default function SmartQuizPage() {
    const [quizGenerated, setQuizGenerated] = React.useState(false);
    const [generatedQuestions, setGeneratedQuestions] = React.useState<Question[]>([]);
    
    const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([
        { role: "ai", content: 'Halo! Silakan upload materi atau ketik perintah di bawah ini untuk memulai. Contoh: "Buat 10 soal pilihan ganda tentang sistem saraf dari materi yang saya unggah"' }
    ]);
    const [chatInput, setChatInput] = React.useState("");
    const [isSendingMessage, setIsSendingMessage] = React.useState(false);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const newUserMessage: ChatMessage = { role: "user", content: chatInput };
        setChatMessages(prev => [...prev, newUserMessage]);
        setChatInput("");
        setIsSendingMessage(true);

        // Simulate AI generating questions based on prompt
        setTimeout(() => {
            const aiResponse: ChatMessage = { role: "ai", content: "Tentu, saya telah membuat 3 soal berdasarkan permintaan Anda. Silakan tinjau di panel 'Pratinjau Kuis'." };
            setChatMessages(prev => [...prev, aiResponse]);
            setGeneratedQuestions(initialGeneratedQuestions);
            setQuizGenerated(true);
            setIsSendingMessage(false);
        }, 2000);
    };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Smart Quiz Generator</h1>
        <p className="text-muted-foreground">Buat quiz secara interaktif dengan bantuan AI.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
        {/* Left Column */}
        <div className="lg:col-span-3 flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Materi</CardTitle>
                    <CardDescription>Upload materi (PDF, Word, Teks) sebagai dasar pembuatan kuis.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FileUp className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground"><span className="font-semibold">Klik untuk upload</span> atau seret file</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="flex-1 flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Bot /> Chat AI</CardTitle>
                    <CardDescription>Berikan perintah kepada AI untuk men-generate soal kuis.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4">
                    <ScrollArea className="h-full pr-4 min-h-[300px]">
                        <div className="space-y-4">
                            {chatMessages.map((msg, index) => (
                                <div key={index} className={cn("flex items-start gap-3", msg.role === 'user' && 'justify-end')}>
                                    {msg.role === 'ai' && (
                                        <Avatar className="w-8 h-8 border bg-primary text-primary-foreground"><AvatarFallback>AI</AvatarFallback></Avatar>
                                    )}
                                    <div className={cn("p-3 rounded-lg max-w-[85%]", msg.role === 'ai' ? 'bg-muted' : 'bg-primary text-primary-foreground')}>
                                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                    </div>
                                    {msg.role === 'user' && (
                                        <Avatar className="w-8 h-8 border"><AvatarFallback>DS</AvatarFallback></Avatar>
                                    )}
                                </div>
                            ))}
                            {isSendingMessage && (
                                <div className="flex items-start gap-3">
                                    <Avatar className="w-8 h-8 border bg-primary text-primary-foreground"><AvatarFallback>AI</AvatarFallback></Avatar>
                                    <div className="bg-muted p-3 rounded-lg flex items-center"><Loader2 className="w-5 h-5 animate-spin"/></div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-4 border-t bg-background">
                    <form onSubmit={handleSendMessage} className="relative">
                        <Textarea
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Ketik perintah Anda..."
                            className="pr-16 min-h-[50px]"
                            disabled={isSendingMessage}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage(e);
                                }
                            }}
                        />
                        <Button type="submit" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-12" disabled={isSendingMessage}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
            <Card className="flex-1 flex flex-col">
                <CardHeader>
                    <CardTitle>Pratinjau Kuis</CardTitle>
                    <CardDescription>Tinjau dan edit soal yang dibuat oleh AI.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto">
                    <ScrollArea className="h-[40vh] pr-4">
                        {!quizGenerated ? (
                             <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                                <Bot className="w-12 h-12 mb-4"/>
                                <p>Kuis akan ditampilkan di sini setelah Anda memberikan perintah pada AI.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {generatedQuestions.map((q, index) => (
                                     <div key={index} className="p-4 border rounded-lg relative group/q">
                                        <p className="font-semibold pr-8">{index + 1}. {q.question}</p>
                                        <Badge variant="outline" className="my-2">{q.type}</Badge>
                                        {q.options && (
                                            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                                                {q.options.map((opt, i) => (
                                                    <p key={i} className={cn("ml-4", q.answer === opt && "text-green-600 font-bold")}>
                                                        {String.fromCharCode(97 + i)}. {opt}
                                                    </p>
                                                ))}
                                            </div>
                                        )}
                                         {q.type !== 'Pilihan Ganda' && q.answer && (
                                             <p className="mt-2 text-sm text-blue-600"><b>Jawaban:</b> {q.answer}</p>
                                        )}
                                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover/q:opacity-100">
                                            <Pencil className="w-4 h-4"/>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Pengaturan & Publikasi</CardTitle>
                    <CardDescription>Atur detail kuis sebelum dipublikasikan.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="quiz-timer" className="flex items-center gap-2"><Clock className="w-4 h-4"/> Waktu Pengerjaan (menit)</Label>
                        <Input id="quiz-timer" type="number" placeholder="cth. 60" disabled={!quizGenerated} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="quiz-class" className="flex items-center gap-2"><Users className="w-4 h-4"/> Tujukan untuk Kelas</Label>
                        <Select disabled={!quizGenerated}>
                            <SelectTrigger id="quiz-class">
                                <SelectValue placeholder="Pilih kelas" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="kelas-a">Kelas A - Anatomi & Fisiologi</SelectItem>
                                <SelectItem value="kelas-b">Kelas B - Anatomi & Fisiologi</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="shuffle-questions" className="flex items-center gap-2"><Shuffle className="w-4 h-4"/> Acak Soal</Label>
                        <Switch id="shuffle-questions" disabled={!quizGenerated}/>
                    </div>
                     <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full" disabled={!quizGenerated}>
                                <Send className="mr-2 h-4 w-4" /> Publikasikan & Buat Kode
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Kuis Berhasil Dipublikasikan!</DialogTitle>
                                <DialogDescription>Bagikan kode berikut kepada mahasiswa agar mereka dapat mengakses kuis ini.</DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                                <Label htmlFor="quiz-code">Kode Kuis</Label>
                                <div className="flex items-center gap-2 mt-2">
                                    <Input id="quiz-code" value="ANF-QUIZ-2403" readOnly className="text-lg font-mono tracking-widest text-center" />
                                    <Button size="icon" onClick={() => navigator.clipboard.writeText('ANF-QUIZ-2403')}>
                                        <Copy className="h-4 w-4"/>
                                    </Button>
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button>Selesai</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}

    