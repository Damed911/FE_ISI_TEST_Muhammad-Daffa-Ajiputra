'use client'

import {
  DataTable,
  DataTableFilterMeta,
  DataTablePageEvent,
} from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useState } from 'react'
import { FilterMatchMode } from 'primereact/api'
import AddComment from '../ui-custom/addComment'
import DeleteComment from '../ui-custom/deleteComment'

export interface listCommentTable {
  id: number
  postId?: number
  name: string
  email: string
  body: string
}

export default function ListCommentTable({
  data,
}: {
  data: listCommentTable[]
}) {
  const [filter, setFilter] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })

  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(10)

  const [listComment, setListComment] = useState<listCommentTable[]>(data)
  const [search, setSearch] = useState<string>('')
  const [selectedData, setSelectedData] = useState<
    listCommentTable[] | undefined
  >(undefined)

  const globalValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFilter((prev) => ({
      ...prev,
      global: {
        ...prev.global,
        value: value,
      },
    }))
    setSearch(value)
  }

  const header = () => {
    return (
      <div className="flex gap-3 justify-between">
        <input
          value={search}
          onChange={globalValueChange}
          placeholder="Search by name, email or body"
          className="border rounded-lg p-2 border-gray-500 w-full md:w-3xs"
        />
        {selectedData?.length !== undefined && selectedData.length > 0 && (
          <DeleteComment
            listComment={listComment}
            setListComment={setListComment}
            selectedData={selectedData}
            setSelectedData={setSelectedData}
          />
        )}
      </div>
    )
  }

  const handlePageChange = (e: DataTablePageEvent) => {
    setFirst(e.first)
    setRows(e.rows)

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <AddComment listComment={listComment} setListComment={setListComment} />
      <DataTable
        value={listComment}
        paginator
        first={first}
        rows={rows}
        rowsPerPageOptions={[10, 20, 50]}
        dataKey="id"
        selectionMode="checkbox"
        selection={selectedData!}
        onSelectionChange={(e) => setSelectedData(e.value)}
        filters={filter}
        globalFilterFields={['name', 'email', 'body']}
        header={header}
        emptyMessage="No comment found"
        onPage={handlePageChange}
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
        <Column
          field="id"
          header="No."
          body={(data) => {
            const filteredResults = listComment.filter(
              (item) =>
                !search ||
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.email.toLowerCase().includes(search.toLowerCase()) ||
                item.body.toLowerCase().includes(search.toLowerCase())
            )
            const position = filteredResults.findIndex(
              (item) => item.id === data.id
            )
            return position + 1
          }}
          headerStyle={{ width: '3rem' }}
        />
        <Column field="name" header="name" />
        <Column field="email" header="email" />
        <Column field="body" header="body" />
      </DataTable>
    </>
  )
}
