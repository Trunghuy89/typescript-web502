import { useEffect, useState } from "react";

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
  const [form, setForm] = useState<Product>({
    name: "",
    price: 0,
    brand: "",
    image: "https://topesdegama.com/app/uploads-topesdegama.com/2025/03/xiaomi-15t-pro-filtraciones-3.jpg",
    description: ""
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  // 🔹 Lấy danh sách sản phẩm
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // 🔹 Xử lý nhập form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Thêm sản phẩm
  const handleAdd = async () => {
    const res = await fetch("http://localhost:3001/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const newProduct = await res.json();
    setProducts([...products, newProduct]);
    setForm({ name: "", price: 0, brand: "", image: form.image, description: "" });
  };

  // 🔹 Xóa sản phẩm
  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3001/products/${id}`, { method: "DELETE" });
    setProducts(products.filter((p) => p.id !== id));
  };

  // 🔹 Bắt đầu sửa
  const handleEdit = (product: Product) => {
    setEditingId(product.id!);
    setForm(product);
  };

  // 🔹 Lưu sau khi sửa
  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:3001/products/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const updated = await res.json();
    setProducts(products.map((p) => (p.id === editingId ? updated : p)));
    setEditingId(null);
    setForm({ name: "", price: 0, brand: "", image: form.image, description: "" });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Quản lý sản phẩm</h2>

      {/* Form thêm/sửa */}
      <div className="card p-3 mb-4">
        <h5>{editingId ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}</h5>
        <input
          type="text"
          className="form-control mb-2"
          name="name"
          placeholder="Tên sản phẩm"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="number"
          className="form-control mb-2"
          name="price"
          placeholder="Giá"
          value={form.price}
          onChange={handleChange}
        />
        <input
          type="text"
          className="form-control mb-2"
          name="brand"
          placeholder="Thương hiệu"
          value={form.brand}
          onChange={handleChange}
        />
        <textarea
          className="form-control mb-2"
          name="description"
          placeholder="Mô tả sản phẩm"
          value={form.description}
          onChange={handleChange}
        />
        <button
          className={`btn ${editingId ? "btn-warning" : "btn-success"} me-2`}
          onClick={editingId ? handleUpdate : handleAdd}
        >
          {editingId ? "Cập nhật" : "Thêm mới"}
        </button>
        {editingId && (
          <button className="btn btn-secondary" onClick={() => setEditingId(null)}>
            Hủy
          </button>
        )}
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
              <td>
                <img src={p.image} alt={p.name} width={80} />
              </td>
              <td>{p.name}</td>
              <td>{p.price.toLocaleString()} ₫</td>
              <td>{p.brand}</td>
              <td>{p.description}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(p)}>
                  Sửa
                </button>
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
