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
    <div>
      <header style={{background:'black',padding:'20px',display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,zIndex:100}}>
        <h1 style={{color:'gold',fontSize:'28px',letterSpacing:'3px'}}>AALIKE FASHION</h1>
        <nav>
          <a href="#" style={{color:'white',margin:'0 15px',textDecoration:'none'}}>Men</a>
          <a href="#" style={{color:'white',margin:'0 15px',textDecoration:'none'}}>Women</a>
          <a href="#" style={{color:'white',margin:'0 15px',textDecoration:'none'}}>Kids</a>
          <a href="/cart" style={{color:'gold',margin:'0 15px',textDecoration:'none'}}>Cart 🛒</a>
          <a href="/login" style={{color:'gold',margin:'0 15px',textDecoration:'none'}}>Login</a>
        </nav>
      </header>

      <div style={{background:'linear-gradient(135deg, #1a1a1a, #333)',color:'white',textAlign:'center',padding:'120px 20px'}}>
        <p style={{color:'gold',letterSpacing:'5px',marginBottom:'10px'}}>NEW COLLECTION 2026</p>
        <h2 style={{fontSize:'56px',fontWeight:'bold',margin:'10px 0'}}>Premium Fashion<br/>For Everyone</h2>
        <p style={{fontSize:'18px',color:'#ccc',margin:'20px 0'}}>Men • Women • Kids</p>
        <button style={{background:'gold',color:'black',padding:'15px 50px',fontSize:'18px',border:'none',cursor:'pointer',borderRadius:'5px',fontWeight:'bold',marginRight:'15px'}}>Shop Now</button>
        <button style={{background:'transparent',color:'white',padding:'15px 50px',fontSize:'18px',border:'2px solid white',cursor:'pointer',borderRadius:'5px'}}>View Collection</button>
      </div>

      <div style={{display:'flex',justifyContent:'center',gap:'20px',padding:'40px 20px',background:'#f5f5f5'}}>
        {[{name:'Men',emoji:'👔'},{name:'Women',emoji:'👗'},{name:'Kids',emoji:'🧒'}].map((cat)=>(
          <div key={cat.name} style={{background:'black',color:'gold',padding:'25px 50px',fontSize:'20px',cursor:'pointer',borderRadius:'10px',textAlign:'center'}}>
            <div style={{fontSize:'40px'}}>{cat.emoji}</div>
            <div>{cat.name}</div>
          </div>
        ))}
      </div>

      <div style={{padding:'50px 40px',background:'white'}}>
        <h2 style={{textAlign:'center',fontSize:'36px',marginBottom:'10px'}}>Our Products</h2>
        <p style={{textAlign:'center',color:'gray',marginBottom:'40px'}}>Premium Quality Fashion</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'30px',maxWidth:'1100px',margin:'0 auto'}}>
          {products.map((product)=>(
            <div key={product.id} style={{border:'1px solid #eee',borderRadius:'10px',overflow:'hidden',boxShadow:'0 2px 10px rgba(0,0,0,0.1)'}}>
              <img src={product.image} alt={product.name} style={{width:'100%',height:'250px',objectFit:'cover'}}/>
              <div style={{padding:'15px'}}>
                <p style={{fontSize:'12px',color:'gray',marginBottom:'5px'}}>{product.category}</p>
                <h3 style={{fontSize:'16px',margin:'0 0 10px'}}>{product.name}</h3>
                <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'15px'}}>
                  <span style={{fontSize:'20px',fontWeight:'bold'}}>₹{product.price}</span>
                  <span style={{fontSize:'14px',color:'gray',textDecoration:'line-through'}}>₹{product.mrp}</span>
                  <span style={{fontSize:'12px',color:'green',fontWeight:'bold'}}>{Math.round((1-product.price/product.mrp)*100)}% OFF</span>
                </div>
                <div style={{display:'flex',gap:'10px'}}>
                  <button style={{flex:1,background:'black',color:'gold',padding:'12px',border:'none',cursor:'pointer',borderRadius:'5px',fontWeight:'bold'}}>🛒 Add to Cart</button>
                  <button style={{flex:1,background:'gold',color:'black',padding:'12px',border:'none',cursor:'pointer',borderRadius:'5px',fontWeight:'bold'}}>Buy Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer style={{background:'black',color:'white',padding:'50px 40px'}}>
        <div style={{display:'flex',justifyContent:'space-between',maxWidth:'1100px',margin:'0 auto'}}>
          <div>
            <h3 style={{color:'gold',fontSize:'24px',marginBottom:'15px'}}>AALIKE FASHION</h3>
            <p style={{color:'gray'}}>Premium Fashion For Everyone</p>
          </div>
          <div>
            <h4 style={{color:'gold',marginBottom:'15px'}}>Categories</h4>
            <p style={{color:'gray'}}>Men</p>
            <p style={{color:'gray'}}>Women</p>
            <p style={{color:'gray'}}>Kids</p>
          </div>
          <div>
            <h4 style={{color:'gold',marginBottom:'15px'}}>Help</h4>
            <p style={{color:'gray'}}>Contact Us</p>
            <p style={{color:'gray'}}>Track Order</p>
            <p style={{color:'gray'}}>Return Policy</p>
          </div>
        </div>
        <p style={{textAlign:'center',color:'gray',marginTop:'40px',borderTop:'1px solid #333',paddingTop:'20px'}}>© 2026 Aalike Fashion — All Rights Reserved</p>
      </footer>
    </div>
  );
}