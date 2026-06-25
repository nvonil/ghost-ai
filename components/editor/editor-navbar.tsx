"use client"

import { PanelLeftOpen, PanelLeftClose } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EditorNavbarProps {
  isSidebarOpen: boolean
  onSidebarToggle: () => void
  className?: string
}

export function EditorNavbar({
  isSidebarOpen,
  onSidebarToggle,
  className,
}: EditorNavbarProps) {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 flex h-12 items-center bg-background border-b border-border",
        className
      )}
    >
      <div className="flex items-center px-2">
        <Button variant="ghost" size="icon" onClick={onSidebarToggle}>
          {isSidebarOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>
      <div className="flex-1" />
      <div className="flex items-center px-3">
        <UserButton />
      </div>
    </header>
  )
}
