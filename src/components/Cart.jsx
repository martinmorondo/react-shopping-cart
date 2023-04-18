import './Cart.css'
import { useState, useId } from 'react'
import { CartIcon, ClearCartIcon } from './Icons.jsx'
import { useCart } from '../hooks/useCart.js'

function CartItem ({ thumbnail, price, title, quantity, addToCart }) {
  return (
    <li>
      <img
        src={thumbnail}
        alt={title}
      />
      <div>
        <strong>{title}</strong> - ${price}
      </div>

      <footer>
        <small>
          Qty: {quantity}
        </small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  )
}

export function Cart () {
  const cartCheckboxId = useId();
  const { cart, clearCart, addToCart } = useCart();

  const [showModal, setShowModal] = useState(false);

  function handleCheckout() {
    setShowModal(true);
  }

  function handleConfirm() {
    // Aquí podría enviar los datos del usuario y los productos del carrito a una API
    // o a una base de datos para completar la compra
    clearCart();
    setShowModal(false);
  }

  const totalPrice = cart.reduce((total, product) => {
    return total + product.price * product.quantity
  }, 0)


  return (
    <>
      <label className='cart-button' htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />

      <aside className='cart'>
        <h2>Cart</h2>
        <ul>
          {cart.map(product => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              {...product}
            />
          ))}
        </ul>

        <div className='total-price'>
          Total: ${totalPrice.toFixed(2)}
        </div>

        
        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>

        <button onClick={handleCheckout} className='btn-checkout'>Checkout</button>

        {showModal && (
          <div className='modal'>
            <div className='modal-content'>
              <h3>Confirm your purchase</h3>
              <label>
                Name:
                <input type='text' />
              </label>
              <label>
                Email:
                <input type='email' />
              </label>
              <button onClick={handleConfirm}>Confirm</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        )}

      </aside>
    </>
  )
}