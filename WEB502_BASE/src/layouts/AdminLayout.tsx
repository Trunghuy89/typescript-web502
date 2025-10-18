import { Outlet, Link } from "react-router-dom";
import "../App.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout d-flex min-vh-100">
      {/* Sidebar */}
      <aside className="bg-dark text-white p-3" style={{ width: "250px" }}>
        <h4 className="fw-bold mb-4 text-center">Admin </h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/admin/list" className="nav-link text-white">
               Danh sách sản phẩm
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/add" className="nav-link text-white">
              Thêm sản phẩm
            </Link>
          </li>
          <li className="nav-item mt-4">
            <Link to="/" className="btn btn-outline-light w-100">
              Quay lại trang người dùng
            </Link>
          </li>
        </ul>
      </aside>

      {/* Nội dung chính */}
      <main className="flex-fill p-4 bg-light">
        <h3 className="mb-4 text-center"> quản trị sản phẩm </h3>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
