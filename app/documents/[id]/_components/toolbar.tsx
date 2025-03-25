"use client"
import { cn } from "@/lib/utils"
import { useEditorStore } from "@/store/use-editor-store"
import { LucideIcon, Redo2Icon, Undo2Icon } from "lucide-react"

interface ToolBarButtonProps {
  onClick?: () => void
  isActive?: boolean
  icon: LucideIcon
}

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolBarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80"
      )}
    >
      <Icon className="size-4" />
    </button>
  )
}

const Toolbar = () => {
  //
  const { editor } = useEditorStore()
  console.log("Tool bar editro ", editor)

  // Tools Section
  // Matrix of tools: 2D array
  const sections: {
    label: string
    icon: LucideIcon
    onClick: () => void
    isActive?: boolean
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
    ],
  ]

  return (
    // Scroll on mobile
    <div className="bg-[#f1f4f9] px-2.5 py-0.5 rounded-3xl min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto ">
      {sections[0].map((item) => (
        <ToolbarButton
          key={item.label}
          onClick={item.onClick}
          isActive={item.isActive}
          icon={item.icon}
        />
      ))}
    </div>
  )
}

export default Toolbar
