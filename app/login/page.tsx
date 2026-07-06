'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = e.currentTarget;
    const name = (form[0] as HTMLInputElement).value;
    const email = (form[1] as HTMLInputElement).value;
    const phone = (form[2] as HTMLInputElement).value;
    const password = (form[3] as HTMLInputElement).value;

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/login');
      } else {
        setError(data.error || 'Kuch gadbad ho gayi');
      }
    } catch {
      setError('Server se connect nahi ho paya');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{maxWidth:'400px',margin:'100px auto',padding:'2rem',border:'1px solid #eee',borderRadius:'12px'}}>
      <h2 style={{textAlign:'center'}}>Create Account 🎉</h2>
      <p style={{textAlign:'center',color:'gray'}}>Join Aalike Fashion Today</p>

      {error && (
        <div style={{background:'#fee',color:'red',padding:'10px',borderRadius:'8px',marginBottom:'1rem',textAlign:'center'}}>
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{marginBottom:'1rem'}}>
          <label><b>Full Name</b></label>
          <input type="text" required style={{width:'100%',padding:'10px',marginTop:'5px',borderRadius:'8px',border:'1px solid #ddd'}} />
        </div>
        <div style={{marginBottom:'1rem'}}>
          <label><b>Email</b></label>
          <input type="email" required style={{width:'100%',padding:'10px',marginTop:'5px',borderRadius:'8px',border:'1px solid #ddd'}} />
        </div>
        <div style={{marginBottom:'1rem'}}>
          <label><b>Phone</b></label>
          <input type="text" style={{width:'100%',padding:'10px',marginTop:'5px',borderRadius:'8px',border:'1px solid #ddd'}} />
        </div>
        <div style={{marginBottom:'1rem'}}>
          <label><b>Password</b></label>
          <input type="password" required style={{width:'100%',padding:'10px',marginTop:'5px',borderRadius:'8px',border:'1px solid #ddd'}} />
        </div>
        <button type="submit" disabled={loading} style={{width:'100%',padding:'12px',background:'black',color:'yellow',border:'none',borderRadius:'8px',fontSize:'16px',cursor:'pointer'}}>
          {loading ? 'Creating...' : 'Create Account'}
        </button>
      </form>

      <p style={{textAlign:'center',marginTop:'1rem'}}>
        Already have account? <a href="/login">Login</a>
      </p>
    </div>
  );
}