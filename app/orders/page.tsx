'use client';

import { useEffect, useState } from 'react';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  size?: string;
  image?: string;
}

interface StatusHistoryItem {
  status: string;
  date: string;
}

interface Order {
  _id: string;
  orderId: string;
  items: OrderItem[];
  totalAmount: number;
  address: { street: string; city: string; state: string; pincode: string };
  paymentMethod: string;
  orderStatus: string;
  courierName?: string;
  trackingNumber?: string;
  statusHistory: StatusHistoryItem[];
  createdAt: string;
}

const STEPS = ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered'];

const STATUS_LABELS: Record<string, string> = {
  Pending: 'Order Placed',
  Confirmed: 'Confirmed',
  Packed: 'Packed',
  Shipped: 'Shipped',
  Delivered: 'Delivered',
  Cancelled: 'Cancelled',
  Returned: 'Returned',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });
}

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadOrders() {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      try {
        const res = await fetch('/api/orders', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) {
          setOrders(data.orders || []);
        } else {
          setError(data.error || 'Orders load nahi ho paye');
        }
      } catch (err) {
        console.log(err);
        setError('Server se connect nahi ho paya');
      }

      setLoading(false);
    }

    loadOrders();
  }, []);

  function getStepIndex(status: string) {
    return STEPS.indexOf(status);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <header style={{ background: 'black', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ color: 'gold', fontSize: '24px', textDecoration: 'none', fontWeight: 'bold' }}>
          AALIKE FASHION
        </a>
        <a href="/" style={{ color: 'white', textDecoration: 'none' }}>← Home</a>
      </header>

      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '30px' }}>📦 My Orders</h2>

        {loading ? (
          <p style={{ color: 'gray' }}>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : orders.length === 0 ? (
          <div style={{ background: 'white', borderRadius: '10px', padding: '50px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <p style={{ fontSize: '18px', color: 'gray', marginBottom: '20px' }}>Abhi tak koi order nahi hai</p>
            <a href="/" style={{
              display: 'inline-block', background: 'black', color: 'gold',
              padding: '12px 30px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold'
            }}>Shopping Shuru Karo</a>
          </div>
        ) : (
          orders.map((order) => {
            const isCancelledOrReturned = order.orderStatus === 'Cancelled' || order.orderStatus === 'Returned';
            const currentStep = getStepIndex(order.orderStatus);

            return (
              <div key={order._id} style={{
                background: 'white', borderRadius: '10px', padding: '25px',
                marginBottom: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '15px', gap: '10px' }}>
                  <div>
                    <p style={{ fontWeight: 'bold' }}>Order ID: {order.orderId}</p>
                    <p style={{ color: 'gray', fontSize: '13px' }}>{formatDate(order.createdAt)}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '18px' }}>₹{order.totalAmount}</p>
                    <p style={{ color: 'gray', fontSize: '13px' }}>{order.paymentMethod}</p>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '12px 0', marginBottom: '15px' }}>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '14px' }}>
                      <span style={{ color: '#333' }}>{item.name} x{item.quantity}</span>
                      <span style={{ color: 'gray' }}>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {isCancelledOrReturned ? (
                  <p style={{ color: order.orderStatus === 'Cancelled' ? 'red' : 'orange', fontWeight: 'bold', marginBottom: '10px' }}>
                    {STATUS_LABELS[order.orderStatus]}
                  </p>
                ) : (
                  <div style={{ display: 'flex', marginBottom: '15px', marginTop: '10px' }}>
                    {STEPS.map((step, idx) => (
                      <div key={step} style={{ flex: 1, textAlign: 'center', position: 'relative' }}>
                        <div style={{
                          width: '24px', height: '24px', borderRadius: '50%', margin: '0 auto 6px',
                          background: idx <= currentStep ? 'black' : '#ddd',
                          color: idx <= currentStep ? 'gold' : '#999',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '12px', fontWeight: 'bold'
                        }}>
                          {idx <= currentStep ? '✓' : idx + 1}
                        </div>
                        <p style={{ fontSize: '11px', color: idx <= currentStep ? 'black' : '#999', fontWeight: idx === currentStep ? 'bold' : 'normal' }}>
                          {STATUS_LABELS[step]}
                        </p>
                        {idx < STEPS.length - 1 && (
                          <div style={{
                            position: 'absolute', top: '11px', left: '55%', width: '90%', height: '2px',
                            background: idx < currentStep ? 'black' : '#ddd', zIndex: 0
                          }} />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {order.courierName && order.trackingNumber && (
                  <div style={{ background: '#f9f9f9', padding: '10px 15px', borderRadius: '8px', fontSize: '13px', marginBottom: '10px' }}>
                    🚚 <b>{order.courierName}</b> — Tracking No: <b>{order.trackingNumber}</b>
                  </div>
                )}

                <p style={{ color: 'gray', fontSize: '13px' }}>
                  📍 {order.address.street}, {order.address.city}, {order.address.state} - {order.address.pincode}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}