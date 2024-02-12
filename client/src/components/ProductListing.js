import Product from "./Product";

function ProductListing({products, onEditFormSubmit, onDeleteProduct, onAddToCart}) {
  return (
    <div className="product-listing">
        <h2>Products</h2>
        <ul className="product-list">
          {products.map(product => {
            return <Product
              key={product._id}
              onEditFormSubmit={onEditFormSubmit}
              onDeleteProduct={onDeleteProduct}
              onAddToCart={onAddToCart}
              {...product} />}
          )}
        </ul>
      </div>
  )
}

export default ProductListing;
