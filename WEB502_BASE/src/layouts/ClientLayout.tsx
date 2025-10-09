import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const ClientLayout = () => {
  return (
    <div className="client-layout bg-light">
      {/* Header */}
      <header className="bg-dark text-white py-3 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/" className="text-white fw-bold fs-4 text-decoration-none">
            📱 FPT Shop
          </Link>
          <nav>
            <Link to="/" className="text-white mx-3 text-decoration-none">
              Trang chủ
            </Link>
            <Link to="/about" className="text-white mx-3 text-decoration-none">
              Giới thiệu
            </Link>
            <Link to="/admin/list" className="btn btn-warning btn-sm">
              Quản trị
            </Link>
          </nav>
        </div>
      </header>

      {/* Nội dung */}
      <main className="container my-5">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        © 2025 FPT Shop — Thiết kế bởi Nguyễn Trung Huy ✨
      </footer>
    </div>
  );
};

export default ClientLayout;
