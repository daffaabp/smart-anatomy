"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Bot, Copy, FileUp, PlusCircle, Trash2, Pencil, Eye, Send, Loader2 } from "lucide-react"
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { aiChat, AIChatInput } from "@/ai/flows/ai-chat-interface"

const activeCodes = [
  { name: "Quiz Sistem Saraf", code: "ANF-QUIZ-2401", expires: "2024-07-30 23:59", usage: 45, total: 50, status: "Active" },
  { name: "Quiz Otot dan Rangka", code: "ANF-QUIZ-2402", expires: "2024-07-25 23:59", usage: 50, total: 50, status: "Active" },
  { name: "Quiz Pendahuluan", code: "ANF-QUIZ-2312", expires: "2024-06-01 23:59", usage: 50, total: 50, status: "Expired" },
]

const generatedQuestions = [
    { type: "Pilihan Ganda", question: "Bagian otak mana yang bertanggung jawab untuk mengatur keseimbangan dan koordinasi motorik?", options: ["Cerebrum", "Cerebellum", "Medulla Oblongata", "Pons"], answer: "Cerebellum" },
    { type: "Essay", question: "Jelaskan proses transmisi sinyal saraf melalui sinapsis kimiawi." },
    { type: "Benar/Salah", question: "Saraf otonom simpatis memicu respons 'fight or flight'." },
    { type: "Pilihan Ganda", question: "Neuron sensorik membawa informasi dari... ke...", options: ["PNS ke CNS", "CNS ke PNS", "Otot ke Kelenjar", "CNS ke Otot"], answer: "PNS ke CNS"},
    { type: "Essay", question: "Deskripsikan perbedaan utama antara sistem saraf simpatis dan parasimpatis." }
]

type ChatMessage = {
    role: "user" | "ai";
    content: string;
};

