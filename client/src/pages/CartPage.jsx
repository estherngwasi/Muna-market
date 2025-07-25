import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', padding: '0 1rem' }}>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', marginBottom: 16, minWidth: 500 }}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price (KSH)</th>
                  <th>Quantity</th>
                  <th>Total (KSH)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.product}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price * item.quantity}</td>
                    <td>
                      <button onClick={() => handleRemove(item.product)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>Cart Total: KSH {total}</strong>
          </div>
          <button onClick={handleCheckout} style={{ marginRight: 8 }}>Proceed to Checkout</button>
          <button onClick={handleClear}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default CartPage; 