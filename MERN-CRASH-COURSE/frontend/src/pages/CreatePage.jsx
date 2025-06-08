import { useState } from "react"
import { useProductStore } from "../store/product"


const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  })

  const [alert, setAlert] = useState({ type: "", message: "" }); //Para Bootstrap

  const {createProduct} = useProductStore()
  

  const handleAddProduct = async(e) => {
    e.preventDefault();
  console.log(newProduct)
    const {success, message} = await createProduct(newProduct);
    //console.log("Success: ", success)
    //console.log("Message:", message)

    if (success) {
    setAlert({ type: "success", message });
    setNewProduct({ name: "", price: "", image: "" }); // limpiamos formulario
  } else {
    setAlert({ type: "danger", message });
  }

  // ocultar alerta después de 4 segundos
  setTimeout(() => setAlert({ type: "", message: "" }), 4000);
  }
  
  return (

  <div>

<svg xmlns="http://www.w3.org/2000/svg" className="d-none">
  <symbol id="check-circle-fill" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
  </symbol>
  <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </symbol>
</svg>

    {alert.message && (
  <div className={`alert alert-${alert.type} d-flex align-items-center`} role="alert">
    <svg className="bi flex-shrink-0 me-2" role="img" aria-label={alert.type === "success" ? "Success:" : "Danger:"}>
      <use xlinkHref={alert.type === "success" ? "#check-circle-fill" : "#exclamation-triangle-fill"} />
    </svg>
    <div>{alert.message}</div>
  </div>
) /*TODO ESTO ES POR BOOTSTRAP*/}

    <form>
      <div className="mb-3">
        <label htmlFor="productName" className="form-label">
          Product Name
        </label>
        <input
          type="text"
          className="form-control"
          id="productName"
          placeholder="Enter product name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
        />
      </div>
  
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          id="price"
          placeholder="Enter price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
        />
      </div>
  
      <div className="mb-3">
        <label htmlFor="imageUrl" className="form-label">
          Image URL
        </label>
        <input
          type="text"
          className="form-control"
          id="imageUrl"
          placeholder="Enter image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
        />
      </div>
  
      <button type="submit" className="btn btn-success" onClick={handleAddProduct}>
        Add Product
      </button>
    </form>
  </div>
);

}

export default CreatePage