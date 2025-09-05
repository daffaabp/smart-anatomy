
"use client"
import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const studentResults = [
  { id: "ahmad-subarjo", name: "Ahmad Subarjo", avatar: "AS", score: 88 },
  { id: "bunga-citra", name: "Bunga Citra", avatar: "BC", score: 92 },
  { id: "candra-darusman", name: "Candra Darusman", avatar: "CD", score: 76 },
  { id: "dewi-lestari", name: "Dewi Lestari", avatar: "DL", score: 81 },
  { id: "eka-kurniawan", name: "Eka Kurniawan", avatar: "EK", score: 95 },
]

export default function QuizResultsPage({ params }: { params: { quizId: string } }) {
  const quizName = "Kuis Sistem Saraf"; // Fetch dynamically based on quizId

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/dosen-dashboard/smart-quiz" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Riwayat Kuis
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Hasil Kuis: {quizName}</h1>
        <p className="text-muted-foreground">Analisis hasil pengumpulan kuis dari mahasiswa.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Ringkasan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-baseline">
                    <span className="text-muted-foreground">Rata-rata Skor</span>
                    <span className="text-2xl font-bold text-primary">86.4</span>
                </div>
                <div className="flex justify-between items-baseline">
                    <span className="text-muted-foreground">Pengumpulan</span>
                    <span className="text-2xl font-bold">45/50</span>
                </div>
                <div className="flex justify-between items-baseline">
                    <span className="text-muted-foreground">Tingkat Lulus</span>
                    <span className="text-2xl font-bold text-green-600">92%</span>
                </div>
            </CardContent>
        </Card>
         <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>Analisis Soal Tersulit</CardTitle>
                <CardDescription>Soal yang paling banyak dijawab salah oleh mahasiswa.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-2 rounded-md bg-muted">
                    <p className="truncate">"Jelaskan peran hipotalamus dalam regulasi sistem endokrin..."</p>
                    <Badge variant="destructive">56% Salah</Badge>
                </div>
                 <div className="flex justify-between items-center p-2 rounded-md bg-muted">
                    <p className="truncate">"Bagian dari neuron yang menerima sinyal dari neuron lain adalah..."</p>
                    <Badge variant="destructive">41% Salah</Badge>
                </div>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Hasil per Mahasiswa</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Mahasiswa</TableHead>
                        <TableHead>Skor</TableHead>
                        <TableHead><span className="sr-only">Aksi</span></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {studentResults.map(student => (
                        <TableRow key={student.id}>
                            <TableCell className="flex items-center gap-3">
                                <Avatar className="h-9 w-9"><AvatarFallback>{student.avatar}</AvatarFallback></Avatar>
                                <span className="font-medium">{student.name}</span>
                            </TableCell>
                            <TableCell>
                                <span className={`font-bold text-lg ${student.score >= 80 ? 'text-green-600' : 'text-orange-500'}`}>{student.score}</span>
                            </TableCell>
                            <TableCell className="text-right">
                                <Link href={`/dosen-dashboard/smart-quiz/results/${params.quizId}/${student.id}`}>
                                    <Button variant="outline" size="sm">
                                        Lihat Analisis Detail <ChevronRight className="w-4 h-4 ml-2" />
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
