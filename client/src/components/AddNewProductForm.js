import axios from "axios";
import { useState } from "react";
import {addNewProduct} from "../services/products"

function AddNewProductForm({setShowForm, setProducts}) {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');

  const handleAddNewProduct = (e) => {
    e.preventDefault();
    let newProduct = {title: productName, price: productPrice, quantity: productQuantity}
    
    const onSubmit = async () => {
      const resetNewProductForm = () => {
        setProductName('');
        setProductPrice('');
        setProductQuantity('');
      }

      try {
        const data = await addNewProduct(newProduct); //axios
        resetNewProductForm();
        setProducts((prev) => [...prev, data ])
      } catch(e) {
        console.log(e);
      }
    }

    onSubmit();

    console.log(productName, productPrice, productQuantity)
  }
  const hideForm = (_) => {
    setShowForm(false);
  }
  return (
    <>
      <h3>Add Product</h3>
      <form onSubmit={handleAddNewProduct}>
      <div className="input-group">
        <label htmlFor="product-name">Product Name:</label>
        <input
          type="text"
          id="product-name"
          name="product-name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="product-price">Price:</label>
        <input
          type="number"
          id="product-price"
          name="product-price"
          min="0"
          step="0.01"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="product-quantity">Quantity:</label>
        <input
          type="number"
          id="product-quantity"
          name="product-quantity"
          min="0"
          value={productQuantity}
          onChange={(e) => setProductQuantity(e.target.value)}
          required
        />
      </div>
      <div className="actions form-actions">
        <button type="submit">Add</button>
        <button type="button" onClick={hideForm}>Cancel</button>
      </div>
    </form>
    </>
  )
}

export default AddNewProductForm
