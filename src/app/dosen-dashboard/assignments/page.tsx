"use client"
import * as React from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, FileUp, PlusCircle, Trash2, Bot, ChevronRight, UploadCloud } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const tasks = [
  { id: "tugas-kasus-klinis", name: "Analisis Kasus Klinis", class: "Kelas A", deadline: "2024-08-15", submissions: 35, total: 50, status: "Published" },
  { id: "tugas-laporan-otot", name: "Laporan Praktikum Otot", class: "Kelas A", deadline: "2024-08-10", submissions: 48, total: 50, status: "Grading" },
  { id: "tugas-presentasi-endokrin", name: "Presentasi Sistem Endokrin", class: "Kelas A", deadline: "2024-07-20", submissions: 50, total: 50, status: "Complete" },
  { id: "tugas-rancangan-akhir", name: "Rancangan Tugas Akhir", class: "Kelas A", deadline: "2024-09-01", submissions: 0, total: 50, status: "Draft" },
]

const submissions = [
    { id: 'ahmad-subarjo', studentName: "Ahmad Subarjo", studentAvatar: "AS", submissionDate: "2024-08-09", score: null, status: "Perlu Dinilai" },
    { id: 'bunga-citra', studentName: "Bunga Citra", studentAvatar: "BC", submissionDate: "2024-08-10", score: null, status: "Perlu Dinilai" },
    { id: 'candra-darusman', studentName: "Candra Darusman", studentAvatar: "CD", submissionDate: "2024-08-08", score: 88, status: "Sudah Dinilai" },
]


