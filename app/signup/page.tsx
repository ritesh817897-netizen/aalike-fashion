'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/login');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      console.log(err);
      setError('Server se connect nahi ho paya');
    }

    setLoading(false);
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',justifyContent:'center',alignItems:'center',background:'#f4f4f4'}}>
      <form onSubmit={handleSubmit} style={{background:'#fff',padding:'35px',borderRadius:'10px',width:'380px',boxShadow:'0 0 15px rgba(0,0,0,0.15)'}}>
        <h2 style={{textAlign:'center',marginBottom:'20px'}}>Create Account</h2>
        <p style={{textAlign:'center',color:'gray',marginTop:'-15px',marginBottom:'20px'}}>Join Aalike Fashion Today</p>

        {error && (
          <div style={{background:'#fee',color:'red',padding:'10px',borderRadius:'8px',marginBottom:'1rem',textAlign:'center'}}>
            {error}
          </div>
        )}

        <label><b>Full Name</b></label>
        <input type="text" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required style={inputStyle} />

        <label><b>Email</b></label>
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required style={inputStyle} />

        <label><b>Phone</b></label>
        <input type="text" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle} />

        <label><b>Password</b></label>
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required style={inputStyle} />

        <button type="submit" disabled={loading} style={{width:'100%',padding:'12px',background:'#000',color:'#FFD700',border:'none',borderRadius:'8px',cursor:'pointer',fontSize:'17px',fontWeight:'bold',marginTop:'5px'}}>
          {loading ? 'Creating...' : 'Create Account'}
        </button>

        <p style={{marginTop:'20px',textAlign:'center'}}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '15px',
  marginTop: '5px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  fontSize: '16px',
  boxSizing: 'border-box' as const,
};