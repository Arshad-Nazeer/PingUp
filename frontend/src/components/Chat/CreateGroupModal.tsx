import { useState } from "react"

const CreateGroupModal = ({ close, contacts, createGroup }: any) => {
  const [groupName, setGroupName] = useState("")
  const [selectedMembers, setSelectedMembers] = useState<any[]>([])

  const toggleMember = (contact: any) => {
    if (selectedMembers.includes(contact)) {
      setSelectedMembers(selectedMembers.filter((c) => c !== contact))
    } else {
      setSelectedMembers([...selectedMembers, contact])
    }
  }

  const handleCreate = () => {
    if (!groupName || selectedMembers.length === 0) return
    createGroup(groupName, selectedMembers)
    close()
  }

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3>Create Group</h3>

        <input
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />

        <div className="group-list">
          {contacts.map((c: any) => (
            <label key={c.id} className="group-item">
              <input
                type="checkbox"
                onChange={() => toggleMember(c)}
              />
              {c.name}
            </label>
          ))}
        </div>

        <div className="modal-actions">
          <button className="cancel" onClick={close}>Cancel</button>
          <button className="add" onClick={handleCreate}>Create</button>
        </div>
      </div>
    </div>
  )
}

export default CreateGroupModal