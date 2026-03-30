import { useState, useRef, useEffect } from "react"
import { saveUser, userExists } from "../../utils/auth"
import { FiEye, FiEyeOff } from "react-icons/fi"

type Props = {
  switchToLogin: () => void
}

const RegisterForm = ({ switchToLogin }: Props) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // 🔥 refs for focus control
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)

  // 🔥 auto focus
  useEffect(() => {
    nameRef.current?.focus()
  }, [])

  const passwordsMatch =
    confirmPassword === "" || password === confirmPassword

  const handleRegister = () => {
    setError("")

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields")
      return
    }

    if (userExists(email)) {
      setError("User already exists")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    saveUser({ name, email, password })

    alert("Account created successfully!")

    switchToLogin()
  }

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault()
        handleRegister()
      }}
    >
      <h2 className="form-title">Create account</h2>

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

      {/* NAME */}
      <input
        ref={nameRef}
        type="text"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            emailRef.current?.focus()
          }
        }}
      />

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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              confirmPasswordRef.current?.focus()
            }
          }}
        />
        <span onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </span>
      </div>

      {/* CONFIRM PASSWORD */}
      <div className="password-box">
        <input
          ref={confirmPasswordRef}
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          className={!passwordsMatch ? "input-error" : ""}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <span onClick={() =>
          setShowConfirmPassword(!showConfirmPassword)
        }>
          {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
        </span>
      </div>

      {/* LIVE ERROR */}
      {!passwordsMatch && (
        <p className="error-text">Passwords do not match</p>
      )}

      {error && <p className="error-text">{error}</p>}

      <button className="submit-btn" type="submit">
        Create Account →
      </button>
    </form>
  )
}

export default RegisterForm