'use client'

import { ToastContainer } from 'react-toastify'
import { PrimeReactProvider } from 'primereact/api'

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <PrimeReactProvider>{children}</PrimeReactProvider>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        limit={1}
        theme="light"
      />
    </>
  )
}
