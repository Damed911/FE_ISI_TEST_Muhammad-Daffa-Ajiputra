import { IconChevronDown } from '@tabler/icons-react'
import type { Metadata } from 'next'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import AddComment from '../components/addComment'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Comment List Dashboard',
}

const data = [
  {
    postId: 1,
    id: 1,
    name: 'id labore ex et quam laborum',
    email: 'Eliseo@gardner.biz',
    body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
  },
]

export default function Dashboard() {
  return (
    <div className="w-full h-screen flex flex-col gap-8 p-4 md:p-10">
      <div className="flex w-full lg: w-[calc(100%-300px)] justify-between items-center">
        <h3 className="text-2xl font-semibold">List comment</h3>
        <div className="flex gap-4 items-center">
          <span className="text-lg font-medium">Andi</span>
          <IconChevronDown size={16} />
        </div>
      </div>
      <AddComment />
      <DataTable value={data}>
        <Column field="id" header="idComment" />
        <Column field="postId" header="postId" />
        <Column field="name" header="name" />
        <Column field="email" header="email" />
        <Column field="body" header="body" />
      </DataTable>
    </div>
  )
}
