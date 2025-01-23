import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our Web Application</h1>
      <div className="flex space-x-4">
        <Link href="/flow-editor">
          <Button>Go to Flow Editor</Button>
        </Link>
        <Link href="/releases">
          <Button>View Releases</Button>
        </Link>
      </div>
    </div>
  )
}

