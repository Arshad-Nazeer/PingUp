import ContactItem from "./ContactItem"
import { useNavigate } from "react-router-dom"

const Sidebar = ({
  contacts,
  selectedChat,
  setSelectedChat,
  search,
  setSearch,
  openModal,
  openGroupModal,
}: any) => {
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const filtered = contacts.filter((c: any) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="sidebar">
      {/* HEADER */}
      <div className="sidebar-header">
        <h2>PingUp</h2>

        <div className="header-actions">
          <span onClick={() => document.body.classList.toggle("dark")}>🌙</span>
          <button onClick={openGroupModal}>👥</button>
          <button onClick={openModal}>+</button>
        </div>
      </div>

      {/* SEARCH */}
      <div className="search-box">
        <input
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* CONTACTS */}
      <div className="contact-list">
        {filtered.map((c: any) => (
          <ContactItem
            key={c.id}
            contact={c}
            isActive={selectedChat?.id === c.id}
            onClick={() => setSelectedChat(c)}
          />
        ))}
      </div>

      {/* ✅ PROFILE BUTTON FIX */}
      <div
        className="profile-section"
        onClick={() => navigate("/profile")}
      >
        <div className="avatar small">
          {user?.name?.[0] || "U"}
        </div>

        <div className="profile-info">
          <h4>{user?.name || "User"}</h4>
          <p>View profile</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar