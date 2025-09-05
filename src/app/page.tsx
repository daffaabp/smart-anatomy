import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, GraduationCap } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="text-center mb-8">
        <GraduationCap className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-primary mb-2">Selamat Datang di Smart Anatomy</h1>
        <p className="text-muted-foreground text-lg">Platform Belajar Anatomi & Fisiologi Berbasis AI</p>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-2">
          Silakan masuk untuk mengakses dasbor Anda atau daftar jika Anda seorang mahasiswa baru.
        </p>
      </div>

      <div className="flex gap-4">
        <Link href="/login" passHref>
          <Button size="lg">Login</Button>
        </Link>
        <Link href="/register" passHref>
          <Button size="lg" variant="outline">Register (Mahasiswa)</Button>
        </Link>
      </div>
      
      <div className="mt-12 text-center text-muted-foreground text-sm">
        <p>Prototype Quick Access:</p>
        <div className="flex gap-4 justify-center mt-2">
            <Link href="/dosen-dashboard" className="underline">Dasbor Dosen</Link>
            <Link href="/mhs-dashboard" className="underline">Dasbor Mahasiswa</Link>
        </div>
      </div>
    </div>
  );
}
