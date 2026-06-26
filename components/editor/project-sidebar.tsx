"use client"

import { X, Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import type { MockProject } from "@/lib/mock-projects"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
  projects: MockProject[]
  onNewProject: () => void
  onRename: (project: MockProject) => void
  onDelete: (project: MockProject) => void
}

function ProjectItem({
  project,
  onRename,
  onDelete,
}: {
  project: MockProject
  onRename: () => void
  onDelete: () => void
}) {
  return (
    <div className="group flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-muted">
      <span className="truncate text-sm">{project.name}</span>
      <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={(e) => { e.stopPropagation(); onRename() }}
        >
          <Pencil />
          <span className="sr-only">Rename</span>
        </Button>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={(e) => { e.stopPropagation(); onDelete() }}
        >
          <Trash2 className="text-destructive" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </div>
  )
}

export function ProjectSidebar({
  isOpen,
  onClose,
  projects,
  onNewProject,
  onRename,
  onDelete,
}: ProjectSidebarProps) {
  const ownedProjects = projects.filter((p) => p.owned)
  const sharedProjects = projects.filter((p) => !p.owned)

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 sm:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
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

          <TabsContent value="my-projects" className="mt-2 flex-1 overflow-y-auto">
            {ownedProjects.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted-foreground">No projects yet</p>
              </div>
            ) : (
              <div className="flex flex-col gap-0.5">
                {ownedProjects.map((project) => (
                  <ProjectItem
                    key={project.id}
                    project={project}
                    onRename={() => onRename(project)}
                    onDelete={() => onDelete(project)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="shared" className="mt-2 flex-1 overflow-y-auto">
            {sharedProjects.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-muted-foreground">No shared projects</p>
              </div>
            ) : (
              <div className="flex flex-col gap-0.5">
                {sharedProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center rounded-lg px-2 py-1.5 hover:bg-muted"
                  >
                    <span className="truncate text-sm">{project.name}</span>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="p-3 border-t border-border">
          <Button variant="outline" className="w-full" onClick={onNewProject}>
            <Plus />
            New Project
          </Button>
        </div>
      </aside>
    </>
  )
}
