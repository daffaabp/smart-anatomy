
"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Clock, FileText, Paperclip, UploadCloud } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


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

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Tugas</TableHead>
                <TableHead>Batas Waktu</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        {task.deadline}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={task.statusVariant as any}>{task.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/mhs-dashboard/assignments/${task.id}`} className="w-full">
                        <Button variant="outline" size="sm">
                            {task.actionText}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

    