'use client'
import * as React from "react"
import Link from 'next/link'
import {
  Activity,
  ArrowUp,
  BookCheck,
  FileClock,
  FileDown,
  Monitor,
  PlusCircle,
  Users,
  UsersRound,
  FilePlus,
  Bot,
} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

const chartData = [
  { date: "2024-05-01", quiz: 78, assignment: 85 },
  { date: "2024-05-05", quiz: 82, assignment: 88 },
  { date: "2024-05-10", quiz: 80, assignment: 90 },
  { date: "2024-05-15", quiz: 85, assignment: 86 },
  { date: "2024-05-20", quiz: 88, assignment: 92 },
  { date: "2024-05-25", quiz: 90, assignment: 91 },
  { date: "2024-05-30", quiz: 92, assignment: 95 },
]

const students = [
  { name: "Ahmad Subarjo", status: "online", lastLogin: "2 menit lalu", quizzes: 5, assignments: 3, avatar: "AS" },
  { name: "Bunga Citra", status: "offline", lastLogin: "1 jam lalu", quizzes: 4, assignments: 3, avatar: "BC" },
  { name: "Candra Darusman", status: "online", lastLogin: "15 menit lalu", quizzes: 5, assignments: 2, avatar: "CD" },
  { name: "Dewi Lestari", status: "offline", lastLogin: "3 hari lalu", quizzes: 2, assignments: 1, avatar: "DL" },
  { name: "Eka Kurniawan", status: "online", lastLogin: "5 menit lalu", quizzes: 5, assignments: 3, avatar: "EK" },
]

export default function DosenDashboard() {
  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mahasiswa</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50</div>
            <p className="text-xs text-muted-foreground">Kelas A - Anatomi & Fisiologi</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quiz Aktif</CardTitle>
            <BookCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">1 akan berakhir dalam 2 hari</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tugas Menunggu</CardTitle>
            <FileClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Perlu dinilai sebelum 3 hari</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mahasiswa Online</CardTitle>
            <UsersRound className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+23</div>
            <p className="text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <ArrowUp className="h-3 w-3 text-green-500" /> +5.2% dari jam lalu
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3 grid gap-4">
           <Card>
              <CardHeader>
                <CardTitle>Performa Kelas</CardTitle>
                <CardDescription>Tren performa rata-rata quiz dan tugas dalam 30 hari terakhir.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-[300px] w-full">
                  <LineChart data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line dataKey="quiz" type="monotone" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
                    <Line dataKey="assignment" type="monotone" stroke="var(--color-accent)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-2 grid gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Aksi Cepat</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <Link href="/dosen-dashboard/smart-quiz" passHref>
                        <Button className="w-full">
                            <PlusCircle className="mr-2 h-4 w-4" /> Buat Quiz
                        </Button>
                    </Link>
                    <Link href="/dosen-dashboard/materi" passHref>
                        <Button variant="outline" className="w-full">
                            <FilePlus className="mr-2 h-4 w-4" /> Upload Materi
                        </Button>
                    </Link>
                    <Link href="/dosen-dashboard/assignments" passHref>
                         <Button variant="outline" className="w-full">
                            <FileClock className="mr-2 h-4 w-4" /> Buat Tugas
                        </Button>
                    </Link>
                    <Button variant="outline" className="w-full">
                        <Bot className="mr-2 h-4 w-4" /> AI Assistant
                    </Button>
                </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Aktivitas Terbaru</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 text-sm">
                <div className="flex items-center gap-4">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="font-medium">Ahmad Subarjo <span className="font-normal text-muted-foreground">menyelesaikan</span> Quiz 1</p>
                    <time className="text-xs text-muted-foreground">2 menit lalu</time>
                  </div>
                </div>
                 <div className="flex items-center gap-4">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/02.png" alt="Avatar" />
                    <AvatarFallback>CD</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="font-medium">Candra Darusman <span className="font-normal text-muted-foreground">mengumpulkan</span> Tugas Pendahuluan</p>
                    <time className="text-xs text-muted-foreground">15 menit lalu</time>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/03.png" alt="Avatar" />
                    <AvatarFallback>EK</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="font-medium">Eka Kurniawan <span className="font-normal text-muted-foreground">mengunduh materi</span> 'Sistem Saraf'</p>
                    <time className="text-xs text-muted-foreground">30 menit lalu</time>
                  </div>
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manajemen Mahasiswa</CardTitle>
          <CardDescription>
            Lihat status dan progres mahasiswa di Kelas A.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Mahasiswa</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Login Terakhir</TableHead>
                <TableHead className="hidden lg:table-cell">Quiz Dikerjakan</TableHead>
                <TableHead className="hidden lg:table-cell">Tugas Dikumpul</TableHead>
                <TableHead><span className="sr-only">Aksi</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.name}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                          <AvatarFallback>{student.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{student.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={student.status === 'online' ? 'default' : 'secondary'} className={student.status === 'online' ? 'bg-green-500 text-white' : ''}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{student.lastLogin}</TableCell>
                  <TableCell className="hidden lg:table-cell">{student.quizzes}</TableCell>
                  <TableCell className="hidden lg:table-cell">{student.assignments}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Lihat Detail</Button>
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
