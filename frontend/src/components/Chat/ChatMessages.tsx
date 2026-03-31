// const ChatMessages = () => {
//   return (
//     <div className="messages">
//       <div className="msg incoming">
//         Hey! How are you doing?
//         <span>10:00 AM</span>
//       </div>

//       <div className="msg outgoing">
//         I'm great, thanks! Just finished the new design.
//         <span>10:02 AM</span>
//       </div>

//       <div className="msg incoming">
//         That sounds awesome! Can you share it?
//         <span>10:05 AM</span>
//       </div>

//       <div className="msg outgoing file">
//         <div className="file-box">
//           📄 Design_v2.pdf
//           <small>2.4 MB</small>
//         </div>
//         <span>10:06 AM</span>
//       </div>

//       <div className="msg outgoing">
//         Thank you! I spent a lot of time on it
//         <span>10:12 AM</span>
//       </div>
//     </div>
//   )
// }

// export default ChatMessages

import OutgoingMessage from "./OutgoingMessage"

const ChatMessages = ({ messages }: any) => {
  return (
    <div className="messages">

      {/* If no messages */}
      {messages.length === 0 && (
        <div style={{ textAlign: "center", opacity: 0.6 }}>
          No messages yet...
        </div>
      )}

      {/* Dynamic messages */}
      {messages.map((msg: any) => (
        <OutgoingMessage
          key={msg.id}
          text={msg.text}
          file={msg.file}
          time={msg.time}
        />
      ))}

    </div>
  )
}

export default ChatMessages