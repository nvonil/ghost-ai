import { SignIn } from "@clerk/nextjs"
import { FileText, Users, Zap } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "AI Writing Assistance",
    description: "Draft, expand, and refine your content with AI in real time.",
  },
  {
    icon: FileText,
    title: "Project & Draft Management",
    description: "Organize everything into projects your whole team can access.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Share canvases, leave comments, and co-write in one place.",
  },
]

export default function SignInPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-card p-12">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-sidebar-primary shrink-0" />
          <span className="font-semibold text-foreground">Ghost AI</span>
        </div>

        <div>
          <h1 className="font-heading text-5xl font-bold leading-tight text-foreground">
            Write at the<br />speed of thought.
          </h1>
          <p className="mt-4 text-base text-muted-foreground max-w-sm">
            Describe your idea in plain English. Ghost AI drafts, organizes,
            and refines it on a shared canvas your whole team can edit.
          </p>
          <ul className="mt-10 space-y-6">
            {features.map((f) => (
              <li key={f.title} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-sidebar-primary/20 flex items-center justify-center shrink-0">
                  <f.icon className="w-4 h-4 text-sidebar-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{f.title}</p>
                  <p className="text-sm text-muted-foreground">{f.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-muted-foreground">
          © 2026 Ghost AI. All rights reserved.
        </p>
      </div>

      <div className="flex items-center justify-center bg-background p-8">
        <SignIn />
      </div>
    </div>
  )
}
