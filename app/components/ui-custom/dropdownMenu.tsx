'use client'

import { Dropdown } from 'react-bootstrap'
import { redirect } from 'next/navigation'

export default function DropdownMenu() {
  const logout = () => {
    redirect('/')
  }

  return (
    <Dropdown>
      <Dropdown.Toggle as="span" className="cursor-pointer">
        Menu
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
