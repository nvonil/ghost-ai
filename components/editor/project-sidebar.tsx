"use client"

import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <aside
      className={cn(
        "fixed top-12 left-0 z-50 flex h-[calc(100vh-3rem)] w-64 flex-col bg-card border-r border-border transition-transform duration-200 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h2 className="text-sm font-semibold">Projects</h2>
        <Button variant="ghost" size="icon-sm" onClick={onClose}>
          <X />
          <span className="sr-only">Close sidebar</span>
        </Button>
      </div>

      <Tabs defaultValue="my-projects" className="flex flex-1 flex-col overflow-hidden p-3">
        <TabsList className="w-full">
          <TabsTrigger value="my-projects" className="flex-1">
            My Projects
          </TabsTrigger>
          <TabsTrigger value="shared" className="flex-1">
            Shared
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="my-projects"
          className="flex flex-1 items-center justify-center"
        >
          <p className="text-sm text-muted-foreground">No projects yet</p>
        </TabsContent>
        <TabsContent
          value="shared"
          className="flex flex-1 items-center justify-center"
        >
          <p className="text-sm text-muted-foreground">No shared projects</p>
        </TabsContent>
      </Tabs>

      <div className="p-3 border-t border-border">
        <Button variant="outline" className="w-full">
          <Plus />
          New Project
        </Button>
      </div>
    </aside>
  )
}
