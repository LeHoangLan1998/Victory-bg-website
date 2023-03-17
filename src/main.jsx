import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./pages/MainPage";
import TestPage from "./pages/TestPage";
import ProductPage from "./pages/ProductPage";
import ProductsListPage from "./pages/ProductsListPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";

import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<MainPage />} />
        <Route path="/mbt" element={<TestPage />} />
        <Route path="/fbt" element={<ProductPage />} />
        <Route path="/products/" element={<ProductsListPage />} />
        <Route path="/products/:category" element={<ProductsListPage />} />
        <Route path="/item/:product" element={<ProductPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<MainPage />} />
      </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
