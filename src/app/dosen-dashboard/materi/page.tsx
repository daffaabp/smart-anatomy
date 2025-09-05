
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UploadCloud, Link, FileText, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const uploadedMaterials = [
  { name: "Sistem Saraf Pusat.pdf", type: "PDF", size: "2.3 MB", date: "2024-07-15" },
  { name: "Praktikum Otot.pptx", type: "PPT", size: "5.1 MB", date: "2024-07-12" },
  { name: "Video Pembedahan Jantung", type: "URL", size: "-", date: "2024-07-10" },
  { name: "Digestive System Overview.docx", type: "Word", size: "1.2 MB", date: "2024-07-09" }
]

export default function MateriPage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Manajemen Materi</h1>
                <p className="text-muted-foreground">Unggah dan kelola materi pelajaran untuk semua kelas Anda.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Upload Materi Baru</CardTitle>
                    <CardDescription>Upload materi dari file atau tambahkan dari link URL.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <Label>Upload dari Komputer</Label>
                        <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <UploadCloud className="w-10 h-10 mb-4 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Klik untuk upload</span> atau seret file</p>
                                <p className="text-xs text-muted-foreground">PDF, PPT, Word, Gambar (MAX. 25MB)</p>
                            </div>
                            <Input id="file-upload" type="file" className="hidden" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="url-upload">Tambah dari URL</Label>
                        <div className="flex gap-2">
                           <Input id="url-upload" placeholder="https://example.com/materi.pdf" />
                           <Button><Link className="mr-2 h-4 w-4" /> Tambah Link</Button>
                        </div>
                        <p className="text-xs text-muted-foreground">Tempelkan link ke materi online seperti artikel, video, atau file publik.</p>
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Materi Tersimpan</CardTitle>
                    <CardDescription>Kelola semua materi yang sudah Anda upload.</CardDescription>
                </CardHeader>
                <CardContent>
                   <ul className="space-y-3">
                        {uploadedMaterials.map((file, index) => (
                            <li key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                                <div className="flex items-center gap-4">
                                    <FileText className="w-6 h-6 text-primary" />
                                    <div>
                                        <p className="font-semibold">{file.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {file.date} - {file.size}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                     <Badge variant="outline">{file.type}</Badge>
                                     <Button variant="ghost" size="icon">
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                     </Button>
                                </div>
                            </li>
                        ))}
                   </ul>
                </CardContent>
            </Card>
        </div>
    )
}
