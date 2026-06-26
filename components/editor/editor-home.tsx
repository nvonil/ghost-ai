"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import { CreateProjectDialog } from "@/components/editor/create-project-dialog"
import { RenameProjectDialog } from "@/components/editor/rename-project-dialog"
import { DeleteProjectDialog } from "@/components/editor/delete-project-dialog"
import { Button } from "@/components/ui/button"
import { useProjectActions } from "@/hooks/use-project-actions"
import type { Project } from "@/lib/projects"

interface EditorHomeProps {
  ownedProjects: Project[]
  sharedProjects: Project[]
}

export function EditorHome({ ownedProjects, sharedProjects }: EditorHomeProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const actions = useProjectActions()

  return (
    <div className="h-screen bg-background">
      <EditorNavbar
        isSidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen((v) => !v)}
      />
      <ProjectSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        ownedProjects={ownedProjects}
        sharedProjects={sharedProjects}
        onNewProject={actions.openCreate}
        onRename={actions.openRename}
        onDelete={actions.openDelete}
      />
      <main className="pt-12">
        <div className="flex h-[calc(100vh-3rem)] flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-xl font-semibold">
            Create a project or open an existing one
          </h1>
          <p className="max-w-sm text-sm text-muted-foreground">
            Start a new architecture workspace, or choose a project from the sidebar
          </p>
          <Button onClick={actions.openCreate}>
            <Plus />
            New Project
          </Button>
        </div>
      </main>

      <CreateProjectDialog
        open={actions.dialog === "create"}
        name={actions.createForm.name}
        roomId={actions.createForm.roomId}
        onNameChange={actions.updateCreateName}
        onSubmit={actions.handleCreate}
        onClose={actions.closeDialog}
        loading={actions.loading}
      />
      <RenameProjectDialog
        open={actions.dialog === "rename"}
        currentName={actions.targetProject?.name ?? ""}
        name={actions.renameForm.name}
        onNameChange={actions.updateRenameName}
        onSubmit={actions.handleRename}
        onClose={actions.closeDialog}
        loading={actions.loading}
      />
      <DeleteProjectDialog
        open={actions.dialog === "delete"}
        projectName={actions.targetProject?.name ?? ""}
        onConfirm={actions.handleDelete}
        onClose={actions.closeDialog}
        loading={actions.loading}
      />
    </div>
  )
}
