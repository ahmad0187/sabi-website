import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthShell, { field, labelStyle, primaryButton } from '../components/AuthShell.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/account';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (!loading && user) return <Navigate to={from} replace />;

  async function submit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <AuthShell
      title="Welcome back"
      intro="Sign in to see your bag and wishlist on any device."
      footer={<>New to Sabi? <Link to="/register" state={location.state} style={{ borderBottom: '1px solid #2B1D21' }}>Create an account</Link></>}
    >
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <label style={labelStyle}>
          Email
          <input type="email" name="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={field} />
        </label>
        <label style={labelStyle}>
          Password
          <input type="password" name="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} style={field} />
        </label>
        {error && <p role="alert" style={{ margin: 0, padding: '12px 16px', borderRadius: 12, background: '#F6DADA', color: '#7A2020', fontSize: 14 }}>{error}</p>}
        <button className="s-btn s-btn-dark" type="submit" disabled={busy} style={primaryButton}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </AuthShell>
  );
}
