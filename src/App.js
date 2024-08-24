import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import PostCard from "./components/PostCard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the Toast CSS
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import UpdateBlog from "./pages/UpdateBlog";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />

        <div className="w-50 m-auto mt-3 mb-6">


          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-blog" element={<CreateBlog />} />
            <Route path="/blog-details/:blog_id" element={<BlogDetails/>}/>
            <Route path="/update-blog/:blog_id" element={<UpdateBlog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>






        </div>
      </div>
      <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;
