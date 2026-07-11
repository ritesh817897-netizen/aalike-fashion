'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get('email') || '';

  const [email] = useState(emailFromQuery);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('✅ Account verify ho gaya! Login page par bhej rahe hain...');
        setTimeout(() => router.push('/login'), 1500);
      } else {
        setError(data.error || 'Verification fail ho gaya');
      }
    } catch (err) {
      console.log(err);
      setError('Server se connect nahi ho paya');
    }

    setLoading(false);
  }

  async function handleResend() {
    setError('');
    setSuccess('');
    setResending(true);

    try {
      const res = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('✅ Naya OTP bhej diya gaya hai, email check karo');
      } else {
        setError(data.error || 'OTP resend nahi ho paya');
      }
    } catch (err) {
      console.log(err);
      setError('Server se connect nahi ho paya');
    }

    setResending(false);
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',justifyContent:'center',alignItems:'center',background:'#f4f4f4'}}>
      <div style={{background:'#fff',padding:'35px',borderRadius:'10px',width:'380px',boxShadow:'0 0 15px rgba(0,0,0,0.15)'}}>
        <h2 style={{textAlign:'center',marginBottom:'10px'}}>Email Verify Karo</h2>
        <p style={{textAlign:'center',color:'gray',marginBottom:'20px',fontSize:'14px'}}>
          {email ? `${email} par bheja gaya 6-digit code daalo` : 'Apna email aur code daalo'}
        </p>

        {error && (
          <div style={{background:'#fee',color:'red',padding:'10px',borderRadius:'8px',marginBottom:'1rem',textAlign:'center',fontSize:'14px'}}>
            {error}
          </div>
        )}
        {success && (
          <div style={{background:'#e6ffed',color:'green',padding:'10px',borderRadius:'8px',marginBottom:'1rem',textAlign:'center',fontSize:'14px'}}>
            {success}
          </div>
        )}

        <form onSubmit={handleVerify}>
          <label><b>6-Digit OTP</b></label>
          <input
            type="text"
            placeholder="123456"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            required
            style={{
              width:'100%', padding:'14px', marginBottom:'15px', marginTop:'5px',
              border:'1px solid #ccc', borderRadius:'8px', fontSize:'22px',
              letterSpacing:'8px', textAlign:'center', boxSizing:'border-box'
            }}
          />

          <button type="submit" disabled={loading} style={{width:'100%',padding:'12px',background:'#000',color:'#FFD700',border:'none',borderRadius:'8px',cursor:'pointer',fontSize:'17px',fontWeight:'bold',marginTop:'5px'}}>
            {loading ? 'Verify ho raha hai...' : 'Verify Karo'}
          </button>
        </form>

        <p style={{marginTop:'20px',textAlign:'center',fontSize:'14px'}}>
          Code nahi mila?{' '}
          <button
            onClick={handleResend}
            disabled={resending}
            style={{background:'none',border:'none',color:'#0066cc',cursor:'pointer',textDecoration:'underline',fontSize:'14px'}}
          >
            {resending ? 'Bhej rahe hain...' : 'Dobara Bhejo'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default function VerifyOtp() {
  return (
    <Suspense fallback={<div style={{textAlign:'center', padding:'50px'}}>Loading...</div>}>
      <VerifyOtpForm />
    </Suspense>
  );
}