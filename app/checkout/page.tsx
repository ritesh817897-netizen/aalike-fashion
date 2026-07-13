'use client';

import { useEffect, useState } from 'react';
import { getCart, getCartTotal, clearCart, getBuyNow, clearBuyNow, CartItem } from '@/lib/cart';

export default function Checkout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isBuyNow, setIsBuyNow] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [placing, setPlacing] = useState(false);

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Order book karne ke liye pehle Login karo!');
      window.location.href = '/login';
      return;
    }

    // Pehle check karo koi "Buy Now" item hai kya
    const buyNowItem = getBuyNow();

    if (buyNowItem) {
      setCartItems([buyNowItem]);
      setIsBuyNow(true);
      setLoaded(true);
      return;
    }

    // Warna normal cart se checkout
    const cart = getCart();
    if (cart.length === 0) {
      alert('Tumhara cart khaali hai');
      window.location.href = '/cart';
      return;
    }

    setCartItems(cart);
    setLoaded(true);
  }, []);

  const total = isBuyNow
    ? cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
    : getCartTotal();

  async function placeOrder() {
    if (!street || !city || !state || !pincode) {
      alert('Poora address bharo');
      return;
    }

    const token = localStorage.getItem('token');
    setPlacing(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems,
          totalAmount: total,
          address: { street, city, state, pincode },
          paymentMethod: 'COD',
        }),
      });

      const data = await res.json();

      if (res.ok) {
        if (isBuyNow) {
          clearBuyNow();
        } else {
          clearCart();
        }
        alert('Order successfully place ho gaya! 🎉 Order ID: ' + data.order.orderId);
        window.location.href = '/';
      } else {
        alert(data.error || 'Kuch galat ho gaya');
      }
    } catch (err) {
      console.log(err);
      alert('Server se connect nahi ho paya');
    }

    setPlacing(false);
  }

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
        <a href={isBuyNow ? '/' : '/cart'} style={{color: 'white', textDecoration: 'none'}}>
          ← {isBuyNow ? 'Back to Shopping' : 'Back to Cart'}
        </a>
      </header>

      <div style={{maxWidth: '900px', margin: '40px auto', padding: '0 20px'}}>
        <h2 style={{fontSize: '32px', marginBottom: '30px'}}>📦 Checkout</h2>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px'}}>

          {/* Address Form */}
          <div style={{background: 'white', borderRadius: '10px', padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
            <h3 style={{fontSize: '20px', marginBottom: '20px'}}>Delivery Address</h3>

            <label style={{display: 'block', marginBottom: '15px'}}>
              <span style={{display: 'block', marginBottom: '5px', color: 'gray', fontSize: '14px'}}>Street Address</span>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="House no, Street, Area"
                style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '15px'}}
              />
            </label>

            <label style={{display: 'block', marginBottom: '15px'}}>
              <span style={{display: 'block', marginBottom: '5px', color: 'gray', fontSize: '14px'}}>City</span>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '15px'}}
              />
            </label>

            <label style={{display: 'block', marginBottom: '15px'}}>
              <span style={{display: 'block', marginBottom: '5px', color: 'gray', fontSize: '14px'}}>State</span>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
                style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '15px'}}
              />
            </label>

            <label style={{display: 'block', marginBottom: '15px'}}>
              <span style={{display: 'block', marginBottom: '5px', color: 'gray', fontSize: '14px'}}>Pincode</span>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Pincode"
                style={{width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '15px'}}
              />
            </label>

            <p style={{color: 'gray', fontSize: '13px', marginTop: '10px'}}>💵 Payment: Cash on Delivery (COD)</p>
          </div>

          {/* Order Summary */}
          <div style={{background: 'white', borderRadius: '10px',
            padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', height: 'fit-content'}}>
            <h3 style={{fontSize: '22px', marginBottom: '20px'}}>Order Summary</h3>

            {isBuyNow && (
              <p style={{background: '#fff8e1', color: '#946c00', padding: '8px 12px', borderRadius: '6px', fontSize: '13px', marginBottom: '15px'}}>
                ⚡ Buy Now — sirf ye product order hoga (cart alag hai)
              </p>
            )}

            {cartItems.map((item) => (
              <div key={item.productId + (item.size || '')} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                <span style={{color: 'gray'}}>{item.name} x{item.qty}</span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}

            <hr style={{margin: '15px 0'}}/>

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '25px'}}>
              <span style={{fontWeight: 'bold', fontSize: '20px'}}>Total</span>
              <span style={{fontWeight: 'bold', fontSize: '20px'}}>₹{total}</span>
            </div>

            <button
              onClick={placeOrder}
              disabled={placing}
              style={{width: '100%', padding: '15px', background: 'black',
              color: 'gold', border: 'none', borderRadius: '8px',
              fontSize: '18px', fontWeight: 'bold', cursor: placing ? 'not-allowed' : 'pointer', opacity: placing ? 0.6 : 1}}>
              {placing ? 'Order Place ho raha hai...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}