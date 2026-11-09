import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Chat from '../components/Chat.jsx';
import AccountLink from '../components/AccountLink.jsx';
import useReveal from '../components/useReveal.js';
import { useShop } from '../context/ShopContext.jsx';

export default function History() {
  useReveal();
  const accent = '#9A5845';
  const milestones = [
    {
      when: 'Early',
      year: '2026',
      dot: '#E2A9A6',
      title: 'The idea',
      text: 'It began with a simple frustration: great fragrances were scattered everywhere, and finding the right one felt like guesswork. We set out to build one beautiful home for every kind of scent.',
    },
    {
      when: 'Spring',
      year: '2026',
      dot: '#D49A72',
      title: 'Searching for our scents',
      text: 'Months of smelling, testing and wearing. Florals, fresh citrus, warm ambers, deep oud and traditional attar — only the fragrances we truly loved made the cut.',
    },
    {
      when: 'Summer',
      year: '2026',
      dot: '#B97F6A',
      title: 'Sabi is named',
      text: 'We chose a name that is short, warm and easy to remember — a name for a house that welcomes everyone. Our promise followed: Every Scent. Your Signature.',
    },
    {
      when: 'Autumn',
      year: '2026',
      dot: '#7A2E3A',
      title: 'The first collection',
      text: 'Our first eight signature fragrances were finalised — from Velvet Petal to Midnight Oud — alongside the Discovery Edit, so anyone could try before they commit.',
    },
    {
      when: 'November',
      year: '2026',
      dot: '#2B1D21',
      title: 'Sabi opens its doors online',
      text: 'The Sabi website launches, bringing every scent to your door — gift-ready, with a discovery vial in every order.',
    },
  ];
  const vals = { accent, milestones, bagCount: useShop().bagCount };

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#FBF5F2', color: '#2B1D21', fontFamily: 'Jost, system-ui, sans-serif' }}>
      <div
        style={{
          background: '#2B1D21',
          color: '#F7EDE8',
          textAlign: 'center',
          fontSize: '13px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          padding: '11px 16px',
        }}
      >
        Complimentary discovery vial with every order
      </div>
      <header style={{ borderBottom: '1px solid #EADDD7' }}>
        <div
          style={{
            maxWidth: '1320px',
            margin: '0 auto',
            padding: '18px 32px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <nav
            aria-label="Primary"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '26px',
              fontSize: '14px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              flex: '1 1 360px',
            }}
          >
            <Link to="/">Home</Link>
            <Link to="/product">Shop</Link>
            <Link to="/about">About Us</Link>
            <Link to="/history" style={{ borderBottom: '1px solid #2B1D21' }}>
              Our History
            </Link>
            <Link to="/faq">FAQs</Link>
          </nav>
          <Link
            to="/"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '44px',
              fontWeight: '500',
              letterSpacing: '0.32em',
              lineHeight: '1',
              paddingLeft: '0.32em',
            }}
          >
            SABI
          </Link>
          <div style={{ display: 'flex', justifyContent: 'flex-end', flex: '1 1 360px' }}>
            <AccountLink />
            <Link
              to="/cart"
              style={{
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 8h14l-1 13H6L5 8z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              Bag
            </Link>
          </div>
        </div>
      </header>
      <section style={{ background: '#2B1D21', color: '#F7EDE8', padding: '120px 32px 112px' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              margin: '0',
              fontSize: '13px',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#E7BFB3',
              fontWeight: '500',
            }}
          >
            Our history
          </p>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(110px, 16vw, 220px)',
              lineHeight: '0.85',
              color: '#F2DCD6',
              fontWeight: '400',
            }}
          >
            2026
          </span>
          <h1
            className="s-fade s-d1"
            style={{
              margin: '0',
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: '400',
              fontSize: 'clamp(36px, 4vw, 56px)',
              lineHeight: '1.1',
            }}
          >
            {'The year a '}
            <em>signature</em>
            {' was born.'}
          </h1>
          <p style={{ margin: '0', fontSize: '18px', lineHeight: '1.75', color: '#E5D6D1', fontWeight: '300', maxWidth: '640px' }}>
            Sabi is young, ambitious and just getting started. This is the story of how a simple love of fragrance became a house for every
            scent — and where we are going next.
          </p>
        </div>
      </section>
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '112px 32px 80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '56px' }}>
          <p
            style={{ margin: '0', fontSize: '13px', letterSpacing: '0.24em', textTransform: 'uppercase', color: accent, fontWeight: '500' }}
          >
            Chapter one · 2026
          </p>
          <h2
            style={{
              margin: '0',
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: '400',
              fontSize: 'clamp(40px, 4.4vw, 60px)',
              lineHeight: '1.05',
            }}
          >
            {'From an idea '}
            <em>to a house.</em>
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', borderLeft: '1px solid #D9C4BC', marginLeft: '8px' }}>
          {(milestones || []).map((m, $i) => (
            <Fragment key={$i}>
              <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: '16px 48px', padding: '0 0 56px 44px' }}>
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '-9px',
                    top: '6px',
                    width: '17px',
                    height: '17px',
                    borderRadius: '50%',
                    background: m.dot,
                    border: '3px solid #FBF5F2',
                  }}
                />
                <div style={{ flex: '0 0 200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, fontWeight: '500' }}>
                    {m.when}
                  </span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', lineHeight: '1' }}>{m.year}</span>
                </div>
                <div
                  style={{
                    flex: '1 1 360px',
                    minWidth: '0',
                    background: '#FFFFFF',
                    border: '1px solid #EADDD7',
                    borderRadius: '22px',
                    padding: '30px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <h3
                    style={{
                      margin: '0',
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: '500',
                      fontSize: '30px',
                      lineHeight: '1.1',
                    }}
                  >
                    {m.title}
                  </h3>
                  <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.75', color: '#5E4A4F' }}>{m.text}</p>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </section>
      <section style={{ background: '#F5E6E1', padding: '104px 32px' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '48px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', textAlign: 'center' }}>
            <p
              style={{
                margin: '0',
                fontSize: '13px',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: accent,
                fontWeight: '500',
              }}
            >
              2027 and beyond
            </p>
            <h2
              style={{
                margin: '0',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: '400',
                fontSize: 'clamp(40px, 4.4vw, 60px)',
                lineHeight: '1.05',
              }}
            >
              {'The next '}
              <em>chapter</em>
            </h2>
            <p style={{ margin: '0', fontSize: '17px', lineHeight: '1.7', color: '#5E4A4F', maxWidth: '620px' }}>
              Our story is only beginning. Here is what we are dreaming of — and working towards.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <div
              style={{
                background: '#FBF5F2',
                borderRadius: '22px',
                padding: '34px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, fontWeight: '500' }}>
                Coming soon
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px' }}>The Attar Atelier</span>
              <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#5E4A4F' }}>
                A dedicated collection of rich, alcohol-free attars and oud oils.
              </span>
            </div>
            <div
              style={{
                background: '#FBF5F2',
                borderRadius: '22px',
                padding: '34px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, fontWeight: '500' }}>
                Coming soon
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px' }}>Personal engraving</span>
              <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#5E4A4F' }}>
                Names and messages engraved on your bottle — the most personal gift.
              </span>
            </div>
            <div
              style={{
                background: '#FBF5F2',
                borderRadius: '22px',
                padding: '34px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, fontWeight: '500' }}>
                Our dream
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px' }}>The first Sabi boutique</span>
              <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#5E4A4F' }}>
                A space to smell, explore and discover every Sabi scent in person.
              </span>
            </div>
          </div>
        </div>
      </section>
      <section
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '112px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            margin: '0',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: '400',
            fontSize: 'clamp(36px, 4vw, 54px)',
            lineHeight: '1.08',
          }}
        >
          {'Be part of the '}
          <em>story</em>
          {' from the very beginning.'}
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px' }}>
          <Link
            to="/product"
            style={{
              background: '#2B1D21',
              color: '#FBF5F2',
              padding: '18px 34px',
              fontSize: '14px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              borderRadius: '999px',
            }}
          >
            Shop the first collection
          </Link>
          <Link
            to="/about"
            style={{
              border: '1px solid #2B1D21',
              padding: '17px 32px',
              fontSize: '14px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              borderRadius: '999px',
            }}
          >
            About Sabi
          </Link>
        </div>
      </section>
      <footer style={{ background: '#2B1D21', color: '#E5D6D1', padding: '56px 32px 36px' }}>
        <div
          style={{
            maxWidth: '1320px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '34px',
                letterSpacing: '0.3em',
                color: '#F7EDE8',
                lineHeight: '1',
              }}
            >
              SABI
            </span>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '19px', color: '#E7BFB3' }}>
              Every Scent. Your Signature.
            </span>
          </div>
          <nav aria-label="Footer" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', fontSize: '14px' }}>
            <Link to="/" style={{ color: '#E5D6D1' }}>
              Home
            </Link>
            <Link to="/product" style={{ color: '#E5D6D1' }}>
              Shop
            </Link>
            <Link to="/about" style={{ color: '#E5D6D1' }}>
              About Us
            </Link>
            <Link to="/history" style={{ color: '#E5D6D1' }}>
              Our History
            </Link>
            <Link to="/faq" style={{ color: '#E5D6D1' }}>
              FAQs
            </Link>
            <Link to="/cart" style={{ color: '#E5D6D1' }}>
              Bag
            </Link>
          </nav>
          <span style={{ fontSize: '13px', color: '#BFA9A3' }}>© Sabi Fragrances. All rights reserved.</span>
        </div>
      </footer>
      <Chat />
    </div>
  );
}
