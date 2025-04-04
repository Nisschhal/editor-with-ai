"use client"
import { cn } from "@/lib/utils"
import { useEditorStore } from "@/store/use-editor-store"
import { type Level } from "@tiptap/extension-heading"

import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheck2Icon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react"

interface ToolBarButtonProps {
  onClick?: () => void
  isActive?: boolean
  icon: LucideIcon
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from "lucide-react"
import { SelectSeparator } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"

// Font Family button

const FontFamilyButton = () => {
  const { editor } = useEditorStore()
  const [currentFont, setCurrentFont] = useState("Arial")

  // list of available fonts
  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Verdana", value: "Verdana" }, // typo fix
  ]

  // look out for any changes in editor settings
  useEffect(() => {
    if (!editor) return

    const updateFontFamily = () => {
      const font = editor.getAttributes("textStyle")?.fontFamily || "Arial"
      setCurrentFont(font)
    }

    // Run once to initialize
    updateFontFamily()

    // Listen for editor changes
    editor.on("transaction", updateFontFamily)

    return () => {
      editor.off("transaction", updateFontFamily)
    }
  }, [editor])

  return (
    <div className="p-2">
      {" "}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200">
            <span className="truncate" style={{ fontFamily: currentFont }}>
              {currentFont}
            </span>
            <ChevronDownIcon className="ml-2 size-4 shrink-0" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
          {fonts.map(({ label, value }) => (
            <button
              onClick={() => {
                editor?.chain().focus().setFontFamily(value).run()
                setCurrentFont(value) // Optional: optimistically update faster
              }}
              key={value}
              className={cn(
                "flex items-center gap-x-2 px-2 py-2 rounded-sm hover:bg-neutral-200/80",
                currentFont === value && "bg-neutral-200/80"
              )}
              style={{ fontFamily: value }}
            >
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

// const FontSizeButton = () => {
//   const { editor } = useEditorStore()
//   const [currentFontSize, setCurrentFontSize] = useState("16px") // default fallback

//   const fontSizes = [
//     { label: "12px", value: "12px" },
//     { label: "14px", value: "14px" },
//     { label: "16px", value: "16px" },
//     { label: "18px", value: "18px" },
//     { label: "24px", value: "24px" },
//     { label: "32px", value: "32px" },
//   ]

//   useEffect(() => {
//     if (!editor) return

//     const updateFontSize = () => {
//       const size = editor.getAttributes("textStyle")?.fontSize || "16px"
//       setCurrentFontSize(size)
//     }

//     updateFontSize() // initialize
//     editor.on("transaction", updateFontSize)

//     return () => {
//       editor.off("transaction", updateFontSize)
//     }
//   }, [editor])

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <button className="h-7 w-[100px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200">
//           <span className="truncate">{currentFontSize}</span>
//           <ChevronDownIcon className="ml-2 size-4 shrink-0" />
//         </button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
//         {fontSizes.map(({ label, value }) => (
//           <button
//             key={value}
//             onClick={() => {
//               editor?.chain().focus().setFontSize(value).run()
//               setCurrentFontSize(value)
//             }}
//             className={cn(
//               "flex items-center gap-x-2 px-2 py-2 rounded-sm hover:bg-neutral-200/80",
//               currentFontSize === value && "bg-neutral-200/80"
//             )}
//             style={{ fontSize: value }}
//           >
//             <span className="text-sm">{label}</span>
//           </button>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }

const HeadingsButton = () => {
  const { editor } = useEditorStore()
  const [currentHeading, setCurrentHeading] = useState("Normal Text")

  const headings = [
    { label: "Normal Text", value: 0, fontSize: "16px" },
    { label: "Heading 1", value: 1, fontSize: "32px" },
    { label: "Heading 2", value: 2, fontSize: "24px" },
    { label: "Heading 3", value: 3, fontSize: "20px" },
    { label: "Heading 4", value: 4, fontSize: "18px" },
    { label: "Heading 5", value: 5, fontSize: "16px" },
  ]

  // Effect to track active heading level
  useEffect(() => {
    if (!editor) return

    const updateHeading = () => {
      for (let i = 1; i <= 5; i++) {
        if (editor.isActive("heading", { level: i })) {
          setCurrentHeading(`Heading ${i}`)
          return
        }
      }
      setCurrentHeading("Normal Text")
    }

    updateHeading()
    editor.on("transaction", updateHeading)

    return () => {
      editor.off("transaction", updateHeading)
    }
  }, [editor])

  return (
    <div className="p-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-7 w-[140px] flex items-center justify-between rounded-sm hover:bg-neutral-200">
            <span className="truncate">{currentHeading}</span>
            <ChevronDownIcon className="ml-2 size-4 shrink-0" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
          {headings.map(({ label, value, fontSize }) => (
            <button
              key={value}
              onClick={() => {
                if (value === 0) {
                  editor?.chain().focus().setParagraph().run()
                } else {
                  editor
                    ?.chain()
                    .focus()
                    .toggleHeading({ level: value as Level })
                    .run()
                }
              }}
              className={cn(
                "flex items-center gap-x-2 px-2 py-2 rounded-sm hover:bg-neutral-200/80",
                (value === 0 && !editor?.isActive("heading")) ||
                  (editor?.isActive("heading", { level: value }) &&
                    "bg-neutral-200/80")
              )}
            >
              <span className="text-sm" style={{ fontSize }}>
                {label}
              </span>
            </button>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
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
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          // get spellcheck attribute
          const current = editor?.view.dom.getAttribute("spellcheck")
          // check and set attribute to true
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          )
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        onClick: () => console.log("Todo: Comment"),
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
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
      <Separator orientation="vertical" className="h-6! w-1 bg-black border" />
      {/* Font Family */}
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6! w-1 bg-black border" />
      {/* TODO: Headings */}
      <HeadingsButton />
      <Separator orientation="vertical" className="h-6! w-1 bg-black border" />
      {/* TODO: Font Size */}
      <Separator orientation="vertical" className="h-6! w-1 bg-black border" />

      {sections[1].map((item) => (
        <ToolbarButton
          key={item.label}
          onClick={item.onClick}
          isActive={item.isActive}
          icon={item.icon}
        />
      ))}
      <Separator orientation="vertical" className="h-6! w-1 bg-black border" />

      {/* TODO: Text color */}
      {/* TODO: Image */}
      {/* TODO: Text Alignment */}
      {/* TODO: Line Height */}
      {/* TODO: list */}

      {/* Comment | Todo List | UnFormat Style */}
      {sections[2].map((item) => (
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
