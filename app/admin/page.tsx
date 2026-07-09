'use client';

import { useState, useEffect } from 'react';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  category: string;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  fit: string;
  fabric: string;
  sleeve: string;
  washCare: string;
}

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    category: '',
    images: '',
    sizes: '',
    colors: '',
    stock: '',
    fit: '',
    fabric: '',
    sleeve: '',
    washCare: '',
  });

  async function loadProducts() {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      discountPrice: form.discountPrice ? Number(form.discountPrice) : 0,
      category: form.category,
      images: form.images.split(',').map((s) => s.trim()).filter(Boolean),
      sizes: form.sizes.split(',').map((s) => s.trim()).filter(Boolean),
      colors: form.colors.split(',').map((s) => s.trim()).filter(Boolean),
      stock: Number(form.stock),
      fit: form.fit,
      fabric: form.fabric,
      sleeve: form.sleeve,
      washCare: form.washCare,
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Product add ho gaya!');
        setForm({
          name: '', description: '', price: '', discountPrice: '', category: '',
          images: '', sizes: '', colors: '', stock: '', fit: '', fabric: '', sleeve: '', washCare: '',
        });
        setShowForm(false);
        loadProducts();
      } else {
        setMessage('❌ ' + (data.error || 'Kuch gadbad ho gayi'));
      }
    } catch (err) {
      console.log(err);
      setMessage('❌ Server se connect nahi ho paya');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Kya aap is product ko delete karna chahte hain?')) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        loadProducts();
      } else {
        alert('Delete nahi ho paya');
      }
    } catch (err) {
      console.log(err);
      alert('Server se connect nahi ho paya');
    }
  }

  const stats = [
    { title: "Total Products", value: String(products.length), icon: "👕", color: "#4CAF50" },
    { title: "Out of Stock", value: String(products.filter(p => p.stock === 0).length), icon: "⚠️", color: "#FF9800" },
    { title: "Total Orders", value: "0", icon: "📦", color: "#2196F3" },
    { title: "Customers", value: "0", icon: "👥", color: "#9C27B0" },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>

      <header style={{
        background: 'black', padding: '15px 30px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <h1 style={{ color: 'gold', fontSize: '22px' }}>AALIKE FASHION — Admin Panel</h1>
        <a href="/" style={{ color: 'white', textDecoration: 'none' }}>View Website →</a>
      </header>

      <div style={{ padding: '30px' }}>

        {/* Stats Cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px', marginBottom: '30px'
        }}>
          {stats.map((stat) => (
            <div key={stat.title} style={{
              background: 'white', borderRadius: '10px',
              padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              borderLeft: `5px solid ${stat.color}`
            }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>{stat.icon}</div>
              <p style={{ color: 'gray', marginBottom: '5px' }}>{stat.title}</p>
              <h2 style={{ fontSize: '28px', color: stat.color }}>{stat.value}</h2>
            </div>
          ))}
        </div>

        {/* Products */}
        <div style={{
          background: 'white', borderRadius: '10px',
          padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '22px' }}>👕 Products</h3>
            <button
              onClick={() => setShowForm(!showForm)}
              style={{
                background: 'black', color: 'gold', border: 'none',
                padding: '10px 20px', borderRadius: '8px',
                cursor: 'pointer', fontWeight: 'bold'
              }}>
              {showForm ? 'Cancel' : '+ Add Product'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleAddProduct} style={{
              background: '#f9f9f9', padding: '20px', borderRadius: '10px', marginBottom: '25px'
            }}>
              {message && (
                <div style={{
                  padding: '10px', borderRadius: '8px', marginBottom: '15px',
                  background: message.startsWith('✅') ? '#e6ffed' : '#fee',
                  color: message.startsWith('✅') ? 'green' : 'red'
                }}>
                  {message}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label><b>Product Name *</b></label>
                  <input required style={inputStyle} value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label><b>Category *</b></label>
                  <input required placeholder="Shirts, Jeans, Hoodies etc" style={inputStyle} value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })} />
                </div>
                <div>
                  <label><b>Price (₹) *</b></label>
                  <input required type="number" style={inputStyle} value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>
                <div>
                  <label><b>Discount Price (₹)</b></label>
                  <input type="number" style={inputStyle} value={form.discountPrice}
                    onChange={(e) => setForm({ ...form, discountPrice: e.target.value })} />
                </div>
                <div>
                  <label><b>Stock Quantity *</b></label>
                  <input required type="number" style={inputStyle} value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })} />
                </div>
                <div>
                  <label><b>Image URLs (comma se alag)</b></label>
                  <input placeholder="https://..., https://..." style={inputStyle} value={form.images}
                    onChange={(e) => setForm({ ...form, images: e.target.value })} />
                </div>
                <div>
                  <label><b>Sizes (comma se alag)</b></label>
                  <input placeholder="S, M, L, XL" style={inputStyle} value={form.sizes}
                    onChange={(e) => setForm({ ...form, sizes: e.target.value })} />
                </div>
                <div>
                  <label><b>Colors (comma se alag)</b></label>
                  <input placeholder="Black, White, Blue" style={inputStyle} value={form.colors}
                    onChange={(e) => setForm({ ...form, colors: e.target.value })} />
                </div>
                <div>
                  <label><b>Fit</b></label>
                  <input placeholder="Regular / Slim / Oversized" style={inputStyle} value={form.fit}
                    onChange={(e) => setForm({ ...form, fit: e.target.value })} />
                </div>
                <div>
                  <label><b>Fabric</b></label>
                  <input placeholder="Cotton, Polyester etc" style={inputStyle} value={form.fabric}
                    onChange={(e) => setForm({ ...form, fabric: e.target.value })} />
                </div>
                <div>
                  <label><b>Sleeve</b></label>
                  <input placeholder="Full Sleeve / Half Sleeve" style={inputStyle} value={form.sleeve}
                    onChange={(e) => setForm({ ...form, sleeve: e.target.value })} />
                </div>
                <div>
                  <label><b>Wash Care</b></label>
                  <input placeholder="Machine wash cold" style={inputStyle} value={form.washCare}
                    onChange={(e) => setForm({ ...form, washCare: e.target.value })} />
                </div>
              </div>

              <div style={{ gridColumn: '1 / -1', marginTop: '15px' }}>
                <label><b>Description *</b></label>
                <textarea required style={{ ...inputStyle, minHeight: '80px' }} value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>

              <button type="submit" style={{
                marginTop: '15px', background: 'black', color: 'gold', border: 'none',
                padding: '12px 30px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
              }}>
                Save Product
              </button>
            </form>
          )}

          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p style={{ color: 'gray' }}>Koi product nahi mila. Upar "+ Add Product" se pehla product add karo.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  {['Product', 'Category', 'Price', 'Stock', 'Action'].map((h) => (
                    <th key={h} style={{ padding: '12px', textAlign: 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{product.name}</td>
                    <td style={{ padding: '12px' }}>{product.category}</td>
                    <td style={{ padding: '12px' }}>₹{product.price}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        color: product.stock === 0 ? 'red' : product.stock < 10 ? 'orange' : 'green',
                        fontWeight: 'bold'
                      }}>
                        {product.stock === 0 ? 'Out of Stock' : `${product.stock} left`}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <button
                        onClick={() => handleDelete(product._id)}
                        style={{
                          background: 'red', color: 'white', border: 'none',
                          padding: '5px 12px', borderRadius: '5px', cursor: 'pointer'
                        }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginTop: '5px',
  border: '1px solid #ddd',
  borderRadius: '6px',
  fontSize: '14px',
  boxSizing: 'border-box' as const,
};