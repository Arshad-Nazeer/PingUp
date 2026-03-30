// import { BrowserRouter, Routes, Route } from "react-router-dom"
// import AuthPage from "./pages/Auth/AuthPage"
// import ChatPage from "./pages/Chat/ChatPage"

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<AuthPage />} />
//         <Route path="/chat" element={<ChatPage />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthPage from "./pages/Auth/AuthPage"
import ChatPage from "./pages/Chat/ChatPage"
import ProfilePage from "./pages/Profile/ProfilePage"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<AuthPage />} />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App