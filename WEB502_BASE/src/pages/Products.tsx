import { useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const allProducts: Product[] = [
  { id: 1, name: "iPhone 16 Pro", price: 30000000, image: "https://via.placeholder.com/200x150" },
  { id: 2, name: "Samsung Galaxy S24", price: 25000000, image: "https://via.placeholder.com/200x150" },
  { id: 3, name: "Xiaomi 15T", price: 15000000, image: "https://via.placeholder.com/200x150" },
  { id: 4, name: "OPPO Find X7", price: 20000000, image: "https://via.placeholder.com/200x150" },
  { id: 5, name: "Vivo X100", price: 18000000, image: "https://via.placeholder.com/200x150" },
  { id: 6, name: "Realme GT Neo", price: 12000000, image: "https://via.placeholder.com/200x150" },
  { id: 7, name: "Asus ROG Phone 8", price: 25000000, image: "https://via.placeholder.com/200x150" },
  { id: 8, name: "Nokia XR21", price: 10000000, image: "https://via.placeholder.com/200x150" },
  { id: 9, name: "Sony Xperia 1 VI", price: 22000000, image: "https://via.placeholder.com/200x150" },
  { id: 10, name: "Huawei P70", price: 19000000, image: "https://via.placeholder.com/200x150" },
];

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Tính index sản phẩm hiển thị
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = allProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(allProducts.length / productsPerPage);

  return (
    <div>
      <h2 className="mb-4">Danh sách sản phẩm</h2>
      <div className="row g-4">
        {currentProducts.map((p) => (
          <div className="col-md-3" key={p.id}>
            <div className="card h-100 shadow-sm">
              <img src={p.image} className="card-img-top" alt={p.name} />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">Giá: {p.price.toLocaleString()}đ</p>
                <Link to={`/products/${p.id}`} className="btn btn-accent">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          {[...Array(totalPages)].map((_, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Products;
