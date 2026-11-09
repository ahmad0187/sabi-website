import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthShell, { field, labelStyle, primaryButton } from '../components/AuthShell.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const { user, loading, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/account';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (!loading && user) return <Navigate to={from} replace />;

  async function submit(e) {
    e.preventDefault();
    setError('');
    if (password.length < 8) return setError('Password must be at least 8 characters.');
    setBusy(true);
    try {
      await register(name, email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <AuthShell
      title="Join Sabi"
      intro="Create an account to keep your bag and wishlist safe."
      footer={<>Already have an account? <Link to="/login" state={location.state} style={{ borderBottom: '1px solid #2B1D21' }}>Sign in</Link></>}
    >
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <label style={labelStyle}>
          Full name
          <input type="text" name="name" autoComplete="name" required minLength={2} value={name} onChange={(e) => setName(e.target.value)} style={field} />
        </label>
        <label style={labelStyle}>
          Email
          <input type="email" name="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={field} />
        </label>
        <label style={labelStyle}>
          Password
          <input type="password" name="password" autoComplete="new-password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} style={field} />
          <span style={{ fontSize: 12, letterSpacing: '0.02em', textTransform: 'none', fontWeight: 400, color: '#5E4A4F' }}>At least 8 characters.</span>
        </label>
        {error && <p role="alert" style={{ margin: 0, padding: '12px 16px', borderRadius: 12, background: '#F6DADA', color: '#7A2020', fontSize: 14 }}>{error}</p>}
        <button className="s-btn s-btn-dark" type="submit" disabled={busy} style={primaryButton}>
          {busy ? 'Creating account…' : 'Create account'}
        </button>
      </form>
    </AuthShell>
  );
}
