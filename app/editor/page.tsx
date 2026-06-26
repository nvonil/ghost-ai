"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import { CreateProjectDialog } from "@/components/editor/create-project-dialog"
import { RenameProjectDialog } from "@/components/editor/rename-project-dialog"
import { DeleteProjectDialog } from "@/components/editor/delete-project-dialog"
import { Button } from "@/components/ui/button"
import { useProjectDialogs } from "@/hooks/use-project-dialogs"
import { mockProjects, toSlug } from "@/lib/mock-projects"
import type { MockProject } from "@/lib/mock-projects"

export default function EditorPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [projects, setProjects] = useState<MockProject[]>(mockProjects)
  const dialogs = useProjectDialogs()

  function handleCreate() {
    const { name, slug } = dialogs.createForm
    setProjects((prev) => [
      ...prev,
      { id: Date.now().toString(), name, slug, owned: true },
    ])
    dialogs.closeDialog()
  }

  function handleRename() {
    const { name } = dialogs.renameForm
    setProjects((prev) =>
      prev.map((p) =>
        p.id === dialogs.targetProject?.id
          ? { ...p, name, slug: toSlug(name) }
          : p
      )
    )
    dialogs.closeDialog()
  }

  function handleDelete() {
    setProjects((prev) =>
      prev.filter((p) => p.id !== dialogs.targetProject?.id)
    )
    dialogs.closeDialog()
  }

  return (
    <div className="h-screen bg-background">
      <EditorNavbar
        isSidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen((v) => !v)}
      />
      <ProjectSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        projects={projects}
        onNewProject={dialogs.openCreate}
        onRename={dialogs.openRename}
        onDelete={dialogs.openDelete}
      />
      <main className="pt-12">
        <div className="flex h-[calc(100vh-3rem)] flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-xl font-semibold">
            Create a project or open an existing one
          </h1>
          <p className="max-w-sm text-sm text-muted-foreground">
            Start a new architecture workspace, or choose a project from the sidebar
          </p>
          <Button onClick={dialogs.openCreate}>
            <Plus />
            New Project
          </Button>
        </div>
      </main>

      <CreateProjectDialog
        open={dialogs.dialog === "create"}
        name={dialogs.createForm.name}
        slug={dialogs.createForm.slug}
        onNameChange={dialogs.updateCreateName}
        onSubmit={handleCreate}
        onClose={dialogs.closeDialog}
      />
      <RenameProjectDialog
        open={dialogs.dialog === "rename"}
        currentName={dialogs.targetProject?.name ?? ""}
        name={dialogs.renameForm.name}
        onNameChange={dialogs.updateRenameName}
        onSubmit={handleRename}
        onClose={dialogs.closeDialog}
      />
      <DeleteProjectDialog
        open={dialogs.dialog === "delete"}
        projectName={dialogs.targetProject?.name ?? ""}
        onConfirm={handleDelete}
        onClose={dialogs.closeDialog}
      />
    </div>
  )
}
