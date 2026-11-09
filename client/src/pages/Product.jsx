import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Bottle from '../components/Bottle.jsx';
import Chat from '../components/Chat.jsx';
import AccountLink from '../components/AccountLink.jsx';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useReveal from '../components/useReveal.js';
import { useShop } from '../context/ShopContext.jsx';

export default function Product() {
  useReveal();
  const { id = 'br540' } = useParams();
  const { products, byId, productsLoading, wishlist, addToCart, toggleWish, bagCount } = useShop();
  const [size, setSize] = useState('70 ml');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [openTitle, setOpenTitle] = useState('Fragrance notes');
  const [view, setView] = useState(0);
  const product = byId[id];
  if (!product) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          fontFamily: 'Jost, system-ui, sans-serif',
          color: '#2B1D21',
        }}
      >
        <h1 style={{ margin: 0, fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: 48 }}>
          {productsLoading ? 'Loading…' : 'Perfume not found'}
        </h1>
        {!productsLoading && (
          <Link to="/" style={{ borderBottom: '1px solid #2B1D21' }}>
            Back to home
          </Link>
        )}
      </div>
    );
  }

  const accent = '#9A5845';
  const wished = wishlist.includes(product.id);
  const sizes = ['35 ml', '70 ml', '200 ml'].map((s) => ({
    label: s,
    active: s === size,
    inactive: s !== size,
    pick: () => {
      setSize(s);
      setAdded(false);
    },
  }));
  const bgs = [product.bg, '#EFE3DE', '#F5E1DB', '#E9D3CC'];
  const dims = [
    ['260px', '416px'],
    ['200px', '320px'],
    ['300px', '480px'],
    ['230px', '368px'],
  ];
  const views = ['front view', 'side view', 'close-up', 'with box'].map((label, i) => ({
    label,
    bg: bgs[i],
    pressed: i === view ? 'true' : 'false',
    border: i === view ? '1.5px solid #2B1D21' : '1px solid #EADDD7',
    pick: () => setView(i),
  }));
  const { top: pyTop, heart: pyHeart, base: pyBase } = product.pyramid;
  const detailData = [
    { title: 'Fragrance notes', text: `Top: ${pyTop}. Heart: ${pyHeart}. Base: ${pyBase}.` },
    {
      title: 'How to wear',
      text: 'Spray two or three times on pulse points — wrists, neck and behind the ears — from about 15 cm away. Let it dry naturally; rubbing breaks down the top notes.',
    },
    { title: 'Ingredients', text: '[Add the full ingredient list from the packaging here.]' },
    {
      title: 'Delivery & returns',
      text: 'Delivered in [X–Y] working days. Unopened, sealed bottles can be returned within [X] days. See our FAQs for full details.',
    },
  ];
  const details = detailData.map((d) => {
    const open = openTitle === d.title;
    return { ...d, open, expanded: open ? 'true' : 'false', sign: open ? '−' : '+', toggle: () => setOpenTitle(open ? '' : d.title) };
  });
  const related = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4)
    .map((p) => ({ ...p, href: `/product/${p.id}` }));

  const vals = {
    accent,
    sizes,
    views,
    details,
    related,
    bagCount,
    brand: product.brand,
    title: product.title,
    gender: product.gender,
    family: product.family,
    description: product.description,
    pyTop,
    pyHeart,
    pyBase,
    pShape: product.shape,
    pLiquid: product.liquid,
    pCap: product.cap,
    viewBg: bgs[view],
    viewW: dims[view][0],
    viewH: dims[view][1],
    sizeLabel: size.toUpperCase(),
    qty,
    added,
    wishPressed: wished ? 'true' : 'false',
    wishColor: wished ? '#B03A4E' : '#2B1D21',
    wishFill: wished ? 'currentColor' : 'none',
    wish: () => toggleWish(product.id),
    inc: () => setQty(qty + 1),
    dec: () => setQty(Math.max(1, qty - 1)),
    add: () => {
      addToCart(product.id, size, qty);
      setAdded(true);
    },
  };

  const {
    gender,
    title,
    viewBg,
    viewW,
    viewH,
    pShape,
    pLiquid,
    pCap,
    brand,
    family,
    sizeLabel,
    description,
    dec,
    inc,
    add,
    wish,
    wishPressed,
    wishColor,
    wishFill,
  } = vals;
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: '#FBF5F2',
        color: '#2B1D21',
        fontFamily: 'Jost, system-ui, sans-serif',
        overflowX: 'hidden',
      }}
    >
      <div
        style={{
          background: '#2B1D21',
          color: '#F7EDE8',
          textAlign: 'center',
          fontSize: '13px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          padding: '11px 16px',
        }}
      >
        Complimentary discovery vial with every order
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
            <Link to="/">Home</Link>
            <Link to="/product" style={{ borderBottom: '1px solid #2B1D21', paddingBottom: '2px' }}>
              Shop
            </Link>
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
          <div style={{ display: 'flex', justifyContent: 'flex-end', flex: '1 1 360px' }}>
            <AccountLink />
            <Link
              to="/cart"
              aria-label="Shopping bag"
              style={{ height: '44px', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 8px' }}
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
      <nav
        aria-label="Breadcrumb"
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '24px 32px 0',
          fontSize: '13px',
          letterSpacing: '0.08em',
          color: '#5E4A4F',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <Link to="/" style={{ color: '#5E4A4F' }}>
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <Link to="/" style={{ color: '#5E4A4F' }}>
          {gender}
        </Link>
        <span aria-hidden="true">/</span>
        <span style={{ color: '#2B1D21' }}>{title}</span>
      </nav>
      <section
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '28px 32px 104px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: '64px',
          alignItems: 'start',
        }}
      >
        <div className="s-fade" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              position: 'relative',
              height: '660px',
              borderRadius: '32px',
              background: viewBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              transition: 'background-color .6s',
            }}
          >
            <div
              aria-hidden="true"
              className="s-spin"
              style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', border: '1px dashed #D9B8AE' }}
            />
            <div
              aria-hidden="true"
              style={{ position: 'absolute', width: '380px', height: '380px', borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }}
            />
            <span
              style={{
                position: 'absolute',
                top: '22px',
                left: '22px',
                background: '#2B1D21',
                color: '#FBF5F2',
                borderRadius: '999px',
                padding: '8px 16px',
                fontSize: '11px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              Bestseller
            </span>
            <svg
              aria-hidden="true"
              width="100%"
              height="100%"
              viewBox="0 0 600 660"
              style={{ position: 'absolute', inset: '0', pointerEvents: 'none' }}
            >
              <path className="s-twinkle" d="M110 150 l4 14 14 4 -14 4 -4 14 -4 -14 -14 -4 14 -4z" fill="#C9A27A" />
              <path
                className="s-twinkle"
                style={{ animationDelay: '1.2s' }}
                d="M480 210 l3 10 10 3 -10 3 -3 10 -3 -10 -10 -3 10 -3z"
                fill="#C9A27A"
              />
              <path
                className="s-twinkle"
                style={{ animationDelay: '2s' }}
                d="M460 500 l4 14 14 4 -14 4 -4 14 -4 -14 -14 -4 14 -4z"
                fill="#B97F6A"
              />
            </svg>
            <div className="s-float" style={{ position: 'relative', width: viewW, height: viewH, transition: 'width .6s, height .6s' }}>
              <Bottle shape={pShape} liquid={pLiquid} cap={pCap} label="" />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '12px' }}>
            {(views || []).map((v, $i) => (
              <Fragment key={$i}>
                <button
                  className="s-btn"
                  onClick={v.pick}
                  aria-label={`Show ${v.label}`}
                  aria-pressed={v.pressed}
                  style={{
                    height: '116px',
                    borderRadius: '18px',
                    border: v.border,
                    background: v.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px',
                  }}
                >
                  <span style={{ width: '54px', height: '86px', display: 'block' }}>
                    <Bottle shape={pShape} liquid={pLiquid} cap={pCap} label="" />
                  </span>
                </button>
              </Fragment>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '8px' }}>
          <div className="s-fade s-d1" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '13px', letterSpacing: '0.24em', textTransform: 'uppercase', color: accent, fontWeight: '500' }}>
              {brand}
            </span>
            <h1
              style={{
                margin: '0',
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: '400',
                fontSize: 'clamp(52px, 5vw, 80px)',
                lineHeight: '0.98',
              }}
            >
              {title}
            </h1>
            <p style={{ margin: '0', fontSize: '14px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#5E4A4F' }}>
              {'Eau de Parfum · '}
              {gender}
              {' · '}
              {family}
            </p>
          </div>
          <span className="s-fade s-d2" style={{ fontSize: '26px', fontWeight: '500' }}>
            Rs. [{sizeLabel}
            {' PRICE]'}
          </span>
          <p className="s-fade s-d2" style={{ margin: '0', fontSize: '17px', lineHeight: '1.8', color: '#5E4A4F', fontWeight: '300' }}>
            {description}
          </p>
          <fieldset className="s-fade s-d3" style={{ border: '0', margin: '0', padding: '0' }}>
            <legend
              style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: '500', padding: '0 0 12px' }}
            >
              Size
            </legend>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {(sizes || []).map((s, $i) => (
                <Fragment key={$i}>
                  {s.active ? (
                    <>
                      <button
                        className="s-btn"
                        onClick={s.pick}
                        aria-pressed="true"
                        style={{
                          minHeight: '54px',
                          minWidth: '112px',
                          padding: '0 22px',
                          borderRadius: '16px',
                          border: '1.5px solid #2B1D21',
                          background: '#2B1D21',
                          color: '#FBF5F2',
                          fontSize: '15px',
                        }}
                      >
                        {s.label}
                      </button>
                    </>
                  ) : null}
                  {s.inactive ? (
                    <>
                      <button
                        className="s-btn s-btn-line"
                        onClick={s.pick}
                        aria-pressed="false"
                        style={{
                          minHeight: '54px',
                          minWidth: '112px',
                          padding: '0 22px',
                          borderRadius: '16px',
                          border: '1.5px solid #C9B2AA',
                          background: '#FFFFFF',
                          color: '#2B1D21',
                          fontSize: '15px',
                        }}
                      >
                        {s.label}
                      </button>
                    </>
                  ) : null}
                </Fragment>
              ))}
            </div>
          </fieldset>
          <div className="s-fade s-d3" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'stretch' }}>
            <div
              style={{ display: 'flex', alignItems: 'center', border: '1px solid #C9B2AA', borderRadius: '999px', background: '#FFFFFF' }}
            >
              <button
                onClick={dec}
                aria-label="Decrease quantity"
                style={{ width: '52px', height: '58px', border: '0', background: 'transparent', fontSize: '22px', color: '#2B1D21' }}
              >
                −
              </button>
              <span aria-live="polite" style={{ minWidth: '32px', textAlign: 'center', fontSize: '17px' }}>
                {qty}
              </span>
              <button
                onClick={inc}
                aria-label="Increase quantity"
                style={{ width: '52px', height: '58px', border: '0', background: 'transparent', fontSize: '22px', color: '#2B1D21' }}
              >
                +
              </button>
            </div>
            <button
              className="s-btn s-btn-dark"
              onClick={add}
              style={{
                flex: '1 1 220px',
                minHeight: '58px',
                border: '0',
                borderRadius: '999px',
                background: '#2B1D21',
                color: '#FBF5F2',
                fontSize: '13px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              Add to bag
            </button>
            <button
              className="s-btn"
              onClick={wish}
              aria-pressed={wishPressed}
              aria-label="Add to wishlist"
              style={{
                width: '58px',
                height: '58px',
                borderRadius: '50%',
                border: '1px solid #C9B2AA',
                background: '#FFFFFF',
                color: wishColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill={wishFill} stroke="currentColor" strokeWidth="1.5">
                <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
              </svg>
            </button>
          </div>
          {added ? (
            <>
              <div
                className="s-pop"
                role="status"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                  background: '#F2DCD6',
                  borderRadius: '18px',
                  padding: '16px 20px',
                  fontSize: '15px',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2B1D21" strokeWidth="2">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                  Added to your bag — beautiful choice.
                </span>
                <Link
                  to="/cart"
                  style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', borderBottom: '1px solid #2B1D21' }}
                >
                  View bag
                </Link>
              </div>
            </>
          ) : null}
          <div className="s-fade s-d4" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '10px' }}>
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #EADDD7',
                borderRadius: '16px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                alignItems: 'center',
                textAlign: 'center',
                fontSize: '13px',
                color: '#4E3B40',
              }}
            >
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2B1D21" strokeWidth="1.5">
                <rect x="9" y="2" width="6" height="5" rx="1" />
                <rect x="7" y="7" width="10" height="15" rx="3" />
              </svg>
              Free discovery vial
            </div>
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #EADDD7',
                borderRadius: '16px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                alignItems: 'center',
                textAlign: 'center',
                fontSize: '13px',
                color: '#4E3B40',
              }}
            >
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2B1D21" strokeWidth="1.5">
                <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z" />
                <circle cx="7" cy="18" r="2" />
                <circle cx="17" cy="18" r="2" />
              </svg>
              Cash on delivery
            </div>
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #EADDD7',
                borderRadius: '16px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                alignItems: 'center',
                textAlign: 'center',
                fontSize: '13px',
                color: '#4E3B40',
              }}
            >
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2B1D21" strokeWidth="1.5">
                <rect x="3" y="9" width="18" height="12" rx="1" />
                <path d="M3 9h18M12 9v12" />
              </svg>
              Gift-ready box
            </div>
          </div>
          <div style={{ borderTop: '1px solid #D9C4BC' }}>
            {(details || []).map((d, $i) => (
              <Fragment key={$i}>
                <div style={{ borderBottom: '1px solid #D9C4BC' }}>
                  <button
                    onClick={d.toggle}
                    aria-expanded={d.expanded}
                    style={{
                      width: '100%',
                      minHeight: '64px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: '0',
                      background: 'transparent',
                      padding: '0',
                      fontSize: '13px',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: '#2B1D21',
                      textAlign: 'left',
                    }}
                  >
                    <span>{d.title}</span>
                    <span
                      aria-hidden="true"
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '1px solid #D9C4BC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                      }}
                    >
                      {d.sign}
                    </span>
                  </button>
                  {d.open ? (
                    <>
                      <p
                        className="s-pop"
                        style={{ margin: '0', padding: '0 0 24px', fontSize: '15px', lineHeight: '1.75', color: '#5E4A4F' }}
                      >
                        {d.text}
                      </p>
                    </>
                  ) : null}
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: '#2B1D21', color: '#F7EDE8', padding: '112px 32px' }}>
        <div style={{ maxWidth: '1360px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '56px' }}>
          <div data-reveal="" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', textAlign: 'center' }}>
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
              The fragrance notes
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
              {'How it '}
              <em>unfolds</em>
              {' on skin'}
            </h2>
          </div>
          <div data-reveal="" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <div
              className="s-lift"
              style={{
                background: '#3A282E',
                borderRadius: '26px',
                padding: '40px 30px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                textAlign: 'center',
                alignItems: 'center',
              }}
            >
              <div
                className="s-float"
                aria-hidden="true"
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  background: '#E8C46A',
                  boxShadow: '0 0 0 10px rgba(232,196,106,0.15)',
                }}
              />
              <span style={{ fontSize: '12px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#E7BFB3', fontWeight: '500' }}>
                Top · first 15 minutes
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '30px' }}>{pyTop}</span>
            </div>
            <div
              className="s-lift"
              style={{
                background: '#3A282E',
                borderRadius: '26px',
                padding: '40px 30px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                textAlign: 'center',
                alignItems: 'center',
              }}
            >
              <div
                className="s-float-2"
                aria-hidden="true"
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  background: '#C8423A',
                  boxShadow: '0 0 0 10px rgba(200,66,58,0.18)',
                }}
              />
              <span style={{ fontSize: '12px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#E7BFB3', fontWeight: '500' }}>
                Heart · first hours
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '30px' }}>{pyHeart}</span>
            </div>
            <div
              className="s-lift"
              style={{
                background: '#3A282E',
                borderRadius: '26px',
                padding: '40px 30px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                textAlign: 'center',
                alignItems: 'center',
              }}
            >
              <div
                className="s-float-3"
                aria-hidden="true"
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  background: '#7A604C',
                  boxShadow: '0 0 0 10px rgba(122,96,76,0.22)',
                }}
              />
              <span style={{ fontSize: '12px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#E7BFB3', fontWeight: '500' }}>
                Base · the lasting trail
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '30px' }}>{pyBase}</span>
            </div>
          </div>
        </div>
      </section>
      <section style={{ maxWidth: '1360px', margin: '0 auto', padding: '112px 32px' }}>
        <h2
          data-reveal=""
          style={{
            margin: '0 0 40px',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: '400',
            fontSize: 'clamp(38px, 4.2vw, 56px)',
            lineHeight: '1.05',
          }}
        >
          {'You may also '}
          <em>love</em>
        </h2>
        <div data-reveal="" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '22px' }}>
          {(related || []).map((r, $i) => (
            <Fragment key={$i}>
              <Link
                className="s-lift"
                to={r.href}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#FFFFFF',
                  border: '1px solid #EADDD7',
                  borderRadius: '26px',
                  overflow: 'hidden',
                }}
              >
                <div style={{ height: '280px', background: r.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="s-zoom" style={{ width: '140px', height: '224px' }}>
                    <Bottle shape={r.shape} liquid={r.liquid} cap={r.cap} label="" />
                  </div>
                </div>
                <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: accent, fontWeight: '500' }}>
                    {r.brand}
                  </span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px' }}>{r.title}</span>
                  <span style={{ fontSize: '15px', fontWeight: '500' }}>Rs. [PRICE]</span>
                </div>
              </Link>
            </Fragment>
          ))}
        </div>
      </section>
      <footer style={{ background: '#2B1D21', color: '#E5D6D1', padding: '56px 32px 36px' }}>
        <div
          style={{
            maxWidth: '1360px',
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