export default function SmartQuizPage() {
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [quizGenerated, setQuizGenerated] = React.useState(false);
    
    const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([
        { role: "ai", content: 'Halo! Ada yang bisa saya bantu? Anda bisa meminta saya membuat soal, misalnya: "Buat 10 soal pilihan ganda tentang sistem saraf"' }
    ]);
    const [chatInput, setChatInput] = React.useState("");
    const [isSendingMessage, setIsSendingMessage] = React.useState(false);

    const handleGenerateQuiz = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setQuizGenerated(true);
        }, 2000);
    }

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const newUserMessage: ChatMessage = { role: "user", content: chatInput };
        setChatMessages(prev => [...prev, newUserMessage]);
        setChatInput("");
        setIsSendingMessage(true);

        try {
            const aiResult = await aiChat({ message: chatInput });
            const newAiMessage: ChatMessage = { role: "ai", content: aiResult.response };
            setChatMessages(prev => [...prev, newAiMessage]);
        } catch (error) {
            const errorMessage: ChatMessage = { role: "ai", content: "Maaf, terjadi kesalahan saat menghubungi AI." };
            setChatMessages(prev => [...prev, errorMessage]);
            console.error(error);
        } finally {
            setIsSendingMessage(false);
        }
    };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Smart Quiz</h1>
        <p className="text-muted-foreground">Buat, kelola, dan analisis quiz dengan bantuan AI.</p>
      </div>
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create">Buat Quiz</TabsTrigger>
          <TabsTrigger value="manage">Manajemen Kode</TabsTrigger>
          <TabsTrigger value="ai-chat">AI Assistant</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Buat Quiz dengan AI</CardTitle>
              <CardDescription>Upload materi, tulis konten, atau gunakan AI assistant untuk membuat quiz secara otomatis.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FileUp className="w-10 h-10 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Klik untuk upload</span> atau seret file</p>
                  <p className="text-xs text-muted-foreground">PDF, PPT, Word, Gambar, atau Link URL</p>
                </div>
              </div>
              <div>
                <Label htmlFor="quiz-title">Atau buat manual dari teks</Label>
                <Textarea placeholder="Tulis atau paste konten materi disini... AI akan membuat soal dari sini." className="mt-2 min-h-[150px]" />
              </div>
              <div className="flex justify-end">
                <Dialog open={quizGenerated} onOpenChange={setQuizGenerated}>
                    <Button onClick={handleGenerateQuiz} disabled={isGenerating}>
                        {isGenerating ? (
                            <>
                                <Bot className="mr-2 h-4 w-4 animate-spin" />
                                Memproses...
                            </>
                        ) : (
                            <>
                                <PlusCircle className="mr-2 h-4 w-4" /> Generate Quiz
                            </>
                        )}
                    </Button>
                    <DialogContent className="max-w-4xl">
                        <DialogHeader>
                        <DialogTitle>Hasil Quiz Dibuat AI</DialogTitle>
                        <DialogDescription>Berikut adalah soal-soal yang berhasil dibuat berdasarkan materi Anda. Anda bisa mengedit atau langsung mempublikasikannya.</DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="max-h-[60vh] p-4 border rounded-md">
                            <div className="space-y-6">
                                {generatedQuestions.map((q, index) => (
                                    <div key={index} className="p-4 border rounded-lg">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-semibold">{index + 1}. ({q.type}) {q.question}</p>
                                                {q.options && (
                                                    <div className="mt-2 space-y-1 text-sm">
                                                        {q.options.map((opt, i) => (
                                                            <p key={i} className={cn("ml-4", q.answer === opt && "text-green-600 font-bold")}>{String.fromCharCode(97 + i)}. {opt}</p>
                                                        ))}
                                                    </div>
                                                )}
                                                {q.type === 'Essay' && q.answer && (
                                                     <p className="mt-2 text-sm text-blue-600"><b>Contoh Jawaban:</b> {q.answer}</p>
                                                )}
                                            </div>
                                            <Button variant="ghost" size="icon" className="shrink-0">
                                                <Pencil className="w-4 h-4"/>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <DialogFooter>
                        <Button variant="outline" onClick={() => setQuizGenerated(false)}>Edit Lagi</Button>
                        <Button>
                            <Send className="mr-2 h-4 w-4" /> Publikasikan & Buat Kode
                        </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle>Manajemen Kode Quiz</CardTitle>
              <CardDescription>Lihat dan kelola kode quiz yang aktif, kedaluwarsa, atau dicabut.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Quiz</TableHead>
                    <TableHead>Kode</TableHead>
                    <TableHead>Berakhir</TableHead>
                    <TableHead>Penggunaan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeCodes.map((item) => (
                    <TableRow key={item.code}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.code}</TableCell>
                      <TableCell>{item.expires}</TableCell>
                      <TableCell>{item.usage} / {item.total}</TableCell>
                      <TableCell>
                        <Badge variant={item.status === 'Active' ? 'default' : 'destructive'} className={item.status === 'Active' ? 'bg-green-500' : ''}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Button variant="outline" size="icon"><Copy className="h-4 w-4" /></Button>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Apakah Anda yakin?</DialogTitle>
                                    <DialogDescription>
                                        Tindakan ini akan mencabut kode quiz '{item.code}' dan tidak dapat diurungkan. Mahasiswa tidak akan bisa lagi menggunakan kode ini.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Batal</Button>
                                    </DialogClose>
                                    <Button variant="destructive">Ya, Cabut Kode</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ai-chat">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle>AI Assistant Chat</CardTitle>
              <CardDescription>Gunakan AI untuk membuat soal, rubrik, atau contoh jawaban.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4">
                 <ScrollArea className="h-full pr-4">
                    <div className="space-y-4">
                        {chatMessages.map((msg, index) => (
                            <div key={index} className={cn("flex items-start gap-3", msg.role === 'user' && 'justify-end')}>
                                {msg.role === 'ai' && (
                                    <Avatar className="w-8 h-8 border">
                                        <AvatarFallback>AI</AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn("p-3 rounded-lg max-w-[80%]", msg.role === 'ai' ? 'bg-muted' : 'bg-primary text-primary-foreground')}>
                                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                </div>
                                {msg.role === 'user' && (
                                     <Avatar className="w-8 h-8 border">
                                        <AvatarFallback>DS</AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                        {isSendingMessage && (
                            <div className="flex items-start gap-3">
                                <Avatar className="w-8 h-8 border">
                                    <AvatarFallback>AI</AvatarFallback>
                                </Avatar>
                                <div className="bg-muted p-3 rounded-lg max-w-[80%] flex items-center">
                                    <Loader2 className="w-5 h-5 animate-spin"/>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
            <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="relative">
                    <Input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ketik perintah Anda, cth: 'Buat 5 soal essay tentang sistem peredaran darah'"
                        className="pr-12"
                        disabled={isSendingMessage}
                    />
                    <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" disabled={isSendingMessage}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
