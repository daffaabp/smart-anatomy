'use client';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, Book, CheckCircle, Download, FileText, GanttChartSquare } from "lucide-react"
import { CircularProgress } from "@/components/ui/circular-progress";

const recentMaterials = [
  { title: "Sistem Saraf Pusat.pdf", icon: <FileText className="w-5 h-5 text-red-500" /> },
  { title: "Praktikum Otot.pptx", icon: <FileText className="w-5 h-5 text-orange-500" /> },
  { title: "Video Pembedahan Jantung", icon: <FileText className="w-5 h-5 text-blue-500" /> },
];

const pendingAssignments = [
    { title: "Analisis Kasus Klinis", due: "3 hari lagi", priority: "Tinggi" },
    { title: "Laporan Praktikum Otot", due: "7 hari lagi", priority: "Sedang" },
]

export default function MahasiswaDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Masuk Quiz</CardTitle>
            <CardDescription>Dapatkan kode dari dosen untuk mengakses quiz.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center gap-4">
            <Input 
              placeholder="Masukkan kode quiz, cth. ANF-QUIZ-20241201" 
              className="text-lg h-12 flex-grow" 
            />
            <Button size="lg" className="w-full sm:w-auto">
              Masuk Quiz <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Progress Belajar</CardTitle>
                <CardDescription>Keseluruhan progres & peringkat.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-around gap-4">
                <div className="relative">
                    <CircularProgress value={75} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold">75%</span>
                    </div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold">#5</div>
                    <p className="text-sm text-muted-foreground">dari 50 mhs</p>
                </div>
                <Button variant="outline" size="sm">Lihat Detail</Button>
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Materi Pembelajaran</CardTitle>
            <Book className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentMaterials.map((material, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {material.icon}
                    <span className="font-medium text-sm">{material.title}</span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Tugas Saya</CardTitle>
            <GanttChartSquare className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                {pendingAssignments.map((assignment, index) => (
                    <div key={index} className="p-3 rounded-lg border">
                        <div className="flex justify-between items-start">
                           <div>
                                <p className="font-semibold">{assignment.title}</p>
                                <p className="text-sm text-muted-foreground">Batas waktu: {assignment.due}</p>
                           </div>
                           <span className={`text-xs font-bold ${assignment.priority === 'Tinggi' ? 'text-red-500' : 'text-yellow-500'}`}>{assignment.priority}</span>
                        </div>
                        <Button variant="link" className="p-0 h-auto mt-2">Lihat Detail</Button>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Aktivitas Terakhir</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                        <div>
                            <p>Menyelesaikan <span className="font-semibold">Quiz 1</span> dengan skor 85.</p>
                            <p className="text-xs text-muted-foreground">2 jam lalu</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <ArrowRight className="w-5 h-5 text-blue-500 mt-1" />
                         <div>
                            <p>Mengumpulkan <span className="font-semibold">Tugas Pendahuluan</span>.</p>
                            <p className="text-xs text-muted-foreground">1 hari lalu</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Download className="w-5 h-5 text-gray-500 mt-1" />
                        <div>
                            <p>Mengunduh materi <span className="font-semibold">'Sistem Saraf'</span>.</p>
                            <p className="text-xs text-muted-foreground">2 hari lalu</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

      </div>
    </div>
  )
}
