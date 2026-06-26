import { EditorHome } from "@/components/editor/editor-home"
import { getProjects } from "@/lib/projects"

export default async function EditorPage() {
  const { owned, shared } = await getProjects()
  return <EditorHome ownedProjects={owned} sharedProjects={shared} />
}
