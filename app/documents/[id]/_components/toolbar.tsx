"use client"
import { cn } from "@/lib/utils"
import { useEditorStore } from "@/store/use-editor-store"
import { type Level } from "@tiptap/extension-heading"

import {
  AlignCenter,
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRight,
  AlignRightIcon,
  BoldIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  Link2Icon,
  List,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  MinusIcon,
  PlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SearchIcon,
  SpellCheck2Icon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon,
  UploadIcon,
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
import { CirclePicker, ColorResult, SketchPicker } from "react-color"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { parse } from "path"
import { set } from "date-fns"

const ListButton = () => {
  const { editor } = useEditorStore()
  const lists = [
    {
      name: "Bullet List",
      icon: ListIcon,
      isActive: editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      name: "Ordered List",
      icon: ListOrderedIcon,
      isActive: editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex flex-col gap-x-2 p-2 rounded-sm hover:bg-neutral-200/80">
          <ListIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex gap-2 flex-col">
        {lists.map(({ name, icon: Icon, isActive, onClick }) => (
          <DropdownMenuItem
            key={name}
            onClick={onClick}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              isActive && "bg-neutral-200/80"
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Color
const TextColorButton = () => {
  const { editor } = useEditorStore()
  const [currentColor, setCurrentColor] = useState("#000")

  const value = editor?.getAttributes("textStyle").color || "#000"

  const onChange = (color: ColorResult) => {
    setCurrentColor(color.hex)
    editor?.chain().focus().setColor(color.hex).run()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex flex-col gap-x-2 p-2 rounded-sm hover:bg-neutral-200/80">
          <span className="text-sm">A</span>
          <span
            className="h-0.5 w-4 "
            style={{ backgroundColor: currentColor }}
          ></span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <SketchPicker color={currentColor} onChange={onChange} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// HighLight Color
const HightLightColorButton = () => {
  const { editor } = useEditorStore()
  const [currentColor, setCurrentColor] = useState("#fff")

  const value = editor?.getAttributes("hightlight").color || currentColor

  const onChange = (color: ColorResult) => {
    setCurrentColor(color.hex)
    editor?.chain().focus().setHighlight({ color: currentColor }).run()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex flex-col gap-x-2 p-2 rounded-sm hover:bg-neutral-200/80">
          <HighlighterIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <SketchPicker color={currentColor} onChange={onChange} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
// Align Button
const AlignButton = () => {
  const { editor } = useEditorStore()

  const alignments = [
    { label: "Align Left", value: "left", icon: AlignLeftIcon },
    { label: "Align Center", value: "center", icon: AlignCenterIcon },
    { label: "Align Right", value: "right", icon: AlignRightIcon },
    { label: "Align Justify", value: "justify", icon: AlignJustifyIcon },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex flex-col gap-x-2 p-2 rounded-sm hover:bg-neutral-200/80">
          <AlignCenterIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex gap-2 flex-col">
        {alignments.map(({ label, value, icon: Icon }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neurtal-200/80",
              editor?.isActive({ textAlign: value }) && "bg-neutral-200/80"
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
// Line Height Button
const LineHeightButton = () => {
  const { editor } = useEditorStore()

  const alignments = [
    { label: "Default", value: "normal" },
    { label: "Single", value: "1" },
    { label: "1.15", value: "1.15" },
    { label: "1.5", value: "1.5" },
    { label: "Double", value: "2" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex flex-col gap-x-2 p-2 rounded-sm hover:bg-neutral-200/80">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.78233 2.21713C3.70732 2.14212 3.60557 2.09998 3.49949 2.09998C3.3934 2.09998 3.29166 2.14212 3.21664 2.21713L1.21664 4.21713C1.06044 4.37334 1.06044 4.62661 1.21664 4.78282C1.37285 4.93903 1.62612 4.93903 1.78233 4.78282L3.09949 3.46566L3.09949 11.5343L1.78233 10.2171C1.62612 10.0609 1.37285 10.0609 1.21664 10.2171C1.06043 10.3733 1.06043 10.6266 1.21664 10.7828L3.21664 12.7828C3.29166 12.8578 3.3934 12.9 3.49949 12.9C3.60557 12.9 3.70731 12.8578 3.78233 12.7828L5.78233 10.7828C5.93854 10.6266 5.93854 10.3733 5.78233 10.2171C5.62612 10.0609 5.37285 10.0609 5.21664 10.2171L3.89949 11.5343L3.89949 3.46566L5.21664 4.78282C5.37285 4.93903 5.62612 4.93903 5.78233 4.78282C5.93854 4.62661 5.93854 4.37334 5.78233 4.21713L3.78233 2.21713ZM8.49998 3.99997C8.22383 3.99997 7.99998 4.22382 7.99998 4.49997C7.99998 4.77611 8.22383 4.99997 8.49998 4.99997H14.5C14.7761 4.99997 15 4.77611 15 4.49997C15 4.22382 14.7761 3.99997 14.5 3.99997H8.49998ZM7.99998 7.49997C7.99998 7.22382 8.22383 6.99997 8.49998 6.99997H14.5C14.7761 6.99997 15 7.22382 15 7.49997C15 7.77611 14.7761 7.99997 14.5 7.99997H8.49998C8.22383 7.99997 7.99998 7.77611 7.99998 7.49997ZM8.49998 9.99997C8.22383 9.99997 7.99998 10.2238 7.99998 10.5C7.99998 10.7761 8.22383 11 8.49998 11H14.5C14.7761 11 15 10.7761 15 10.5C15 10.2238 14.7761 9.99997 14.5 9.99997H8.49998Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex gap-2 flex-col">
        {alignments.map(({ label, value }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => editor?.chain().focus().setLineHeight(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neurtal-200/80",
              editor?.getAttributes("paragraph").lineHeight === value &&
                "bg-neutral-200/80"
            )}
          >
            <span className="text-sm">{label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Link URL
const InsertLinkButton = () => {
  const { editor } = useEditorStore()
  const [href, setHref] = useState(editor?.getAttributes("link").href || "")

  const onChange = (value: string) => {
    editor?.chain().extendMarkRange("link").setLink({ href }).run()
    setHref("")
  }

  return (
    <DropdownMenu
      //  get the selected link href
      onOpenChange={(open) => {
        if (open) {
          setHref(editor?.getAttributes("link").href || "")
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className="flex flex-col gap-x-2 p-2 rounded-sm hover:bg-neutral-200/80">
          <Link2Icon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex gap-2">
        <Input
          value={href}
          onChange={(e) => {
            setHref(e.target.value)
          }}
          placeholder="https://www.google.com"
        />
        <Button onClick={(e) => onChange(href)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Image URL
const ImageLinkButton = () => {
  const { editor } = useEditorStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState("")

  // function to set the image into the editor
  const onChange = (src: string) => {
    editor?.chain().setImage({ src }).run()
  }

  const onUpload = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0] // get the target.file

      // if there is a file
      if (file) {
        // get the image url from the file
        const imageUrl = URL.createObjectURL(file)
        // set the image url in editor
        onChange(imageUrl)
      }
    }
    // trigger the input
    input.click()
  }

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl)
      setImageUrl("")
      setIsDialogOpen(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex flex-col gap-x-2 p-2 rounded-sm hover:bg-neutral-200/80">
            <ImageIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col gap-2">
          <DropdownMenuItem onClick={onUpload}>
            <UploadIcon className="size-4" />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <SearchIcon className="size-4" />
            Paste image Url
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Insert Image URL</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Insert image URL (e.g., https://example.com/image.jpg)"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleImageUrlSubmit()
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

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

const FontSizeButton = () => {
  const { editor } = useEditorStore()

  const [currentFontSize, setCurrentFontSize] = useState(
    editor?.getAttributes("textStyle")?.fontSize?.replace("px", "") || "16" // Fixed initial value logic
  )
  const [fontSize, setFontSize] = useState(currentFontSize)
  const [inputValue, setInputValue] = useState(fontSize)
  const [isEditing, setIsEditing] = useState(false)

  // Update font size
  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize)
    if (!isNaN(size)) {
      editor?.chain().focus().setFontSize(`${size}px`).run()
      setFontSize(newSize)
      setCurrentFontSize(newSize) // Sync currentFontSize
      setInputValue(newSize)
      setIsEditing(false)
    }
  }

  // Handle input change (fixed typo)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  // Handle input blur
  const handleInputBlur = () => {
    updateFontSize(inputValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      updateFontSize(inputValue)
      editor?.commands.focus()
    }
  }

  const increment = () => {
    const newSize = parseInt(fontSize) + 1 // Use fontSize instead of currentFontSize
    updateFontSize(newSize.toString())
  }

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1 // Use fontSize instead of currentFontSize
    updateFontSize(newSize.toString())
  }

  const fontSizes = [
    { label: "12px", value: "12px" },
    { label: "14px", value: "14px" },
    { label: "16px", value: "16px" },
    { label: "18px", value: "18px" },
    { label: "24px", value: "24px" },
    { label: "32px", value: "32px" },
  ]

  // Sync with editor state
  useEffect(() => {
    if (!editor) return

    const updateFontSizeFromEditor = () => {
      const size =
        editor.getAttributes("textStyle")?.fontSize?.replace("px", "") || "16"
      setCurrentFontSize(size)
      setFontSize(size)
      setInputValue(size)
    }

    updateFontSizeFromEditor() // Initialize
    editor.on("transaction", updateFontSizeFromEditor)

    return () => {
      editor.off("transaction", updateFontSizeFromEditor)
    }
  }, [editor])

  return (
    <div className="flex  items-center gap-x-1">
      <button
        onClick={decrement}
        className="size-7  flex justify-center items-center rounded-sm hover:bg-neutral-200/80"
      >
        <MinusIcon className="h-4 w-4" />
      </button>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange} // Fixed typo
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent focus:outline-none focus:ring-0"
        />
      ) : (
        <button
          onClick={() => {
            setIsEditing(true)
            setFontSize(currentFontSize)
          }}
          className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm hover:bg-neutral-200/80"
        >
          {fontSize} {/* Display fontSize instead of currentFontSize */}
        </button>
      )}
      <button className="size-7  flex justify-center items-center rounded-sm hover:bg-neutral-200/80">
        <PlusIcon className="h-4 w-4" onClick={increment} />
      </button>
    </div>
  )
}
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
      {/* Font size */}
      <FontSizeButton />
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
      <TextColorButton />
      <HightLightColorButton />
      <InsertLinkButton />

      {/* TODO: Image */}
      <ImageLinkButton />
      {/* TODO: Text Alignment */}
      <AlignButton />
      {/* TODO: Line Height */}
      <LineHeightButton />
      {/* TODO: list */}
      <ListButton />

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
