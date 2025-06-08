

const ProductCard = ({ product, onDelete, onUpdate }) => {

  return (
    <div className="card h-100">
      <img
        src={product.image}
        className="card-img-top"
        alt={product.name}
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">
            Price: <strong>${product.price}</strong>
          </p>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-primary" onClick={onUpdate}>Edit</button>
          <button className="btn btn-danger" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;