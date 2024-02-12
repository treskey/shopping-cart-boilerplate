function Cart({cartItems, onCheckout}) {
  const isCartEmpty = false;
  if (isCartEmpty) {
    return (
      <div className="cart">
        <h2>Your Cart</h2>
        <p>Your cart is empty</p>
        <p>Total: $0</p>
        <button className="checkout" disabled>Checkout</button>
      </div>
    )
  } else {
    return (
      <div className="cart">
        <h2>Your Cart</h2>
        <table className="cart-items">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => <CartItem key={item._id} {...item}/>)}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="total">{cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)}</td>
            </tr>
          </tfoot>
        </table>
        <div className="checkout-button">
          <button className="checkout" onClick={() => onCheckout()}>Checkout</button>
        </div>
      </div>
    )
  }
}

function CartItem({title, quantity, price}) {
  return(
    <tr>
      <td>{title}</td>
      <td>{quantity}</td>
      <td>{price}</td>
    </tr>
  )
}

function Header({cartItems, onCheckout}) {
  return (
    <header>
      <h1>The Shop!</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout}/>
    </header>
  )
}

export default Header
