export default function Home() {
  const products = [
    { id: 1, name: "Black Oversized Tshirt", price: 599, mrp: 999, category: "Men", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" },
    { id: 2, name: "White Hoodie", price: 899, mrp: 1499, category: "Women", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400" },
    { id: 3, name: "Blue Cargo Pants", price: 1099, mrp: 1799, category: "Men", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400" },
    { id: 4, name: "Pink Crop Top", price: 499, mrp: 799, category: "Women", image: "https://images.unsplash.com/photo-1551163943-3f7253a97697?w=400" },
    { id: 5, name: "Kids Printed Tshirt", price: 349, mrp: 599, category: "Kids", image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400" },
    { id: 6, name: "Denim Jacket", price: 1499, mrp: 2499, category: "Men", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400" },
  ];

  return (
    <div style={{fontFamily: 'sans-serif'}}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nav-links { display: flex; gap: 10px; }
        .hero { padding: 80px 20px; }
        .hero h2 { font-size: 36px; }
        .hero-btns { display: flex; gap: 10px; justifyContent: center; flexWrap: wrap; }
        .categories { display: flex; gap: 15px; padding: 30px 15px; flex-wrap: wrap; justify-content: center; }
        .cat-box { padding: 20px 30px; font-size: 18px; }
        .products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; max-width: 1100px; margin: 0 auto; padding: 0 15px; }
        .footer-grid { display: flex; flex-wrap: wrap; gap: 30px; justify-content: space-between; max-width: 1100px; margin: 0 auto; }
        @media (max-width: 600px) {
          .nav-links { display: none; }
          .hero h2 { font-size: 28px; }
          .hero { padding: 60px 15px; }
          .cat-box { padding: 15px 20px; font-size: 16px; }
          .products-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .footer-grid { flex-direction: column; }
        }
      `}</style>

      {/* Header */}
      <header style={{background:'black', padding:'15px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, zIndex:100}}>
        <h1 style={{color:'gold', fontSize:'22px', letterSpacing:'2px'}}>AALIKE FASHION</h1>
        <nav className="nav-links">
          <a href="#" style={{color:'white', textDecoration:'none'}}>Men</a>
          <a href="#" style={{color:'white', textDecoration:'none'}}>Women</a>
          <a href="#" style={{color:'white', textDecoration:'none'}}>Kids</a>
          <a href="/cart" style={{color:'gold', textDecoration:'none'}}>Cart 🛒</a>
          <a href="/login" style={{color:'gold', textDecoration:'none'}}>Login</a>
        </nav>
        <div style={{display:'flex', gap:'10px'}}>
          <a href="/cart" style={{color:'gold', textDecoration:'none', fontSize:'22px'}}>🛒</a>
          <a href="/login" style={{color:'gold', textDecoration:'none', fontSize:'14px', border:'1px solid gold', padding:'5px 10px', borderRadius:'5px'}}>Login</a>
        </div>
      </header>

      {/* Hero */}
      <div className="hero" style={{background:'linear-gradient(135deg, #1a1a1a, #333)', color:'white', textAlign:'center'}}>
        <p style={{color:'gold', letterSpacing:'4px', marginBottom:'10px', fontSize:'12px'}}>NEW COLLECTION 2026</p>
        <h2 style={{fontWeight:'bold', margin:'10px 0', color:'white'}}>Premium Fashion<br/>For Everyone</h2>
        <p style={{fontSize:'16px', color:'#ccc', margin:'15px 0'}}>Men • Women • Kids</p>
        <div style={{display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap', marginTop:'20px'}}>
          <button style={{background:'gold', color:'black', padding:'12px 35px', fontSize:'16px', border:'none', cursor:'pointer', borderRadius:'5px', fontWeight:'bold'}}>Shop Now</button>
          <button style={{background:'transparent', color:'white', padding:'12px 35px', fontSize:'16px', border:'2px solid white', cursor:'pointer', borderRadius:'5px'}}>View All</button>
        </div>
      </div>

      {/* Categories */}
      <div className="categories" style={{background:'#f5f5f5'}}>
        {[{name:'Men', emoji:'👔'},{name:'Women', emoji:'👗'},{name:'Kids', emoji:'🧒'}].map((cat)=>(
          <div key={cat.name} className="cat-box" style={{background:'black', color:'gold', cursor:'pointer', borderRadius:'10px', textAlign:'center'}}>
            <div style={{fontSize:'35px'}}>{cat.emoji}</div>
            <div>{cat.name}</div>
          </div>
        ))}
      </div>

      {/* Products */}
      <div style={{padding:'40px 0', background:'white'}}>
        <h2 style={{textAlign:'center', fontSize:'28px', marginBottom:'8px'}}>Our Products</h2>
        <p style={{textAlign:'center', color:'gray', marginBottom:'30px'}}>Premium Quality Fashion</p>
        <div className="products-grid">
          {products.map((product)=>(
            <div key={product.id} style={{border:'1px solid #eee', borderRadius:'10px', overflow:'hidden', boxShadow:'0 2px 10px rgba(0,0,0,0.1)'}}>
              <img src={product.image} alt={product.name} style={{width:'100%', height:'200px', objectFit:'cover'}}/>
              <div style={{padding:'12px'}}>
                <p style={{fontSize:'11px', color:'gray', marginBottom:'4px'}}>{product.category}</p>
                <h3 style={{fontSize:'14px', margin:'0 0 8px'}}>{product.name}</h3>
                <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px', flexWrap:'wrap'}}>
                  <span style={{fontSize:'18px', fontWeight:'bold'}}>₹{product.price}</span>
                  <span style={{fontSize:'12px', color:'gray', textDecoration:'line-through'}}>₹{product.mrp}</span>
                  <span style={{fontSize:'11px', color:'green', fontWeight:'bold'}}>{Math.round((1-product.price/product.mrp)*100)}% OFF</span>
                </div>
                <div style={{display:'flex', gap:'8px'}}>
                  <button style={{flex:1, background:'black', color:'gold', padding:'10px 5px', border:'none', cursor:'pointer', borderRadius:'5px', fontWeight:'bold', fontSize:'12px'}}>🛒 Cart</button>
                  <button style={{flex:1, background:'gold', color:'black', padding:'10px 5px', border:'none', cursor:'pointer', borderRadius:'5px', fontWeight:'bold', fontSize:'12px'}}>Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{background:'black', color:'white', padding:'40px 20px'}}>
        <div className="footer-grid">
          <div>
            <h3 style={{color:'gold', fontSize:'20px', marginBottom:'10px'}}>AALIKE FASHION</h3>
            <p style={{color:'gray'}}>Premium Fashion For Everyone</p>
          </div>
          <div>
            <h4 style={{color:'gold', marginBottom:'10px'}}>Categories</h4>
            <p style={{color:'gray'}}>Men</p>
            <p style={{color:'gray'}}>Women</p>
            <p style={{color:'gray'}}>Kids</p>
          </div>
          <div>
            <h4 style={{color:'gold', marginBottom:'10px'}}>Help</h4>
            <p style={{color:'gray'}}>Contact Us</p>
            <p style={{color:'gray'}}>Track Order</p>
            <p style={{color:'gray'}}>Return Policy</p>
          </div>
        </div>
        <p style={{textAlign:'center', color:'gray', marginTop:'30px', borderTop:'1px solid #333', paddingTop:'20px'}}>© 2026 Aalike Fashion — All Rights Reserved</p>
      </footer>
    </div>
  );
}