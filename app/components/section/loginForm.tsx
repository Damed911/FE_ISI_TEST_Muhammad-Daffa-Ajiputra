'use client'

import { redirect } from 'next/navigation'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { z } from 'zod/v4'

export default function LoginForm() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [filledEmail, setFilledEmail] = useState<boolean>(true)
  const [filledPassword, setFilledPassword] = useState<boolean>(true)

  const [validatePassword, setValidatePassword] = useState<boolean>(true)

  const loginSchema = z.object({
    username: z.string(),
    password: z.string().min(8, { error: 'Password must have 8 characters' }),
  })

  const login = (e: React.FormEvent) => {
    e.preventDefault()

    const dummyusername = 'adminpsn'
    const dummypassword = 'admin123'

    if (username === '') {
      setFilledEmail(false)
    }
    if (password === '') {
      setFilledPassword(false)
    }
    if (username !== '' && password !== '') {
      const isMatched = username === dummyusername && password === dummypassword
      const validate = loginSchema.safeParse({
        username: username,
        password: password,
      })

      if (isMatched && validate.success) {
        redirect('/dashboard')
      } else if (!validate.success) {
        setFilledPassword(false)
        setValidatePassword(false)
      } else {
        toast.error("Username or password isn't matched", {
          autoClose: 2500,
          theme: 'colored',
        })
      }
    }
  }

  return (
    <Form className="flex flex-col w-full gap-3" onSubmit={login}>
      <Form.Group
        className="flex flex-col gap-2"
        controlId="controlFormUsername"
      >
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            setFilledEmail(true)
          }}
          isInvalid={!filledEmail}
        />
        <Form.Control.Feedback type="invalid">
          Field is required
        </Form.Control.Feedback>
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
          onChange={(e) => {
            setPassword(e.target.value)
            setFilledPassword(true)
            setValidatePassword(true)
          }}
          isInvalid={!filledPassword}
        />
        <Form.Control.Feedback type="invalid">
          {!validatePassword
            ? 'Password must have 8 characters'
            : 'Field is required'}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" variant="success">
        Login
      </Button>
    </Form>
  )
}
