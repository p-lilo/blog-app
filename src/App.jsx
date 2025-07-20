import { useState } from "react";
import { Route, Routes } from "react-router";
import NavBar from "./components/NavBar";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/Edit";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PostPage from "./pages/PostPage";
import Register from "./pages/Register";



function App() {
const [user, setUser] = useState(null);
  return (
    <>
    <NavBar user={user} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<AddPost />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/edit/:id" element={<EditPost />} />
      <Route path="/post/:id" element={<PostPage  />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App
