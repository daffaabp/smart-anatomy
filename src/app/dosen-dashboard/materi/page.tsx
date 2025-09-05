import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUp } from "lucide-react";

export default function MateriPage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Upload Materi</h1>
                <p className="text-muted-foreground">Unggah materi pelajaran dalam berbagai format untuk mahasiswa.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Upload Materi Baru</CardTitle>
                    <CardDescription>Upload materi pelajaran untuk dibuatkan quiz secara otomatis oleh AI atau untuk dibagikan ke mahasiswa.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FileUp className="w-12 h-12 mb-4 text-muted-foreground" />
                        <p className="mb-2 text-lg text-muted-foreground"><span className="font-semibold">Klik untuk upload</span> atau seret file ke sini</p>
                        <p className="text-sm text-muted-foreground">Mendukung format: PDF, PPT, Word, Gambar, dan Link URL</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
