import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // 1. Kiểm tra rỗng
        if (!name || !phone || !email || !password) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        // 2. Kiểm tra SĐT có phải là số không
        if (!/^\d+$/.test(phone)) {
            alert('Số điện thoại chỉ được chứa các ký tự số!');
            return;
        }

        // 3. Kiểm tra độ dài mật khẩu
        if (password.length < 6) {
            alert('Mật khẩu phải có ít nhất 6 ký tự!');
            return;
        }

        const newUser = { name, phone, email, password };

        try {
            // Kiểm tra xem SĐT đã tồn tại chưa
            const checkPhone = await fetch(`http://localhost:3000/users?phone=${phone}`);
            const phoneExist = await checkPhone.json();
            if (phoneExist.length > 0) {
                alert('Số điện thoại này đã được sử dụng!');
                return;
            }

            // Gửi dữ liệu đăng ký
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });
            
            if (response.ok) {
                alert('Đăng ký thành công!');
                navigate('/login'); // Chuyển hướng về trang đăng nhập
            } else {
                alert('Đã có lỗi xảy ra. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Lỗi đăng ký:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="text-center mb-4">Đăng Ký</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Họ và Tên</label>
                                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Số điện thoại</label>
                                    <input type="tel" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Mật khẩu</label>
                                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Đăng Ký</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;