import { create } from "zustand"
import type { Editor } from "@tiptap/react"

interface EditorState {
  editor: null | Editor
  setEditor: (editor: Editor) => void
}

export const useEditorStore = create<EditorState>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
}))
