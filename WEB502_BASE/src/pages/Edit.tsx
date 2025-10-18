import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Dùng lại interface Product
interface Product {
    id?: number;
    name: string;
    price: number;
    brand: string;
    image: string;
    description: string;
}

function Edit() {
    const { id } = useParams(); // Lấy 'id' từ URL, ví dụ: /admin/edit/1
    const [form, setForm] = useState<Product | null>(null);
    const navigate = useNavigate();

    // 1. Lấy dữ liệu sản phẩm cần sửa về và điền vào form
    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`)
            .then(res => res.json())
            .then(data => setForm(data))
            .catch(err => console.error(err));
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (form) {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    // 2. Gửi dữ liệu cập nhật lên server
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form) return;

        try {
            const res = await fetch(`http://localhost:3000/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error("Cập nhật sản phẩm thất bại");
            
            alert("Cập nhật sản phẩm thành công!");
            navigate('/admin/list'); // Quay về trang danh sách
        } catch (err: any) {
            alert(err.message);
        }
    };

    if (!form) return <div>Đang tải...</div>;

    return (
        <div className="container mt-4">
            <h2>Cập nhật sản phẩm</h2>
            <form onSubmit={handleSubmit} className="card p-3">
                <div className="mb-2">
                    <label>Tên sản phẩm</label>
                    <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="mb-2">
                    <label>Giá</label>
                    <input type="number" className="form-control" name="price" value={form.price} onChange={handleChange} required />
                </div>
                <div className="mb-2">
                    <label>Thương hiệu</label>
                    <input type="text" className="form-control" name="brand" value={form.brand} onChange={handleChange} />
                </div>
                <div className="mb-2">
                    <label>Mô tả</label>
                    <textarea className="form-control" name="description" value={form.description} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-warning">Cập nhật</button>
            </form>
        </div>
    );
}

export default Edit;