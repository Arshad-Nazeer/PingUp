const ChatHeader = ({ contact }: any) => {
  return (
    <div className="chat-header">
      <div className="chat-user">
        <div className="avatar small">
          {contact.name?.[0]}
        </div>
        <div>
          <h3>{contact.name}</h3>
          <span className="online">Online</span>
        </div>
      </div>

      <div className="chat-actions">
        <span>📞</span>
        <span>🎥</span>
        <span>⋮</span>
      </div>
    </div>
  )
}

export default ChatHeader