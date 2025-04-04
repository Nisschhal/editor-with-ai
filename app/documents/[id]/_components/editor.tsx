"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
// Extenstions
// task list
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
// Table
import Table from "@tiptap/extension-table"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import TableRow from "@tiptap/extension-table-row"

// Images
import Image from "@tiptap/extension-image"
import ImageResize from "tiptap-extension-resize-image"
import { useEditorStore } from "@/store/use-editor-store"

import FontFamily from "@tiptap/extension-font-family"
import TextStyle from "@tiptap/extension-text-style"
import Text from "@tiptap/extension-text"
import Underline from "@tiptap/extension-underline"

const Tiptap = () => {
  const { setEditor } = useEditorStore()

  const editor = useEditor({
    // when editor is mounted store is to zustand editor
    onCreate({ editor }) {
      setEditor(editor)
    },

    // Style Editor
    editorProps: {
      attributes: {
        // Dynamic Styles for Editor
        style: "padding-left:56px; padding-right:56px;",
        // Targets the actutal text area not the EditorContent wrapper for editor
        class:
          "focus:outline-none print:border-0 bg-white border border-[#c7c7c7] rounded-sm flex flex-col min-h-[1054] w-[816px] pt-10 pr-14 pb-10 cursort-text",
      },
    },

    extensions: [
      StarterKit,
      FontFamily,
      Text,
      TextStyle,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      ImageResize,
      Underline,
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
  })

  return (
    <div className="size-full  overflow-x-auto bg-[#f9fbfd] px-4 print:p-0 print:bg-white print:overflow-visible">
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full">
        {/* Wrapper for the editor text area */}
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export default Tiptap
