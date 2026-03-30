const OutgoingMessage = ({ text, time }: any) => {
  return (
    <div className="message outgoing">
      <p>{text}</p>
      <span>{time}</span>
    </div>
  )
}

export default OutgoingMessage