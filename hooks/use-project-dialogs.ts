"use client"

import { useState } from "react"
import type { MockProject } from "@/lib/mock-projects"
import { toSlug } from "@/lib/mock-projects"

type DialogType = "create" | "rename" | "delete" | null

interface CreateForm {
  name: string
  slug: string
}

interface RenameForm {
  name: string
}

export function useProjectDialogs() {
  const [dialog, setDialog] = useState<DialogType>(null)
  const [targetProject, setTargetProject] = useState<MockProject | null>(null)
  const [loading, setLoading] = useState(false)
  const [createForm, setCreateForm] = useState<CreateForm>({ name: "", slug: "" })
  const [renameForm, setRenameForm] = useState<RenameForm>({ name: "" })

  function openCreate() {
    setCreateForm({ name: "", slug: "" })
    setDialog("create")
  }

  function openRename(project: MockProject) {
    setTargetProject(project)
    setRenameForm({ name: project.name })
    setDialog("rename")
  }

  function openDelete(project: MockProject) {
    setTargetProject(project)
    setDialog("delete")
  }

  function closeDialog() {
    setDialog(null)
    setTargetProject(null)
    setLoading(false)
  }

  function updateCreateName(name: string) {
    setCreateForm({ name, slug: toSlug(name) })
  }

  function updateRenameName(name: string) {
    setRenameForm({ name })
  }

  return {
    dialog,
    targetProject,
    loading,
    createForm,
    renameForm,
    openCreate,
    openRename,
    openDelete,
    closeDialog,
    updateCreateName,
    updateRenameName,
  }
}
