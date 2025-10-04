import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/products?_page=${page}&_per_page=8&title=${search}`);
        setProducts(res.data.data || res.data); 
        setTotalPages(res.data.totalPages || 1); 
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [page, search]);

  return (
    <div className="container mt-4">
      <h2>Danh sách sản phẩm</h2>

      {/* Ô tìm kiếm */}
      <input
        className="form-control mb-3"
        placeholder="Nhập tên sản phẩm..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Bảng sản phẩm */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={p.id}>
              <td>{i + 1}</td>
              <td>{p.title}</td>
              <td>{p.price} VNĐ</td>
              <td>
                <Link to={`/products/${p.id}`} className="btn btn-sm btn-info">
                  Xem chi tiết
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="d-flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`btn ${page === i + 1 ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Products;
