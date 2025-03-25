import Editor from "./_components/editor"
import Toolbar from "./_components/toolbar"

interface DocumentPageProps {
  params: Promise<{ id: string }>
}

const DocumentPage = async ({ params }: DocumentPageProps) => {
  const { id } = await params
  return (
    <div className="min-h-screen bg-[#fafbfc]">
      <Toolbar />

      <Editor />
    </div>
  )
}

export default DocumentPage
