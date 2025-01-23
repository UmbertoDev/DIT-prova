"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Bell, Globe, Menu, User } from "lucide-react"

export default function Navbar() {
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false)

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100">
      <div className="flex items-center">
        <img src="/logo.svg" alt="Logo" className="h-8 w-8 mr-4" />
      </div>

      <div className="flex space-x-4">
        <Link href="/">
          <Button variant="ghost">Home</Button>
        </Link>
        <Link href="/flow-editor">
          <Button variant="ghost">Flow Editor</Button>
        </Link>
        <Link href="/releases">
          <Button variant="ghost">Releases</Button>
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <Sheet open={isRightPanelOpen} onOpenChange={setIsRightPanelOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <h2 className="text-lg font-semibold mb-4">Right Panel</h2>
            <p>This is the content of the right panel.</p>
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Notification 1</DropdownMenuItem>
            <DropdownMenuItem>Notification 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Globe className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Italiano</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

