import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phone || !password) {
            alert('Vui lòng nhập số điện thoại và mật khẩu!');
            return;
        }

        try {
            // Tìm người dùng có SĐT và Mật khẩu khớp
            const response = await fetch(`http://localhost:3000/users?phone=${phone}&password=${password}`);
            const users = await response.json();

            if (users.length > 0) {
                // Đăng nhập thành công
                alert('Đăng nhập thành công!');
                // Bạn có thể lưu thông tin người dùng vào localStorage ở đây nếu cần
                // localStorage.setItem('user', JSON.stringify(users[0]));
                navigate('/'); // Chuyển về trang Home
            } else {
                // Sai thông tin
                alert('Số điện thoại hoặc mật khẩu không đúng. Vui lòng thử lại!');
            }
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            alert('Đã có lỗi xảy ra.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Đăng Nhập</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Số điện thoại</label>
                                    <input type="tel" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Mật khẩu</label>
                                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-success w-100">Đăng Nhập</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;