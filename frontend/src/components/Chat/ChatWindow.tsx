import ChatHeader from "./ChatHeader"
import MessageInput from "./MessageInput"

const ChatWindow = ({ selectedChat, messages, sendMessage }: any) => {
  if (!selectedChat) {
    return <div className="chat-window empty">Select a chat</div>
  }

  return (
    <div className="chat-window">
      <ChatHeader contact={selectedChat} />

      <div className="messages">
        {messages.map((m: any, i: number) => (
          <div
            key={i}
            className={`msg ${m.sender === "me" ? "outgoing" : "incoming"}`}
          >
            {m.text}
            <span>{m.time}</span>
          </div>
        ))}
      </div>

      <MessageInput sendMessage={sendMessage} />
    </div>
  )
}

export default ChatWindow