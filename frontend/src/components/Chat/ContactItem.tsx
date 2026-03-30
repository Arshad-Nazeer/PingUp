const ContactItem = ({ contact, onClick, isActive }: any) => {
  const initials = contact.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")

  return (
    <div
      className={`contact-item ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="avatar">{initials}</div>

      <div className="contact-info">
        <div className="top">
          <h4>{contact.name}</h4>
          <span>{contact.time}</span>
        </div>

        <div className="bottom">
          <p>{contact.msg}</p>
          {contact.unread && <div className="badge">{contact.unread}</div>}
        </div>
      </div>
    </div>
  )
}

export default ContactItem