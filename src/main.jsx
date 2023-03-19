import React from "react";
import ReactDOM from "react-dom/client";

//Pages
import MainPage from "./pages/MainPage";
import TestPage from "./pages/TestPage";
import ProductPage from "./pages/ProductPage";
import ProductsListPage from "./pages/ProductsListPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ShoppingCart from "./pages/ShoppingCart";
import Layout from "./pages/Layout";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShopContextProvider } from "./context/shop-context";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <ShopContextProvider>
      <BrowserRouter>
      <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/mbt" element={<TestPage />} />
            <Route path="/fbt" element={<ProductPage />} />
            <Route path="/products/" element={<ProductsListPage />} />
            <Route path="/products/:category" element={<ProductsListPage />} />
            <Route path="/item/:product" element={<ProductPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<ShoppingCart/>}/>
            <Route path="*" element={<MainPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ShopContextProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
