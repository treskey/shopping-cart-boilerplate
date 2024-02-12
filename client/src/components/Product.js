import EditForm from './EditForm'
import { useState } from "react"

function Product({_id, title, price, quantity, onEditFormSubmit, onDeleteProduct, onAddToCart}) {
  const [isEditFormShown, setIsEditFormShown] = useState(false);
  const editHandler = () => {
    setIsEditFormShown((prev) => !prev);
  }

  const addToCartHandler = (e) => {
    e.preventDefault();
    onAddToCart(_id);
  }
  return (
    <li className="product">
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">${price}</p>
        <p className="quantity">{quantity} left in stock</p>
        <div className="actions product-actions">
          <button className="add-to-cart" onClick={addToCartHandler} disabled={ quantity === 0 }>Add to Cart</button>
          <button className="edit" onClick={editHandler}>Edit</button>
        </div>
        <button className="delete-button" onClick={() => onDeleteProduct(_id)}><span>X</span></button>
      </div>
      {isEditFormShown ? <EditForm onEditFormSubmit={onEditFormSubmit} setIsEditFormShown={setIsEditFormShown} {...{_id, title, price, quantity}}/> : null}
    </li>
  )
}

export default Product
