const IncomingMessage = ({ text, time }: any) => {
  return (
    <div className="message incoming">
      <p>{text}</p>
      <span>{time}</span>
    </div>
  )
}

export default IncomingMessage