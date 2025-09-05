
"use client"
import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, Bot, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function StudentQuizResultPage({ params }: { params: { quizId: string, studentId: string } }) {
  const studentName = params.studentId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const quizName = "Kuis Sistem Saraf"; // Fetch dynamically

  const performanceMetrics = {
    accuracy: 85,
    completeness: 90,
    speed: 75,
    effort: 80,
    chatEngagement: 60,
  }
  const finalScore = 88;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href={`/dosen-dashboard/smart-quiz/results/${params.quizId}`} className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Hasil Kuis
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Analisis Hasil: {studentName}</h1>
        <p className="text-muted-foreground">Detail performa untuk <strong>{quizName}</strong>.</p>
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle>Skor Akhir</CardTitle>
                    <CardDescription>Akumulasi dari berbagai parameter penilaian AI.</CardDescription>
                </div>
                <div className="text-right">
                     <p className="text-5xl font-bold text-primary">{finalScore}</p>
                     <p className="text-muted-foreground">/ 100</p>
                </div>
            </div>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-x-8 gap-y-6 pt-6">
            <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                    <Label>Ketepatan Jawaban</Label>
                    <span className="font-semibold">{performanceMetrics.accuracy}%</span>
                </div>
                <Progress value={performanceMetrics.accuracy} />
            </div>
            <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                    <Label>Kelengkapan Jawaban (Essay)</Label>
                    <span className="font-semibold">{performanceMetrics.completeness}%</span>
                </div>
                <Progress value={performanceMetrics.completeness} />
            </div>
            <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                    <Label>Kecepatan Menjawab</Label>
                    <span className="font-semibold">{performanceMetrics.speed}%</span>
                </div>
                <Progress value={performanceMetrics.speed} />
            </div>
            <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                    <Label>Usaha (Revisi & Percobaan)</Label>
                    <span className="font-semibold">{performanceMetrics.effort}%</span>
                </div>
                <Progress value={performanceMetrics.effort} />
            </div>
             <div className="space-y-2 md:col-span-2">
                <div className="flex justify-between items-center text-sm">
                    <Label>Keterlibatan Chat AI</Label>
                    <span className="font-semibold">{performanceMetrics.chatEngagement}%</span>
                </div>
                <Progress value={performanceMetrics.chatEngagement} />
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bot className="text-primary"/> Ringkasan & Saran dari AI</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
                <Label>Ringkasan Performa</Label>
                <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md">
                    {studentName} menunjukkan pemahaman yang baik pada konsep dasar Sistem Saraf, terlihat dari akurasi jawaban yang tinggi. Kecepatan menjawab cukup baik, namun ada kecenderungan untuk memberikan jawaban singkat pada soal essay.
                </p>
            </div>
             <div>
                <Label>Saran Peningkatan</Label>
                <p className="text-sm text-muted-foreground p-3 bg-muted rounded-md">
                    Sarankan mahasiswa untuk lebih aktif menggunakan fitur chat dengan AI untuk mengeksplorasi topik lebih dalam. Dorong untuk memberikan jawaban yang lebih elaboratif pada soal essay untuk menunjukkan kedalaman pemahaman.
                </p>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
