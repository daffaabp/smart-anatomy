
"use client"
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookUp, FileText, Film, GripVertical, Link as LinkIcon, PenSquare, PlusCircle, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const courseStructure = [
    {
        week: 1,
        title: "Pendahuluan Anatomi & Fisiologi",
        materials: [
            { type: "video", title: "Video: Pengantar Anatomi" },
            { type: "document", title: "Modul 1: Terminologi Anatomi.pdf" }
        ],
        tasks: [
            { type: "quiz", title: "Quiz Pendahuluan" }
        ]
    },
    {
        week: 2,
        title: "Sistem Saraf",
        materials: [
            { type: "video", title: "Video: Struktur Sistem Saraf Pusat" },
            { type: "document", title: "Modul 2: Sistem Saraf.pdf" },
            { type: "document", title: "Jurnal: Perkembangan Terbaru Neurosains.pdf" },
        ],
        tasks: [
            { type: "assignment", title: "Tugas: Analisis Kasus Klinis" },
            { type: "quiz", title: "Quiz Sistem Saraf" }
        ]
    },
    {
        week: 3,
        title: "Sistem Otot & Rangka",
        materials: [
            { type: "video", title: "Video: Fisiologi Kontraksi Otot" },
            { type: "document", title: "Modul 3: Sistem Otot & Rangka.pdf" }
        ],
        tasks: [
             { type: "assignment", title: "Tugas: Laporan Praktikum Otot" }
        ]
    }
];

const getIcon = (type: string) => {
    switch (type) {
        case "video": return <Film className="w-5 h-5 text-blue-500" />;
        case "document": return <FileText className="w-5 h-5 text-red-500" />;
        case "quiz": return <PenSquare className="w-5 h-5 text-green-500" />;
        case "assignment": return <PenSquare className="w-5 h-5 text-orange-500" />;
        default: return <LinkIcon className="w-5 h-5 text-gray-500" />;
    }
}

export default function DosenMateriPage() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Struktur Mata Kuliah</h1>
                    <p className="text-muted-foreground">Atur bab, materi, dan tugas untuk kelas Anda di sini.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" /> Tambah Bab Baru
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Buat Bab Baru</DialogTitle>
                            <DialogDescription>Masukkan judul untuk bab atau topik perkuliahan yang baru.</DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                            <Label htmlFor="bab-title">Judul Bab</Label>
                            <Input id="bab-title" placeholder="cth. Sistem Kardiovaskular" />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild><Button variant="outline">Batal</Button></DialogClose>
                            <Button>Simpan Bab</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardContent className="p-4">
                     <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                        {courseStructure.map((bab, index) => (
                            <AccordionItem value={`item-${index+1}`} key={index}>
                                <div className="flex items-center w-full group">
                                    <AccordionTrigger className="hover:no-underline flex-grow p-4">
                                        <div className="flex items-center gap-4 w-full">
                                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold text-lg shrink-0">
                                                {bab.week}
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="text-lg font-semibold text-left">Bab {bab.week}: {bab.title}</h3>
                                                <p className="text-sm text-muted-foreground text-left">Kelola materi dan tugas untuk bab ini</p>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <div className="flex items-center gap-2 pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon"><PenSquare className="h-4 w-4"/></Button>
                                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive"/></Button>
                                    </div>
                                </div>
                                <AccordionContent>
                                    <div className="pl-16 space-y-6 py-4 border-l-2 border-dashed ml-6">
                                        
                                        {/* Materials Section */}
                                        <div className="space-y-3">
                                            {bab.materials.map(material => (
                                                <div key={material.title} className="flex items-center justify-between p-3 rounded-md border bg-card hover:bg-muted/50 group">
                                                    <div className="flex items-center gap-3">
                                                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                                                        {getIcon(material.type)}
                                                        <span className="font-medium text-sm">{material.title}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8"><Trash2 className="w-4 h-4 text-destructive" /></Button>
                                                    </div>
                                                </div>
                                            ))}
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" size="sm" className="w-full border-dashed">
                                                        <BookUp className="mr-2 h-4 w-4" /> Tambah Materi
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Tambah Materi Baru</DialogTitle>
                                                        <DialogDescription>Upload file atau tambahkan link materi untuk bab ini.</DialogDescription>
                                                    </DialogHeader>
                                                    {/* Add form for adding material here */}
                                                    <DialogFooter>
                                                        <DialogClose asChild><Button variant="outline">Batal</Button></DialogClose>
                                                        <Button>Simpan Materi</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>

                                        {/* Tasks Section */}
                                        <div className="space-y-3">
                                            {bab.tasks.map(task => (
                                                <div key={task.title} className="flex items-center justify-between p-3 rounded-md border bg-card hover:bg-muted/50 group">
                                                    <div className="flex items-center gap-3">
                                                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                                                        {getIcon(task.type)}
                                                        <p className="font-medium text-sm">{task.title}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8"><Trash2 className="w-4 h-4 text-destructive" /></Button>
                                                    </div>
                                                </div>
                                            ))}
                                            <Link href="/dosen-dashboard/assignments?tab=create" passHref>
                                                <Button variant="outline" size="sm" className="w-full border-dashed">
                                                    <PenSquare className="mr-2 h-4 w-4" /> Tambah Tugas / Kuis
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    )
}
