
"use client"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Circle, FileText, Film, Link as LinkIcon, PenSquare, Radio } from "lucide-react";

const courseStructure = [
    {
        week: 1,
        title: "Pendahuluan Anatomi & Fisiologi",
        materials: [
            { type: "video", title: "Video: Pengantar Anatomi", status: "Sudah Ditonton" },
            { type: "document", title: "Modul 1: Terminologi Anatomi.pdf", status: "Sudah Dibaca" }
        ],
        tasks: [
            { type: "quiz", title: "Quiz Pendahuluan", dueDate: "20 Agu 2024", status: "Selesai", score: 85 }
        ]
    },
    {
        week: 2,
        title: "Sistem Saraf",
        materials: [
            { type: "video", title: "Video: Struktur Sistem Saraf Pusat", status: "Sudah Ditonton" },
            { type: "document", title: "Modul 2: Sistem Saraf.pdf", status: "Sudah Dibaca" },
            { type: "document", title: "Jurnal: Perkembangan Terbaru Neurosains.pdf", status: "Belum Dibaca" },
        ],
        tasks: [
            { type: "assignment", title: "Tugas: Analisis Kasus Klinis", dueDate: "28 Agu 2024", status: "Belum Dikerjakan" },
            { type: "quiz", title: "Quiz Sistem Saraf", dueDate: "30 Agu 2024", status: "Belum Dikerjakan" }
        ]
    },
    {
        week: 3,
        title: "Sistem Otot & Rangka",
        materials: [
            { type: "video", title: "Video: Fisiologi Kontraksi Otot", status: "Belum Ditonton" },
            { type: "document", title: "Modul 3: Sistem Otot & Rangka.pdf", status: "Belum Dibaca" }
        ],
        tasks: [
             { type: "assignment", title: "Tugas: Laporan Praktikum Otot", dueDate: "5 Sep 2024", status: "Belum Dikerjakan" }
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

const getStatusIcon = (status: string) => {
    if(status.startsWith("Sudah") || status === "Selesai") {
        return <CheckCircle className="w-5 h-5 text-green-500" />
    }
    return <Circle className="w-5 h-5 text-muted-foreground" />
}

export default function MateriPerkuliahanPage() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Materi & Perkuliahan</h1>
                <p className="text-muted-foreground">Jelajahi materi, kerjakan tugas, dan ikuti kuis sesuai dengan alur perkuliahan.</p>
            </div>

            <Card>
                <CardContent className="p-4">
                     <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                        {courseStructure.map((bab, index) => (
                            <AccordionItem value={`item-${index+1}`} key={index}>
                                <AccordionTrigger className="hover:no-underline">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                                            {bab.week}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-left">Bab {bab.week}: {bab.title}</h3>
                                            <p className="text-sm text-muted-foreground text-left">Materi dan tugas untuk minggu ini</p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="pl-16 space-y-6 py-4">
                                        <div>
                                            <h4 className="font-semibold mb-3">Materi Pembelajaran</h4>
                                            <ul className="space-y-3">
                                                {bab.materials.map(material => (
                                                    <li key={material.title} className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/50">
                                                        <div className="flex items-center gap-3">
                                                            {getIcon(material.type)}
                                                            <span className="font-medium text-sm">{material.title}</span>
                                                        </div>
                                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                            {getStatusIcon(material.status)}
                                                            <span>{material.status}</span>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                         <div>
                                            <h4 className="font-semibold mb-3">Tugas & Kuis</h4>
                                             <ul className="space-y-3">
                                                {bab.tasks.map(task => (
                                                    <li key={task.title} className="flex items-center justify-between p-3 rounded-md border hover:bg-muted/50">
                                                        <div className="flex items-center gap-3">
                                                            {getIcon(task.type)}
                                                            <div>
                                                                <p className="font-medium text-sm">{task.title}</p>
                                                                <p className="text-xs text-muted-foreground">Batas Waktu: {task.dueDate}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <Badge variant={task.status === "Belum Dikerjakan" ? "destructive" : "default"}>{task.status}</Badge>
                                                            <Link href={task.type === 'quiz' ? '/mhs-dashboard/smart-quiz/sistem-saraf' : '/mhs-dashboard/assignments/analisis-kasus'}>
                                                                <Button variant="outline" size="sm">
                                                                    {task.status === "Belum Dikerjakan" ? "Mulai" : "Lihat"}
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
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
