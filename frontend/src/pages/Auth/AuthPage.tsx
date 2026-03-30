// import { useState, useEffect } from "react"
// import { FiSun, FiMoon } from "react-icons/fi" // 🔥 clean icons
// import LoginForm from "../../components/Auth/LoginForm"
// import RegisterForm from "../../components/Auth/RegisterForm"
// import "../../styles/Auth/Auth.css"
// import { useNavigate } from "react-router-dom"

// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true)
//   const [theme, setTheme] = useState("dark")
//   const navigate = useNavigate()

//   useEffect(() => {
//     const token = localStorage.getItem("token")
//     if (token) navigate("/chat")

//     const savedTheme = localStorage.getItem("theme")
//     if (savedTheme) setTheme(savedTheme)
//   }, [])

//   useEffect(() => {
//     document.body.className = theme
//     localStorage.setItem("theme", theme)
//   }, [theme])

//   const toggleTheme = () => {
//     setTheme(prev => (prev === "dark" ? "light" : "dark"))
//   }

//   return (
//     <div className="auth-container">

//       {/* 🔥 CLEAN ICON BUTTON */}
//       <div className="theme-toggle" onClick={toggleTheme}>
//         {theme === "dark" ? <FiSun /> : <FiMoon />}
//       </div>

//       {/* LEFT PANEL */}
//       <div className="auth-left">
//         <div className="brand-left">
//           <div className="chat-logo">💬</div>
//           <h1 className="brand-title-left">Welcome to Ping Up!</h1>
//           <p className="brand-tagline-left">
//             "Apni Dhun mein Rehta hun"
//           </p>
//         </div>
//       </div>

//       {/* RIGHT PANEL */}
//       <div className="auth-right">
//         <div className="tabs">
//           <span
//             className={isLogin ? "active" : ""}
//             onClick={() => setIsLogin(true)}
//           >
//             Existing User
//           </span>
//           <span
//             className={!isLogin ? "active" : ""}
//             onClick={() => setIsLogin(false)}
//           >
//             New User
//           </span>
//         </div>

//         <div className="form">
//           {isLogin ? (
//             <LoginForm />
//           ) : (
//             <RegisterForm switchToLogin={() => setIsLogin(true)} />
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AuthPage

import { useState, useEffect } from "react"
import { FiSun, FiMoon } from "react-icons/fi"
import LoginForm from "../../components/Auth/LoginForm"
import RegisterForm from "../../components/Auth/RegisterForm"
import "../../styles/Auth/Auth.css"
import { useNavigate } from "react-router-dom"

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [theme, setTheme] = useState("dark")
  const navigate = useNavigate()

  // ✅ CHECK AUTH (WITH EXPIRY)
  useEffect(() => {
    const token = localStorage.getItem("token")
    const expiry = localStorage.getItem("expiry")

    if (token && expiry && Date.now() < Number(expiry)) {
      navigate("/chat")
    }

    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) setTheme(savedTheme)
  }, [navigate])

  // ✅ APPLY THEME
  useEffect(() => {
    document.body.className = theme
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"))
  }

  return (
    <div className={`auth-container ${theme}`}>

      {/* 🌙 THEME TOGGLE */}
      <div className="theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? <FiSun /> : <FiMoon />}
      </div>

      {/* LEFT PANEL */}
      <div className="auth-left">
        <div className="brand-left">
          <div className="chat-logo">💬</div>
          <h1 className="brand-title-left">Welcome to Ping Up!</h1>
          <p className="brand-tagline-left">
            "Apni Dhun mein Rehta hun"
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">
        <div className="tabs">
          <span
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Existing User
          </span>

          <span
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            New User
          </span>
        </div>

        <div className="form">
          {isLogin ? (
            <LoginForm />
          ) : (
            <RegisterForm switchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </div>

    </div>
  )
}

export default AuthPage