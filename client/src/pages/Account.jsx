import { Link, useNavigate } from 'react-router-dom';
import AuthShell, { primaryButton } from '../components/AuthShell.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useShop } from '../context/ShopContext.jsx';

export default function Account() {
  const { user, logout } = useAuth();
  const { bagCount, wishCount } = useShop();
  const navigate = useNavigate();

  async function signOut() {
    await logout();
    navigate('/', { replace: true });
  }

  const row = { display: 'flex', justifyContent: 'space-between', gap: 16, padding: '14px 0', borderBottom: '1px solid #EADDD7', fontSize: 15 };

  return (
    <AuthShell title={`Hello, ${user.name.split(' ')[0]}`} intro="Your Sabi account." footer={<Link to="/" style={{ borderBottom: '1px solid #2B1D21' }}>Continue shopping</Link>}>
      <div>
        <div style={row}><span style={{ color: '#5E4A4F' }}>Name</span><span>{user.name}</span></div>
        <div style={row}><span style={{ color: '#5E4A4F' }}>Email</span><span>{user.email}</span></div>
        <div style={row}><span style={{ color: '#5E4A4F' }}>Items in bag</span><Link to="/cart" style={{ borderBottom: '1px solid #2B1D21' }}>{bagCount}</Link></div>
        <div style={{ ...row, borderBottom: 0 }}><span style={{ color: '#5E4A4F' }}>Wishlist</span><span>{wishCount}</span></div>
      </div>
      <button className="s-btn s-btn-line" onClick={signOut} style={{ ...primaryButton, background: 'transparent', color: '#2B1D21', border: '1px solid #2B1D21' }}>
        Sign out
      </button>
    </AuthShell>
  );
}
