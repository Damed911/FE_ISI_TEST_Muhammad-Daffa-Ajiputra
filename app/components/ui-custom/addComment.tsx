'use client'

import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { listCommentTable } from '../section/listCommentTable'
import { toast } from 'react-toastify'

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

  const [filledName, setFilledName] = useState<boolean>(false)
  const [filledEmail, setFilledEmail] = useState<boolean>(false)
  const [filledBody, setFilledBody] = useState<boolean>(false)

  const isInvalidName = filledName && name.trim() === ''
  const isInvalidBody = filledBody && body.trim() === ''
  const emailValidation = filledEmail && email.trim() === ''

  const closeModal = () => {
    setShowModal(false)
    setFilledBody(false)
    setFilledEmail(false)
    setFilledName(false)
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
                onBlur={() => setFilledName(true)}
                onChange={(e) => setName(e.target.value)}
                isInvalid={isInvalidName}
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
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setFilledEmail(true)}
                isInvalid={emailValidation}
              />
              <Form.Control.Feedback type="invalid">
                Field is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                required
                value={body}
                onBlur={() => setFilledBody(true)}
                onChange={(e) => setBody(e.target.value)}
                isInvalid={isInvalidBody}
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
          <Button
            type="submit"
            disabled={name === '' || email === '' || body === ''}
            onClick={handleAddComment}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
