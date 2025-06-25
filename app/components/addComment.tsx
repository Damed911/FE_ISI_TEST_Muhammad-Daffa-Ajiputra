'use client'

import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

export default function AddComment() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/

  const [showModal, setShowModal] = useState<boolean>(false)

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [body, setBody] = useState<string>('')

  return (
    <>
      <div className="flex items-center justify-end">
        <Button
          className="p-2 bg-green-600 border rounded-lg border-white text-white"
          onClick={() => setShowModal(true)}
        >
          Create Comment
        </Button>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                isInvalid={emailRegex.test(email)}
              />
              \
              <Form.Control.Feedback type="invalid">
                Input isn't an email
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Body</Form.Label>
              <Form.Control type="textarea" required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant="danger"
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
          <Button type="submit" onClick={() => setShowModal(false)}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
