import { useEffect, useState, useContext } from "react"; // Thêm useContext
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext"; // Import CartContext

// Dùng lại interface Product
interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    brand: string;
    description: string;
}

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Lấy context của giỏ hàng
    const cartContext = useContext(CartContext);

    // Kiểm tra xem context có tồn tại không để tránh lỗi
    if (!cartContext) {
        throw new Error("ProductDetail phải được sử dụng bên trong CartProvider");
    }
    const { addToCart } = cartContext; // Lấy hàm addToCart từ context

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:3000/products/${id}`)
                .then(res => res.json())
                .then(data => {
                    setProduct(data);
                })
                .catch(err => console.error("Lỗi tải chi tiết sản phẩm:", err))
                .finally(() => setIsLoading(false));
        }
    }, [id]);

    // Hàm xử lý khi nhấn nút "Thêm vào giỏ hàng"
    const handleAddToCart = () => {
        if (product) {
            // Tạo đối tượng sản phẩm để thêm vào giỏ
            const productToAdd = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
            };
            addToCart(productToAdd); // Gọi hàm từ context
        }
    };

    if (isLoading) {
        return <div className="container text-center my-5"><h2>Đang tải...</h2></div>;
    }

    if (!product) {
        return <div className="container text-center my-5"><h2>Không tìm thấy sản phẩm.</h2></div>;
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6">
                    <img src={product.image} alt={product.name} className="img-fluid rounded shadow-sm" />
                </div>
                <div className="col-md-6">
                    <h1>{product.name}</h1>
                    <p className="fs-5">Thương hiệu: <span className="fw-bold">{product.brand}</span></p>
                    <p className="fs-2 fw-bold" style={{ color: 'var(--primary-red)' }}>
                        {product.price.toLocaleString('vi-VN')} ₫
                    </p>
                    <p className="mt-3">{product.description || "Sản phẩm này chưa có mô tả chi tiết."}</p>
                    {/* Gắn sự kiện onClick cho button */}
                    <button className="btn btn-cs-primary btn-lg mt-3" onClick={handleAddToCart}>
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;