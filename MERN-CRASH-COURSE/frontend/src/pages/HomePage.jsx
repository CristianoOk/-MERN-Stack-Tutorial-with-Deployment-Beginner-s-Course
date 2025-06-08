import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import { useEffect, useState } from "react"; 
import ProductCard from "../components/ProductCard";
import UpdateModal from "../components/UpdateModal";

const HomePage = () => {
  const { fetchProducts, products, deleteProduct, updateProduct } = useProductStore();

  const [alert, setAlert] = useState({ type: "", message: "" });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDeleteProduct = async (pid) => {
    try {
      const { success, message } = await deleteProduct(pid);

      setAlert({
        type: success ? "success" : "danger",
        message,
      });

      setTimeout(() => {
        setAlert({ type: "", message: "" });
      }, 4000);
    } catch (error) {
      setAlert({ type: "danger", message: "Unexpected error occurred." });
      setTimeout(() => {
        setAlert({ type: "", message: "" });
      }, 4000);
    }
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleUpdate = async (updatedProduct) => {
  const { success, message } = await updateProduct(updatedProduct._id, updatedProduct);

  console.log("✅ Update result:", success, message); // <-- esto agregalo

  setAlert({ type: success ? "success" : "danger", message });

  // ✅ Cerrás el modal solo si fue exitoso
  if (success) {
    setShowModal(false);
  }

  setTimeout(() => setAlert({ type: "", message: "" }), 4000);

  return { success };
};



  return (
    <div className="container mt-4">
      <h1 className="text-center">Current Products 🚀</h1>

      {/* ✅ alerta visible solo si hay mensaje */}
      {alert.message && (
        <div className="d-flex justify-content-center">
          <div
            className={`alert alert-${alert.type} d-flex align-items-center shadow rounded-pill px-4 py-2 small`}
            role="alert"
            style={{ maxWidth: "400px" }}
          >
            {alert.type === "success" ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-circle-fill me-2" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 11.03a.75.75 0 0 0 1.07 0l3.992-3.993a.75.75 0 1 0-1.06-1.06L7.5 9.439 6.1 8.03a.75.75 0 1 0-1.06 1.06l1.93 1.94z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-exclamation-triangle-fill me-2" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.964 0L.165 13.233c-.457.778.091 1.767.982 1.767h13.707c.89 0 1.438-.99.982-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1-2.002 0 1 1 0 0 1 2.002 0z"/>
              </svg>
            )}
            <div>{alert.message}</div>
          </div>
        </div>
      )}

      {products.length === 0 ? (
        <p className="text-center mt-4">
          No product found 😢{" "}
          <Link to="/create" className="text-decoration-underline text-primary">
            Create a product
          </Link>
        </p>
      ) : (
        <div className="row g-3">
          {products.map((product) => (
            <div className="col-md-4" key={product._id}>
              <ProductCard
                product={product}
                onDelete={() => handleDeleteProduct(product._id)}
                onUpdate={() => handleOpenModal(product)}
              />
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <UpdateModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          product={selectedProduct}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default HomePage;
