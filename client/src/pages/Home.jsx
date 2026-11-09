import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Bottle from '../components/Bottle.jsx';
import Chat from '../components/Chat.jsx';
import AccountLink from '../components/AccountLink.jsx';
import { useEffect, useRef, useState } from 'react';
import useReveal from '../components/useReveal.js';
import { useShop } from '../context/ShopContext.jsx';

export default function Home() {
  useReveal();
  const { products: all, wishlist, addToCart, toggleWish, bagCount, wishCount } = useShop();
  const [filter, setFilter] = useState('All');
  const [toast, setToast] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const toastTimer = useRef();
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const accent = '#9A5845';
  const products = all
    .filter((p) => filter === 'All' || p.gender === filter)
    .map((p) => {
      const wished = wishlist.includes(p.id);
      return {
        ...p,
        wished,
        notWished: !wished,
        wish: () => toggleWish(p.id),
        add: () => {
          addToCart(p.id);
          setToast(p.title);
          clearTimeout(toastTimer.current);
          toastTimer.current = setTimeout(() => setToast(''), 2600);
        },
      };
    });
  const tabs = ['All', 'Women', 'Men', 'Unisex'].map((t) => ({
    label: t,
    active: t === filter,
    inactive: t !== filter,
    pick: () => setFilter(t),
  }));
  const families = [
    { name: 'Floral', notes: 'Rose, jasmine, peony', shape: 'round', liquid: '#E8A3AC', cap: '#C9A27A', bg: '#F5E1DB' },
    { name: 'Oud', notes: 'Agarwood, smoke, saffron', shape: 'classic', liquid: '#4A3038', cap: '#1E1A1C', bg: '#E8DDD8' },
    { name: 'Fresh', notes: 'Citrus, aquatic, green', shape: 'tall', liquid: '#7FA7C4', cap: '#B8B8BC', bg: '#E3E9EC' },
    { name: 'Woody', notes: 'Cedar, sandalwood, vetiver', shape: 'classic', liquid: '#7A604C', cap: '#1E1A1C', bg: '#E6DCD3' },
    { name: 'Amber', notes: 'Vanilla, resin, warm spice', shape: 'round', liquid: '#D49A52', cap: '#C9A27A', bg: '#F3E5D6' },
    { name: 'Attar', notes: 'Rose oud, musk, oils', shape: 'attar', liquid: '#7A2E3A', cap: '#C9A27A', bg: '#EFDCDA' },
  ];
  const brands = [
    'Dior',
    'Chanel',
    'Tom Ford',
    'Creed',
    'Yves Saint Laurent',
    'Lancôme',
    'Maison Francis Kurkdjian',
    'Lattafa',
    'Amouage',
    'Sabi Signature',
  ];
  const brandsLoop = brands.concat(brands).map((name) => ({ name }));
  const floats = ['s-float', 's-float-2', 's-float-3'];
  const vials = ['#E8A3AC', '#4A3038', '#7FA7C4', '#7A604C', '#D49A52', '#C8423A', '#E7A7B4', '#7A2E3A'].map((c, i) => ({
    liquid: c,
    cls: floats[i % 3],
  }));

  const vals = {
    accent,
    products,
    tabs,
    families,
    brandsLoop,
    vials,
    bagCount,
    wishCount,
    toast,
    subscribed,
    notSubscribed: !subscribed,
    subscribe: () => setSubscribed(true),
  };

  const { notSubscribed, subscribe } = vals;
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: '#FBF5F2',
        color: '#2B1D21',
        fontFamily: 'Jost, system-ui, sans-serif',
        fontWeight: '400',
        overflowX: 'hidden',
      }}
    >
      <div
        style={{
          background: '#2B1D21',
          color: '#F7EDE8',
          fontSize: '13px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          padding: '11px 0',
          overflow: 'hidden',
        }}
      >
        <div className="s-marquee" aria-label="Announcements">
          <span style={{ padding: '0 40px' }}>Complimentary discovery vial with every order</span>
          <span aria-hidden="true">✦</span>
          <span style={{ padding: '0 40px' }}>Cash on delivery nationwide</span>
          <span aria-hidden="true">✦</span>
          <span style={{ padding: '0 40px' }}>Gift-ready Sabi packaging</span>
          <span aria-hidden="true">✦</span>
          <span style={{ padding: '0 40px' }}>New arrivals every week</span>
          <span aria-hidden="true">✦</span>
          <span style={{ padding: '0 40px' }} aria-hidden="true">
            Complimentary discovery vial with every order
          </span>
          <span aria-hidden="true">✦</span>
          <span style={{ padding: '0 40px' }} aria-hidden="true">
            Cash on delivery nationwide
          </span>
          <span aria-hidden="true">✦</span>
          <span style={{ padding: '0 40px' }} aria-hidden="true">
            Gift-ready Sabi packaging
          </span>
          <span aria-hidden="true">✦</span>
          <span style={{ padding: '0 40px' }} aria-hidden="true">
            New arrivals every week
          </span>
          <span aria-hidden="true">✦</span>
        </div>
      </div>
      <header
        style={{
          position: 'sticky',
          top: '0',
          zIndex: '40',
          background: 'rgba(251,245,242,0.86)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid #EADDD7',
        }}
      >
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            padding: '16px 32px',
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
              gap: '28px',
              fontSize: '13px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              flex: '1 1 360px',
            }}
          >
            <Link to="/" style={{ borderBottom: '1px solid #2B1D21', paddingBottom: '2px' }}>
              Home
            </Link>
            <Link to="/product">Shop</Link>
            <Link to="/about">About Us</Link>
            <Link to="/history">Our History</Link>
            <Link to="/faq">FAQs</Link>
          </nav>
          <Link
            to="/"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '46px',
              fontWeight: '500',
              letterSpacing: '0.34em',
              lineHeight: '1',
              paddingLeft: '0.34em',
            }}
          >
            SABI
          </Link>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'flex-end', flex: '1 1 360px' }}>
            <button
              aria-label="Search"
              style={{
                width: '44px',
                height: '44px',
                border: '0',
                background: 'transparent',
                color: '#2B1D21',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
            </button>
            <button
              aria-label="Wishlist"
              style={{
                height: '44px',
                border: '0',
                background: 'transparent',
                color: '#2B1D21',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '0 8px',
                fontSize: '13px',
              }}
            >
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
              </svg>
              {wishCount}
            </button>
            <AccountLink />
            <Link
              to="/cart"
              aria-label="Shopping bag"
              style={{ height: '44px', color: '#2B1D21', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 8px' }}
            >
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 8h14l-1 13H6L5 8z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              <span
                style={{
                  minWidth: '22px',
                  height: '22px',
                  borderRadius: '11px',
                  background: '#2B1D21',
                  color: '#FBF5F2',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 6px',
                }}
              >
                {bagCount}
              </span>
            </Link>
          </div>
        </div>
      </header>
      <section id="top" style={{ position: 'relative', background: '#F3E3DD', overflow: 'hidden' }}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-180px',
            top: '-200px',
            width: '720px',
            height: '720px',
            borderRadius: '50%',
            background: '#EED3CB',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-140px',
            bottom: '-260px',
            width: '520px',
            height: '520px',
            borderRadius: '50%',
            background: '#F7EBE6',
          }}
        />
        <div
          style={{
            position: 'relative',
            maxWidth: '1360px',
            margin: '0 auto',
            padding: '80px 32px 96px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <p
              className="s-fade"
              style={{
                margin: '0',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                fontSize: '13px',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: accent,
                fontWeight: '500',
              }}
            >
              <span aria-hidden="true" style={{ width: '40px', height: '1px', background: 'currentColor' }} />
              The House of Sabi · Fine Fragrance
            </p>
            <h1
              className="s-fade s-d1"
              style={{
                margin: '0',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: '400',
                fontSize: 'clamp(60px, 7vw, 116px)',
                lineHeight: '0.95',
                letterSpacing: '-0.01em',
              }}
            >
              Every Scent.
              <br />
              <em style={{ fontWeight: '400', color: '#7A3E4A' }}>Your Signature.</em>
            </h1>
            <p
              className="s-fade s-d2"
              style={{ margin: '0', fontSize: '18px', lineHeight: '1.75', color: '#5E4A4F', maxWidth: '500px', fontWeight: '300' }}
            >
              The world’s most loved perfumes and our own signature blends — from soft florals to smoky oud — curated in one beautiful
              place, delivered gift-ready to your door.
            </p>
            <div className="s-fade s-d3" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', paddingTop: '6px' }}>
              <Link
                to="/product"
                className="s-btn s-btn-dark"
                style={{
                  background: '#2B1D21',
                  color: '#FBF5F2',
                  padding: '19px 36px',
                  fontSize: '13px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  borderRadius: '999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                Shop the Collection
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              <a
                className="s-btn s-btn-line"
                href="#quiz"
                style={{
                  border: '1px solid #2B1D21',
                  color: '#2B1D21',
                  padding: '18px 34px',
                  fontSize: '13px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  borderRadius: '999px',
                }}
              >
                Find Your Scent
              </a>
            </div>
            <div
              className="s-fade s-d4"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '28px',
                paddingTop: '18px',
                fontSize: '13px',
                color: '#5E4A4F',
                letterSpacing: '0.06em',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2B1D21" strokeWidth="1.5">
                  <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z" />
                </svg>
                {'Designer & niche brands'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2B1D21" strokeWidth="1.5">
                  <rect x="9" y="2" width="6" height="5" rx="1" />
                  <rect x="7" y="7" width="10" height="15" rx="3" />
                </svg>
                Try before you commit
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2B1D21" strokeWidth="1.5">
                  <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" />
                  <circle cx="7" cy="18" r="2" />
                  <circle cx="17" cy="18" r="2" />
                </svg>
                Cash on delivery
              </span>
            </div>
          </div>
          <div
            className="s-fade s-d2"
            style={{ position: 'relative', height: '620px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg
              className="s-spin"
              aria-hidden="true"
              width="540"
              height="540"
              viewBox="0 0 540 540"
              style={{ position: 'absolute', maxWidth: '100%' }}
            >
              <defs>
                <path id="sabi-ring" d="M270,270 m-240,0 a240,240 0 1,1 480,0 a240,240 0 1,1 -480,0" />
              </defs>
              <circle cx="270" cy="270" r="214" fill="none" stroke="#D9B8AE" strokeWidth="1" />
              <text fontFamily="Jost, sans-serif" fontSize="14" letterSpacing="9" fill="#7A3E4A">
                <textPath href="#sabi-ring">
                  {'EVERY SCENT · YOUR SIGNATURE · SABI FINE FRAGRANCE · EVERY SCENT · YOUR SIGNATURE · '}
                </textPath>
              </text>
            </svg>
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                width: '380px',
                height: '380px',
                borderRadius: '50%',
                background: '#FBF5F2',
                boxShadow: 'inset 0 -30px 60px rgba(201,162,122,0.18)',
              }}
            />
            <div className="s-float-2" style={{ position: 'absolute', left: '6%', bottom: '90px', width: '150px', height: '240px' }}>
              <Bottle shape="round" liquid="#E8C46A" cap="#C9A27A" label="" />
            </div>
            <div className="s-float" style={{ position: 'relative', width: '290px', height: '464px' }}>
              <Bottle shape="classic" liquid="#D97E8A" cap="#C9A27A" label="SABI" />
            </div>
            <div className="s-float-3" style={{ position: 'absolute', right: '5%', bottom: '70px', width: '140px', height: '224px' }}>
              <Bottle shape="tall" liquid="#2F4A6B" cap="#1E1A1C" label="" />
            </div>
            <svg
              aria-hidden="true"
              width="100%"
              height="100%"
              viewBox="0 0 600 620"
              style={{ position: 'absolute', inset: '0', pointerEvents: 'none' }}
            >
              <path className="s-twinkle" d="M120 140 l4 14 14 4 -14 4 -4 14 -4 -14 -14 -4 14 -4z" fill="#C9A27A" />
              <path
                className="s-twinkle"
                style={{ animationDelay: '1s' }}
                d="M480 120 l3 10 10 3 -10 3 -3 10 -3 -10 -10 -3 10 -3z"
                fill="#C9A27A"
              />
              <path
                className="s-twinkle"
                style={{ animationDelay: '1.8s' }}
                d="M520 420 l4 14 14 4 -14 4 -4 14 -4 -14 -14 -4 14 -4z"
                fill="#B97F6A"
              />
              <path
                className="s-twinkle"
                style={{ animationDelay: '2.4s' }}
                d="M80 470 l3 10 10 3 -10 3 -3 10 -3 -10 -10 -3 10 -3z"
                fill="#C9A27A"
              />
            </svg>
            <div
              className="s-float-3"
              style={{
                position: 'absolute',
                top: '40px',
                right: '2%',
                background: '#FBF5F2',
                borderRadius: '18px',
                padding: '14px 18px',
                boxShadow: '0 20px 40px -24px rgba(43,29,33,0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, fontWeight: '500' }}>
                New in
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px' }}>Sabi Rose Velours</span>
            </div>
          </div>
        </div>
      </section>
      <section
        aria-label="Brands we carry"
        style={{ borderBottom: '1px solid #EADDD7', padding: '30px 0', overflow: 'hidden', background: '#FBF5F2' }}
      >
        <div className="s-marquee" style={{ animationDuration: '45s', alignItems: 'center' }}>
          {(brandsLoop || []).map((b, $i) => (
            <Fragment key={$i}>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '30px',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#5E4A4F',
                  padding: '0 42px',
                  whiteSpace: 'nowrap',
                }}
              >
                {b.name}
              </span>
              <span aria-hidden="true" style={{ color: '#C9A27A' }}>
                ✦
              </span>
            </Fragment>
          ))}
        </div>
      </section>
      <section id="families" style={{ maxWidth: '1360px', margin: '0 auto', padding: '120px 32px' }}>
        <div
          data-reveal=""
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '24px',
            marginBottom: '52px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <p
              style={{
                margin: '0',
                fontSize: '13px',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: accent,
                fontWeight: '500',
              }}
            >
              Shop by scent family
            </p>
            <h2
              style={{
                margin: '0',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: '400',
                fontSize: 'clamp(42px, 4.6vw, 68px)',
                lineHeight: '1.02',
              }}
            >
              {'Every mood has a '}
              <em>fragrance.</em>
            </h2>
          </div>
          <Link
            to="/product"
            style={{
              fontSize: '13px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              borderBottom: '1px solid #2B1D21',
              paddingBottom: '4px',
            }}
          >
            View all scents
          </Link>
        </div>
        <div data-reveal="" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px' }}>
          {(families || []).map((fam, $i) => (
            <Fragment key={$i}>
              <Link
                to="/product"
                className="s-lift"
                style={{ display: 'flex', flexDirection: 'column', background: fam.bg, borderRadius: '26px', overflow: 'hidden' }}
              >
                <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingTop: '24px' }}>
                  <div className="s-zoom" style={{ width: '120px', height: '192px' }}>
                    <Bottle shape={fam.shape} liquid={fam.liquid} cap={fam.cap} label="" />
                  </div>
                </div>
                <div
                  style={{
                    padding: '18px 22px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    background: 'rgba(255,255,255,0.55)',
                  }}
                >
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '30px', lineHeight: '1' }}>{fam.name}</span>
                  <span style={{ fontSize: '13px', lineHeight: '1.5', color: '#5E4A4F' }}>{fam.notes}</span>
                </div>
              </Link>
            </Fragment>
          ))}
        </div>
      </section>
      <section id="shop" style={{ background: '#F5E6E1', padding: '120px 32px' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
          <div
            data-reveal=""
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
              textAlign: 'center',
              marginBottom: '40px',
            }}
          >
            <p
              style={{
                margin: '0',
                fontSize: '13px',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: accent,
                fontWeight: '500',
              }}
            >
              Most loved this season
            </p>
            <h2
              style={{
                margin: '0',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: '400',
                fontSize: 'clamp(42px, 4.6vw, 68px)',
                lineHeight: '1.02',
              }}
            >
              {'Bestsellers, '}
              <em>beloved.</em>
            </h2>
          </div>
          <div
            role="tablist"
            aria-label="Filter collection"
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginBottom: '52px' }}
          >
            {(tabs || []).map((tab, $i) => (
              <Fragment key={$i}>
                {tab.active ? (
                  <>
                    <button
                      className="s-btn"
                      role="tab"
                      aria-selected="true"
                      onClick={tab.pick}
                      style={{
                        minHeight: '46px',
                        padding: '0 28px',
                        borderRadius: '999px',
                        border: '1px solid #2B1D21',
                        background: '#2B1D21',
                        color: '#FBF5F2',
                        fontSize: '13px',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {tab.label}
                    </button>
                  </>
                ) : null}
                {tab.inactive ? (
                  <>
                    <button
                      className="s-btn s-btn-line"
                      role="tab"
                      aria-selected="false"
                      onClick={tab.pick}
                      style={{
                        minHeight: '46px',
                        padding: '0 28px',
                        borderRadius: '999px',
                        border: '1px solid #C9B2AA',
                        background: 'transparent',
                        color: '#2B1D21',
                        fontSize: '13px',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {tab.label}
                    </button>
                  </>
                ) : null}
              </Fragment>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '24px' }}>
            {(products || []).map((p, $i) => (
              <Fragment key={$i}>
                <article
                  className="s-lift s-pop"
                  style={{ background: '#FBF5F2', borderRadius: '26px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                >
                  <div
                    style={{
                      position: 'relative',
                      height: '340px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: p.bg,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        width: '230px',
                        height: '230px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.45)',
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '18px',
                        left: '18px',
                        background: '#FBF5F2',
                        borderRadius: '999px',
                        padding: '7px 14px',
                        fontSize: '11px',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {p.gender}
                    </span>
                    {p.wished ? (
                      <>
                        <button
                          onClick={p.wish}
                          aria-pressed="true"
                          aria-label={`Remove ${p.title} from wishlist`}
                          style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            border: '0',
                            background: '#FBF5F2',
                            color: '#B03A4E',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <svg
                            aria-hidden="true"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
                          </svg>
                        </button>
                      </>
                    ) : null}
                    {p.notWished ? (
                      <>
                        <button
                          onClick={p.wish}
                          aria-pressed="false"
                          aria-label={`Add ${p.title} to wishlist`}
                          style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            border: '0',
                            background: '#FBF5F2',
                            color: '#2B1D21',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <svg
                            aria-hidden="true"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
                          </svg>
                        </button>
                      </>
                    ) : null}
                    <div className="s-zoom" style={{ position: 'relative', width: '160px', height: '256px' }}>
                      <Bottle shape={p.shape} liquid={p.liquid} cap={p.cap} label="" />
                    </div>
                  </div>
                  <div style={{ padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: '1' }}>
                    <span
                      style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, fontWeight: '500' }}
                    >
                      {p.brand}
                    </span>
                    <h3
                      style={{
                        margin: '0',
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: '500',
                        fontSize: '28px',
                        lineHeight: '1.05',
                      }}
                    >
                      <Link to="/product">{p.title}</Link>
                    </h3>
                    <p style={{ margin: '0', fontSize: '13px', lineHeight: '1.6', color: '#5E4A4F', flexGrow: '1' }}>
                      {p.family}
                      {' · '}
                      {p.notes}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        paddingTop: '12px',
                        borderTop: '1px solid #EADDD7',
                        marginTop: '6px',
                      }}
                    >
                      <span style={{ fontSize: '16px', fontWeight: '500' }}>Rs. [PRICE]</span>
                      <button
                        className="s-btn s-btn-dark"
                        onClick={p.add}
                        aria-label={`Add ${p.title} to bag`}
                        style={{
                          minHeight: '44px',
                          padding: '0 20px',
                          borderRadius: '999px',
                          border: '0',
                          background: '#2B1D21',
                          color: '#FBF5F2',
                          fontSize: '12px',
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <svg
                          aria-hidden="true"
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                        Add
                      </button>
                    </div>
                  </div>
                </article>
              </Fragment>
            ))}
          </div>
          {toast ? (
            <>
              <div
                className="s-pop"
                role="status"
                style={{
                  position: 'fixed',
                  left: '50%',
                  bottom: '28px',
                  transform: 'translateX(-50%)',
                  zIndex: '70',
                  background: '#2B1D21',
                  color: '#FBF5F2',
                  borderRadius: '999px',
                  padding: '14px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  fontSize: '14px',
                  boxShadow: '0 20px 40px -18px rgba(0,0,0,0.5)',
                }}
              >
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E7BFB3" strokeWidth="2">
                  <path d="M5 12l5 5 9-10" />
                </svg>
                <span>
                  {toast}
                  {' added to your bag'}
                </span>
                <Link to="/cart" style={{ color: '#E7BFB3', fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                  View bag
                </Link>
              </div>
            </>
          ) : null}
        </div>
      </section>
      <section style={{ background: '#2B1D21', color: '#F7EDE8', padding: '120px 32px', overflow: 'hidden' }}>
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          <div
            data-reveal=""
            style={{ position: 'relative', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div
              aria-hidden="true"
              style={{ position: 'absolute', width: '460px', height: '460px', borderRadius: '50%', background: '#3A282E' }}
            />
            <div
              aria-hidden="true"
              className="s-spin"
              style={{ position: 'absolute', width: '540px', height: '540px', borderRadius: '50%', border: '1px dashed #6B4F57' }}
            />
            <div className="s-float" style={{ position: 'relative', width: '260px', height: '416px' }}>
              <Bottle shape="round" liquid="#C8423A" cap="#C9A27A" label="" />
            </div>
            <div
              className="s-float-2"
              style={{
                position: 'absolute',
                left: '2%',
                top: '110px',
                background: '#FBF5F2',
                color: '#2B1D21',
                borderRadius: '16px',
                padding: '12px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              <span style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: accent, fontWeight: '500' }}>
                Top
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px' }}>Saffron · Jasmine</span>
            </div>
            <div
              className="s-float-3"
              style={{
                position: 'absolute',
                right: '0',
                top: '260px',
                background: '#FBF5F2',
                color: '#2B1D21',
                borderRadius: '16px',
                padding: '12px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              <span style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: accent, fontWeight: '500' }}>
                Heart
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px' }}>Amberwood · Ambergris</span>
            </div>
            <div
              className="s-float"
              style={{
                position: 'absolute',
                left: '10%',
                bottom: '70px',
                background: '#FBF5F2',
                color: '#2B1D21',
                borderRadius: '16px',
                padding: '12px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
              }}
            >
              <span style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: accent, fontWeight: '500' }}>
                Base
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px' }}>Fir resin · Cedar</span>
            </div>
          </div>
          <div data-reveal="" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <p
              style={{
                margin: '0',
                fontSize: '13px',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: '#E7BFB3',
                fontWeight: '500',
              }}
            >
              Fragrance of the month
            </p>
            <h2
              style={{
                margin: '0',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: '400',
                fontSize: 'clamp(46px, 5vw, 76px)',
                lineHeight: '1',
              }}
            >
              Baccarat Rouge 540
            </h2>
            <p style={{ margin: '0', fontSize: '14px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#E5D6D1' }}>
              Maison Francis Kurkdjian · Eau de Parfum
            </p>
            <p style={{ margin: '0', fontSize: '17px', lineHeight: '1.8', color: '#E5D6D1', fontWeight: '300', maxWidth: '520px' }}>
              A luminous, airy amber with a glowing trail of saffron and ambergris — the scent people stop you to ask about.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', paddingTop: '6px' }}>
              <Link
                to="/product"
                className="s-btn"
                style={{
                  background: '#F7EDE8',
                  color: '#2B1D21',
                  padding: '19px 36px',
                  fontSize: '13px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  borderRadius: '999px',
                }}
              >
                Discover it
              </Link>
              <span style={{ fontSize: '17px' }}>Rs. [PRICE]</span>
            </div>
          </div>
        </div>
      </section>
      <section
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '120px 32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '72px',
          alignItems: 'center',
        }}
      >
        <div
          data-reveal=""
          style={{
            position: 'relative',
            height: '560px',
            borderRadius: '280px 280px 28px 28px',
            background: '#F2DCD6',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: '10px',
            overflow: 'hidden',
            paddingBottom: '40px',
          }}
        >
          <div
            aria-hidden="true"
            style={{ position: 'absolute', top: '60px', width: '300px', height: '300px', borderRadius: '50%', border: '1px solid #D9B8AE' }}
          />
          <div className="s-float-2" style={{ width: '120px', height: '192px' }}>
            <Bottle shape="attar" liquid="#7A2E3A" cap="#C9A27A" label="" />
          </div>
          <div className="s-float" style={{ width: '180px', height: '288px' }}>
            <Bottle shape="classic" liquid="#E2A9A6" cap="#C9A27A" label="SABI" />
          </div>
          <div className="s-float-3" style={{ width: '110px', height: '176px' }}>
            <Bottle shape="round" liquid="#EADBD3" cap="#B8B8BC" label="" />
          </div>
        </div>
        <div data-reveal="" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p
            style={{ margin: '0', fontSize: '13px', letterSpacing: '0.26em', textTransform: 'uppercase', color: accent, fontWeight: '500' }}
          >
            Our story
          </p>
          <h2
            style={{
              margin: '0',
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: '400',
              fontSize: 'clamp(42px, 4.6vw, 68px)',
              lineHeight: '1.02',
            }}
          >
            One house.
            <br />
            <em>Every kind of beautiful.</em>
          </h2>
          <p style={{ margin: '0', fontSize: '17px', lineHeight: '1.8', color: '#5E4A4F', fontWeight: '300' }}>
            Sabi was born from a simple belief: fragrance is the most personal thing you wear. So we brought every kind of scent under one
            roof — iconic designer perfumes, rare niche finds, traditional attar and our own Sabi signatures.
          </p>
          <Link
            to="/about"
            className="s-btn s-btn-line"
            style={{
              alignSelf: 'flex-start',
              border: '1px solid #2B1D21',
              padding: '17px 32px',
              fontSize: '13px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              borderRadius: '999px',
            }}
          >
            Discover the house
          </Link>
        </div>
      </section>
      <section
        id="quiz"
        style={{ background: '#FFFFFF', borderTop: '1px solid #EADDD7', borderBottom: '1px solid #EADDD7', padding: '112px 32px' }}
      >
        <div
          style={{
            maxWidth: '1160px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '52px',
            textAlign: 'center',
          }}
        >
          <div data-reveal="" style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
            <p
              style={{
                margin: '0',
                fontSize: '13px',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: accent,
                fontWeight: '500',
              }}
            >
              New to fragrance?
            </p>
            <h2
              style={{
                margin: '0',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: '400',
                fontSize: 'clamp(42px, 4.6vw, 64px)',
                lineHeight: '1.02',
              }}
            >
              {'Find your scent in '}
              <em>60 seconds.</em>
            </h2>
          </div>
          <div
            data-reveal=""
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', width: '100%' }}
          >
            <div
              className="s-lift"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '14px',
                padding: '40px 28px',
                borderRadius: '26px',
                background: '#FBF5F2',
              }}
            >
              <span
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#F2DCD6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '28px',
                  color: accent,
                }}
              >
                01
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px' }}>Choose a mood</span>
              <span style={{ fontSize: '15px', lineHeight: '1.6', color: '#5E4A4F' }}>
                Romantic, fresh, bold or cozy — tell us how you want to feel.
              </span>
            </div>
            <div
              className="s-lift"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '14px',
                padding: '40px 28px',
                borderRadius: '26px',
                background: '#FBF5F2',
              }}
            >
              <span
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#F2DCD6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '28px',
                  color: accent,
                }}
              >
                02
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px' }}>Pick your notes</span>
              <span style={{ fontSize: '15px', lineHeight: '1.6', color: '#5E4A4F' }}>
                Flowers, fruits, woods or spice — choose what you already love.
              </span>
            </div>
            <div
              className="s-lift"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '14px',
                padding: '40px 28px',
                borderRadius: '26px',
                background: '#FBF5F2',
              }}
            >
              <span
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#F2DCD6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '28px',
                  color: accent,
                }}
              >
                03
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px' }}>Meet your match</span>
              <span style={{ fontSize: '15px', lineHeight: '1.6', color: '#5E4A4F' }}>
                Get three perfumes picked for you, with a vial to try first.
              </span>
            </div>
          </div>
          <Link
            to="/faq"
            className="s-btn s-btn-dark"
            style={{
              background: '#2B1D21',
              color: '#FBF5F2',
              padding: '19px 38px',
              fontSize: '13px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              borderRadius: '999px',
            }}
          >
            Take the scent quiz
          </Link>
        </div>
      </section>
      <section id="discovery" style={{ padding: '112px 32px' }}>
        <div
          data-reveal=""
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            background: '#2B1D21',
            color: '#F7EDE8',
            borderRadius: '36px',
            padding: '72px 56px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <p
              style={{
                margin: '0',
                fontSize: '13px',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: '#E7BFB3',
                fontWeight: '500',
              }}
            >
              The perfect gift
            </p>
            <h2
              style={{
                margin: '0',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: '400',
                fontSize: 'clamp(42px, 4.6vw, 68px)',
                lineHeight: '1.02',
              }}
            >
              {'The Discovery '}
              <em>Edit</em>
            </h2>
            <p style={{ margin: '0', fontSize: '17px', lineHeight: '1.8', color: '#E5D6D1', fontWeight: '300', maxWidth: '480px' }}>
              Eight mini vials, one from every scent family. Try them all, fall in love with one — then make it your signature.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '22px', paddingTop: '6px' }}>
              <Link
                to="/product"
                className="s-btn"
                style={{
                  background: '#F7EDE8',
                  color: '#2B1D21',
                  padding: '19px 36px',
                  fontSize: '13px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  borderRadius: '999px',
                }}
              >
                Shop the set
              </Link>
              <span style={{ fontSize: '17px' }}>Rs. [PRICE]</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-end', gap: '4px' }}>
            {(vials || []).map((v, $i) => (
              <Fragment key={$i}>
                <div className={v.cls} style={{ width: '66px', height: '132px' }}>
                  <Bottle shape="tall" liquid={v.liquid} cap="#C9A27A" label="" />
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 32px 112px' }}>
        <div data-reveal="" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '28px', borderTop: '1px solid #D9C4BC' }}>
            <svg aria-hidden="true" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2B1D21" strokeWidth="1.4">
              <path d="M12 3c2 4 6 5 6 10a6 6 0 0 1-12 0c0-5 4-6 6-10z" />
            </svg>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px' }}>Every scent, one house</span>
            <span style={{ fontSize: '15px', lineHeight: '1.6', color: '#5E4A4F' }}>
              Designer icons, niche gems, attars and Sabi signatures.
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '28px', borderTop: '1px solid #D9C4BC' }}>
            <svg aria-hidden="true" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2B1D21" strokeWidth="1.4">
              <rect x="9" y="2" width="6" height="5" rx="1" />
              <rect x="7" y="7" width="10" height="15" rx="3" />
            </svg>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px' }}>Try before you commit</span>
            <span style={{ fontSize: '15px', lineHeight: '1.6', color: '#5E4A4F' }}>
              A discovery vial in every order, so you always choose with confidence.
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '28px', borderTop: '1px solid #D9C4BC' }}>
            <svg aria-hidden="true" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2B1D21" strokeWidth="1.4">
              <rect x="3" y="9" width="18" height="12" rx="1" />
              <path d="M3 9h18M12 9v12M12 9c-2-4-6-4-6-1s6 1 6 1zM12 9c2-4 6-4 6-1s-6 1-6 1z" />
            </svg>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px' }}>Gift-ready packaging</span>
            <span style={{ fontSize: '15px', lineHeight: '1.6', color: '#5E4A4F' }}>
              Every bottle arrives boxed and wrapped, ready to give.
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '28px', borderTop: '1px solid #D9C4BC' }}>
            <svg aria-hidden="true" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2B1D21" strokeWidth="1.4">
              <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" />
              <circle cx="7" cy="18" r="2" />
              <circle cx="17" cy="18" r="2" />
            </svg>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px' }}>Delivered to your door</span>
            <span style={{ fontSize: '15px', lineHeight: '1.6', color: '#5E4A4F' }}>
              Fast, careful delivery with cash on delivery available.
            </span>
          </div>
        </div>
      </section>
      <section style={{ background: '#F2DCD6', padding: '100px 32px' }}>
        <div
          data-reveal=""
          style={{
            maxWidth: '660px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '22px',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              margin: '0',
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: '400',
              fontSize: 'clamp(38px, 4.2vw, 58px)',
              lineHeight: '1.05',
            }}
          >
            {'Join the '}
            <em>Sabi Circle</em>
          </h2>
          <p style={{ margin: '0', fontSize: '16px', lineHeight: '1.7', color: '#4E3B40' }}>
            Be first to know about new launches, private sales and scent stories.
          </p>
          {notSubscribed ? (
            <>
              <form style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', width: '100%', justifyContent: 'center' }}>
                <label
                  htmlFor="sabi-email"
                  style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}
                >
                  Email address
                </label>
                <input
                  id="sabi-email"
                  type="email"
                  placeholder="Your email address"
                  style={{
                    flex: '1 1 280px',
                    minHeight: '56px',
                    padding: '0 24px',
                    borderRadius: '999px',
                    border: '1px solid #C9A99F',
                    background: '#FBF5F2',
                    fontSize: '15px',
                    color: '#2B1D21',
                  }}
                />
                <button
                  className="s-btn s-btn-dark"
                  type="button"
                  onClick={subscribe}
                  style={{
                    minHeight: '56px',
                    padding: '0 34px',
                    borderRadius: '999px',
                    border: '0',
                    background: '#2B1D21',
                    color: '#FBF5F2',
                    fontSize: '13px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                  }}
                >
                  Subscribe
                </button>
              </form>
            </>
          ) : null}
          {subscribed ? (
            <>
              <p
                className="s-pop"
                style={{ margin: '0', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '28px' }}
              >
                Welcome to the Circle — check your inbox soon.
              </p>
            </>
          ) : null}
        </div>
      </section>
      <footer style={{ background: '#2B1D21', color: '#E5D6D1', padding: '80px 32px 40px' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '56px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '42px',
                  letterSpacing: '0.32em',
                  color: '#F7EDE8',
                  lineHeight: '1',
                }}
              >
                SABI
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '22px', color: '#E7BFB3' }}>
                Every Scent. Your Signature.
              </span>
            </div>
            <nav aria-label="Shop" style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15px' }}>
              <span style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#BFA9A3' }}>Shop</span>
              <Link to="/product" style={{ color: '#E5D6D1' }}>
                Women
              </Link>
              <Link to="/product" style={{ color: '#E5D6D1' }}>
                Men
              </Link>
              <Link to="/product" style={{ color: '#E5D6D1' }}>
                Unisex
              </Link>
              <Link to="/product" style={{ color: '#E5D6D1' }}>
                {'Oud & Attar'}
              </Link>
              <Link to="/product" style={{ color: '#E5D6D1' }}>
                Gift Sets
              </Link>
            </nav>
            <nav aria-label="Help" style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15px' }}>
              <span style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#BFA9A3' }}>Help</span>
              <Link to="/faq" style={{ color: '#E5D6D1' }}>
                FAQs
              </Link>
              <Link to="/faq" style={{ color: '#E5D6D1' }}>
                {'Shipping & Returns'}
              </Link>
              <Link to="/about" style={{ color: '#E5D6D1' }}>
                About Us
              </Link>
              <Link to="/history" style={{ color: '#E5D6D1' }}>
                Our History
              </Link>
            </nav>
            <nav aria-label="Follow" style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '15px' }}>
              <span style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#BFA9A3' }}>Follow Sabi</span>
              <a href="#top" style={{ color: '#E5D6D1' }}>
                Instagram
              </a>
              <a href="#top" style={{ color: '#E5D6D1' }}>
                TikTok
              </a>
              <a href="#top" style={{ color: '#E5D6D1' }}>
                Facebook
              </a>
            </nav>
          </div>
          <div
            style={{
              borderTop: '1px solid #4A383E',
              paddingTop: '24px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: '12px',
              fontSize: '13px',
              color: '#BFA9A3',
            }}
          >
            <span>© Sabi Fragrances. All rights reserved.</span>
            <span>Brand names shown are trademarks of their respective owners.</span>
          </div>
        </div>
      </footer>
      <Chat />
    </div>
  );
}
