"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toSlug } from "@/lib/mock-projects"
import type { Project } from "@/lib/projects"

type DialogType = "create" | "rename" | "delete" | null

function randomSuffix() {
  return Math.random().toString(36).slice(2, 7)
}

export function useProjectActions(activeProjectId?: string) {
  const router = useRouter()
  const [dialog, setDialog] = useState<DialogType>(null)
  const [targetProject, setTargetProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(false)
  const [createForm, setCreateForm] = useState({ name: "", roomId: "" })
  const [renameForm, setRenameForm] = useState({ name: "" })

  function openCreate() {
    setCreateForm({ name: "", roomId: "" })
    setDialog("create")
  }

  function openRename(project: Project) {
    setTargetProject(project)
    setRenameForm({ name: project.name })
    setDialog("rename")
  }

  function openDelete(project: Project) {
    setTargetProject(project)
    setDialog("delete")
  }

  function closeDialog() {
    setDialog(null)
    setTargetProject(null)
    setLoading(false)
  }

  function updateCreateName(name: string) {
    const slug = toSlug(name)
    setCreateForm({ name, roomId: slug ? `${slug}-${randomSuffix()}` : "" })
  }

  function updateRenameName(name: string) {
    setRenameForm({ name })
  }

  async function handleCreate() {
    const { name, roomId } = createForm
    if (!name.trim()) return
    setLoading(true)
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), id: roomId || undefined }),
    })
    if (!res.ok) {
      setLoading(false)
      return
    }
    const project = await res.json()
    closeDialog()
    router.push(`/editor/${project.id}`)
  }

  async function handleRename() {
    if (!targetProject) return
    const { name } = renameForm
    if (!name.trim() || name === targetProject.name) return
    setLoading(true)
    const res = await fetch(`/api/projects/${targetProject.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim() }),
    })
    setLoading(false)
    if (!res.ok) return
    closeDialog()
    router.refresh()
  }

  async function handleDelete() {
    if (!targetProject) return
    setLoading(true)
    const res = await fetch(`/api/projects/${targetProject.id}`, {
      method: "DELETE",
    })
    setLoading(false)
    if (!res.ok) return
    const wasActive = targetProject.id === activeProjectId
    closeDialog()
    if (wasActive) {
      router.push("/editor")
    } else {
      router.refresh()
    }
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
    handleCreate,
    handleRename,
    handleDelete,
  }
}
