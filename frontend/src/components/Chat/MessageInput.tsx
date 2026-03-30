import { useState } from "react"

const MessageInput = ({ sendMessage }: any) => {
  const [text, setText] = useState("")

  const handleSend = () => {
    sendMessage(text)
    setText("")
  }

  return (
    <div className="message-input">
      <span>😊</span>
      <span>📎</span>

      <input
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      <button onClick={handleSend}>➤</button>
    </div>
  )
}

export default MessageInput