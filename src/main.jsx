import React from 'react'
import ReactDOM from 'react-dom/client'
import MainPage from './pages/MainPage'
import TestPage from './pages/TestPage'
import ProductPage from './pages/ProductPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/mbt" element={<TestPage/>}/>
        <Route path="/fbt" element={<ProductPage/>}/>
        <Route path="/products/:product" element={<ProductPage/>}/>
        <Route path="*" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
