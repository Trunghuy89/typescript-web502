import { useParams, Link } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Product Detail - ID: {id}</h2>
      <p>Thông tin chi tiết về sản phẩm {id} sẽ được hiển thị tại đây.</p>
      <Link to="/products" className="btn btn-secondary">
        Back to Products
      </Link>
    </div>
  );
};

export default ProductDetail;
