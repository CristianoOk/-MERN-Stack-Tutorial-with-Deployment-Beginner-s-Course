import {create} from "zustand"

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({products}),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return {success:false, message: "Please fill in all fields."}
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({...newProduct, price: Number(newProduct.price)})
    })
    const data = await res.json();
    set((state) => ({products: [...state.products, data.data]}));
    return {success:true, message: "Product created successfully"}
  },

  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({products: data.data});
  },

  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if(!data.success) return {success: false, message: data.message};

    set(state => ({products: state.products.filter(product => product._id !== pid)})); // puede que te preguntés el por qué de esta linea si ya estaría borrado el producto en el backend, ✔️ Ese producto se borra en la base de datos (en el servidor).❌ Pero el frontend todavía lo tiene en memoria, en el array products. El estado en el front (useProductStore().products) es una copia de lo que hay en la base de datos. Cuando borrás algo en el backend, el front no se entera a menos que vos se lo digas. Esto actualiza tu UI sin tener que volver a pedir todo el array al backend. ------ otra opición sería: await deleteProduct(pid); await fetchProducts(); // vuelve a traer todos los productos desde la DB. Esto es más costoso porque hacés otra petición al servidor, pero asegura que todo esté 100% sincronizado con el backend (en caso de errores o productos dependientes).
    return {success: true, message: data.message};
  },

  updateProduct: async (pid, updatedProduct) => {
  const res = await fetch(`/api/products/${pid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct),
  });

  const data = await res.json();

  if (!data.success) {
    return {
      success: false,
      message: data.message || "Failed to update product",
    };
  }

  set((state) => ({
    products: state.products.map((product) =>
      product._id === pid ? data.data : product
    ),
  }));

  return {
    success: true,
    message: "Product updated successfully", // 🔥 mensaje manual agregado
  };
}

}))