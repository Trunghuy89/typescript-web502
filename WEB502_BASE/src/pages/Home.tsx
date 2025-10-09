import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/products") // đọc dữ liệu từ db.json
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Lỗi tải sản phẩm:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 fw-bold">📱 Danh sách sản phẩm</h2>

      <div className="row">
        {products.map((item) => (
          <div className="col-md-3 mb-4" key={item.id}>
            <div className="card h-100 shadow-sm border-0">
              <img
                src={item.image}
                className="card-img-top"
                alt={item.name}
                style={{
                  height: "220px",
                  objectFit: "cover",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              />
              <div className="card-body text-center">
                <h5 className="card-title fw-semibold">{item.name}</h5>
                <p className="text-danger fw-bold">
                  {item.price.toLocaleString()} ₫
                </p>
                <button className="btn btn-outline-primary btn-sm">
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-center mt-4 text-muted">Không có sản phẩm nào.</p>
      )}
    </div>
  );
}

export default Home;
