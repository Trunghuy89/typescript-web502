import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Định nghĩa cấu trúc dữ liệu của sản phẩm
interface ProductForm {
    name: string;
    price: number;
    brand: string;
    image: string;
    description: string;
}

// Giá trị ban đầu cho form
const initialFormState: ProductForm = {
    name: "",
    price: 0,
    brand: "",
    image: "https://topesdegama.com/app/uploads-topesdegama.com/2025/03/xiaomi-15t-pro-filtraciones-3.jpg",
    description: ""
};

function Add() {
    // State để lưu trữ dữ liệu người dùng nhập vào form
    const [form, setForm] = useState<ProductForm>(initialFormState);
    // Hook để điều hướng trang
    const navigate = useNavigate();

    // Hàm được gọi mỗi khi người dùng thay đổi giá trị trong các ô input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: name === 'price' ? parseFloat(value) : value // Đảm bảo giá là số
        });
    };

    // Hàm được gọi khi người dùng nhấn nút submit form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Ngăn trình duyệt tải lại trang

        if (!form.name || form.price <= 0) {
            alert("Tên sản phẩm và giá là bắt buộc, giá phải lớn hơn 0.");
            return;
        }

        try {
            // Gửi dữ liệu lên json-server
            const res = await fetch("http://localhost:3000/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error("Thêm sản phẩm thất bại");
            
            alert("Thêm sản phẩm thành công!");
            navigate('/admin/list'); // Quay về trang danh sách sau khi thêm thành công
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Thêm sản phẩm mới</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Tên sản phẩm</label>
                    <input type="text" className="form-control" id="name" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Giá</label>
                    <input type="number" className="form-control" id="price" name="price" value={form.price} onChange={handleChange} required min="1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="brand" className="form-label">Thương hiệu</label>
                    <input type="text" className="form-control" id="brand" name="brand" value={form.brand} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Mô tả</label>
                    <textarea className="form-control" id="description" name="description" value={form.description} onChange={handleChange} rows={3} />
                </div>
                <button type="submit" className="btn btn-success w-100">Thêm mới</button>
            </form>
        </div>
    );
}

export default Add;