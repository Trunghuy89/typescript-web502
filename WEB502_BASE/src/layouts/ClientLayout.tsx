import { Outlet, Link } from "react-router-dom";
import "../App.css";

const ClientLayout = () => {
  return (
    <div className="layout-root">
      {/* Header */}
      <header className="header-nav">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/" className="logo">
            FPT Shop
          </Link>
          <nav>
            <Link to="/" className="nav-link">
              Trang chủ
            </Link>
            <Link to="/users" className="nav-link">
              Người dùng
            </Link>
            <Link to="/about" className="nav-link">
              Giới thiệu
            </Link>
          </nav>
        </div>
      </header>

      {/* Nội dung */}
      <main className="content-main container mt-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="footer mt-5">
        <div className="container text-center">
          <p>© 2025 FPT Shop — All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ClientLayout;
