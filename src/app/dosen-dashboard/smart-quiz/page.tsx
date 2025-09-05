"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Bot, Copy, FileUp, PlusCircle, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const activeCodes = [
  { name: "Quiz Sistem Saraf", code: "ANF-QUIZ-2401", expires: "2024-07-30 23:59", usage: 45, total: 50, status: "Active" },
  { name: "Quiz Otot dan Rangka", code: "ANF-QUIZ-2402", expires: "2024-07-25 23:59", usage: 50, total: 50, status: "Active" },
  { name: "Quiz Pendahuluan", code: "ANF-QUIZ-2312", expires: "2024-06-01 23:59", usage: 50, total: 50, status: "Expired" },
]

export default function SmartQuizPage() {
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
              <CardTitle>Upload Materi</CardTitle>
              <CardDescription>Upload materi pelajaran untuk dibuatkan quiz secara otomatis oleh AI.</CardDescription>
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
                <Label htmlFor="quiz-title">Atau buat manual</Label>
                <Textarea placeholder="Tulis atau paste konten materi disini... AI akan membuat soal dari sini." className="mt-2 min-h-[150px]" />
              </div>
              <div className="flex justify-end">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Generate Quiz
                </Button>
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
                        <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
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
            <CardContent className="flex-1 flex flex-col gap-4 overflow-y-auto p-4">
                <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8 border">
                        <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                        <p className="text-sm">Halo! Ada yang bisa saya bantu? Anda bisa meminta saya membuat soal, misalnya: "Buat 10 soal pilihan ganda tentang sistem saraf"</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 justify-end">
                    <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-[80%]">
                        <p className="text-sm">Buat 5 soal essay tentang sistem peredaran darah.</p>
                    </div>
                    <Avatar className="w-8 h-8 border">
                        <AvatarFallback>DS</AvatarFallback>
                    </Avatar>
                </div>
            </CardContent>
            <div className="p-4 border-t">
              <div className="relative">
                <Input placeholder="Ketik pesan Anda..." className="pr-12" />
                <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                  <Bot className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
