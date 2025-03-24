import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Google Docs
      <Link href={"/documents/123"} className="underline">
        Doc
      </Link>
    </div>
  )
}
