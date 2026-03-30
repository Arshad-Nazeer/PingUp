export type User = {
  name: string
  email: string
  password: string
  image?: string
}

// ===== DATABASE =====
export const getUsers = (): User[] => {
  return JSON.parse(localStorage.getItem("users") || "[]")
}

export const saveUser = (user: User) => {
  const users = getUsers()
  users.push(user)
  localStorage.setItem("users", JSON.stringify(users))
}

export const loginUser = (email: string, password: string) => {
  const users = getUsers()
  return users.find(
    (u) => u.email === email && u.password === password
  )
}

export const userExists = (email: string) => {
  return getUsers().some((u) => u.email === email)
}

// ===== SESSION =====
export const saveSession = (email: string, remember: boolean) => {
  const expiry = remember
    ? Date.now() + 24 * 60 * 60 * 1000
    : Date.now() + 60 * 60 * 1000

  localStorage.setItem("token", email)
  localStorage.setItem("expiry", expiry.toString())
}

export const isAuthenticated = () => {
  const token = localStorage.getItem("token")
  const expiry = localStorage.getItem("expiry")

  if (!token || !expiry) return false
  return Date.now() < Number(expiry)
}

export const logout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("expiry")
}

// ===== UPDATE USER =====
export const updateUser = (email: string, updatedData: Partial<User>) => {
  const users = getUsers()

  const updatedUsers = users.map((u) =>
    u.email === email ? { ...u, ...updatedData } : u
  )

  localStorage.setItem("users", JSON.stringify(updatedUsers))

  const currentUser = localStorage.getItem("currentUser")
  if (currentUser) {
    const parsed = JSON.parse(currentUser)
    if (parsed.email === email) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...parsed, ...updatedData })
      )
    }
  }
}

// ===== DELETE USER =====
export const deleteUser = (email: string) => {
  const users = getUsers().filter((u) => u.email !== email)
  localStorage.setItem("users", JSON.stringify(users))

  localStorage.removeItem("currentUser")
  localStorage.removeItem("token")
  localStorage.removeItem("expiry")
}