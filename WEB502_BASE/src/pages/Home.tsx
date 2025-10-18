import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((err) => {
                console.error("Lỗi khi tải sản phẩm:", err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <p className="text-center mt-4">Đang tải sản phẩm...</p>;
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4 fw-bold">Sản phẩm nổi bật</h2>

            <div className="row">
                {products.length > 0 ? (
                    products.map((item) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={item.id}>
                            <div className="card h-100 border-0 shadow-sm">
                                <img
                                    src={item.image}
                                    className="card-img-top p-3"
                                    alt={item.name}
                                    style={{
                                        height: "240px",
                                        objectFit: "contain", // Use contain to show the whole product
                                    }}
                                />
                                <div className="card-body text-center d-flex flex-column">
                                    <h5 className="card-title fw-semibold flex-grow-1">{item.name}</h5>
                                    <p className="fw-bold mt-2" style={{ color: 'var(--primary-red)' }}>
                                        {item.price.toLocaleString('vi-VN')} ₫
                                    </p>
                                    <Link to={`/products/${item.id}`} className="btn btn-cs-primary mt-auto">
                                        Xem chi tiết
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center mt-4 text-muted">Không có sản phẩm nào để hiển thị.</p>
                )}
            </div>
        </div>
    );
}

export default Home;