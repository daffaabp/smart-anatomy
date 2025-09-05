import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Selamat Datang di Smart Anatomy</h1>
        <p className="text-muted-foreground text-lg">Platform Belajar Anatomi & Fisiologi Berbasis AI</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Portal Dosen</CardTitle>
            <CardDescription>Akses dasbor dosen untuk mengelola kelas, quiz, dan tugas.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dosen-dashboard">
              <Button className="w-full">
                Masuk sebagai Dosen <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Portal Mahasiswa</CardTitle>
            <CardDescription>Akses dasbor mahasiswa untuk belajar, mengerjakan quiz, dan tugas.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mhs-dashboard">
              <Button className="w-full" variant="secondary">
                Masuk sebagai Mahasiswa <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex gap-4">
        <Link href="/login" passHref>
          <Button variant="outline">Login</Button>
        </Link>
        <Link href="/register" passHref>
          <Button>Register</Button>
        </Link>
      </div>
    </div>
  );
}
