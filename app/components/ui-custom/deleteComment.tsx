'use client'

import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { listCommentTable } from '../section/listCommentTable'
import { toast } from 'react-toastify'

export default function DeleteComment({
  listComment,
  setListComment,
  selectedData,
  setSelectedData,
}: {
  listComment: listCommentTable[]
  setListComment: React.Dispatch<React.SetStateAction<listCommentTable[]>>
  selectedData: listCommentTable[] | undefined
  setSelectedData: React.Dispatch<
    React.SetStateAction<listCommentTable[] | undefined>
  >
}) {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleDeleteData = () => {
    const deletedId = new Set(selectedData?.map((item) => item.id))
    const newArray = listComment.filter((data) => !deletedId.has(data.id))

    toast.success('Comment succesfully deleted', {
      autoClose: 2500,
      theme: 'colored',
    })

    setListComment(newArray)
    setOpenModal(false)
    setSelectedData(undefined)
  }

  return (
    <>
      <Button variant="danger" onClick={() => setOpenModal(true)}>
        Delete Data
      </Button>
      <Modal show={openModal} onHide={() => setOpenModal(false)} centered>
        <Modal.Header closeButton />
        <Modal.Body>
          <h4>Are you sure you want to delete this comment?</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant="primary"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
          <Button type="submit" variant="danger" onClick={handleDeleteData}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
