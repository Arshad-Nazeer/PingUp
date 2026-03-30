// import { useState, useRef, useEffect } from "react"
// import { loginUser } from "../../utils/auth"
// import { useNavigate } from "react-router-dom"
// import { FiEye, FiEyeOff } from "react-icons/fi"

// const LoginForm = () => {
//   const navigate = useNavigate()

//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [remember, setRemember] = useState(false)
//   const [error, setError] = useState("")
//   const [showPassword, setShowPassword] = useState(false)

//   const passwordRef = useRef<HTMLInputElement>(null)
//   const emailRef = useRef<HTMLInputElement>(null)

//   // 🔥 Auto focus email on load (optional but nice UX)
//   useEffect(() => {
//     emailRef.current?.focus()
//   }, [])

//   const handleLogin = () => {
//     setError("")

//     const user = loginUser(email, password)

//     if (!user) {
//       setError("Invalid email or password")
//       return
//     }

//     const token = "fake-jwt-token"

//     if (remember) {
//       localStorage.setItem("token", token)
//     }

//     localStorage.setItem("currentUser", JSON.stringify(user))

//     navigate("/chat")
//   }

//   return (
//     <form
//       className="form"
//       onSubmit={(e) => {
//         e.preventDefault()
//         handleLogin()
//       }}
//     >
//       <h2 className="form-title">Get Started PingUp!</h2>

//       {/* <button type="button" className="google-btn">
//         Continue with Google
//       </button> */}
//       <button type="button" className="google-btn">
//   Continue with
//   <svg className="google-inline-icon" viewBox="0 0 48 48">
//     <path fill="#EA4335" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.61l6.85-6.85C35.9 2.68 30.39 0 24 0 14.61 0 6.4 5.48 2.56 13.44l7.98 6.2C12.32 13.5 17.7 9.5 24 9.5z"/>
//     <path fill="#4285F4" d="M46.1 24.5c0-1.64-.15-3.22-.43-4.75H24v9h12.4c-.53 2.85-2.1 5.27-4.48 6.89l6.9 5.37C43.9 37.2 46.1 31.4 46.1 24.5z"/>
//     <path fill="#FBBC05" d="M10.54 28.64A14.5 14.5 0 0 1 9.5 24c0-1.61.28-3.16.77-4.64l-7.98-6.2A23.94 23.94 0 0 0 0 24c0 3.82.92 7.43 2.56 10.56l7.98-6.2z"/>
//     <path fill="#34A853" d="M24 48c6.48 0 11.92-2.14 15.9-5.8l-6.9-5.37c-1.92 1.3-4.38 2.07-9 2.07-6.3 0-11.68-4-13.46-9.64l-7.98 6.2C6.4 42.52 14.61 48 24 48z"/>
//   </svg>
// </button>

//       <div className="divider">or</div>

//       {/* EMAIL */}
//       <input
//         ref={emailRef}
//         type="email"
//         placeholder="Email address"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         onKeyDown={(e) => {
//           if (e.key === "Enter") {
//             e.preventDefault()
//             passwordRef.current?.focus()
//           }
//         }}
//       />

//       {/* PASSWORD */}
//       <div className="password-box">
//         <input
//           ref={passwordRef}
//           type={showPassword ? "text" : "password"}
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <span onClick={() => setShowPassword(!showPassword)}>
//           {showPassword ? <FiEyeOff /> : <FiEye />}
//         </span>
//       </div>

//       {error && <p className="error-text">{error}</p>}

//       <div className="extra">
//         <label>
//           <input
//             type="checkbox"
//             checked={remember}
//             onChange={() => setRemember(!remember)}
//           />
//           Remember me
//         </label>
//       </div>

//       <button className="submit-btn" type="submit">
//         Log In →
//       </button>
//     </form>
//   )
// }

// export default LoginForm

import { useState, useRef, useEffect } from "react"
import { loginUser, saveSession } from "../../utils/auth"
import { useNavigate } from "react-router-dom"
import { FiEye, FiEyeOff } from "react-icons/fi"

const LoginForm = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const passwordRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  // ✅ Autofocus email
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const handleLogin = () => {
    setError("")

    if (!email || !password) {
      setError("Please fill all fields")
      return
    }

    const user = loginUser(email, password)

    if (!user) {
      setError("Invalid email or password")
      return
    }

    // ✅ SAVE SESSION (JWT SIMULATION)
    saveSession(email, remember)

    // ✅ STORE CURRENT USER
    localStorage.setItem("currentUser", JSON.stringify(user))

    navigate("/chat")
  }

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault()
        handleLogin()
      }}
    >
      <h2 className="form-title">Get Started PingUp!</h2>

      {/* GOOGLE BUTTON */}
      <button type="button" className="google-btn">
        Continue with
        <svg className="google-inline-icon" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.61l6.85-6.85C35.9 2.68 30.39 0 24 0 14.61 0 6.4 5.48 2.56 13.44l7.98 6.2C12.32 13.5 17.7 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.1 24.5c0-1.64-.15-3.22-.43-4.75H24v9h12.4c-.53 2.85-2.1 5.27-4.48 6.89l6.9 5.37C43.9 37.2 46.1 31.4 46.1 24.5z"/>
          <path fill="#FBBC05" d="M10.54 28.64A14.5 14.5 0 0 1 9.5 24c0-1.61.28-3.16.77-4.64l-7.98-6.2A23.94 23.94 0 0 0 0 24c0 3.82.92 7.43 2.56 10.56l7.98-6.2z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.92-2.14 15.9-5.8l-6.9-5.37c-1.92 1.3-4.38 2.07-9 2.07-6.3 0-11.68-4-13.46-9.64l-7.98 6.2C6.4 42.52 14.61 48 24 48z"/>
        </svg>
      </button>

      <div className="divider">or</div>

      {/* EMAIL */}
      <input
        ref={emailRef}
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            passwordRef.current?.focus()
          }
        }}
      />

      {/* PASSWORD */}
      <div className="password-box">
        <input
          ref={passwordRef}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </span>
      </div>

      {/* ERROR */}
      {error && <p className="error-text">{error}</p>}

      {/* REMEMBER ME */}
      <div className="extra">
        <label>
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          Remember me
        </label>
      </div>

      {/* SUBMIT */}
      <button className="submit-btn" type="submit">
        Log In →
      </button>
    </form>
  )
}

export default LoginForm