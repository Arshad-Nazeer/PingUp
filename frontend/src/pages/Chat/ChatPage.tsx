// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { logout } from "../../utils/auth"

// const Sidebar = ({ contacts, onSelect, selectedUser }: any) => {
//   const navigate = useNavigate()

//   return (
//     <div style={{ width: "20%", background: "#1e1e1e", color: "white", padding: "1rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      
//       <div>
//         <h2>Contacts</h2>
//         {contacts.map((user: any) => (
//           <div
//             key={user.id}
//             onClick={() => onSelect(user)}
//             style={{
//               padding: "0.5rem",
//               margin: "0.5rem 0",
//               cursor: "pointer",
//               background: selectedUser?.id === user.id ? "#333" : "transparent",
//             }}
//           >
//             {user.name}
//           </div>
//         ))}
//       </div>

//       {/* PROFILE BUTTON */}
//       <div>
//         <button onClick={() => navigate("/profile")} style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}>
//           Profile
//         </button>

//         <button
//           onClick={() => {
//             logout()
//             navigate("/")
//           }}
//           style={{ width: "100%", padding: "0.5rem", background: "red", color: "white" }}
//         >
//           Logout
//         </button>
//       </div>

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

// const ChatPage = () => {
//   const [selectedUser, setSelectedUser] = useState<any>(null)

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
// import "../../styles/Chat/Chat.css"
// import Sidebar from "../../components/Chat/Sidebar"
// import ChatWindow from "../../components/Chat/ChatWindow"
// import AddContactModal from "../../components/Chat/AddContactModal"
// import CreateGroupModal from "../../components/Chat/CreateGroupModal"

// import { useState, useEffect } from "react"

// const ChatPage = () => {
//   /* ================= LOAD FROM STORAGE ================= */

//   const [contacts, setContacts] = useState<any[]>(() => {
//     return JSON.parse(localStorage.getItem("contacts") || "[]")
//   })

//   const [messages, setMessages] = useState<any>(() => {
//     return JSON.parse(localStorage.getItem("messages") || "{}")
//   })

//   const [selectedChat, setSelectedChat] = useState<any>(() => {
//     return JSON.parse(localStorage.getItem("selectedChat") || "null")
//   })

//   const [search, setSearch] = useState("")
//   const [showModal, setShowModal] = useState(false)
//   const [showGroupModal, setShowGroupModal] = useState(false)

//   /* ================= SAVE TO STORAGE ================= */

//   useEffect(() => {
//     localStorage.setItem("contacts", JSON.stringify(contacts))
//   }, [contacts])

//   useEffect(() => {
//     localStorage.setItem("messages", JSON.stringify(messages))
//   }, [messages])

//   useEffect(() => {
//     localStorage.setItem("selectedChat", JSON.stringify(selectedChat))
//   }, [selectedChat])

//   /* ================= AUTO SELECT FIRST CHAT ================= */

//   useEffect(() => {
//     if (!selectedChat && contacts.length > 0) {
//       setSelectedChat(contacts[0])
//     }
//   }, [contacts])

//   /* ================= SEND MESSAGE ================= */

//   const sendMessage = (text: string) => {
//     if (!selectedChat || !text.trim()) return

//     const newMsg = {
//       text,
//       time: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//       sender: "me",
//     }

//     // UPDATE MESSAGES
//     setMessages((prev: any) => ({
//       ...prev,
//       [selectedChat.id]: [...(prev[selectedChat.id] || []), newMsg],
//     }))

//     // UPDATE CONTACT PREVIEW
//     setContacts((prev: any[]) =>
//       prev.map((c) =>
//         c.id === selectedChat.id
//           ? {
//               ...c,
//               msg: text,
//               time: newMsg.time,
//             }
//           : c
//       )
//     )
//   }

//   /* ================= ADD CONTACT ================= */

//   const addContact = (name: string, email: string) => {
//     const newContact = {
//       id: Date.now(),
//       name,
//       email,
//       msg: "Start conversation",
//       time: "Now",
//       isGroup: false,
//     }

//     setContacts((prev) => [...prev, newContact])
//   }

//   /* ================= CREATE GROUP ================= */

//   const createGroup = (groupName: string, members: any[]) => {
//     const newGroup = {
//       id: Date.now(),
//       name: groupName,
//       members,
//       msg: "Group created",
//       time: "Now",
//       isGroup: true,
//     }

//     setContacts((prev) => [...prev, newGroup])
//   }

//   /* ================= UI ================= */

