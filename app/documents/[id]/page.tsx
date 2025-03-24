import Editor from "./_components/editor"

interface DocumentPageProps {
  params: Promise<{ id: string }>
}

const DocumentPage = async ({ params }: DocumentPageProps) => {
  const { id } = await params
  return (
    <div className="min-h-screen bg-[#fafbfc]">
      DocumentPage with id : {id}
      <Editor />
    </div>
  )
}

export default DocumentPage
