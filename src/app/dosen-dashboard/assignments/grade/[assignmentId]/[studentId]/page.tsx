
"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Bot, FileText, Loader2, Save, User, FileWarning } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { analyzeTaskSubmission, AnalyzeTaskSubmissionInput } from "@/ai/flows/analyze-student-task-submissions"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type AnalysisResult = {
  aiPreScreeningScore: number;
  keyPointsHighlighted: string;
  potentialIssuesFlagged: string;
  suggestedScore: number;
  suggestedFeedback: string;
};

export default function GradeSubmissionPage({ params }: { params: { assignmentId: string, studentId: string } }) {
  const { studentId, assignmentId } = params;
  const [analysis, setAnalysis] = React.useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast()
  
  const studentName = React.useMemo(() => 
    studentId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    [studentId]
  );
  
  const studentSubmission = {
    text: `Pasien datang dengan keluhan sakit kepala hebat dan kaku kuduk. Pemeriksaan fisik menunjukkan tanda Kernig dan Brudzinski positif. Cairan serebrospinal menunjukkan peningkatan sel darah putih dengan dominasi neutrofil, serta kadar glukosa yang rendah dan protein yang tinggi. Kultur cairan serebrospinal kemudian mengkonfirmasi adanya Streptococcus pneumoniae.
Diagnosis yang paling mungkin adalah meningitis bakterialis yang disebabkan oleh Streptococcus pneumoniae.
Penanganan meliputi pemberian antibiotik intravena secepat mungkin, seperti Ceftriaxone 2 gram setiap 12 jam, dikombinasikan dengan Vancomycin. Dexamethasone juga diberikan sebelum atau bersamaan dengan dosis pertama antibiotik untuk mengurangi respons inflamasi dan risiko komplikasi neurologis. Terapi suportif lainnya termasuk manajemen cairan, pemantauan tanda vital, dan pengelolaan tekanan intrakranial jika diperlukan.`,
    file: null as string | null // Placeholder for file submission, e.g., "Jawaban - Ahmad Subarjo.pdf"
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
    setAnalysis(null);
    
    // In a real app, you would have a way to get the submission data,
    // including the file content as a data URI if a file was submitted.
    // For now, we simulate this. If there's a file, we'd read it and convert to data URI.
    // Since we don't have a file, we'll just use the text.
    if (!studentSubmission.text && !studentSubmission.file) {
      toast({
        variant: "destructive",
        title: "Tidak Ada Data",
        description: "Tidak ada teks atau file yang dikumpulkan oleh mahasiswa.",
      });
      setIsLoading(false);
      return;
    }

    try {
        const submissionData: AnalyzeTaskSubmissionInput = {
            taskDescription: "Analisis kasus klinis terkait gangguan sistem saraf. Jelaskan patofisiologi, diagnosis, dan penanganan yang relevan berdasarkan materi yang telah diberikan.",
            studentSubmissionText: studentSubmission.text,
            // submissionFile: In a real app, this would be the data URI of the uploaded file.
            gradingCriteria: "Ketepatan diagnosis (30%), Kedalaman analisis patofisiologi (30%), Relevansi penanganan (30%), Kejelasan bahasa (10%)"
        }
        const result = await analyzeTaskSubmission(submissionData);
        setAnalysis(result);
    } catch (error) {
        console.error("Failed to analyze submission:", error);
        toast({
            variant: "destructive",
            title: "Analisis Gagal",
            description: "Terjadi kesalahan saat AI menganalisis jawaban.",
        })
    } finally {
        setIsLoading(false);
    }
  }
  
  React.useEffect(() => {
    // Automatically run analysis on page load
    handleAnalyze();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Penilaian Tugas: Analisis Kasus Klinis</h1>
        <p className="text-muted-foreground">Menilai pengumpulan dari mahasiswa: <strong>{studentName}</strong></p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="w-6 h-6"/> Jawaban Mahasiswa
                    </CardTitle>
                </CardHeader>
                <CardContent>
                  {studentSubmission.file && (
                    <div className="mb-4 p-3 border rounded-md bg-muted/50 flex items-center gap-3">
                      <FileText className="w-5 h-5" />
                      <span className="font-medium">{studentSubmission.file}</span>
                    </div>
                  )}
                  {studentSubmission.text && (
                    <p className="text-muted-foreground whitespace-pre-wrap">
                      {studentSubmission.text}
                    </p>
                  )}
                  {!studentSubmission.text && !studentSubmission.file && (
                    <p className="text-muted-foreground text-center py-4">Mahasiswa tidak mengirimkan jawaban.</p>
                  )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bot className="w-6 h-6 text-primary"/> Analisis dari AI
                    </CardTitle>
                     <CardDescription>
                        AI telah menganalisis jawaban dan memberikan saran penilaian. Tinjau hasilnya di bawah ini.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading && (
                        <div className="flex items-center justify-center h-40">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            <p className="ml-4 text-muted-foreground">AI sedang menganalisis...</p>
                        </div>
                    )}
                    {!isLoading && !analysis && (
                       <div className="text-center py-10">
                            <p className="text-muted-foreground mb-4">Gagal memuat analisis AI.</p>
                            <Button onClick={handleAnalyze}>
                                <Bot className="mr-2 h-4 w-4" /> Coba Lagi Analisis AI
                            </Button>
                        </div>
                    )}
                    {analysis && (
                        <div className="space-y-4">
                            {studentSubmission.file && (
                                <Alert>
                                    <FileWarning className="h-4 w-4" />
                                    <AlertTitle>Analisis Berbasis Teks</AlertTitle>
                                    <AlertDescription>
                                        Saat ini analisis file belum diimplementasikan. Analisis berikut hanya didasarkan pada konten teks.
                                    </AlertDescription>
                                </Alert>
                            )}
                            <div>
                                <Label className="text-base">Skor Rekomendasi AI</Label>
                                <div className="flex items-baseline gap-2">
                                     <p className="text-4xl font-bold text-primary">{analysis.suggestedScore}</p>
                                     <span className="text-muted-foreground">/ 100</span>
                                </div>
                            </div>
                            <Separator/>
                            <div>
                                <Label>Poin Kunci yang Disorot</Label>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{analysis.keyPointsHighlighted}</p>
                            </div>
                            <div>
                                <Label>Potensi Masalah / Kekurangan</Label>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{analysis.potentialIssuesFlagged}</p>
                            </div>
                             <div>
                                <Label>Saran Feedback untuk Mahasiswa</Label>
                                <Textarea readOnly value={analysis.suggestedFeedback} className="min-h-[100px] bg-muted/50" />
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>

        <div className="md:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Form Penilaian Final</CardTitle>
                    <CardDescription>Masukkan nilai akhir dan feedback setelah meninjau analisis AI.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="final-score">Skor Final</Label>
                        <Input id="final-score" type="number" placeholder="cth. 88" defaultValue={analysis?.suggestedScore} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="final-feedback">Feedback untuk Mahasiswa</Label>
                        <Textarea id="final-feedback" placeholder="Tulis feedback konstruktif..." className="min-h-[200px]" defaultValue={analysis?.suggestedFeedback} />
                    </div>
                    <Button className="w-full">
                        <Save className="mr-2 h-4 w-4" /> Simpan Penilaian
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}