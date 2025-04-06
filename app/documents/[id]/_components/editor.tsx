"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
// Extensions
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import Table from "@tiptap/extension-table"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import TableRow from "@tiptap/extension-table-row"
import Image from "@tiptap/extension-image"
import ImageResize from "tiptap-extension-resize-image"
import FontFamily from "@tiptap/extension-font-family"
import TextStyle from "@tiptap/extension-text-style"
import Text from "@tiptap/extension-text"
import Underline from "@tiptap/extension-underline"
import Highlight from "@tiptap/extension-highlight"
import { Color } from "@tiptap/extension-color"
import Link from "@tiptap/extension-link"

import TextAlign from "@tiptap/extension-text-align"

import { useEditorStore } from "@/store/use-editor-store"
import { useState, useCallback } from "react"
import { FontSizeExtension } from "@/extensions/font-size"
import { LineHeightExtension } from "@/extensions/line-height"
const Tiptap = () => {
  const { setEditor } = useEditorStore()
  const [isDragging, setIsDragging] = useState(false) // For visual feedback

  const editor = useEditor({
    onCreate({ editor }) {
      setEditor(editor)
    },
    editorProps: {
      attributes: {
        style: "padding-left:56px; padding-right:56px;",
        class:
          "focus:outline-none print:border-0 bg-white border border-[#c7c7c7] rounded-sm flex flex-col min-h-[1054] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    extensions: [
      StarterKit,
      FontFamily,
      Text,
      TextStyle,
      TaskList,
      FontSizeExtension,
      LineHeightExtension,
      TaskItem.configure({ nested: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      ImageResize,
      Underline,
      Highlight.configure({ multicolor: true }),
      Color,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: `
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th colspan="3">Description</th>
          </tr>
          <tr>
            <td>Cyndi Lauper</td>
            <td>Singer</td>
            <td>Songwriter</td>
            <td>Actress</td>
          </tr>
        </tbody>
      </table>
    `,
    immediatelyRender: false,
  })

  // Handle drag-and-drop events
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault() // Allow dropping
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0] // Get the first dropped file
      if (file && file.type.startsWith("image/") && editor) {
        const imageUrl = URL.createObjectURL(file)
        editor.chain().focus().setImage({ src: imageUrl }).run()
        // Cleanup the object URL after a delay (adjust as needed)
        // setTimeout(() => URL.revokeObjectURL(imageUrl), 1000)
      }
    },
    [editor]
  )

  if (!editor) return null // Prevent rendering until editor is ready

  return (
    <div
      className={`size-full overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:bg-white print:overflow-visible ${
        isDragging ? "border-2 border-dashed border-blue-500" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export default Tiptap
