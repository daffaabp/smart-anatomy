"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Clock, FileText, Paperclip, UploadCloud } from "lucide-react"

const assignments = [
  { 
    id: "analisis-kasus",
    title: "Analisis Kasus Klinis", 
    description: "Analisis kasus klinis terkait gangguan sistem saraf.",
    deadline: "15 Agu 2024", 
    status: "Belum Dikerjakan", 
    statusVariant: "destructive",
    actionText: "Kerjakan Tugas"
  },
  { 
    id: "laporan-otot",
    title: "Laporan Praktikum Otot", 
    description: "Buat laporan lengkap dari hasil praktikum pengamatan struktur otot.",
    deadline: "10 Agu 2024", 
    status: "Sudah Dikumpulkan", 
    statusVariant: "secondary",
    actionText: "Lihat Pengumpulan"
  },
  { 
    id: "presentasi-endokrin",
    title: "Presentasi Sistem Endokrin",
    description: "Siapkan materi presentasi mengenai kelenjar endokrin utama.",
    deadline: "20 Jul 2024", 
    status: "Sudah Dinilai", 
    statusVariant: "default",
    actionText: "Lihat Hasil"
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
        {assignments.map((task) => (
          <Card key={task.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                 <CardTitle className="text-lg leading-tight">{task.title}</CardTitle>
                 <Badge variant={task.statusVariant as any}>{task.status}</Badge>
              </div>
              <CardDescription className="flex items-center gap-2 pt-2">
                <Clock className="w-4 h-4" /> 
                Batas waktu: {task.deadline}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {task.description}
              </p>
            </CardContent>
            <CardFooter>
              <Link href={`/mhs-dashboard/assignments/${task.id}`} className="w-full">
                <Button className="w-full">
                  {task.actionText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
