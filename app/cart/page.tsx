export default function Cart() {
  const cartItems = [
    { id: 1, name: "Black Oversized Tshirt", price: 599, size: "L", qty: 1, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200" },
    { id: 2, name: "White Hoodie", price: 899, size: "M", qty: 2, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200" },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

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

        <div style={{display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px'}}>
          
          {/* Cart Items */}
          <div>
            {cartItems.map((item) => (
              <div key={item.id} style={{
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
                  <p style={{color: 'gray', margin: '0 0 8px'}}>Size: {item.size}</p>
                  <p style={{fontWeight: 'bold', fontSize: '18px'}}>₹{item.price}</p>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <button style={{background: 'black', color: 'white', border: 'none',
                      width: '30px', height: '30px', borderRadius: '5px', cursor: 'pointer', fontSize: '18px'}}>-</button>
                    <span style={{fontSize: '18px', fontWeight: 'bold'}}>{item.qty}</span>
                    <button style={{background: 'black', color: 'white', border: 'none',
                      width: '30px', height: '30px', borderRadius: '5px', cursor: 'pointer', fontSize: '18px'}}>+</button>
                  </div>
                  <button style={{color: 'red', background: 'none', border: 'none', cursor: 'pointer'}}>
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
              <div key={item.id} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
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

            <button style={{width: '100%', padding: '15px', background: 'black',
              color: 'gold', border: 'none', borderRadius: '8px',
              fontSize: '18px', fontWeight: 'bold', cursor: 'pointer'}}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}