export default function AssignmentsPage() {
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab");
    const [selectedTask, setSelectedTask] = React.useState<(typeof tasks)[0] | null>(null);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manajemen Tugas</h1>
        <p className="text-muted-foreground">Buat, distribusikan, dan nilai tugas mahasiswa dengan bantuan AI.</p>
      </div>

      <Tabs defaultValue={tab || "manage"} value={tab || "manage"} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="manage">Daftar Tugas</TabsTrigger>
          <TabsTrigger value="create">Buat Tugas Baru</TabsTrigger>
          <TabsTrigger value="grade">Penilaian</TabsTrigger>
        </TabsList>

        <TabsContent value="manage">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Daftar Tugas</CardTitle>
              <CardDescription>Kelola semua tugas untuk semua kelas Anda.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Tugas</TableHead>
                    <TableHead>Batas Waktu</TableHead>
                    <TableHead>Pengumpulan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.name}</TableCell>
                      <TableCell>{task.deadline}</TableCell>
                      <TableCell>{task.submissions} / {task.total}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            task.status === "Published" ? "default" : 
                            task.status === "Grading" ? "secondary" : 
                            task.status === "Complete" ? "outline" : "destructive"
                          }
                          className={task.status === "Published" ? "bg-blue-500 text-white" : task.status === "Grading" ? "bg-yellow-500 text-white" : ""}
                        >
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Sheet>
                          <SheetTrigger asChild>
                              <Button variant="outline" size="icon"><Eye className="h-4 w-4" /></Button>
                          </SheetTrigger>
                          <SheetContent className="w-[400px] sm:w-[540px]">
                            <SheetHeader>
                            <SheetTitle>Detail Tugas: {task.name}</SheetTitle>
                            <SheetDescription>
                                Informasi lengkap mengenai tugas, termasuk deskripsi, materi, dan daftar mahasiswa yang sudah & belum mengumpulkan.
                            </SheetDescription>
                            </SheetHeader>
                            <div className="py-4 space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    <strong>Deskripsi:</strong> Analisis kasus klinis terkait gangguan sistem saraf. Jelaskan patofisiologi, diagnosis, dan penanganan yang relevan berdasarkan materi yang telah diberikan.
                                </p>
                                <p className="text-sm text-muted-foreground"><strong>Batas Waktu:</strong> {task.deadline}</p>
                            </div>
                          </SheetContent>
                        </Sheet>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="icon"><Edit className="h-4 w-4" /></Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Tugas</DialogTitle>
                                    <DialogDescription>Lakukan perubahan pada detail tugas di bawah ini.</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="task-title-edit">Judul Tugas</Label>
                                        <Input id="task-title-edit" defaultValue={task.name} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="task-description-edit">Deskripsi</Label>
                                        <Textarea id="task-description-edit" defaultValue="Jelaskan detail tugas, tujuan, dan instruksi pengerjaan." className="min-h-[120px]" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild><Button variant="outline">Batal</Button></DialogClose>
                                    <Button>Simpan Perubahan</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Hapus Tugas?</DialogTitle>
                                    <DialogDescription>
                                        Tindakan ini akan menghapus tugas '{task.name}' dan semua data pengumpulan terkait. Aksi ini tidak dapat diurungkan.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild><Button variant="outline">Batal</Button></DialogClose>
                                    <Button variant="destructive">Ya, Hapus</Button>
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

        <TabsContent value="create">
            <Card className="mt-4">
                <CardHeader>
                <CardTitle>Buat Tugas Baru</CardTitle>
                <CardDescription>Isi detail tugas, upload materi, dan gunakan AI untuk membantu membuat rubrik penilaian.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="task-title">Judul Tugas</Label>
                            <Input id="task-title" placeholder="cth. Laporan Praktikum Sistem Saraf" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="task-description">Deskripsi Tugas</Label>
                            <Textarea id="task-description" placeholder="Jelaskan detail tugas, tujuan, dan instruksi pengerjaan." className="min-h-[150px]" />
                        </div>
                        <div className="space-y-2">
                            <Label>Materi Pendukung (Opsional)</Label>
                            <div className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                                    <p className="text-sm text-muted-foreground"><span className="font-semibold">Klik untuk upload</span> atau seret file</p>
                                </div>
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="task-deadline">Batas Waktu</Label>
                            <Input id="task-deadline" type="date" />
                        </div>
                    </div>
                    <div className="space-y-4">
                         <div className="space-y-2">
                            <Label>Rubrik Penilaian</Label>
                            <Textarea id="task-rubric" placeholder="Tulis kriteria penilaian disini, atau biarkan AI membuatnya untuk Anda." className="min-h-[268px]" />
                        </div>
                        <Button variant="outline" className="w-full">
                            <Bot className="mr-2 h-4 w-4" /> Buat Rubrik dengan AI
                        </Button>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="outline">Simpan sebagai Draft</Button>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> Publikasikan Tugas
                    </Button>
                </div>
                </CardContent>
            </Card>
        </TabsContent>
        
        <TabsContent value="grade">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Penilaian Tugas</CardTitle>
              <CardDescription>Pilih tugas untuk memulai penilaian dengan bantuan AI.</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedTask ? (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Menilai: {selectedTask.name}</h3>
                      <p className="text-sm text-muted-foreground">Total Pengumpulan: {selectedTask.submissions}/{selectedTask.total}</p>
                    </div>
                    <Button variant="outline" onClick={() => setSelectedTask(null)}>Pilih Tugas Lain</Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mahasiswa</TableHead>
                        <TableHead>Tanggal Kumpul</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Skor AI</TableHead>
                        <TableHead>Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {submissions.map(sub => (
                        <TableRow key={sub.studentName}>
                          <TableCell className="flex items-center gap-3">
                            <Avatar className="h-8 w-8"><AvatarFallback>{sub.studentAvatar}</AvatarFallback></Avatar>
                            {sub.studentName}
                          </TableCell>
                          <TableCell>{sub.submissionDate}</TableCell>
                          <TableCell>
                            <Badge variant={sub.status === "Perlu Dinilai" ? "destructive" : "default"}>{sub.status}</Badge>
                          </TableCell>
                          <TableCell className="font-medium">{sub.score ? sub.score-3 : sub.status === "Perlu Dinilai" ? "Menunggu" : "-"}</TableCell>
                          <TableCell>
                            <Link href={`/dosen-dashboard/assignments/grade/${selectedTask.id}/${sub.id}`} passHref>
                              <Button variant="outline" size="sm">
                                  {sub.status === "Perlu Dinilai" ? "Nilai Sekarang" : "Lihat Penilaian"}
                                  <ChevronRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-12">
                  <p className="mb-4">Pilih tugas dari daftar untuk melihat pengumpulan mahasiswa.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                    {tasks.filter(t => t.status === 'Grading' || t.status === 'Published' || t.status === 'Complete').map(task => (
                      <Button key={task.id} variant="outline" className="h-auto py-4 flex flex-col gap-2" onClick={() => setSelectedTask(task)}>
                        <span className="font-semibold">{task.name}</span>
                        <span className="text-xs text-muted-foreground">{task.submissions}/{task.total} terkumpul</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
