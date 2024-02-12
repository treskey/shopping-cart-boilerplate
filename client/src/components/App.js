import { useState, useEffect } from "react"
import axios from "axios"
import Header from "./Header"
import ProductListing from "./ProductListing"
import AddNewProductForm from "./AddNewProductForm"
import { deleteProduct, 
  updateProduct, 
  getCartItems, 
  addToCart,
  checkout } from "../services/products"

function App() {
  let [products, setProducts] = useState([]);
  let [showForm, setShowForm] = useState(false);
  let [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    (async () => {
      let data = await getCartItems();
      setCartItems(data);
    })()
  },[])

  useEffect(()=>{
    try {
      (async () => {
        const res = await axios.get('/api/products');
        setProducts(res.data);
      })()
    } catch(e) {
      console.log(e)
    }
  }, [])

  const toggleForm = (_) => {
    setShowForm((prev) => !prev);
  }

  const handleEditFormSubmit = async (id, product) => {
    try {
      const data = await updateProduct(id, product);
      console.log(data);
      let updatedProducts = products.map(product => {
        return product._id === id ? data : product});
      setProducts(updatedProducts);
    } catch(e) {
      console.log(e);
    }
  }
  
  const handleProductDelete = async (id) => {
    try {
      await deleteProduct(id);
      let updatedProducts = products.filter(product => product._id !== id)
      setProducts(updatedProducts);
    } catch(e) {
      console.log(e);
    }
  }

  const handleAddToCart = async (id) => {
    try {
      const {product, item} = await addToCart(id);
      let updatedProducts = products.map(p => p._id === id ? product : p);
      setProducts(updatedProducts);
      const isAlreadyInCart = cartItems.some(ci => {
        console.log(ci, ci._id === item._id)
        return ci._id === item._id
      });
      if (isAlreadyInCart) {
        const newCartItems = cartItems.map(c => c._id === item._id ? item : c)
        setCartItems(newCartItems)
      } else {
        setCartItems((prevCart) => prevCart.concat(item));
      }
      // check if item is already in cart
      // if item is in cart, replace old item with new item
      // else, concat new item to cart
    } catch(e) {
      console.log(e);
    }
  }

  const handleCheckout = async () => {
    try {
      await checkout();
      setCartItems([]);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
    <Header cartItems={cartItems} onCheckout={handleCheckout}/>
    <main>
      <ProductListing
        products={products}
        onEditFormSubmit={handleEditFormSubmit} 
        onDeleteProduct={handleProductDelete}
        onAddToCart={handleAddToCart}/>
      <p><button className="add-product-button" onClick={toggleForm}>Add A Product</button></p>
      <div className={showForm ? "add-form visible": "add-form"}>
        <AddNewProductForm setShowForm={setShowForm} setProducts={setProducts}/>
      </div>
    </main>
    </>
  );
}

export default App
