export default function Signup() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'white',
        padding: '50px',
        borderRadius: '15px',
        boxShadow: '0 5px 30px rgba(0,0,0,0.1)',
        width: '400px'
      }}>
        <h2 style={{textAlign: 'center', fontSize: '28px', marginBottom: '5px'}}>
          Create Account 🎉
        </h2>
        <p style={{textAlign: 'center', color: 'gray', marginBottom: '30px'}}>
          Join Aalike Fashion Today
        </p>

        <label style={{fontWeight: 'bold'}}>Full Name</label>
        <input type="text" placeholder="Enter your name"
          style={{width: '100%', padding: '12px', border: '2px solid #eee',
          borderRadius: '8px', fontSize: '16px', marginBottom: '15px',
          marginTop: '8px', boxSizing: 'border-box'}}
        />

        <label style={{fontWeight: 'bold'}}>Email</label>
        <input type="email" placeholder="Enter your email"
          style={{width: '100%', padding: '12px', border: '2px solid #eee',
          borderRadius: '8px', fontSize: '16px', marginBottom: '15px',
          marginTop: '8px', boxSizing: 'border-box'}}
        />

        <label style={{fontWeight: 'bold'}}>Phone Number</label>
        <input type="tel" placeholder="Enter your phone number"
          style={{width: '100%', padding: '12px', border: '2px solid #eee',
          borderRadius: '8px', fontSize: '16px', marginBottom: '15px',
          marginTop: '8px', boxSizing: 'border-box'}}
        />

        <label style={{fontWeight: 'bold'}}>Password</label>
        <input type="password" placeholder="Create password"
          style={{width: '100%', padding: '12px', border: '2px solid #eee',
          borderRadius: '8px', fontSize: '16px', marginBottom: '25px',
          marginTop: '8px', boxSizing: 'border-box'}}
        />

        <button style={{width: '100%', padding: '15px', background: 'black',
          color: 'gold', border: 'none', borderRadius: '8px',
          fontSize: '18px', fontWeight: 'bold', cursor: 'pointer',
          marginBottom: '15px'}}>
          Create Account
        </button>

        <p style={{textAlign: 'center', color: 'gray'}}>
          Already have account?{' '}
          <a href="/login" style={{color: 'black', fontWeight: 'bold'}}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}