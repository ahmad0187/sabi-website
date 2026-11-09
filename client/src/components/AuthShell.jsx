import { Link } from 'react-router-dom';

export const field = {
  width: '100%',
  minHeight: 54,
  padding: '0 18px',
  border: '1px solid #C9B2AA',
  borderRadius: 14,
  background: '#FBF5F2',
  fontSize: 16,
  color: '#2B1D21'
};

export const labelStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  fontSize: 12,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  fontWeight: 500
};

export const primaryButton = {
  minHeight: 58,
  border: 0,
  borderRadius: 999,
  background: '#2B1D21',
  color: '#FBF5F2',
  fontSize: 13,
  letterSpacing: '0.2em',
  textTransform: 'uppercase'
};

// Page frame shared by the sign in, register and account screens.
export default function AuthShell({ title, intro, children, footer }) {
  return (
    <div style={{ minHeight: '100vh', background: '#F3E3DD', color: '#2B1D21', fontFamily: 'Jost, system-ui, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px 72px' }}>
      <Link to="/" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 46, fontWeight: 500, letterSpacing: '0.34em', lineHeight: 1, paddingLeft: '0.34em', marginBottom: 40 }}>
        SABI
      </Link>
      <main className="s-fade" style={{ width: '100%', maxWidth: 460, background: '#FFFFFF', border: '1px solid #EADDD7', borderRadius: 28, padding: '44px 36px', display: 'flex', flexDirection: 'column', gap: 24, boxShadow: '0 30px 60px -36px rgba(43,29,33,0.4)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h1 style={{ margin: 0, fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 44, lineHeight: 1 }}>{title}</h1>
          {intro && <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#5E4A4F' }}>{intro}</p>}
        </div>
        {children}
      </main>
      {footer && <p style={{ margin: '28px 0 0', fontSize: 15, color: '#5E4A4F' }}>{footer}</p>}
    </div>
  );
}
