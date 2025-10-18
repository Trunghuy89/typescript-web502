import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function CartPage() {
    const cartContext = useContext(CartContext);

    if (!cartContext) {
        throw new Error("Lỗi Context Giỏ hàng");
    }

    const { cartItems, removeFromCart, updateQuantity } = cartContext;

    // Tính tổng tiền
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="container my-5">
            <h2 className="mb-4">Giỏ Hàng Của Bạn</h2>

            {cartItems.length === 0 ? (
                <div className="text-center">
                    <p>Chưa có sản phẩm nào trong giỏ hàng.</p>
                    <Link to="/" className="btn btn-cs-primary">Tiếp tục mua sắm</Link>
                </div>
            ) : (
                <>
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: '50%' }}>Sản phẩm</th>
                                <th scope="col">Đơn giá</th>
                                <th scope="col" className="text-center">Số lượng</th>
                                <th scope="col" className="text-end">Thành tiền</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img src={item.image} alt={item.name} style={{ width: '80px', marginRight: '15px' }} />
                                            <span>{item.name}</span>
                                        </div>
                                    </td>
                                    <td>{item.price.toLocaleString('vi-VN')} ₫</td>
                                    <td className="text-center">
                                        <div className="input-group justify-content-center" style={{ width: '120px', margin: 'auto' }}>
                                            <button className="btn btn-outline-secondary" type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                            <input type="text" className="form-control text-center" value={item.quantity} readOnly />
                                            <button className="btn btn-outline-secondary" type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        </div>
                                    </td>
                                    <td className="text-end fw-bold">{(item.price * item.quantity).toLocaleString('vi-VN')} ₫</td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(item.id)}>Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="text-end mt-4">
                        <h3>Tổng cộng: <span className="text-danger fw-bold">{totalPrice.toLocaleString('vi-VN')} ₫</span></h3>
                        <button className="btn btn-cs-primary btn-lg mt-3 bg-black text-white">Tiến hành thanh toán</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartPage;