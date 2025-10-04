import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Trang chủ */}
        <Route index element={<Home />} />

        {/* Trang danh sách sản phẩm */}
        <Route path="products" element={<Products />} />

        {/* Trang chi tiết sản phẩm */}
        <Route path="products/:id" element={<ProductDetail />} />

        {/* Các trang khác */}
        <Route path="news" element={<h1>Tin tức</h1>} />
        <Route path="about" element={<h1>About</h1>} />
      </Route>

      {/* Trang không tồn tại */}
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
}

export default App;
