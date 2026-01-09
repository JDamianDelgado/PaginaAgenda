import { Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Login } from "./Pages/Login";
import { Planes } from "./Pages/Planes";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}
function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="layout">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/planes" element={<Planes />} />
          {/* <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} /> */}
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
