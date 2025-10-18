import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Dùng Link để điều hướng

// Vẫn giữ lại interface
interface Product {
    id?: number;
    name: string;
    price: number;
    brand: string;
    image: string;
    description: string;
}

function List() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Hàm lấy dữ liệu, không đổi
    const fetchProducts = () => {
        setIsLoading(true);
        fetch("http://localhost:3000/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setError(null);
            })
            .catch((err) => setError(err.message))
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Hàm Xóa sản phẩm
    const handleDelete = async (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            try {
                const res = await fetch(`http://localhost:3000/products/${id}`, { method: "DELETE" });
                if (!res.ok) throw new Error("Xóa sản phẩm thất bại");
                // Tải lại danh sách sản phẩm sau khi xóa thành công
                fetchProducts(); 
            } catch (err: any) {
                alert(err.message);
            }
        }
    };

    if (isLoading) return <div className="container mt-4 text-center"><h2>Đang tải dữ liệu...</h2></div>;
    if (error) return <div className="container mt-4 text-center text-danger"><h2>Lỗi: {error}</h2></div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Quản lý sản phẩm</h2>
                {/* Nút để chuyển sang trang Thêm mới */}
                <Link to="/admin/add" className="btn btn-success">
                    Thêm mới sản phẩm
                </Link>
            </div>

            {/* Bảng danh sách */}
            <table className="table table-hover table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Hãng</th>
                        <th>Mô tả</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td><img src={p.image} alt={p.name} width={80} /></td>
                            <td>{p.name}</td>
                            <td>{p.price.toLocaleString()} ₫</td>
                            <td>{p.brand}</td>
                            <td>{p.description}</td>
                            <td>
                                {/* Nút Sửa sẽ điều hướng đến trang Edit */}
                                <Link to={`/admin/edit/${p.id}`} className="btn btn-sm btn-primary me-2">
                                    Sửa
                                </Link>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id!)}>
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default List;