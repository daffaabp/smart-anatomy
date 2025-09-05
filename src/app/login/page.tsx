import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap } from "lucide-react"

export default function LoginPage() {
  // In a real app, you'd have a state for role selection
  // or determine the role after successful login.
  // For this prototype, we'll keep it simple.
  const handleLogin = () => {
    // Here you would add your authentication logic.
    // Based on the user's role, you would redirect them.
    // e.g., if (user.role === 'dosen') router.push('/dosen-dashboard')
    // else router.push('/mhs-dashboard')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
                <GraduationCap className="h-10 w-10 text-primary" />
            </div>
          <CardTitle className="text-2xl">Login ke Smart Anatomy</CardTitle>
          <CardDescription>
            Masukkan email dan password untuk mengakses dasbor Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                defaultValue="dosen@example.com"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Lupa password?
                </Link>
              </div>
              <Input id="password" type="password" required defaultValue="password" />
            </div>
            {/* The Link will be replaced by the form's submit action */}
            <Link href="/dosen-dashboard" passHref>
              <Button type="submit" className="w-full">
                Login sebagai Dosen
              </Button>
            </Link>
             <Link href="/mhs-dashboard" passHref>
              <Button type="submit" className="w-full" variant="secondary">
                Login sebagai Mahasiswa
              </Button>
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            Belum punya akun?{" "}
            <Link href="/register" className="underline">
              Register sebagai Mahasiswa
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
