import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

const quizHistory = [
  { name: "Quiz Sistem Saraf", date: "2024-07-28", score: 85, status: "Graded" },
  { name: "Quiz Otot dan Rangka", date: "2024-07-22", score: 92, status: "Graded" },
  { name: "Quiz Pendahuluan", date: "2024-05-30", score: 78, status: "Graded" },
]

export default function SmartQuizHistoryPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Riwayat Smart Quiz</h1>
        <p className="text-muted-foreground">Lihat hasil dan feedback dari quiz yang telah Anda kerjakan.</p>
      </div>

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
                    <Button variant="outline" size="sm">
                      Lihat Feedback <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
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