//   return (
//     <div className="app-layout">
//       <Sidebar
//         contacts={contacts}
//         selectedChat={selectedChat}
//         setSelectedChat={setSelectedChat}
//         search={search}
//         setSearch={setSearch}
//         openModal={() => setShowModal(true)}
//         openGroupModal={() => setShowGroupModal(true)}
//       />

//       <ChatWindow
//         selectedChat={selectedChat}
//         messages={messages[selectedChat?.id] || []}
//         sendMessage={sendMessage}
//       />

//       {/* ADD CONTACT MODAL */}
//       {showModal && (
//         <AddContactModal
//           close={() => setShowModal(false)}
//           addContact={addContact}
//         />
//       )}

//       {/* CREATE GROUP MODAL */}
//       {showGroupModal && (
//         <CreateGroupModal
//           close={() => setShowGroupModal(false)}
//           contacts={contacts}
//           createGroup={createGroup}
//         />
//       )}
//     </div>
//   )
// }

// export default ChatPage


import "../../styles/Chat/Chat.css"
import Sidebar from "../../components/Chat/Sidebar"
import ChatWindow from "../../components/Chat/ChatWindow"
import AddContactModal from "../../components/Chat/AddContactModal"
import CreateGroupModal from "../../components/Chat/CreateGroupModal"

import { useState, useEffect } from "react"

const ChatPage = () => {
  /* ================= LOAD FROM STORAGE ================= */

  const [contacts, setContacts] = useState<any[]>(() => {
    return JSON.parse(localStorage.getItem("contacts") || "[]")
  })

  const [messages, setMessages] = useState<any>(() => {
    return JSON.parse(localStorage.getItem("messages") || "{}")
  })

  const [selectedChat, setSelectedChat] = useState<any>(() => {
    return JSON.parse(localStorage.getItem("selectedChat") || "null")
  })

  const [search, setSearch] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [showGroupModal, setShowGroupModal] = useState(false)

  /* ================= SAVE TO STORAGE ================= */

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts))
  }, [contacts])

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    localStorage.setItem("selectedChat", JSON.stringify(selectedChat))
  }, [selectedChat])

  /* ================= AUTO SELECT FIRST CHAT ================= */

  useEffect(() => {
    if (!selectedChat && contacts.length > 0) {
      setSelectedChat(contacts[0])
    }
  }, [contacts])

  /* ================= SEND MESSAGE (FINAL FIX) ================= */

  const sendMessage = (text: string, file: File | null) => {
    if (!selectedChat || (!text.trim() && !file)) return

    const newMsg = {
      text,
      file, // ✅ added file support
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "me",
    }

    // ✅ UPDATE MESSAGES PER CONTACT
    setMessages((prev: any) => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMsg],
    }))

    // ✅ UPDATE CONTACT PREVIEW
    setContacts((prev: any[]) =>
      prev.map((c) =>
        c.id === selectedChat.id
          ? {
              ...c,
              msg: file ? "📎 File" : text,
              time: newMsg.time,
            }
          : c
      )
    )
  }

  /* ================= ADD CONTACT ================= */

  const addContact = (name: string, email: string) => {
    const newContact = {
      id: Date.now(),
      name,
      email,
      msg: "Start conversation",
      time: "Now",
      isGroup: false,
    }

    setContacts((prev) => [...prev, newContact])
  }

  /* ================= CREATE GROUP ================= */

  const createGroup = (groupName: string, members: any[]) => {
    const newGroup = {
      id: Date.now(),
      name: groupName,
      members,
      msg: "Group created",
      time: "Now",
      isGroup: true,
    }

    setContacts((prev) => [...prev, newGroup])
  }

  /* ================= UI ================= */

  return (
    <div className="app-layout">
      
      {/* SIDEBAR */}
      <Sidebar
        contacts={contacts}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        search={search}
        setSearch={setSearch}
        openModal={() => setShowModal(true)}
        openGroupModal={() => setShowGroupModal(true)}
      />

      {/* CHAT WINDOW */}
      <ChatWindow
        selectedChat={selectedChat}
        messages={messages[selectedChat?.id] || []}
        sendMessage={sendMessage} // ✅ IMPORTANT
      />

      {/* ADD CONTACT MODAL */}
      {showModal && (
        <AddContactModal
          close={() => setShowModal(false)}
          addContact={addContact}
        />
      )}

      {/* CREATE GROUP MODAL */}
      {showGroupModal && (
        <CreateGroupModal
          close={() => setShowGroupModal(false)}
          contacts={contacts}
          createGroup={createGroup}
        />
      )}
    </div>
  )
}

export default ChatPage

