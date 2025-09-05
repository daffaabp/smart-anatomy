import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Clock, FileText } from "lucide-react"

const assignments = [
  { 
    title: "Analisis Kasus Klinis", 
    description: "Analisis kasus klinis terkait gangguan sistem saraf.",
    deadline: "15 Agu 2024", 
    status: "Belum Dikerjakan", 
    statusColor: "bg-red-500"
  },
  { 
    title: "Laporan Praktikum Otot", 
    description: "Buat laporan lengkap dari hasil praktikum pengamatan struktur otot.",
    deadline: "10 Agu 2024", 
    status: "Sedang Dikerjakan", 
    statusColor: "bg-yellow-500"
  },
  { 
    title: "Presentasi Sistem Endokrin",
    description: "Siapkan materi presentasi mengenai kelenjar endokrin utama.",
    deadline: "20 Jul 2024", 
    status: "Sudah Dinilai", 
    statusColor: "bg-green-500" 
  },
   { 
    title: "Rancangan Tugas Akhir",
    description: "Buat proposal singkat untuk rancangan tugas akhir anatomi.",
    deadline: "1 Sep 2024", 
    status: "Belum Dikerjakan", 
    statusColor: "bg-red-500"
  },
]

export default function StudentAssignmentsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tugas Saya</h1>
        <p className="text-muted-foreground">Lihat, kerjakan, dan kumpulkan tugas Anda di sini.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assignments.map((task, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-center">
                 <CardTitle className="text-lg">{task.title}</CardTitle>
                 <Badge variant="secondary" className={`${task.statusColor} text-white`}>{task.status}</Badge>
              </div>
              <CardDescription className="flex items-center gap-2 pt-2">
                <Clock className="w-4 h-4" /> 
                Batas waktu: {task.deadline}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {task.description}
              </p>
            </CardContent>
            <div className="p-6 pt-0">
              <Button className="w-full">
                {task.status === "Sudah Dinilai" ? "Lihat Hasil" : "Kerjakan Tugas"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
