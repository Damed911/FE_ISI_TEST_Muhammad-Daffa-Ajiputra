import { IconNotebook } from '@tabler/icons-react'
import Form from 'next/form'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center gap-10 w-full lg:w-[calc(100% - 300px)] font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-8 items-center">
        <div className="flex justify-between items-center gap-5">
          <IconNotebook size={60} color="white" />
          <p className="text-2xl font-semibold">To-Do List Website</p>
        </div>
        <Form
          action="/"
          className="flex flex-col items-center gap-6 p-4 border-2 border-stone-500 rounded-lg bg-stone-900"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Nama</label>
            <input
              type="text"
              name="nama"
              id="Nama"
              className="border-2 border-stone-500 rounded-lg p-2"
              placeholder="Nama"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              className="border-2 border-stone-500 rounded-lg p-2"
              placeholder="E-mail"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              id="password"
              className="border-2 border-stone-500 rounded-lg p-2"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="w-full rounded-lg p-2 bg-green-700">
            Create Account
          </button>
        </Form>
      </div>
    </div>
  )
}
