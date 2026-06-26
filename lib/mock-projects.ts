export interface MockProject {
  id: string
  name: string
  slug: string
  owned: boolean
}

export const mockProjects: MockProject[] = [
  { id: "1", name: "My First Project", slug: "my-first-project", owned: true },
  { id: "2", name: "Architecture Redesign", slug: "architecture-redesign", owned: true },
  { id: "3", name: "Team Shared Workspace", slug: "team-shared-workspace", owned: false },
]

export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
