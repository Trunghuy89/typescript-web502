import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { useContext } from 'react'; // Thêm import useContext
import { CartContext } from '../context/CartContext'; // Thêm import CartContext

const ClientLayout = () => {
  // Lấy dữ liệu từ CartContext
  const cartContext = useContext(CartContext);

  
  const cartItemCount = cartContext?.cartItems.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <div className="client-layout">
      {/* Header */}
      <header style={{ backgroundColor: 'var(--primary-red)' }} className="text-white py-3 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/" className="text-white fw-bold fs-4 text-decoration-none">
            Trung huy shop
          </Link>
          <nav className="d-flex align-items-center">
            <Link to="/" className="text-white mx-3 text-decoration-none">
              Trang chủ
            </Link>
            <Link to="/about" className="text-white mx-3 text-decoration-none">
              Giới thiệu
            </Link>
            <Link to="/admin/list" className="btn btn-outline-light btn-sm me-2">
              Quản trị
            </Link>

            {/* THÊM LINK VÀ SỐ LƯỢNG GIỎ HÀNG */}
            <Link to="/cart" className="btn btn-outline-light btn-sm me-2 position-relative">
              Giỏ hàng
              {cartItemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light text-danger border border-white">
                  {cartItemCount}
                  <span className="visually-hidden">sản phẩm trong giỏ</span>
                </span>
              )}
            </Link>
            
            <Link to="/login" className="btn btn-outline-light btn-sm me-2">
              Đăng Nhập
              
            </Link>
            <Link to="/register" className="btn btn-light btn-sm">
              Đăng Ký
            </Link>
          </nav>
        </div>
      </header>

      {/* Nội dung trang */}
      <main className="container my-5">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4 mt-auto">
        © 2025 FPT Shop — Thiết kế bởi Nguyễn Trung Huy
      </footer>
    </div>
  );
};

export default ClientLayout;