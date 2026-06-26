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
  roomId: string
  onNameChange: (name: string) => void
  onSubmit: () => void
  onClose: () => void
  loading?: boolean
}

export function CreateProjectDialog({
  open,
  name,
  roomId,
  onNameChange,
  onSubmit,
  onClose,
  loading,
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
            onKeyDown={(e) => {
              if (e.key === "Enter" && name.trim() && !loading) onSubmit()
            }}
          />
          {roomId && (
            <p className="text-xs text-muted-foreground">
              Room ID:{" "}
              <span className="font-mono">{roomId}</span>
            </p>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
          </DialogClose>
          <Button disabled={!name.trim() || loading} onClick={onSubmit}>
            {loading ? "Creating…" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
