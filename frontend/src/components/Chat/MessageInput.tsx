// import { useState } from "react"

// const MessageInput = ({ sendMessage }: any) => {
//   const [text, setText] = useState("")

//   const handleSend = () => {
//     sendMessage(text)
//     setText("")
//   }

//   return (
//     <div className="message-input">
//       <span>😊</span>
//       <span>📎</span>

//       <input
//         placeholder="Type a message..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         onKeyDown={(e) => e.key === "Enter" && handleSend()}
//       />

//       <button onClick={handleSend}>➤</button>
//     </div>
//   )
// }

// export default MessageInput

// import { useState } from "react"

// const emojis = [
//   "😀","😁","😂","🤣","😊","😍","😎","😭","😡",
//   "👍","👎","🔥","🎉","❤️","💔","👏","🙏"
// ]

// const MessageInput = ({ sendMessage }: any) => {
//   const [text, setText] = useState("")
//   const [showEmoji, setShowEmoji] = useState(false)

//   const handleSend = () => {
//     if (!text.trim()) return
//     sendMessage(text)
//     setText("")
//   }

//   const addEmoji = (emoji: string) => {
//     setText(prev => prev + emoji)
//     setShowEmoji(false)
//   }

//   return (
//     <div className="message-input">

//       {/* EMOJI BUTTON */}
//       <span
//         className="icon-btn"
//         onClick={() => setShowEmoji(prev => !prev)}
//       >
//         😊
//       </span>

//       {/* EMOJI PICKER */}
//       {showEmoji && (
//         <div className="emoji-picker">
//           {emojis.map((e, i) => (
//             <span key={i} onClick={() => addEmoji(e)}>
//               {e}
//             </span>
//           ))}
//         </div>
//       )}

//       {/* ATTACH */}
//       <span className="icon-btn">📎</span>

//       {/* INPUT */}
//       <input
//         placeholder="Type a message..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         onKeyDown={(e) => e.key === "Enter" && handleSend()}
//       />

//       {/* SEND */}
//       <button onClick={handleSend}>➤</button>
//     </div>
//   )
// }

// export default MessageInput

// import { useRef, useState } from "react"

// const emojis = [
//   "😀","😁","😂","🤣","😊","😍","😎","😭","😡",
//   "👍","👎","🔥","🎉","❤️","💔","👏","🙏"
// ]

// const MessageInput = ({ sendMessage }: any) => {
//   const [text, setText] = useState("")
//   const [showEmoji, setShowEmoji] = useState(false)
//   const [file, setFile] = useState<File | null>(null)

//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const handleSend = () => {
//     if (!text.trim() && !file) return

//     sendMessage({
//       text,
//       file
//     })

//     setText("")
//     setFile(null)
//   }

//   const addEmoji = (emoji: string) => {
//     setText(prev => prev + emoji)
//     setShowEmoji(false)
//   }

//   const handleFileClick = () => {
//     fileInputRef.current?.click()
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFile(e.target.files[0])
//     }
//   }

//   return (
//     <div className="message-input">

//       {/* EMOJI BUTTON */}
//       <span className="icon-btn" onClick={() => setShowEmoji(prev => !prev)}>
//         😊
//       </span>

//       {/* EMOJI PICKER */}
//       {showEmoji && (
//         <div className="emoji-picker">
//           {emojis.map((e, i) => (
//             <span key={i} onClick={() => addEmoji(e)}>
//               {e}
//             </span>
//           ))}
//         </div>
//       )}

//       {/* ATTACH BUTTON */}
//       <span className="icon-btn" onClick={handleFileClick}>
//         📎
//       </span>

//       {/* HIDDEN FILE INPUT */}
//       <input
//         type="file"
//         ref={fileInputRef}
//         style={{ display: "none" }}
//         onChange={handleFileChange}
//       />

//       {/* INPUT FIELD */}
//       <input
//         placeholder="Type a message..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         onKeyDown={(e) => e.key === "Enter" && handleSend()}
//       />

//       {/* SEND BUTTON */}
//       <button onClick={handleSend}>➤</button>

//       {/* FILE PREVIEW */}
//       {file && (
//         <div className="file-preview">
//           📄 {file.name}
//           <span onClick={() => setFile(null)}>❌</span>
//         </div>
//       )}
//     </div>
//   )
// }

// export default MessageInput


import { useRef, useState } from "react"

const emojis = [
  "😀","😁","😂","🤣","😊","😍","😎","😭","😡",
  "👍","👎","🔥","🎉","❤️","💔","👏","🙏"
]

const MessageInput = ({ sendMessage }: any) => {
  const [text, setText] = useState("")
  const [showEmoji, setShowEmoji] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSend = () => {
    if (!text.trim() && !file) return

    // ✅ FIX: correct function call
    sendMessage(text, file)

    setText("")
    setFile(null)
    setShowEmoji(false)
  }

  const addEmoji = (emoji: string) => {
    setText(prev => prev + emoji)
    setShowEmoji(false)
  }

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  return (
    <div className="message-input">

      {/* EMOJI BUTTON */}
      <span className="icon-btn" onClick={() => setShowEmoji(prev => !prev)}>
        😊
      </span>

      {/* EMOJI PICKER */}
      {showEmoji && (
        <div className="emoji-picker">
          {emojis.map((e, i) => (
            <span key={i} onClick={() => addEmoji(e)}>
              {e}
            </span>
          ))}
        </div>
      )}

      {/* ATTACH BUTTON */}
      <span className="icon-btn" onClick={handleFileClick}>
        📎
      </span>

      {/* HIDDEN FILE INPUT */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* INPUT FIELD */}
      <input
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      {/* SEND BUTTON */}
      <button onClick={handleSend}>
        ➤
      </button>

      {/* FILE PREVIEW */}
      {file && (
        <div className="file-preview">
          📄 {file.name}
          <span onClick={() => setFile(null)}>❌</span>
        </div>
      )}
    </div>
  )
}

export default MessageInput