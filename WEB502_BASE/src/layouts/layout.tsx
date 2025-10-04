import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout-root">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark header-nav">
        <div className="container">
          <Link className="navbar-brand logo" to="/">FPT Shop</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto nav-links">
              <li className="nav-item">
                <Link className="nav-link" to="/">Trang chủ</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">Sản phẩm</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/news">Tin tức</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">Giới thiệu</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Nội dung chính */}
      <main className="container content-main mt-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="footer bg-dark text-light py-4 mt-5">
        <div className="container text-center">
          <p>© 2025 FPT Shop — All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
