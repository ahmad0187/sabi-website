import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Chat from '../components/Chat.jsx';
import AccountLink from '../components/AccountLink.jsx';
import { useState } from 'react';
import useReveal from '../components/useReveal.js';
import { useShop } from '../context/ShopContext.jsx';

export default function Faq() {
  useReveal();
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState(0);
  const accent = '#9A5845';
  const data = [
    {
      cat: 'Orders & Delivery',
      q: 'How long does delivery take?',
      a: 'Orders are usually delivered within [X–Y] working days in major cities and [X–Y] working days elsewhere. You will receive a tracking link by SMS and email as soon as your order is dispatched.',
    },
    {
      cat: 'Orders & Delivery',
      q: 'How can I track my order?',
      a: 'Use the tracking link in your dispatch message, or contact us on WhatsApp with your order number and we will update you right away.',
    },
    {
      cat: 'Orders & Delivery',
      q: 'Do you offer gift wrapping and gift messages?',
      a: 'Every Sabi order arrives gift-ready in our signature box. Add a personal note at checkout and we will include it, handwritten, with your order.',
    },
    {
      cat: 'Products',
      q: 'What is the difference between Eau de Parfum, Eau de Toilette and attar?',
      a: 'Eau de Parfum has a higher concentration of perfume oils, so it is richer and lasts longer. Eau de Toilette is lighter and fresher, perfect for daytime. Attar is a concentrated, alcohol-free perfume oil applied in small amounts directly to the skin.',
    },
    {
      cat: 'Products',
      q: 'How long will my fragrance last?',
      a: 'Longevity depends on the concentration, the scent family and your skin. Deeper notes such as oud, amber and woods usually last longer than fresh citrus. For the best results, apply to moisturised skin on your pulse points.',
    },
    {
      cat: 'Products',
      q: 'Can I try a scent before buying a full bottle?',
      a: 'Yes. Every order includes a complimentary discovery vial, and our Discovery Edit lets you try one fragrance from every scent family before choosing your signature.',
    },
    {
      cat: 'Products',
      q: 'How should I store my perfume?',
      a: 'Keep your bottle in a cool, dry place away from direct sunlight and heat, with the cap closed. Avoid storing perfume in the bathroom, where temperature and humidity change often.',
    },
    {
      cat: 'Returns',
      q: 'Can I return or exchange a perfume?',
      a: 'Unopened, sealed bottles can be returned within [X] days of delivery. For hygiene reasons, opened fragrances cannot be returned unless they arrived damaged or incorrect.',
    },
    {
      cat: 'Returns',
      q: 'What if my order arrives damaged?',
      a: 'We are so sorry if that happens. Please message us within [48 hours] of delivery with a photo of the item and packaging, and we will arrange a replacement or refund.',
    },
    {
      cat: 'Payments',
      q: 'Which payment methods do you accept?',
      a: 'We accept cash on delivery, debit and credit cards, and bank transfer. [Add any wallets you support, such as JazzCash or Easypaisa.]',
    },
    {
      cat: 'Payments',
      q: 'Is it safe to pay online?',
      a: 'Yes. All card payments are processed through a secure, encrypted payment gateway. We never see or store your full card details.',
    },
  ];
  const faqs = data
    .filter((d) => cat === 'All' || d.cat === cat)
    .map((d, i) => {
      const isOpen = open === i;
      return { ...d, open: isOpen, expanded: isOpen ? 'true' : 'false', sign: isOpen ? '−' : '+', toggle: () => setOpen(isOpen ? -1 : i) };
    });
  const cats = ['All', 'Orders & Delivery', 'Products', 'Returns', 'Payments'].map((c) => ({
    label: c,
    active: c === cat,
    inactive: c !== cat,
    pick: () => {
      setCat(c);
      setOpen(0);
    },
  }));
  const vals = { accent, faqs, cats, bagCount: useShop().bagCount };

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
            <Link to="/history">Our History</Link>
            <Link to="/faq" style={{ borderBottom: '1px solid #2B1D21' }}>
              FAQs
            </Link>
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
          maxWidth: '900px',
          margin: '0 auto',
          padding: '104px 32px 56px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '22px',
          textAlign: 'center',
        }}
      >
        <p style={{ margin: '0', fontSize: '13px', letterSpacing: '0.24em', textTransform: 'uppercase', color: accent, fontWeight: '500' }}>
          Help centre
        </p>
        <h1
          className="s-fade s-d1"
          style={{
            margin: '0',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: '400',
            fontSize: 'clamp(52px, 6vw, 88px)',
            lineHeight: '1',
          }}
        >
          {'Frequently asked '}
          <em>questions</em>
        </h1>
        <p style={{ margin: '0', fontSize: '18px', lineHeight: '1.7', color: '#5E4A4F', fontWeight: '300' }}>
          Everything you need to know about ordering, choosing and loving your Sabi fragrance.
        </p>
      </section>
      <div
        role="tablist"
        aria-label="FAQ topics"
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 32px 48px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        {(cats || []).map((c, $i) => (
          <Fragment key={$i}>
            {c.active ? (
              <>
                <button
                  role="tab"
                  aria-selected="true"
                  onClick={c.pick}
                  style={{
                    minHeight: '44px',
                    padding: '0 24px',
                    borderRadius: '999px',
                    border: '1px solid #2B1D21',
                    background: '#2B1D21',
                    color: '#FBF5F2',
                    fontSize: '14px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {c.label}
                </button>
              </>
            ) : null}
            {c.inactive ? (
              <>
                <button
                  role="tab"
                  aria-selected="false"
                  onClick={c.pick}
                  style={{
                    minHeight: '44px',
                    padding: '0 24px',
                    borderRadius: '999px',
                    border: '1px solid #C9B2AA',
                    background: 'transparent',
                    color: '#2B1D21',
                    fontSize: '14px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {c.label}
                </button>
              </>
            ) : null}
          </Fragment>
        ))}
      </div>
      <section style={{ maxWidth: '920px', margin: '0 auto', padding: '0 32px 104px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {(faqs || []).map((f, $i) => (
            <Fragment key={$i}>
              <div style={{ background: '#FFFFFF', border: '1px solid #EADDD7', borderRadius: '20px', padding: '0 28px' }}>
                <button
                  onClick={f.toggle}
                  aria-expanded={f.expanded}
                  style={{
                    width: '100%',
                    minHeight: '76px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '20px',
                    border: '0',
                    background: 'transparent',
                    padding: '18px 0',
                    textAlign: 'left',
                    color: '#2B1D21',
                  }}
                >
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span
                      style={{ fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: accent, fontWeight: '500' }}
                    >
                      {f.cat}
                    </span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', lineHeight: '1.2' }}>{f.q}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    style={{
                      flex: '0 0 40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1px solid #D9C4BC',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                    }}
                  >
                    {f.sign}
                  </span>
                </button>
                {f.open ? (
                  <>
                    <p style={{ margin: '0', padding: '0 56px 26px 0', fontSize: '16px', lineHeight: '1.8', color: '#5E4A4F' }}>{f.a}</p>
                  </>
                ) : null}
              </div>
            </Fragment>
          ))}
        </div>
      </section>
      <section style={{ padding: '0 32px 104px' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            background: '#F2DCD6',
            borderRadius: '32px',
            padding: '64px 48px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h2
              style={{
                margin: '0',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: '400',
                fontSize: 'clamp(36px, 3.8vw, 52px)',
                lineHeight: '1.05',
              }}
            >
              {'Still have a '}
              <em>question?</em>
            </h2>
            <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.7', color: '#4E3B40' }}>
              Our fragrance team is happy to help you choose, track an order or find the perfect gift.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a
              href="#top"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                background: '#FBF5F2',
                borderRadius: '16px',
                padding: '18px 22px',
                fontSize: '15px',
              }}
            >
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2B1D21" strokeWidth="1.5">
                <path d="M4 20l1.5-4A8 8 0 1 1 8 18.5L4 20z" />
              </svg>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontWeight: '500' }}>WhatsApp us</span>
                <span style={{ color: '#5E4A4F' }}>[YOUR WHATSAPP NUMBER]</span>
              </span>
            </a>
            <a
              href="#top"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                background: '#FBF5F2',
                borderRadius: '16px',
                padding: '18px 22px',
                fontSize: '15px',
              }}
            >
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2B1D21" strokeWidth="1.5">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontWeight: '500' }}>Email us</span>
                <span style={{ color: '#5E4A4F' }}>[YOUR EMAIL]</span>
              </span>
            </a>
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
