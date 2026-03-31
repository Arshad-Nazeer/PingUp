// const OutgoingMessage = ({ text, time }: any) => {
//   return (
//     <div className="message outgoing">
//       <p>{text}</p>
//       <span>{time}</span>
//     </div>
//   )
// }

// export default OutgoingMessage


const OutgoingMessage = ({ text, time, file }: any) => {
  return (
    <div className="message outgoing">

      {/* TEXT */}
      {text && <p>{text}</p>}

      {/* IMAGE */}
      {file && file.type?.startsWith("image") && (
        <img
          src={URL.createObjectURL(file)}
          alt="preview"
          style={{ width: "150px", borderRadius: "8px" }}
        />
      )}

      {/* OTHER FILE */}
      {file && !file.type?.startsWith("image") && (
        <div>📎 {file.name}</div>
      )}

      <span>{time}</span>
    </div>
  )
}

export default OutgoingMessage