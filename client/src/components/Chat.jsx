import { Fragment } from 'react';
import { useEffect, useRef, useState } from 'react';

export default function Chat() {
  const replies = {
    'Find my scent': 'Lovely! Tell me the mood you want — fresh, romantic, bold or cozy — and I will suggest three perfumes you will love.',
    'Track my order': 'Of course. Please share your order number and phone number, and we will send you a live update.',
    'Gift ideas': 'Our Discovery Edit is a favourite gift. Or tell me who it is for and your budget, and I will pick something special.',
    'Delivery & COD': 'We deliver nationwide in [X–Y] working days, and cash on delivery is available on every order.',
  };
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState('');
  const [rawMsgs, setRawMsgs] = useState([
    { id: 0, bot: true, text: 'Hello and welcome to Sabi. I am your scent concierge — how can I help you today?' },
  ]);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);

  const ask = (text) => {
    if (!text || !text.trim()) return;
    const reply =
      replies[text] || 'Thank you! A Sabi fragrance expert will reply here shortly. For a faster answer, message us on WhatsApp.';
    setRawMsgs((m) => [...m, { id: Date.now(), me: true, text: text.trim() }]);
    setDraft('');
    setTyping(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setTyping(false);
      setRawMsgs((m) => [...m, { id: Date.now() + 1, bot: true, text: reply }]);
    }, 1100);
  };

  const msgs = rawMsgs.map((m) => ({ ...m, bot: !!m.bot, me: !!m.me }));
  const chips = Object.keys(replies).map((l) => ({ label: l, pick: () => ask(l) }));
  const vals = {
    open,
    expanded: open ? 'true' : 'false',
    toggleLabel: open ? 'Close' : 'Chat with us',
    toggle: () => setOpen(!open),
    msgs,
    chips,
    showChips: !typing && rawMsgs.length < 3,
    typing,
    draft,
    onType: (e) => setDraft(e.target.value),
    onKey: (e) => {
      if (e.key === 'Enter') ask(draft);
    },
    send: () => ask(draft),
  };

  const { toggle, showChips, onType, onKey, send, expanded, toggleLabel } = vals;
  return (
    <div
      style={{
        position: 'fixed',
        right: '24px',
        bottom: '24px',
        zIndex: '60',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '14px',
        fontFamily: 'Jost, system-ui, sans-serif',
        color: '#2B1D21',
      }}
    >
      {open ? (
        <>
          <div
            className="s-pop"
            role="dialog"
            aria-label="Chat with Sabi"
            style={{
              width: 'min(370px, calc(100vw - 48px))',
              height: '520px',
              maxHeight: 'calc(100vh - 140px)',
              background: '#FBF5F2',
              borderRadius: '26px',
              boxShadow: '0 40px 80px -30px rgba(43,29,33,0.55), 0 0 0 1px rgba(43,29,33,0.06)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: '#2B1D21',
                color: '#F7EDE8',
                padding: '18px 18px 18px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: '#F2DCD6',
                  color: '#2B1D21',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontSize: '24px',
                  flex: '0 0 44px',
                }}
              >
                S
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    right: '0',
                    bottom: '1px',
                    width: '11px',
                    height: '11px',
                    borderRadius: '50%',
                    background: '#25D366',
                    border: '2px solid #2B1D21',
                  }}
                />
              </div>
              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '21px', lineHeight: '1.1' }}>Sabi Scent Concierge</span>
                <span style={{ fontSize: '12px', color: '#E5D6D1', letterSpacing: '0.04em' }}>Online · here to help you choose</span>
              </div>
              <button
                onClick={toggle}
                aria-label="Close chat"
                style={{
                  width: '44px',
                  height: '44px',
                  border: '0',
                  borderRadius: '50%',
                  background: 'transparent',
                  color: '#F7EDE8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div
              aria-live="polite"
              style={{ flex: '1', overflowY: 'auto', padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              {(msgs || []).map((m, $i) => (
                <Fragment key={$i}>
                  {m.bot ? (
                    <>
                      <div
                        className="s-pop"
                        style={{
                          alignSelf: 'flex-start',
                          maxWidth: '84%',
                          background: '#FFFFFF',
                          border: '1px solid #EADDD7',
                          borderRadius: '18px 18px 18px 6px',
                          padding: '12px 15px',
                          fontSize: '14px',
                          lineHeight: '1.55',
                        }}
                      >
                        {m.text}
                      </div>
                    </>
                  ) : null}
                  {m.me ? (
                    <>
                      <div
                        className="s-pop"
                        style={{
                          alignSelf: 'flex-end',
                          maxWidth: '84%',
                          background: '#2B1D21',
                          color: '#FBF5F2',
                          borderRadius: '18px 18px 6px 18px',
                          padding: '12px 15px',
                          fontSize: '14px',
                          lineHeight: '1.55',
                        }}
                      >
                        {m.text}
                      </div>
                    </>
                  ) : null}
                </Fragment>
              ))}
              {typing ? (
                <>
                  <div
                    aria-label="Sabi is typing"
                    style={{
                      alignSelf: 'flex-start',
                      background: '#FFFFFF',
                      border: '1px solid #EADDD7',
                      borderRadius: '18px 18px 18px 6px',
                      padding: '14px 16px',
                      display: 'flex',
                      gap: '5px',
                    }}
                  >
                    <span className="s-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#9A5845' }} />
                    <span
                      className="s-dot"
                      style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#9A5845', animationDelay: '0.15s' }}
                    />
                    <span
                      className="s-dot"
                      style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#9A5845', animationDelay: '0.3s' }}
                    />
                  </div>
                </>
              ) : null}
              {showChips ? (
                <>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '6px' }}>
                    {(chips || []).map((c, $i) => (
                      <Fragment key={$i}>
                        <button
                          onClick={c.pick}
                          style={{
                            minHeight: '38px',
                            padding: '0 14px',
                            borderRadius: '999px',
                            border: '1px solid #C9A99F',
                            background: '#FBF5F2',
                            color: '#2B1D21',
                            fontSize: '13px',
                          }}
                        >
                          {c.label}
                        </button>
                      </Fragment>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
            <div style={{ padding: '12px', borderTop: '1px solid #EADDD7', display: 'flex', gap: '8px', background: '#FFFFFF' }}>
              <label
                htmlFor="sabi-chat-input"
                style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}
              >
                Type your message
              </label>
              <input
                id="sabi-chat-input"
                type="text"
                value={draft}
                onChange={onType}
                onKeyDown={onKey}
                placeholder="Ask about any perfume…"
                style={{
                  flex: '1',
                  minWidth: '0',
                  minHeight: '46px',
                  padding: '0 16px',
                  borderRadius: '999px',
                  border: '1px solid #D9C4BC',
                  background: '#FBF5F2',
                  fontSize: '14px',
                  color: '#2B1D21',
                }}
              />
              <button
                onClick={send}
                aria-label="Send message"
                style={{
                  width: '46px',
                  height: '46px',
                  border: '0',
                  borderRadius: '50%',
                  background: '#2B1D21',
                  color: '#FBF5F2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 12l16-8-6 16-2-7-8-1z" />
                </svg>
              </button>
            </div>
          </div>
        </>
      ) : null}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <a
          className="s-pulse"
          href="https://wa.me/"
          aria-label="Chat with Sabi on WhatsApp"
          style={{
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            background: '#25D366',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 12px 28px -10px rgba(0,0,0,0.4)',
          }}
        >
          <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M3.5 20.5l1.4-4.2A8.5 8.5 0 1 1 8 19.3l-4.5 1.2z" />
            <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .8c-1-.4-2-1.4-2.4-2.4l.8-1-1-2L9 8.5z" />
          </svg>
        </a>
        <button
          onClick={toggle}
          aria-expanded={expanded}
          style={{
            minHeight: '58px',
            padding: '0 24px 0 18px',
            border: '0',
            borderRadius: '999px',
            background: '#2B1D21',
            color: '#FBF5F2',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '14px',
            letterSpacing: '0.08em',
            boxShadow: '0 16px 32px -14px rgba(43,29,33,0.7)',
          }}
        >
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4 5h16v11H9l-5 4V5z" />
            <path d="M8 10h8M8 13h5" />
          </svg>
          <span>{toggleLabel}</span>
        </button>
      </div>
    </div>
  );
}
