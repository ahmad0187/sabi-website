import { Fragment } from 'react';
// no imports

export default function Bottle(props) {
  const { shape = 'classic', liquid = '#E2A9A6', cap = '#C9A27A', label = 'SABI' } = props;
  const vals = {
    isClassic: shape === 'classic',
    isRound: shape === 'round',
    isTall: shape === 'tall',
    isAttar: shape === 'attar',
  };

  const { isClassic, isRound, isTall, isAttar } = vals;
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {isClassic ? (
        <>
          <svg aria-hidden="true" width="100%" height="100%" viewBox="0 0 200 320">
            <defs>
              <radialGradient id="sbt-shadow" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#2B1D21" stopOpacity="0.38" />
                <stop offset="1" stopColor="#2B1D21" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="sbt-metal" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#000" stopOpacity="0.35" />
                <stop offset="0.18" stopColor="#fff" stopOpacity="0.6" />
                <stop offset="0.34" stopColor="#fff" stopOpacity="0" />
                <stop offset="0.72" stopColor="#000" stopOpacity="0.08" />
                <stop offset="1" stopColor="#000" stopOpacity="0.45" />
              </linearGradient>
              <linearGradient id="sbt-glass" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#fff" stopOpacity="0.6" />
                <stop offset="0.1" stopColor="#fff" stopOpacity="0.12" />
                <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
                <stop offset="0.9" stopColor="#000" stopOpacity="0.12" />
                <stop offset="1" stopColor="#fff" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="sbt-liqH" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#000" stopOpacity="0.38" />
                <stop offset="0.25" stopColor="#000" stopOpacity="0" />
                <stop offset="0.6" stopColor="#fff" stopOpacity="0.1" />
                <stop offset="1" stopColor="#000" stopOpacity="0.45" />
              </linearGradient>
              <linearGradient id="sbt-liqV" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity="0.3" />
                <stop offset="0.3" stopColor="#fff" stopOpacity="0" />
                <stop offset="1" stopColor="#000" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <ellipse cx="100" cy="306" rx="78" ry="10" fill="url(#sbt-shadow)" />
            <rect x="84" y="104" width="32" height="20" fill={cap} />
            <rect x="84" y="104" width="32" height="20" fill="url(#sbt-metal)" />
            <rect
              x="36"
              y="120"
              width="128"
              height="182"
              rx="14"
              fill="#FFFFFF"
              fillOpacity="0.28"
              stroke="#FFFFFF"
              strokeOpacity="0.85"
              strokeWidth="1.5"
            />
            <rect x="45" y="140" width="110" height="153" rx="8" fill={liquid} fillOpacity="0.92" />
            <rect x="45" y="140" width="110" height="153" rx="8" fill="url(#sbt-liqH)" />
            <rect x="45" y="140" width="110" height="153" rx="8" fill="url(#sbt-liqV)" />
            <rect x="45" y="140" width="110" height="3" rx="1.5" fill="#FFFFFF" fillOpacity="0.45" />
            <rect x="36" y="120" width="128" height="182" rx="14" fill="url(#sbt-glass)" />
            <rect x="50" y="130" width="8" height="160" rx="4" fill="#FFFFFF" fillOpacity="0.55" />
            <rect x="148" y="140" width="3" height="140" rx="1.5" fill="#FFFFFF" fillOpacity="0.35" />
            <rect x="66" y="204" width="68" height="46" rx="2" fill="#FBF5F2" fillOpacity="0.94" />
            <rect x="70" y="208" width="60" height="38" rx="1" fill="none" stroke="#2B1D21" strokeOpacity="0.25" strokeWidth="0.6" />
            <text
              x="100"
              y="226"
              textAnchor="middle"
              fontFamily="Cormorant Garamond, Georgia, serif"
              fontSize="12"
              letterSpacing="3"
              fill="#2B1D21"
            >
              {label}
            </text>
            <text
              x="100"
              y="238"
              textAnchor="middle"
              fontFamily="Jost, Arial, sans-serif"
              fontSize="5"
              letterSpacing="1.6"
              fill="#2B1D21"
              fillOpacity="0.75"
            >
              EAU DE PARFUM
            </text>
            <rect x="70" y="36" width="60" height="70" rx="5" fill={cap} />
            <rect x="70" y="36" width="60" height="70" rx="5" fill="url(#sbt-metal)" />
            <rect x="70" y="36" width="60" height="4" rx="2" fill="#FFFFFF" fillOpacity="0.35" />
          </svg>
        </>
      ) : null}
      {isRound ? (
        <>
          <svg aria-hidden="true" width="100%" height="100%" viewBox="0 0 200 320">
            <defs>
              <radialGradient id="sbt-shadow" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#2B1D21" stopOpacity="0.38" />
                <stop offset="1" stopColor="#2B1D21" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="sbt-metal" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#000" stopOpacity="0.35" />
                <stop offset="0.18" stopColor="#fff" stopOpacity="0.6" />
                <stop offset="0.34" stopColor="#fff" stopOpacity="0" />
                <stop offset="0.72" stopColor="#000" stopOpacity="0.08" />
                <stop offset="1" stopColor="#000" stopOpacity="0.45" />
              </linearGradient>
              <radialGradient id="sbt-orb" cx="35%" cy="30%" r="75%">
                <stop offset="0" stopColor="#fff" stopOpacity="0.45" />
                <stop offset="0.4" stopColor="#fff" stopOpacity="0" />
                <stop offset="1" stopColor="#000" stopOpacity="0.4" />
              </radialGradient>
            </defs>
            <ellipse cx="100" cy="306" rx="74" ry="10" fill="url(#sbt-shadow)" />
            <rect x="86" y="112" width="28" height="22" fill={cap} />
            <rect x="86" y="112" width="28" height="22" fill="url(#sbt-metal)" />
            <circle cx="100" cy="216" r="86" fill="#FFFFFF" fillOpacity="0.3" stroke="#FFFFFF" strokeOpacity="0.85" strokeWidth="1.5" />
            <circle cx="100" cy="220" r="74" fill={liquid} fillOpacity="0.92" />
            <circle cx="100" cy="220" r="74" fill="url(#sbt-orb)" />
            <circle cx="100" cy="216" r="86" fill="url(#sbt-orb)" fillOpacity="0.5" />
            <ellipse cx="66" cy="178" rx="10" ry="26" transform="rotate(28 66 178)" fill="#FFFFFF" fillOpacity="0.55" />
            <ellipse cx="140" cy="262" rx="4" ry="14" transform="rotate(35 140 262)" fill="#FFFFFF" fillOpacity="0.3" />
            <rect x="68" y="204" width="64" height="30" rx="15" fill="#FBF5F2" fillOpacity="0.92" />
            <text
              x="100"
              y="223"
              textAnchor="middle"
              fontFamily="Cormorant Garamond, Georgia, serif"
              fontSize="12"
              letterSpacing="3"
              fill="#2B1D21"
            >
              {label}
            </text>
            <rect x="74" y="44" width="52" height="72" rx="26" fill={cap} />
            <rect x="74" y="44" width="52" height="72" rx="26" fill="url(#sbt-metal)" />
          </svg>
        </>
      ) : null}
      {isTall ? (
        <>
          <svg aria-hidden="true" width="100%" height="100%" viewBox="0 0 200 320">
            <defs>
              <radialGradient id="sbt-shadow" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#2B1D21" stopOpacity="0.38" />
                <stop offset="1" stopColor="#2B1D21" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="sbt-metal" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#000" stopOpacity="0.35" />
                <stop offset="0.18" stopColor="#fff" stopOpacity="0.6" />
                <stop offset="0.34" stopColor="#fff" stopOpacity="0" />
                <stop offset="0.72" stopColor="#000" stopOpacity="0.08" />
                <stop offset="1" stopColor="#000" stopOpacity="0.45" />
              </linearGradient>
              <linearGradient id="sbt-glass" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#fff" stopOpacity="0.6" />
                <stop offset="0.1" stopColor="#fff" stopOpacity="0.12" />
                <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
                <stop offset="0.9" stopColor="#000" stopOpacity="0.12" />
                <stop offset="1" stopColor="#fff" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="sbt-liqH" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#000" stopOpacity="0.38" />
                <stop offset="0.25" stopColor="#000" stopOpacity="0" />
                <stop offset="0.6" stopColor="#fff" stopOpacity="0.1" />
                <stop offset="1" stopColor="#000" stopOpacity="0.45" />
              </linearGradient>
              <linearGradient id="sbt-liqV" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity="0.3" />
                <stop offset="0.3" stopColor="#fff" stopOpacity="0" />
                <stop offset="1" stopColor="#000" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <ellipse cx="100" cy="306" rx="60" ry="9" fill="url(#sbt-shadow)" />
            <rect x="86" y="80" width="28" height="16" fill={cap} />
            <rect x="86" y="80" width="28" height="16" fill="url(#sbt-metal)" />
            <rect
              x="56"
              y="92"
              width="88"
              height="210"
              rx="8"
              fill="#FFFFFF"
              fillOpacity="0.28"
              stroke="#FFFFFF"
              strokeOpacity="0.85"
              strokeWidth="1.5"
            />
            <rect x="64" y="110" width="72" height="184" rx="4" fill={liquid} fillOpacity="0.93" />
            <rect x="64" y="110" width="72" height="184" rx="4" fill="url(#sbt-liqH)" />
            <rect x="64" y="110" width="72" height="184" rx="4" fill="url(#sbt-liqV)" />
            <rect x="64" y="110" width="72" height="3" fill="#FFFFFF" fillOpacity="0.45" />
            <rect x="56" y="92" width="88" height="210" rx="8" fill="url(#sbt-glass)" />
            <rect x="68" y="102" width="6" height="190" rx="3" fill="#FFFFFF" fillOpacity="0.55" />
            <rect x="72" y="216" width="56" height="40" rx="1" fill="#FBF5F2" fillOpacity="0.94" />
            <text
              x="100"
              y="236"
              textAnchor="middle"
              fontFamily="Cormorant Garamond, Georgia, serif"
              fontSize="11"
              letterSpacing="2.6"
              fill="#2B1D21"
            >
              {label}
            </text>
            <text
              x="100"
              y="247"
              textAnchor="middle"
              fontFamily="Jost, Arial, sans-serif"
              fontSize="4.4"
              letterSpacing="1.4"
              fill="#2B1D21"
              fillOpacity="0.75"
            >
              EAU DE PARFUM
            </text>
            <rect x="74" y="20" width="52" height="62" rx="3" fill={cap} />
            <rect x="74" y="20" width="52" height="62" rx="3" fill="url(#sbt-metal)" />
            <rect x="74" y="20" width="52" height="3" fill="#FFFFFF" fillOpacity="0.35" />
          </svg>
        </>
      ) : null}
      {isAttar ? (
        <>
          <svg aria-hidden="true" width="100%" height="100%" viewBox="0 0 200 320">
            <defs>
              <radialGradient id="sbt-shadow" cx="50%" cy="50%" r="50%">
                <stop offset="0" stopColor="#2B1D21" stopOpacity="0.38" />
                <stop offset="1" stopColor="#2B1D21" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="sbt-metal" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#000" stopOpacity="0.35" />
                <stop offset="0.18" stopColor="#fff" stopOpacity="0.6" />
                <stop offset="0.34" stopColor="#fff" stopOpacity="0" />
                <stop offset="0.72" stopColor="#000" stopOpacity="0.08" />
                <stop offset="1" stopColor="#000" stopOpacity="0.45" />
              </linearGradient>
              <linearGradient id="sbt-liqH" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#000" stopOpacity="0.38" />
                <stop offset="0.25" stopColor="#000" stopOpacity="0" />
                <stop offset="0.6" stopColor="#fff" stopOpacity="0.1" />
                <stop offset="1" stopColor="#000" stopOpacity="0.45" />
              </linearGradient>
            </defs>
            <ellipse cx="100" cy="306" rx="62" ry="9" fill="url(#sbt-shadow)" />
            <polygon
              points="100,152 158,190 158,262 100,300 42,262 42,190"
              fill="#FFFFFF"
              fillOpacity="0.3"
              stroke="#FFFFFF"
              strokeOpacity="0.85"
              strokeWidth="1.5"
            />
            <polygon points="100,168 146,197 146,256 100,286 54,256 54,197" fill={liquid} fillOpacity="0.93" />
            <polygon points="100,168 146,197 146,256 100,286 54,256 54,197" fill="url(#sbt-liqH)" />
            <polyline points="100,152 100,300" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1" />
            <polyline points="42,190 100,226 158,190" fill="none" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="1" />
            <polyline points="42,262 100,226 158,262" fill="none" stroke="#000" strokeOpacity="0.12" strokeWidth="1" />
            <polygon points="58,196 74,186 74,250 58,258" fill="#FFFFFF" fillOpacity="0.45" />
            <rect x="88" y="128" width="24" height="28" fill="#FFFFFF" fillOpacity="0.35" stroke="#FFFFFF" strokeOpacity="0.8" />
            <rect x="84" y="122" width="32" height="10" rx="2" fill={cap} />
            <rect x="84" y="122" width="32" height="10" rx="2" fill="url(#sbt-metal)" />
            <ellipse cx="100" cy="76" rx="22" ry="48" fill={cap} />
            <ellipse cx="100" cy="76" rx="22" ry="48" fill="url(#sbt-metal)" />
            <ellipse cx="92" cy="62" rx="4" ry="18" fill="#FFFFFF" fillOpacity="0.45" />
          </svg>
        </>
      ) : null}
    </div>
  );
}
