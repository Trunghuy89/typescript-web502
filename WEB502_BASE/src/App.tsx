import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import ClientLayout from "./layouts/ClientLayout";
import AdminLayout from "./layouts/AdminLayout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";

// Import trang giỏ hàng
import CartPage from "./pages/CartPage";

function App() {
  return (
    <>
      <Routes>
        {/* Layout cho người dùng */}
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="products/:id" element={<ProductDetail />} />
          {/* Kích hoạt route cho trang giỏ hàng */}
          <Route path="cart" element={<CartPage />} />
        </Route>

        {/* Layout cho quản trị viên */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="list" element={<List />} />
          <Route path="add" element={<Add />} />
          <Route path="edit/:id" element={<Edit />} />
        </Route>
        
        {/* Route không có layout chung */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;