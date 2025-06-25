'use client'

import { IconAlertCircle } from '@tabler/icons-react'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'

export default function LoginForm() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [filledEmail, setFilledEmail] = useState<boolean>(false)
  const [filledPassword, setFilledPassword] = useState<boolean>(false)

  const isInvalidEmail = filledEmail && email.trim() === ''
  const isInvalidPassword = filledPassword && password.trim() === ''

  const login = (e: React.FormEvent) => {
    e.preventDefault()

    const dummyusername = 'adminpsn'
    const dummypassword = 'admin123'

    const isMatched = email === dummyusername && password === dummypassword

    if (isMatched) {
      return redirect('/dashboard')
    } else {
      toast.error("Username or password isn't matched", {
        autoClose: 2500,
        theme: 'colored',
      })
    }
  }

  return (
    <Form className="flex flex-col gap-3" onSubmit={login}>
      <Form.Group
        className="flex flex-col gap-2"
        controlId="controlFormUsername"
      >
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Username"
          value={email}
          onBlur={() => setFilledEmail(true)}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {isInvalidEmail && (
          <div className="flex items-center gap-2">
            <IconAlertCircle color="red" />
            <span className="text-red-500 text-sm">Field is required</span>
          </div>
        )}
      </Form.Group>
      <Form.Group
        className="flex flex-col gap-2"
        controlId="controlFormPassword"
      >
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Password"
          value={password}
          onBlur={() => setFilledPassword(true)}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {isInvalidPassword && (
          <div className="flex gap-2 items-center">
            <IconAlertCircle color="red" />
            <span className="text-red-500" color="red">
              Field is required
            </span>
          </div>
        )}
      </Form.Group>
      <Button
        type="submit"
        variant="success"
        disabled={email === '' || password === ''}
      >
        Login
      </Button>
    </Form>
  )
}
