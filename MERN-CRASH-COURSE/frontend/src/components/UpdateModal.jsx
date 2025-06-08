import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"; //Instalé en la terminal "npm install react-bootstrap bootstrap"

const UpdateModal = ({ show, handleClose, product, handleUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
  });

  const [modalAlert, setModalAlert] = useState("");


  // 🔁 Este efecto se ejecuta cada vez que cambia "product"
  useEffect(() => {
  if (product) {
    setFormData({
      name: product.name || "",
      image: product.image || "",
      price: product.price || "",
    });
    setModalAlert(""); // 🔥 limpiamos la alerta cada vez que se abre el modal
  }
}, [product]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Validación personalizada
  if (Number(formData.price) < 0) {
    setModalAlert("Price cannot be negative ⚠️");
    return; // ❌ No ejecuta el save
  }

  setModalAlert(""); // Limpia la alerta si está todo bien
  const result = await handleUpdate({ ...product, ...formData });

  if (!result.success) {
    setModalAlert("Something went wrong. Try again.");
  }
};



  return (
    <Modal show={show} onHide={handleClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            {modalAlert && (
    <div className="alert alert-danger d-flex align-items-center shadow-sm px-3 py-2 rounded-pill small mb-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-triangle-fill me-2" viewBox="0 0 16 16">
        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.964 0L.165 13.233c-.457.778.091 1.767.982 1.767h13.707c.89 0 1.438-.99.982-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1-2.002 0 1 1 0 0 1 2.002 0z"/>
      </svg>
      {modalAlert}
    </div>
  )}
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              name="image"
              value={formData.image}
              onChange={handleChange}
              type="text"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              value={formData.price}
              onChange={handleChange}
              type="number"
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export default UpdateModal;
