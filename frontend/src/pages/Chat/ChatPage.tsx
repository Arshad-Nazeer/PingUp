// import { useState } from "react"

// // Dummy Components (basic placeholders)

// const Sidebar = ({ contacts, onSelect, selectedUser }: any) => {
//   return (
//     <div style={{ width: "20%", background: "#1e1e1e", color: "white", padding: "1rem" }}>
//       <h2>Contacts</h2>
//       {contacts.map((user: any) => (
//         <div
//           key={user.id}
//           onClick={() => onSelect(user)}
//           style={{
//             padding: "0.5rem",
//             margin: "0.5rem 0",
//             cursor: "pointer",
//             background: selectedUser?.id === user.id ? "#333" : "transparent",
//           }}
//         >
//           {user.name}
//         </div>
//       ))}
//     </div>
//   )
// }

// const ChatWindow = ({ selectedUser }: any) => {
//   return (
//     <div style={{ width: "60%", background: "#121212", color: "white", padding: "1rem" }}>
//       {selectedUser ? (
//         <>
//           <h2>Chat with {selectedUser.name}</h2>
//           <div style={{ marginTop: "1rem" }}>
//             <p>💬 Hello! This is a test message.</p>
//             <p>💬 Another placeholder message.</p>
//           </div>
//         </>
//       ) : (
//         <h2>Select a user to start chatting</h2>
//       )}
//     </div>
//   )
// }

// const InfoPanel = ({ selectedUser }: any) => {
//   return (
//     <div style={{ width: "20%", background: "#1a1a1a", color: "white", padding: "1rem" }}>
//       {selectedUser ? (
//         <>
//           <h3>User Info</h3>
//           <p>Name: {selectedUser.name}</p>
//           <p>Status: Online</p>
//         </>
//       ) : (
//         <h3>No user selected</h3>
//       )}
//     </div>
//   )
// }

// // Main Page

// const ChatPage = () => {
//   const [selectedUser, setSelectedUser] = useState<any>(null)

//   // Dummy contacts
//   const contacts = [
//     { id: 1, name: "John Doe" },
//     { id: 2, name: "Jane Smith" },
//     { id: 3, name: "Alex Johnson" },
//   ]

//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       <Sidebar
//         contacts={contacts}
//         onSelect={setSelectedUser}
//         selectedUser={selectedUser}
//       />

//       <ChatWindow selectedUser={selectedUser} />

//       <InfoPanel selectedUser={selectedUser} />
//     </div>
//   )
// }

// export default ChatPage
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { logout } from "../../utils/auth"

const Sidebar = ({ contacts, onSelect, selectedUser }: any) => {
  const navigate = useNavigate()

  return (
    <div style={{ width: "20%", background: "#1e1e1e", color: "white", padding: "1rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      
      <div>
        <h2>Contacts</h2>
        {contacts.map((user: any) => (
          <div
            key={user.id}
            onClick={() => onSelect(user)}
            style={{
              padding: "0.5rem",
              margin: "0.5rem 0",
              cursor: "pointer",
              background: selectedUser?.id === user.id ? "#333" : "transparent",
            }}
          >
            {user.name}
          </div>
        ))}
      </div>

      {/* PROFILE BUTTON */}
      <div>
        <button onClick={() => navigate("/profile")} style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}>
          Profile
        </button>

        <button
          onClick={() => {
            logout()
            navigate("/")
          }}
          style={{ width: "100%", padding: "0.5rem", background: "red", color: "white" }}
        >
          Logout
        </button>
      </div>

    </div>
  )
}

const ChatWindow = ({ selectedUser }: any) => {
  return (
    <div style={{ width: "60%", background: "#121212", color: "white", padding: "1rem" }}>
      {selectedUser ? (
        <>
          <h2>Chat with {selectedUser.name}</h2>
          <div style={{ marginTop: "1rem" }}>
            <p>💬 Hello! This is a test message.</p>
            <p>💬 Another placeholder message.</p>
          </div>
        </>
      ) : (
        <h2>Select a user to start chatting</h2>
      )}
    </div>
  )
}

const InfoPanel = ({ selectedUser }: any) => {
  return (
    <div style={{ width: "20%", background: "#1a1a1a", color: "white", padding: "1rem" }}>
      {selectedUser ? (
        <>
          <h3>User Info</h3>
          <p>Name: {selectedUser.name}</p>
          <p>Status: Online</p>
        </>
      ) : (
        <h3>No user selected</h3>
      )}
    </div>
  )
}

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const contacts = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alex Johnson" },
  ]

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        contacts={contacts}
        onSelect={setSelectedUser}
        selectedUser={selectedUser}
      />

      <ChatWindow selectedUser={selectedUser} />

      <InfoPanel selectedUser={selectedUser} />
    </div>
  )
}

export default ChatPage