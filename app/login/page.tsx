export default function Login() {
  return (
    <div style={{minHeight:'100vh',background:'#f5f5f5',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'white',padding:'50px',borderRadius:'15px',boxShadow:'0 5px 30px rgba(0,0,0,0.1)',width:'400px'}}>
        <h2 style={{textAlign:'center',fontSize:'28px',marginBottom:'30px'}}>Login - Aalike Fashion</h2>
        <input type="email" placeholder="Email" style={{width:'100%',padding:'12px',border:'2px solid #eee',borderRadius:'8px',fontSize:'16px',marginBottom:'15px',boxSizing:'border-box'}}/>
        <input type="password" placeholder="Password" style={{width:'100%',padding:'12px',border:'2px solid #eee',borderRadius:'8px',fontSize:'16px',marginBottom:'20px',boxSizing:'border-box'}}/>
        <button style={{width:'100%',padding:'15px',background:'black',color:'gold',border:'none',borderRadius:'8px',fontSize:'18px',fontWeight:'bold',cursor:'pointer'}}>Login</button>
        <p style={{textAlign:'center',marginTop:'20px',color:'gray'}}>New user? <a href="/signup" style={{color:'black',fontWeight:'bold'}}>Sign Up</a></p>
      </div>
    </div>
  );
}
