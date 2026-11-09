import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Bottle from '../components/Bottle.jsx';
import Chat from '../components/Chat.jsx';
import AccountLink from '../components/AccountLink.jsx';
import useReveal from '../components/useReveal.js';
import { useShop } from '../context/ShopContext.jsx';

export default function About() {
  useReveal();
  const accent = '#9A5845';
  const vals = { accent, bagCount: useShop().bagCount };

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
            <Link to="/about" style={{ borderBottom: '1px solid #2B1D21' }}>
              About Us
            </Link>
            <Link to="/history">Our History</Link>
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
      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '112px 32px 96px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '26px',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: '0', fontSize: '13px', letterSpacing: '0.24em', textTransform: 'uppercase', color: accent, fontWeight: '500' }}>
          About Sabi
        </p>
        <h1
          className="s-fade s-d1"
          style={{
            margin: '0',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: '400',
            fontSize: 'clamp(52px, 6.4vw, 96px)',
            lineHeight: '1',
          }}
        >
          {'Fragrance for '}
          <em>every story.</em>
        </h1>
        <p style={{ margin: '0', fontSize: '19px', lineHeight: '1.75', color: '#5E4A4F', fontWeight: '300', maxWidth: '720px' }}>
          Sabi is a house of fine fragrance built on one idea: everyone deserves a scent that feels unmistakably theirs. From delicate
          florals to deep oud and traditional attar, we bring every kind of perfume together in one beautiful place.
        </p>
      </section>
      <section aria-hidden="true" style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div
            style={{
              height: '380px',
              borderRadius: '24px',
              background: '#F2DCD6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div className="s-float" style={{ width: '180px', height: '288px' }}>
              <Bottle shape="classic" liquid="#E2A9A6" cap="#C9A27A" label="SABI" />
            </div>
          </div>
          <div
            style={{
              height: '380px',
              borderRadius: '24px',
              background: '#2B1D21',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div className="s-float-2" style={{ width: '190px', height: '304px' }}>
              <Bottle shape="round" liquid="#C8423A" cap="#C9A27A" label="" />
            </div>
          </div>
          <div
            style={{
              height: '380px',
              borderRadius: '24px',
              background: '#E6DCD3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div className="s-float-3" style={{ width: '170px', height: '272px' }}>
              <Bottle shape="attar" liquid="#7A2E3A" cap="#C9A27A" label="" />
            </div>
          </div>
        </div>
      </section>
      <section
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '112px 32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '64px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <p
            style={{ margin: '0', fontSize: '13px', letterSpacing: '0.24em', textTransform: 'uppercase', color: accent, fontWeight: '500' }}
          >
            Our mission
          </p>
          <h2
            style={{
              margin: '0',
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: '400',
              fontSize: 'clamp(36px, 3.6vw, 52px)',
              lineHeight: '1.08',
            }}
          >
            {'To make finding your signature scent '}
            <em>simple, joyful and personal.</em>
          </h2>
          <p style={{ margin: '0', fontSize: '17px', lineHeight: '1.8', color: '#5E4A4F', fontWeight: '300' }}>
            Choosing a perfume can feel overwhelming. We guide you by mood and scent family, let you try before you commit, and help you
            discover the fragrance that tells your story best.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <p
            style={{ margin: '0', fontSize: '13px', letterSpacing: '0.24em', textTransform: 'uppercase', color: accent, fontWeight: '500' }}
          >
            Our vision
          </p>
          <h2
            style={{
              margin: '0',
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: '400',
              fontSize: 'clamp(36px, 3.6vw, 52px)',
              lineHeight: '1.08',
            }}
          >
            {'To become the most loved home '}
            <em>for fragrance lovers.</em>
          </h2>
          <p style={{ margin: '0', fontSize: '17px', lineHeight: '1.8', color: '#5E4A4F', fontWeight: '300' }}>
            A place where a first-time buyer and a lifelong collector feel equally at home — and where every bottle arrives feeling like a
            gift.
          </p>
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
              What we stand for
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
              {'The Sabi '}
              <em>promise</em>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div
              style={{
                background: '#FBF5F2',
                borderRadius: '22px',
                padding: '36px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '44px', color: accent, lineHeight: '1' }}>I.</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px' }}>Curated with care</span>
              <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#5E4A4F' }}>
                Every fragrance is chosen for its character, quality and how beautifully it wears.
              </span>
            </div>
            <div
              style={{
                background: '#FBF5F2',
                borderRadius: '22px',
                padding: '36px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '44px', color: accent, lineHeight: '1' }}>II.</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px' }}>Something for everyone</span>
              <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#5E4A4F' }}>
                Women, men and unisex — florals, oud, fresh, woody, amber and attar, all in one house.
              </span>
            </div>
            <div
              style={{
                background: '#FBF5F2',
                borderRadius: '22px',
                padding: '36px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '44px', color: accent, lineHeight: '1' }}>III.</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px' }}>Honest guidance</span>
              <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#5E4A4F' }}>
                Clear notes, real advice and discovery vials, so you always choose with confidence.
              </span>
            </div>
            <div
              style={{
                background: '#FBF5F2',
                borderRadius: '22px',
                padding: '36px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '44px', color: accent, lineHeight: '1' }}>IV.</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px' }}>Beautifully given</span>
              <span style={{ fontSize: '15px', lineHeight: '1.7', color: '#5E4A4F' }}>
                Every order is packed with care and arrives gift-ready — for you, or someone you love.
              </span>
            </div>
          </div>
        </div>
      </section>
      <section
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '120px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '28px',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: '0', fontSize: '13px', letterSpacing: '0.24em', textTransform: 'uppercase', color: accent, fontWeight: '500' }}>
          A note from our founder
        </p>
        <blockquote
          style={{
            margin: '0',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: '400',
            fontSize: 'clamp(30px, 3.2vw, 44px)',
            lineHeight: '1.3',
          }}
        >
          “A fragrance is the first thing people notice and the last thing they forget. I started Sabi so that everyone — whatever their
          taste — could find the scent that makes them feel like the best version of themselves.”
        </blockquote>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '16px', fontWeight: '500' }}>[Founder name]</span>
          <span style={{ fontSize: '14px', color: '#5E4A4F', letterSpacing: '0.08em' }}>Founder, Sabi</span>
        </div>
      </section>
      <section style={{ padding: '0 32px 104px' }}>
        <div
          style={{
            maxWidth: '1320px',
            margin: '0 auto',
            background: '#2B1D21',
            color: '#F7EDE8',
            borderRadius: '32px',
            padding: '72px 48px',
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
              fontSize: 'clamp(38px, 4vw, 58px)',
              lineHeight: '1.05',
            }}
          >
            {'Every Scent. '}
            <em>Your Signature.</em>
          </h2>
          <p style={{ margin: '0', fontSize: '17px', lineHeight: '1.7', color: '#E5D6D1', maxWidth: '520px' }}>
            Explore the full Sabi collection and find the fragrance that feels like you.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px' }}>
            <Link
              to="/product"
              style={{
                background: '#F7EDE8',
                color: '#2B1D21',
                padding: '18px 34px',
                fontSize: '14px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                borderRadius: '999px',
              }}
            >
              Shop the collection
            </Link>
            <Link
              to="/history"
              style={{
                border: '1px solid #F7EDE8',
                color: '#F7EDE8',
                padding: '17px 32px',
                fontSize: '14px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                borderRadius: '999px',
              }}
            >
              Read our history
            </Link>
          </div>
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
