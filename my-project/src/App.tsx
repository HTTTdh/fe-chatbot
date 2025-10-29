import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import ConfigChatbot from "./pages/ConfigChatbot";
import { DataChatbot } from "./pages/DataChatbot";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/quan-ly-nguoi-dung" element={<UserPage />} />
            <Route path="/cau-hinh-he-thong" element={<ConfigChatbot />} />
            <Route path="/du-lieu-chatbot" element={<DataChatbot />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
