import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const style = {
  marginRight: 16,
  fontSize: 13,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
};

// Header link: "Sign in" for visitors, first name (linking to the account page) once logged in.
export default function AccountLink() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user)
    return (
      <Link to="/login" style={style}>
        Sign in
      </Link>
    );
  return (
    <Link to="/account" style={style} aria-label="My account">
      Hi, {user.name.split(' ')[0]}
    </Link>
  );
}
