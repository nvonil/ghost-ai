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

interface RenameProjectDialogProps {
  open: boolean
  currentName: string
  name: string
  onNameChange: (name: string) => void
  onSubmit: () => void
  onClose: () => void
}

export function RenameProjectDialog({
  open,
  currentName,
  name,
  onNameChange,
  onSubmit,
  onClose,
}: RenameProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Rename Project</DialogTitle>
          <DialogDescription>
            Renaming <span className="font-medium text-foreground">{currentName}</span>
          </DialogDescription>
        </DialogHeader>
        <Input
          autoFocus
          placeholder="Project name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && name.trim()) onSubmit()
          }}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={!name.trim() || name === currentName} onClick={onSubmit}>
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
