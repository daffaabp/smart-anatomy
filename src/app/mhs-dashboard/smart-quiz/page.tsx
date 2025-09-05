"use client"
import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpenCheck } from "lucide-react"
import { Input } from "@/components/ui/input"

const quizHistory = [
  { id: "saraf-24", name: "Quiz Sistem Saraf", date: "2024-07-28", score: 85, status: "Graded" },
  { id: "otot-24", name: "Quiz Otot dan Rangka", date: "2024-07-22", score: 92, status: "Graded" },
  { id: "awal-23", name: "Quiz Pendahuluan", date: "2024-05-30", score: 78, status: "Graded" },
]

export default function SmartQuizHistoryPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Smart Quiz</h1>
        <p className="text-muted-foreground">Kerjakan quiz, lihat riwayat, dan dapatkan feedback dari AI.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Masuk Quiz Baru</CardTitle>
          <CardDescription>Dapatkan kode dari dosen untuk memulai quiz baru.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-center gap-4">
          <Input 
            placeholder="Masukkan kode quiz, cth. ANF-QUIZ-2401" 
            className="text-base h-11 flex-grow" 
          />
           <Link href="/mhs-dashboard/smart-quiz/sistem-saraf" passHref>
            <Button size="lg" className="w-full sm:w-auto">
              Mulai Quiz <BookOpenCheck className="ml-2 h-4 w-4" />
            </Button>
           </Link>
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle>Riwayat Quiz</CardTitle>
          <CardDescription>Daftar semua quiz yang telah diselesaikan.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Quiz</TableHead>
                <TableHead>Tanggal Dikerjakan</TableHead>
                <TableHead>Skor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quizHistory.map((quiz) => (
                <TableRow key={quiz.name}>
                  <TableCell className="font-medium">{quiz.name}</TableCell>
                  <TableCell>{quiz.date}</TableCell>
                  <TableCell>
                    <span className={`font-bold ${quiz.score >= 80 ? 'text-green-600' : 'text-orange-500'}`}>
                      {quiz.score}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default" className="bg-accent text-accent-foreground">
                      {quiz.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                     <Link href={`/mhs-dashboard/smart-quiz/sistem-saraf?review=true`} passHref>
                        <Button variant="outline" size="sm">
                          Lihat Feedback <ArrowRight className="ml-2 h-4 w-4" />
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
