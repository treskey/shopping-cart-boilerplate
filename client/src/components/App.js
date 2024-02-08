import { useState, useEffect } from "react";
import axios from "axios";

function Header() {
  return (
    <header>
      <h1>The Shop!</h1>
      <div className="cart">
        <h2>Your Cart</h2>
        <p>Your cart is empty</p>
        <p>Total: $0</p>
        <button className="checkout" disabled>Checkout</button>
      </div>
    </header>
  )
}

function ProductListing({products}) {
  return (
    <div className="product-listing">
        <h2>Products</h2>
        <ul className="product-list">
          {products.map(product => <Product key={product.id} {...product}/>)}
        </ul>
      </div>
  )
}

function EditForm({title, price, quantity}) {
  const [productName, setProductName] = useState(title);
  const [productPrice, setProductPrice] = useState(price);
  const [productQuantity, setProductQuantity] = useState(quantity);

  return (
    <div className="edit-form">
    <h3>Edit Product</h3>
    <form>
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

function Product({title, price, quantity}) {
  const [editFormIsShown, setEditFormIsShown] = useState(false);
  const editHandler = () => {
    setEditFormIsShown((prev) => !prev);
  }
  return (
    <li className="product">
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">${price}</p>
        <p className="quantity">{quantity} left in stock</p>
        <div className="actions product-actions">
          <button className="add-to-cart">Add to Cart</button>
          <button className="edit" onClick={editHandler}>Edit</button>
        </div>
        <button className="delete-button"><span>X</span></button>
      </div>
      {editFormIsShown ? <EditForm {...{title, price, quantity}}/> : null}
    </li>
  )
}

function Form({setShowForm, setProducts}) {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');

  const handleAddNewProduct = (e) => {
    e.preventDefault();
    let newProduct = {title: productName, price: productPrice, quantity: productQuantity}
    
    const addNewProduct = async () => {
      const resetNewProductForm = () => {
        setProductName('');
        setProductPrice('');
        setProductQuantity('');
      }

      try {
        const res = await axios.post('/api/products', newProduct);
        resetNewProductForm();
        setProducts((prev) => [...prev, res.data ])
      } catch(e) {
        console.log(e);
      }
    }

    addNewProduct();

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

function App() {
  let [products, setProducts] = useState([]);
  let [showForm, setShowForm] = useState(false);
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

  return (
    <>
    <Header/>
    <main>
      <ProductListing products={products}/>
      <p><button className="add-product-button" onClick={toggleForm}>Add A Product</button></p>
      <div className={showForm ? "add-form visible": "add-form"}>
        <Form setShowForm={setShowForm} setProducts={setProducts}/>
      </div>
    </main>
    </>
  );
}

export default App
