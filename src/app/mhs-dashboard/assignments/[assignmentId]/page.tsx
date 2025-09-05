
"use client"
import * as React from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Download, FileText, Paperclip, Send, UploadCloud } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export default function AssignmentDetailPage({ params }: { params: { assignmentId: string } }) {
  // Mock data, in a real app, fetch based on params.assignmentId
  const assignment = {
    title: "Analisis Kasus Klinis",
    deadline: "15 Agu 2024",
    description: "Analisis kasus klinis terkait gangguan sistem saraf. Jelaskan patofisiologi, diagnosis, dan penanganan yang relevan berdasarkan materi yang telah diberikan. Pastikan jawaban Anda terstruktur dengan baik dan didukung oleh referensi yang valid.",
    supportingMaterial: "kasus-klinis-saraf.pdf",
    submissionStatus: "Belum Dikerjakan", // Possible values: "Belum Dikerjakan", "Sudah Dikumpulkan", "Sudah Dinilai"
    submissionDate: null,
    grade: null,
    feedback: null
  }

  const isSubmitted = assignment.submissionStatus !== "Belum Dikerjakan"

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/mhs-dashboard/assignments" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Daftar Tugas
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{assignment.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mt-2">
              <Clock className="w-4 h-4" />
              <span>Batas Waktu: {assignment.deadline}</span>
              <Badge variant={
                assignment.submissionStatus === "Belum Dikerjakan" ? "destructive" :
                assignment.submissionStatus === "Sudah Dikumpulkan" ? "secondary" : "default"
              }>{assignment.submissionStatus}</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Deskripsi Tugas</CardTitle>
            </CardHeader>
            <CardContent className="whitespace-pre-wrap text-muted-foreground">
              {assignment.description}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Materi Pendukung</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                {assignment.supportingMaterial}
              </Button>
            </CardContent>
          </Card>

          {isSubmitted && (
             <Card>
              <CardHeader>
                  <CardTitle>Jawaban Terkirim</CardTitle>
                  <CardDescription>
                      Anda mengumpulkan pada {assignment.submissionDate || "11 Agu 2024"}.
                  </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div>
                      <h4 className="font-semibold mb-2">File Terkirim:</h4>
                      <div className="flex items-center gap-3 p-3 rounded-md border text-sm">
                        <FileText className="h-5 w-5 text-primary" />
                        <span>Laporan Kasus Klinis - Siti Amelia.pdf</span>
                      </div>
                  </div>
              </CardContent>
            </Card>
          )}

        </div>
        <div className="md:col-span-1">
          {!isSubmitted ? (
            <Card>
              <CardHeader>
                <CardTitle>Kumpulkan Jawaban Anda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="answer-text">Jawaban Teks</Label>
                  <Textarea id="answer-text" placeholder="Ketik jawaban Anda di sini jika tidak ada file yang diupload." className="min-h-[150px]" />
                </div>
                <div className="space-y-2">
                  <Label>Upload File</Label>
                  <div className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                          <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Seret file atau <span className="font-semibold text-primary">klik untuk upload</span></p>
                          <p className="text-xs text-muted-foreground">PDF, DOCX, atau PPTX</p>
                      </div>
                  </div>
                </div>
                <Button className="w-full">
                  <Send className="mr-2 h-4 w-4" /> Kumpulkan Tugas
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Hasil & Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                {assignment.submissionStatus === "Sudah Dinilai" ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Skor Akhir</p>
                      <p className="text-4xl font-bold text-primary">88</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Feedback dari Dosen</p>
                      <p className="p-3 bg-muted rounded-md text-sm">"Kerja bagus, Siti! Analisisnya tajam dan relevan. Pertahankan untuk tugas berikutnya."</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <p>Jawaban Anda telah dikumpulkan. Menunggu penilaian dari dosen.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
