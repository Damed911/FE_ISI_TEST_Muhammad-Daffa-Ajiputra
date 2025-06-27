import type { Metadata } from 'next'
import ListCommentTable from '../components/section/listCommentTable'
import DropdownMenu from '../components/ui-custom/dropdownMenu'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Comment List Dashboard',
}

const getDataComment = async () => {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/comments',
      {
        cache: 'no-store',
      }
    )
    return response.json()
  } catch (err) {
    console.log('There was an error', err)
  }
}

export default async function Dashboard() {
  const listComment = await getDataComment()

  return (
    <div className="w-full h-screen flex flex-col gap-8 p-4 md:p-10">
      <div className="flex gap-3 justify-between items-center">
        <span className="font-semibold">List comment</span>
        <DropdownMenu />
      </div>
      <ListCommentTable data={listComment} />
    </div>
  )
}
