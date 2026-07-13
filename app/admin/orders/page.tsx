'use client';

import { useEffect, useState } from 'react';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  size?: string;
}

interface Order {
  _id: string;
  orderId: string;
  user: string;
  items: OrderItem[];
  totalAmount: number;
  address: { street: string; city: string; state: string; pincode: string };
  paymentMethod: string;
  orderStatus: string;
  courierName?: string;
  trackingNumber?: string;
  createdAt: string;
}

const STATUS_OPTIONS = ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Cancelled', 'Returned'];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Record<string, { orderStatus: string; courierName: string; trackingNumber: string }>>({});

  async function loadOrders() {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/orders?all=true', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(data.orders || []);
        const initialDraft: typeof draft = {};
        (data.orders || []).forEach((o: Order) => {
          initialDraft[o._id] = {
            orderStatus: o.orderStatus,
            courierName: o.courierName || '',
            trackingNumber: o.trackingNumber || '',
          };
        });
        setDraft(initialDraft);
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  function updateDraft(orderId: string, field: string, value: string) {
    setDraft((prev) => ({
      ...prev,
      [orderId]: { ...prev[orderId], [field]: value },
    }));
  }

  async function handleSave(orderId: string) {
    setSavingId(orderId);
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(draft[orderId]),
      });

      if (res.ok) {
        loadOrders();
      } else {
        alert('Update nahi ho paya');
      }
    } catch (err) {
      console.log(err);
      alert('Server se connect nahi ho paya');
    }

    setSavingId(null);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <header style={{
        background: 'black', padding: '15px 30px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <h1 style={{ color: 'gold', fontSize: '22px' }}>AALIKE FASHION — Orders Management</h1>
        <a href="/admin" style={{ color: 'white', textDecoration: 'none' }}>← Admin Panel</a>
      </header>

      <div style={{ padding: '30px' }}>
        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p style={{ color: 'gray' }}>Abhi tak koi order nahi hai.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} style={{
              background: 'white', borderRadius: '10px', padding: '20px',
              marginBottom: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                <div>
                  <p style={{ fontWeight: 'bold' }}>Order ID: {order.orderId}</p>
                  <p style={{ color: 'gray', fontSize: '13px' }}>{formatDate(order.createdAt)}</p>
                </div>
                <p style={{ fontWeight: 'bold', fontSize: '18px' }}>₹{order.totalAmount}</p>
              </div>

              <div style={{ fontSize: '14px', color: '#333', marginBottom: '10px' }}>
                {order.items.map((item, idx) => (
                  <p key={idx}>{item.name} x{item.quantity} {item.size ? `(${item.size})` : ''}</p>
                ))}
              </div>

              <p style={{ color: 'gray', fontSize: '13px', marginBottom: '15px' }}>
                📍 {order.address.street}, {order.address.city}, {order.address.state} - {order.address.pincode}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'gray' }}>Order Status</label>
                  <select
                    value={draft[order._id]?.orderStatus || order.orderStatus}
                    onChange={(e) => updateDraft(order._id, 'orderStatus', e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd' }}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'gray' }}>Courier Name</label>
                  <input
                    type="text"
                    placeholder="Delhivery, Bluedart..."
                    value={draft[order._id]?.courierName || ''}
                    onChange={(e) => updateDraft(order._id, 'courierName', e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'gray' }}>Tracking Number</label>
                  <input
                    type="text"
                    placeholder="Tracking ID"
                    value={draft[order._id]?.trackingNumber || ''}
                    onChange={(e) => updateDraft(order._id, 'trackingNumber', e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <button
                onClick={() => handleSave(order._id)}
                disabled={savingId === order._id}
                style={{
                  background: 'black', color: 'gold', border: 'none',
                  padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
                }}
              >
                {savingId === order._id ? 'Saving...' : 'Update Order'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}