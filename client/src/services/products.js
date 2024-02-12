import axios from "axios"

export const addNewProduct = async (newProduct) => {
    const res = await axios.post('/api/products', newProduct);
    return res.data;
};

export const updateProduct = async (id, product) => {
    const res = await axios.put(`/api/products/${id}`, product);
    return res.data;
};

export const deleteProduct = async (id) => {
    await axios.delete(`/api/products/${id}`);
}

export const getCartItems = async () => {
  const res = await axios.get('/api/cart');
  return res.data;
}

export const addToCart = async (id) => {
  const res = await axios.post('/api/add-to-cart', {productId: id});
  return res.data;
}

export const checkout = async () => {
  await axios.post('/api/checkout');
}
