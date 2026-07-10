'use client';

import { useEffect, useState } from 'react';
import {
  getCart,
  updateQty,
  removeFromCart,
  getCartTotal,
  CartItem,
} from '@/lib/cart';

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCartItems(getCart());
    setLoaded(true);
  }, []);

  function refresh() {
    setCartItems(getCart());
  }

  function increaseQty(item: CartItem) {
    updateQty(item.productId, item.size, item.qty + 1);
    refresh();
  }

  function decreaseQty(item: CartItem) {
    updateQty(item.productId, item.size, item.qty - 1);
    refresh();
  }

  function handleRemove(item: CartItem) {
    removeFromCart(item.productId, item.size);
    refresh();
  }

  function handleCheckout() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Order book karne ke liye pehle Login karo!');
      window.location.href = '/login';
      return;
    }
    window.location.href = '/checkout';
  }

  const total = getCartTotal();

  if (!loaded) {
    return null;
  }

  return (
    <div style={{minHeight: '100vh', background: '#f5f5f5'}}>

      {/* Header */}
      <header style={{background: 'black', padding: '20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <a href="/" style={{color: 'gold', fontSize: '24px', textDecoration: 'none', fontWeight: 'bold'}}>
          AALIKE FASHION
        </a>
        <a href="/" style={{color: 'white', textDecoration: 'none'}}>← Continue Shopping</a>
      </header>

      <div style={{maxWidth: '1000px', margin: '40px auto', padding: '0 20px'}}>
        <h2 style={{fontSize: '32px', marginBottom: '30px'}}>🛒 Your Cart</h2>

        {cartItems.length === 0 ? (
          <div style={{background: 'white', borderRadius: '10px', padding: '50px', textAlign: 'center'}}>
            <p style={{fontSize: '18px', color: 'gray', marginBottom: '20px'}}>Tumhara cart khaali hai</p>
            <a href="/" style={{background: 'black', color: 'gold', padding: '12px 30px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold'}}>
              Shopping Shuru Karo
            </a>
          </div>
        ) : (
          <div style={{display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px'}}>

            {/* Cart Items */}
            <div>
              {cartItems.map((item) => (
                <div key={item.productId + (item.size || '')} style={{
                  background: 'white', borderRadius: '10px',
                  padding: '20px', marginBottom: '15px',
                  display: 'flex', gap: '20px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                  <img src={item.image} alt={item.name}
                    style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px'}}
                  />
                  <div style={{flex: 1}}>
                    <h3 style={{margin: '0 0 8px'}}>{item.name}</h3>
                    {item.size && <p style={{color: 'gray', margin: '0 0 8px'}}>Size: {item.size}</p>}
                    <p style={{fontWeight: 'bold', fontSize: '18px'}}>₹{item.price}</p>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <button onClick={() => decreaseQty(item)} style={{background: 'black', color: 'white', border: 'none',
                        width: '30px', height: '30px', borderRadius: '5px', cursor: 'pointer', fontSize: '18px'}}>-</button>
                      <span style={{fontSize: '18px', fontWeight: 'bold'}}>{item.qty}</span>
                      <button onClick={() => increaseQty(item)} style={{background: 'black', color: 'white', border: 'none',
                        width: '30px', height: '30px', borderRadius: '5px', cursor: 'pointer', fontSize: '18px'}}>+</button>
                    </div>
                    <button onClick={() => handleRemove(item)} style={{color: 'red', background: 'none', border: 'none', cursor: 'pointer'}}>
                      🗑 Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={{background: 'white', borderRadius: '10px',
              padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', height: 'fit-content'}}>
              <h3 style={{fontSize: '22px', marginBottom: '20px'}}>Order Summary</h3>

              {cartItems.map((item) => (
                <div key={item.productId + (item.size || '')} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                  <span style={{color: 'gray'}}>{item.name} x{item.qty}</span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}

              <hr style={{margin: '15px 0'}}/>

              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                <span style={{color: 'gray'}}>Delivery</span>
                <span style={{color: 'green'}}>FREE</span>
              </div>

              <hr style={{margin: '15px 0'}}/>

              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '25px'}}>
                <span style={{fontWeight: 'bold', fontSize: '20px'}}>Total</span>
                <span style={{fontWeight: 'bold', fontSize: '20px'}}>₹{total}</span>
              </div>

              <button onClick={handleCheckout} style={{width: '100%', padding: '15px', background: 'black',
                color: 'gold', border: 'none', borderRadius: '8px',
                fontSize: '18px', fontWeight: 'bold', cursor: 'pointer'}}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}