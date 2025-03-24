"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

const Tiptap = () => {
  const editor = useEditor({
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

    extensions: [StarterKit],

    content: "<p>Hello World! 🌎️</p>",
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
