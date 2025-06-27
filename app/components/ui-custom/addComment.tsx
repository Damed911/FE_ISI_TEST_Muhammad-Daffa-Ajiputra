'use client'

import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { listCommentTable } from '../section/listCommentTable'
import { toast } from 'react-toastify'
import { z } from 'zod/v4'

export default function AddComment({
  listComment,
  setListComment,
}: {
  listComment: listCommentTable[]
  setListComment: React.Dispatch<React.SetStateAction<listCommentTable[]>>
}) {
  const [showModal, setShowModal] = useState<boolean>(false)

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [body, setBody] = useState<string>('')

  const [filledName, setFilledName] = useState<boolean>(true)
  const [filledEmail, setFilledEmail] = useState<boolean>(true)
  const [filledBody, setFilledBody] = useState<boolean>(true)

  const [validateEmail, setValidateEmail] = useState<boolean>(true)

  const inputSchema = z.object({
    name: z.string().min(1, { error: "Name can't empty" }),
    email: z.email("Input isn't an email"),
    body: z.string().min(1, { error: "Body can't empty" }),
  })

  const closeModal = () => {
    setShowModal(false)
    setFilledBody(true)
    setFilledEmail(true)
    setFilledName(true)
    setValidateEmail(true)
    setName('')
    setEmail('')
    setBody('')
  }

  const handleAddComment = () => {
    const data = {
      id: listComment.length + 1,
      name: name,
      email: email,
      body: body,
    }

    if (name === '') {
      setFilledName(false)
    }
    if (email === '') {
      setFilledEmail(false)
    }
    if (body === '') {
      setFilledBody(false)
    }
    if (name !== '' && email !== '' && body !== '') {
      const validate = inputSchema.safeParse({
        name: name,
        email: email,
        body: body,
      })

      if (validate.success) {
        setListComment((prev) => [...prev, data])

        toast.success('Comment succesfully created', {
          autoClose: 2500,
          theme: 'colored',
        })
        setShowModal(false)
        setFilledBody(false)
        setFilledEmail(false)
        setFilledName(false)
        setName('')
        setEmail('')
        setBody('')
      } else {
        setFilledEmail(false)
        setValidateEmail(false)
      }
    }
  }

  return (
    <>
      <div className="flex items-center justify-center sm:justify-end">
        <Button onClick={() => setShowModal(true)}>Create Comment</Button>
      </div>
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setFilledName(true)
                }}
                isInvalid={!filledName}
              />
              <Form.Control.Feedback type="invalid">
                Field is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setFilledEmail(true)
                  setValidateEmail(true)
                }}
                isInvalid={!filledEmail}
              />
              <Form.Control.Feedback type="invalid">
                {!validateEmail ? 'Enter a valid email' : 'Field is required'}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                required
                value={body}
                onChange={(e) => {
                  setBody(e.target.value)
                  setFilledBody(true)
                }}
                isInvalid={!filledBody}
              />
              <Form.Control.Feedback type="invalid">
                Field is required
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleAddComment}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
