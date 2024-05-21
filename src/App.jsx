import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import PostCard from "./components/PostCard";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import UpdatePost from "./pages/UpdatePost";



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />

        <div className="w-50 m-auto mt-3 mb-6">


          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post" element={<UpdatePost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>






        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
