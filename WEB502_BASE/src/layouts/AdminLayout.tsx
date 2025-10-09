import { Outlet, Link } from "react-router-dom";
import "../App.css";

const AdminLayout = () => {
  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h4 className="sidebar-title">Admin Panel</h4>
        <ul className="sidebar-menu">
          <li>
            <Link to="/admin/list">Danh sách</Link>
          </li>
          <li>
            <Link to="/admin/add">Thêm sản phẩm</Link>
          </li>
          <li>
            <Link to="/">Trang người dùng</Link>
          </li>
        </ul>
      </aside>

      {/* Nội dung chính */}
      <div className="admin-content">
        <h4 className="admin-header">Khu vực quản trị</h4>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
