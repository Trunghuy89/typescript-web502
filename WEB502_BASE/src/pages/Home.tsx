import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const limit = 8; // 8 sản phẩm 1 trang

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products?_page=${page}&_limit=${limit}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, [page]);

  return (
    <div className="container">
      <h1 className="text-primary mb-4">Welcome to MyShop</h1>
      <p className="mb-4">Sản phẩm mới nhất dành cho bạn</p>

      <div className="row">
        {products.map((p) => (
          <div className="col-md-3 mb-4" key={p.id}>
            <div className="card h-100">
              <img src={p.image} className="card-img-top" alt={p.name} />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.price.toLocaleString()}₫</p>
                <Link to={`/products/${p.id}`} className="btn btn-primary">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-secondary me-2"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Trang trước
        </button>
        <button className="btn btn-secondary" onClick={() => setPage(page + 1)}>
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default Home;
