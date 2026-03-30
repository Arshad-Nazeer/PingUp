import { useState } from "react"

const AddContactModal = ({ close, addContact }: any) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = () => {
    if (!name || !email) return
    addContact(name, email)
    close()
  }

  return (
    <div className="modal-overlay" onClick={close}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()} // prevent close on inside click
      >
        <h3>Add Contact</h3>

        <input
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="modal-actions">
          <button className="cancel" onClick={close}>
            Cancel
          </button>
          <button className="add" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddContactModal