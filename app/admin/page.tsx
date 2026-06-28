export default function Admin() {
  const stats = [
    { title: "Total Revenue", value: "₹1,24,500", icon: "💰", color: "#4CAF50" },
    { title: "Total Orders", value: "234", icon: "📦", color: "#2196F3" },
    { title: "Customers", value: "189", icon: "👥", color: "#9C27B0" },
    { title: "Pending Orders", value: "12", icon: "⏳", color: "#FF9800" },
  ];

  const orders = [
    { id: "#1001", customer: "Rahul Sharma", product: "Black Hoodie", amount: "₹899", status: "Delivered" },
    { id: "#1002", customer: "Priya Singh", product: "Blue Jeans", amount: "₹1099", status: "Shipped" },
    { id: "#1003", customer: "Amit Kumar", product: "White Tshirt", amount: "₹599", status: "Pending" },
    { id: "#1004", customer: "Neha Gupta", product: "Pink Crop Top", amount: "₹499", status: "Cancelled" },
  ];

  const products = [
    { name: "Black Oversized Tshirt", stock: 45, price: "₹599", category: "Men" },
    { name: "White Hoodie", stock: 23, price: "₹899", category: "Women" },
    { name: "Blue Cargo Pants", stock: 5, price: "₹1099", category: "Men" },
    { name: "Pink Crop Top", stock: 0, price: "₹499", category: "Women" },
  ];

  const statusColor: any = {
    Delivered: "green", Shipped: "blue", Pending: "orange", Cancelled: "red"
  };

  return (
    <div style={{minHeight: '100vh', background: '#f0f2f5'}}>
      
      {/* Header */}
      <header style={{
        background: 'black', padding: '15px 30px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <h1 style={{color: 'gold', fontSize: '22px'}}>AALIKE FASHION — Admin Panel</h1>
        <a href="/" style={{color: 'white', textDecoration: 'none'}}>View Website →</a>
      </header>

      <div style={{padding: '30px'}}>

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
              <div style={{fontSize: '40px', marginBottom: '10px'}}>{stat.icon}</div>
              <p style={{color: 'gray', marginBottom: '5px'}}>{stat.title}</p>
              <h2 style={{fontSize: '28px', color: stat.color}}>{stat.value}</h2>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div style={{
          background: 'white', borderRadius: '10px',
          padding: '25px', marginBottom: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{fontSize: '22px', marginBottom: '20px'}}>📋 Recent Orders</h3>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{background: '#f5f5f5'}}>
                {['Order ID', 'Customer', 'Product', 'Amount', 'Status'].map((h) => (
                  <th key={h} style={{padding: '12px', textAlign: 'left', fontWeight: 'bold'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={{borderBottom: '1px solid #eee'}}>
                  <td style={{padding: '12px', fontWeight: 'bold'}}>{order.id}</td>
                  <td style={{padding: '12px'}}>{order.customer}</td>
                  <td style={{padding: '12px'}}>{order.product}</td>
                  <td style={{padding: '12px', fontWeight: 'bold'}}>{order.amount}</td>
                  <td style={{padding: '12px'}}>
                    <span style={{
                      color: statusColor[order.status],
                      background: `${statusColor[order.status]}20`,
                      padding: '4px 12px', borderRadius: '20px',
                      fontWeight: 'bold', fontSize: '14px'
                    }}>{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Products */}
        <div style={{
          background: 'white', borderRadius: '10px',
          padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
            <h3 style={{fontSize: '22px'}}>👕 Products</h3>
            <button style={{
              background: 'black', color: 'gold', border: 'none',
              padding: '10px 20px', borderRadius: '8px',
              cursor: 'pointer', fontWeight: 'bold'
            }}>+ Add Product</button>
          </div>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr style={{background: '#f5f5f5'}}>
                {['Product', 'Category', 'Price', 'Stock', 'Action'].map((h) => (
                  <th key={h} style={{padding: '12px', textAlign: 'left'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.name} style={{borderBottom: '1px solid #eee'}}>
                  <td style={{padding: '12px', fontWeight: 'bold'}}>{product.name}</td>
                  <td style={{padding: '12px'}}>{product.category}</td>
                  <td style={{padding: '12px'}}>{product.price}</td>
                  <td style={{padding: '12px'}}>
                    <span style={{
                      color: product.stock === 0 ? 'red' : product.stock < 10 ? 'orange' : 'green',
                      fontWeight: 'bold'
                    }}>
                      {product.stock === 0 ? 'Out of Stock' : `${product.stock} left`}
                    </span>
                  </td>
                  <td style={{padding: '12px'}}>
                    <button style={{
                      background: 'black', color: 'white', border: 'none',
                      padding: '5px 12px', borderRadius: '5px',
                      cursor: 'pointer', marginRight: '8px'
                    }}>Edit</button>
                    <button style={{
                      background: 'red', color: 'white', border: 'none',
                      padding: '5px 12px', borderRadius: '5px', cursor: 'pointer'
                    }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}