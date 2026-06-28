export default function Login() {
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
          Welcome Back 👋
        </h2>
        <p style={{textAlign: 'center', color: 'gray', marginBottom: '30px'}}>
          Login to Aalike Fashion
        </p>

        <label style={{fontWeight: 'bold'}}>Email</label>
        <input type="email" placeholder="Enter your email"
          style={{width: '100%', padding: '12px', border: '2px solid #eee',
          borderRadius: '8px', fontSize: '16px', marginBottom: '15px',
          marginTop: '8px', boxSizing: 'border-box'}}
        />

        <label style={{fontWeight: 'bold'}}>Password</label>
        <input type="password" placeholder="Enter your password"
          style={{width: '100%', padding: '12px', border: '2px solid #eee',
          borderRadius: '8px', fontSize: '16px', marginBottom: '25px',
          marginTop: '8px', boxSizing: 'border-box'}}
        />

        <button style={{width: '100%', padding: '15px', background: 'black',
          color: 'gold', border: 'none', borderRadius: '8px',
          fontSize: '18px', fontWeight: 'bold', cursor: 'pointer',
          marginBottom: '15px'}}>
          Login
        </button>

        <p style={{textAlign: 'center', color: 'gray'}}>
          New user?{' '}
          <a href="/signup" style={{color: 'black', fontWeight: 'bold'}}>
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}