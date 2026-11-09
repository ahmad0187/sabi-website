import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Bottle from '../components/Bottle.jsx';
import Chat from '../components/Chat.jsx';
import AccountLink from '../components/AccountLink.jsx';
import { useState } from 'react';
import useReveal from '../components/useReveal.js';
import { useShop } from '../context/ShopContext.jsx';

export default function Cart() {
  useReveal();
  const { cart, byId, changeQty, removeFromCart } = useShop();
  const [delivery, setDelivery] = useState('standard');
  const accent = '#9A5845';
  const items = cart
    .filter((i) => byId[i.id])
    .map((i) => {
      const p = byId[i.id];
      return {
        id: i.id,
        brand: p.brand,
        name: p.title,
        family: p.family,
        size: i.size,
        qty: i.qty,
        shape: p.shape,
        color: p.liquid,
        cap: p.cap,
        bg: p.bg,
        href: `/product/${p.id}`,
        inc: () => changeQty(i.id, i.size, 1),
        dec: () => changeQty(i.id, i.size, -1),
        remove: () => removeFromCart(i.id, i.size),
      };
    });
  const count = items.reduce((n, x) => n + x.qty, 0);
  const vals = {
    accent,
    items,
    count,
    empty: items.length === 0,
    hasItems: items.length > 0,
    standard: delivery === 'standard',
    express: delivery === 'express',
    deliveryName: delivery === 'standard' ? 'Standard' : 'Express',
    pickStandard: () => setDelivery('standard'),
    pickExpress: () => setDelivery('express'),
  };

  const { empty, hasItems, standard, pickStandard, express, pickExpress, deliveryName } = vals;
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
                borderBottom: '1px solid #2B1D21',
              }}
            >
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 8h14l-1 13H6L5 8z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
              Bag ({count})
            </Link>
          </div>
        </div>
      </header>
      <section style={{ maxWidth: '1320px', margin: '0 auto', padding: '72px 32px 112px' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <h1
            className="s-fade"
            style={{
              margin: '0',
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: '400',
              fontSize: 'clamp(48px, 5vw, 72px)',
              lineHeight: '1',
            }}
          >
            {'Your '}
            <em>Bag</em>
          </h1>
          <span style={{ fontSize: '15px', color: '#5E4A4F' }}>
            {count}
            {' items'}
          </span>
        </div>
        {empty ? (
          <>
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #EADDD7',
                borderRadius: '28px',
                padding: '88px 32px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                textAlign: 'center',
              }}
            >
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px' }}>Your bag is empty</span>
              <span style={{ fontSize: '16px', color: '#5E4A4F' }}>Your signature scent is waiting.</span>
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
                Continue shopping
              </Link>
            </div>
          </>
        ) : null}
        {hasItems ? (
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'flex-start' }}>
              <div style={{ flex: '999 1 560px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(items || []).map((it, $i) => (
                  <Fragment key={$i}>
                    <article
                      className="s-pop s-lift"
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #EADDD7',
                        borderRadius: '24px',
                        padding: '20px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '24px',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: '132px',
                          height: '152px',
                          borderRadius: '18px',
                          background: it.bg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: '0 0 132px',
                        }}
                      >
                        <div className="s-float" style={{ width: '82px', height: '131px' }}>
                          <Bottle shape={it.shape} liquid={it.color} cap={it.cap} label="" />
                        </div>
                      </div>
                      <div style={{ flex: '1 1 220px', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <span
                          style={{
                            fontSize: '12px',
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase',
                            color: accent,
                            fontWeight: '500',
                          }}
                        >
                          {it.brand}
                          {' · '}
                          {it.family}
                        </span>
                        <Link to={it.href} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '30px', lineHeight: '1.05' }}>
                          {it.name}
                        </Link>
                        <span style={{ fontSize: '14px', color: '#5E4A4F' }}>
                          {'Size: '}
                          {it.size}
                        </span>
                        <button
                          onClick={it.remove}
                          style={{
                            alignSelf: 'flex-start',
                            minHeight: '44px',
                            padding: '0',
                            border: '0',
                            background: 'transparent',
                            fontSize: '13px',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: '#5E4A4F',
                            textDecoration: 'underline',
                          }}
                        >
                          Remove
                        </button>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '14px' }}>
                        <span style={{ fontSize: '17px', fontWeight: '500' }}>Rs. [PRICE]</span>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #C9B2AA', borderRadius: '999px' }}>
                          <button
                            onClick={it.dec}
                            aria-label={`Decrease ${it.name} quantity`}
                            style={{
                              width: '44px',
                              height: '44px',
                              border: '0',
                              background: 'transparent',
                              fontSize: '20px',
                              color: '#2B1D21',
                            }}
                          >
                            −
                          </button>
                          <span style={{ minWidth: '28px', textAlign: 'center', fontSize: '16px' }}>{it.qty}</span>
                          <button
                            onClick={it.inc}
                            aria-label={`Increase ${it.name} quantity`}
                            style={{
                              width: '44px',
                              height: '44px',
                              border: '0',
                              background: 'transparent',
                              fontSize: '20px',
                              color: '#2B1D21',
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </article>
                  </Fragment>
                ))}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    background: '#F2DCD6',
                    borderRadius: '20px',
                    padding: '18px 22px',
                    fontSize: '15px',
                  }}
                >
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2B1D21" strokeWidth="1.5">
                    <rect x="3" y="9" width="18" height="12" rx="1" />
                    <path d="M3 9h18M12 9v12M12 9c-2-4-6-4-6-1s6 1 6 1zM12 9c2-4 6-4 6-1s-6 1-6 1z" />
                  </svg>
                  <span>A complimentary discovery vial will be added to your order.</span>
                </div>
                <Link
                  to="/product"
                  style={{
                    alignSelf: 'flex-start',
                    fontSize: '14px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    borderBottom: '1px solid #2B1D21',
                    paddingBottom: '4px',
                    marginTop: '8px',
                  }}
                >
                  Continue shopping
                </Link>
              </div>
              <aside
                aria-label="Order summary"
                style={{
                  flex: '1 1 360px',
                  background: '#FFFFFF',
                  border: '1px solid #EADDD7',
                  borderRadius: '28px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '22px',
                }}
              >
                <h2 style={{ margin: '0', fontFamily: "'Cormorant Garamond', serif", fontWeight: '500', fontSize: '32px' }}>
                  Order summary
                </h2>
                <fieldset style={{ border: '0', margin: '0', padding: '0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <legend
                    style={{
                      fontSize: '13px',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      fontWeight: '500',
                      padding: '0 0 10px',
                    }}
                  >
                    Delivery
                  </legend>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      minHeight: '52px',
                      padding: '0 16px',
                      border: '1px solid #D9C4BC',
                      borderRadius: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={standard}
                      onChange={pickStandard}
                      style={{ width: '18px', height: '18px', accentColor: '#2B1D21' }}
                    />
                    <span style={{ flex: '1', fontSize: '15px' }}>Standard · [X–Y] working days</span>
                    <span style={{ fontSize: '15px' }}>Rs. [FEE]</span>
                  </label>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      minHeight: '52px',
                      padding: '0 16px',
                      border: '1px solid #D9C4BC',
                      borderRadius: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={express}
                      onChange={pickExpress}
                      style={{ width: '18px', height: '18px', accentColor: '#2B1D21' }}
                    />
                    <span style={{ flex: '1', fontSize: '15px' }}>Express · [X] working days</span>
                    <span style={{ fontSize: '15px' }}>Rs. [FEE]</span>
                  </label>
                </fieldset>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label
                    htmlFor="promo"
                    style={{ fontSize: '13px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: '500' }}
                  >
                    Promo code
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      id="promo"
                      type="text"
                      placeholder="Enter code"
                      style={{
                        flex: '1',
                        minWidth: '0',
                        minHeight: '50px',
                        padding: '0 16px',
                        border: '1px solid #C9B2AA',
                        borderRadius: '12px',
                        background: '#FBF5F2',
                        fontSize: '15px',
                        color: '#2B1D21',
                      }}
                    />
                    <button
                      style={{
                        minHeight: '50px',
                        padding: '0 20px',
                        border: '1px solid #2B1D21',
                        borderRadius: '12px',
                        background: 'transparent',
                        fontSize: '13px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#2B1D21',
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    borderTop: '1px solid #EADDD7',
                    paddingTop: '20px',
                    fontSize: '15px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#5E4A4F' }}>
                      Subtotal ({count}
                      {' items)'}
                    </span>
                    <span>Rs. [SUBTOTAL]</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#5E4A4F' }}>Delivery ({deliveryName})</span>
                    <span>Rs. [FEE]</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#5E4A4F' }}>Discovery vial</span>
                    <span>Free</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      borderTop: '1px solid #EADDD7',
                      paddingTop: '16px',
                    }}
                  >
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px' }}>Total</span>
                    <span style={{ fontSize: '20px', fontWeight: '500' }}>Rs. [TOTAL]</span>
                  </div>
                </div>
                <Link
                  to="/cart"
                  className="s-btn"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '58px',
                    background: '#2B1D21',
                    color: '#FBF5F2',
                    borderRadius: '999px',
                    fontSize: '14px',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                  }}
                >
                  Proceed to checkout
                </Link>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', textAlign: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#5E4A4F', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5E4A4F" strokeWidth="1.5">
                      <rect x="5" y="11" width="14" height="10" rx="2" />
                      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                    </svg>
                    Secure checkout
                  </span>
                  <span style={{ fontSize: '13px', color: '#5E4A4F' }}>Cash on delivery · Debit / credit card · Bank transfer</span>
                </div>
              </aside>
            </div>
          </>
        ) : null}
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
