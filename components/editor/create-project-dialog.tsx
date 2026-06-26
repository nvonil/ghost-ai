"use client"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CreateProjectDialogProps {
  open: boolean
  name: string
  slug: string
  onNameChange: (name: string) => void
  onSubmit: () => void
  onClose: () => void
}

export function CreateProjectDialog({
  open,
  name,
  slug,
  onNameChange,
  onSubmit,
  onClose,
}: CreateProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>
            Give your project a name to get started.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Input
            autoFocus
            placeholder="Project name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />
          {slug && (
            <p className="text-xs text-muted-foreground">
              Slug:{" "}
              <span className="font-mono">{slug}</span>
            </p>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={!name.trim()} onClick={onSubmit}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
