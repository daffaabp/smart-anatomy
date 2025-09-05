import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Eye, FileUp, PlusCircle, Trash2 } from "lucide-react"

const tasks = [
  { name: "Analisis Kasus Klinis", class: "Kelas A", deadline: "2024-08-15", submissions: 35, total: 50, status: "Published" },
  { name: "Laporan Praktikum Otot", class: "Kelas A", deadline: "2024-08-10", submissions: 48, total: 50, status: "Grading" },
  { name: "Presentasi Sistem Endokrin", class: "Kelas A", deadline: "2024-07-20", submissions: 50, total: 50, status: "Complete" },
  { name: "Rancangan Tugas Akhir", class: "Kelas A", deadline: "2024-09-01", submissions: 0, total: 50, status: "Draft" },
]

export default function AssignmentsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Manajemen Tugas</h1>
        <p className="text-muted-foreground">Buat, distribusikan, dan nilai tugas mahasiswa.</p>
      </div>

      <Tabs defaultValue="manage" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="manage">Daftar Tugas</TabsTrigger>
          <TabsTrigger value="create">Buat Tugas Baru</TabsTrigger>
          <TabsTrigger value="grade">Penilaian</TabsTrigger>
        </TabsList>

        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Tugas</CardTitle>
              <CardDescription>Kelola semua tugas untuk Kelas A.</CardDescription>
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
                    <TableRow key={task.name}>
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
                        <Button variant="outline" size="icon"><Eye className="h-4 w-4" /></Button>
                        <Button variant="outline" size="icon"><Edit className="h-4 w-4" /></Button>
                        <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Buat Tugas Baru</CardTitle>
              <CardDescription>Isi detail tugas di bawah ini.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="task-title">Judul Tugas</Label>
                <Input id="task-title" placeholder="cth. Laporan Praktikum Sistem Saraf" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="task-description">Deskripsi</Label>
                <Textarea id="task-description" placeholder="Jelaskan detail tugas, tujuan, dan instruksi pengerjaan." className="min-h-[150px]" />
              </div>
              <div className="space-y-2">
                <Label>Materi Pendukung</Label>
                <div className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FileUp className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Upload file</p>
                    </div>
                </div>
              </div>
               <div className="space-y-2">
                <Label htmlFor="task-deadline">Batas Waktu</Label>
                <div className="relative">
                    <Input id="task-deadline" type="date" />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Publikasikan Tugas
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="grade">
          <Card>
            <CardHeader>
              <CardTitle>Penilaian Tugas</CardTitle>
              <CardDescription>Pilih tugas untuk memulai penilaian dengan bantuan AI.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-12">Fitur penilaian hybrid akan tersedia di sini. Pilih tugas dari daftar untuk melihat pengumpulan mahasiswa dan memulai penilaian.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
