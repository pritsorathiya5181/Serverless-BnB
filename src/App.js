import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Chatbot from "./components/ChatBot";
import Orders from "./components/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Forgot from "./pages/forgot";
import Reset from "./pages/reset";
import NotFound from "./pages/404";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 sm:px-32 px-12 py-12 bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="*" element={<NotFound />} />

            {/* <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/orders" element={<Orders />} /> */}
          </Routes>
        </div>
        <ToastContainer />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
