import { useState } from "react"

function EditForm({_id, title, price, quantity, onEditFormSubmit, setIsEditFormShown}) {
  const [productName, setProductName] = useState(title);
  const [productPrice, setProductPrice] = useState(price);
  const [productQuantity, setProductQuantity] = useState(quantity);

  const reset = () => {
    setProductName("");
    setProductPrice("");
    setProductQuantity("");
  }

  const handleUpdatedProduct = (e) => {
    e.preventDefault();
    let updatedProduct = {
      title: productName,
      price: productPrice,
      quantity: productQuantity
    };

    onEditFormSubmit(_id, updatedProduct);
    reset();
    setIsEditFormShown(false);
  }

  return (
    <div className="edit-form">
    <h3>Edit Product</h3>
    <form onSubmit={handleUpdatedProduct}>
      <div className="input-group">
        <label htmlFor="product-name">Product Name</label>
        <input
          type="text"
          id="product-name"
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
          aria-label="Product Name"
        />
      </div>

      <div className="input-group">
        <label htmlFor="product-price">Price</label>
        <input
          type="number"
          id="product-price"
          onChange={(e) => setProductPrice(e.target.value)}
          value={productPrice}
          aria-label="Product Price"
        />
      </div>

      <div className="input-group">
        <label htmlFor="product-quantity">Quantity</label>
        <input
          type="number"
          id="product-quantity"
          onChange={(e) => setProductQuantity(e.target.value)}
          value={productQuantity}
          aria-label="Product Quantity"
        />
      </div>

      <div className="actions form-actions">
        <button type="submit">Update</button>
        <button type="button">Cancel</button>
      </div>
    </form>
  </div>
  )
}

export default EditForm;
