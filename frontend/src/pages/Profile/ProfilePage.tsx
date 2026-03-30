import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../styles/Profile/Profile.css"
import { logout, updateUser, deleteUser } from "../../utils/auth"

const ProfilePage = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState<any>(null)
  const [username, setUsername] = useState("")
  const [image, setImage] = useState<string | null>(null)

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark")
  const [fontSize, setFontSize] = useState(localStorage.getItem("fontSize") || "16")
  const [fontStyle, setFontStyle] = useState(localStorage.getItem("fontStyle") || "DM Sans")

  const [showDelete, setShowDelete] = useState(false)
  const [passwordConfirm, setPasswordConfirm] = useState("")

  useEffect(() => {
    const stored = localStorage.getItem("currentUser")
    if (stored) {
      const parsed = JSON.parse(stored)
      setUser(parsed)
      setUsername(parsed.name)
      setImage(parsed.image || null)
    }
  }, [])

  useEffect(() => {
    document.body.classList.remove("light", "dark")
    document.body.classList.add(theme)

    document.documentElement.style.fontSize = `${fontSize}px`
    document.body.style.fontFamily = `"${fontStyle}", sans-serif`

    localStorage.setItem("theme", theme)
    localStorage.setItem("fontSize", fontSize)
    localStorage.setItem("fontStyle", fontStyle)
  }, [theme, fontSize, fontStyle])

  const handleSaveUsername = () => {
    updateUser(user.email, { name: username })
    setUser({ ...user, name: username })
  }

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result as string
      setImage(base64)
      updateUser(user.email, { image: base64 })
    }
    reader.readAsDataURL(file)
  }

  const handleDelete = () => {
    if (passwordConfirm !== user.password) return alert("Wrong password")
    deleteUser(user.email)
    navigate("/")
  }

  const initials = user?.name?.slice(0, 2).toUpperCase()

  return (
    <div className="profile-page">
      <div className="profile-container">

        <div className="profile-header">
          <span onClick={() => navigate("/chat")}>←</span>
          <h2>Profile Settings</h2>
        </div>

        <div className="card">
          <p className="section-title">PROFILE</p>

          <div className="profile-row">
            <div className="avatar">
              {image ? <img src={image} /> : initials}
              <label className="camera">
                📷
                <input type="file" hidden onChange={handleImageUpload} />
              </label>
            </div>

            <div className="field">
              <label>Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} />
              <button className="save-btn" onClick={handleSaveUsername}>Save</button>
            </div>
          </div>
        </div>

        <div className="card">
          <p className="section-title">APPEARANCE</p>

          <div className="row">
            <span>Theme</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={theme === "light"}
                onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="row">
            <span>Font Size</span>
            <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
              <option value="14">Small</option>
              <option value="16">Medium</option>
              <option value="18">Large</option>
              <option value="20">Extra Large</option>
            </select>
          </div>

          <div className="row">
            <span>Font Style</span>
            <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value)}>
              <option value="DM Sans">DM Sans</option>
              <option value="Inter">Inter</option>
              <option value="Poppins">Poppins</option>
              <option value="Roboto">Roboto</option>
              <option value="Playfair Display">Playfair</option>
              <option value="JetBrains Mono">JetBrains Mono</option>
            </select>
          </div>
        </div>

        <div className="card">
          <p className="section-title">DANGER ZONE</p>

          {!showDelete ? (
            <button className="delete-btn" onClick={() => setShowDelete(true)}>
              Delete Account
            </button>
          ) : (
            <>
              <input
                type="password"
                placeholder="Confirm password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <button className="delete-btn" onClick={handleDelete}>
                Confirm Delete
              </button>
            </>
          )}
        </div>

        <button className="logout-btn" onClick={() => { logout(); navigate("/") }}>
          Log Out
        </button>

      </div>
    </div>
  )
}

export default ProfilePage