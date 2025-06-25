import LoginForm from './components/loginForm'

export default function Home() {
  return (
    <main className="flex items-center justify-center w-full h-screen lg:w-[calc(100% - 50px)] p-4 md:p-10 font-[family-name:var(--font-geist-sans)]">
      <div className="p-4 shadow-xl rounded-xl bg-white">
        <LoginForm />
      </div>
    </main>
  )
}
