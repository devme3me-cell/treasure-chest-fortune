'use client';

import { useEffect, useState } from 'react';

interface TreasureChestProps {
  isOpen: boolean;
  isShaking: boolean;
  onClick?: () => void;
}

export default function TreasureChest({ isOpen, isShaking, onClick }: TreasureChestProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`treasure-chest-container ${isShaking ? 'shaking' : ''} ${isOpen ? 'open-chest' : ''}`}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 -50 500 400"
        id="chest"
        className={`${isShaking && !isOpen ? 'shake-chest' : ''}`}
        style={{ maxWidth: '400px', width: '100%' }}
      >
        <defs>
          <clipPath id="clip-path">
            <rect className="cls-1" x="115.28" y="168.67" width="275.85" height="130.18" />
          </clipPath>
          <clipPath id="clip-path-2">
            <rect className="cls-2" x="45.02" y="167.49" width="410.31" height="44.75" rx="19.76" />
          </clipPath>
          <clipPath id="clip-path-3">
            <rect className="cls-3" x="61.56" y="184.2" width="13.99" height="73.92" rx="7" />
          </clipPath>
          <clipPath id="clip-path-4">
            <rect className="cls-3" x="425.19" y="184.2" width="13.99" height="73.92" rx="7" />
          </clipPath>
          <clipPath id="clip-path-5">
            <polygon className="cls-3" points="398.15 303.73 99.7 303.73 99.7 167.25 122.3 167.25 122.3 281.13 375.55 281.13 375.55 167.25 398.15 167.25 398.15 303.73" />
          </clipPath>
          <clipPath id="clip-path-6">
            <circle className="cls-4" cx="153.22" cy="249.46" r="12" />
          </clipPath>
          <clipPath id="clip-path-7">
            <polygon className="cls-3" points="409.93 192.24 87.04 192.24 87.04 30.79 110.56 30.79 110.56 168.72 386.41 168.72 386.41 30.79 409.93 30.79 409.93 192.24" />
          </clipPath>
          <clipPath id="clip-path-8">
            <rect className="cls-3" x="237.79" y="30.79" width="23.52" height="153.96" />
          </clipPath>
          <clipPath id="clip-path-9">
            <circle className="cls-4" cx="368.5" cy="167.49" r="12" />
          </clipPath>
          <clipPath id="clip-path-10">
            <rect className="cls-3" x="201.18" y="145.5" width="95.67" height="83.43" />
          </clipPath>
        </defs>
        <g id="Lag_2" data-name="Lag 2">
          <g id="Layer_1" data-name="Layer 1">
            <g id="chest">
              {/* Chest Bottom */}
              <g id="chest-bottom">
                <polygon className="cls-5" points="378.28 170.42 366.31 123.87 130.2 123.87 117.42 172.75 378.28 170.42" />
                <polygon className="cls-1" points="133.42 126.08 133.42 167.49 122.3 167.49 133.42 126.08" />
                <polygon className="cls-1" points="375.55 167.25 363.54 167.25 363.54 125.86 375.55 167.25" />
                <ellipse className="cls-6" cx="248.68" cy="178.45" rx="126.38" ry="36.8" />
                <rect className="cls-1" x="115.28" y="168.67" width="275.85" height="130.18" />
                <g className="cls-7">
                  <rect className="cls-4" x="78.51" y="246.01" width="393.48" height="6.72" />
                </g>
                <rect className="cls-2" x="45.02" y="167.49" width="410.31" height="44.75" rx="19.76" />
                <g className="cls-8">
                  <rect className="cls-4" y="156.9" width="496.25" height="33.24" />
                </g>
                <rect className="cls-3" x="61.56" y="184.2" width="13.99" height="73.92" rx="7" />
                <g className="cls-9">
                  <rect className="cls-10" x="38.82" y="117.12" width="29.73" height="208.08" />
                </g>
                <rect className="cls-3" x="425.19" y="184.2" width="13.99" height="73.92" rx="7" />
                <g className="cls-11">
                  <rect className="cls-10" x="402.45" y="117.12" width="29.73" height="208.08" />
                </g>
                <polyline className="cls-12" points="117.42 167.67 117.42 298.84 393.27 298.84 393.27 167.67" />
                <polygon className="cls-3" points="398.15 303.73 99.7 303.73 99.7 167.25 122.3 167.25 122.3 281.13 375.55 281.13 375.55 167.25 398.15 167.25 398.15 303.73" />
                <g className="cls-13">
                  <rect className="cls-10" x="76.88" y="164" width="29.73" height="146.08" />
                  <rect className="cls-10" x="122.48" y="164.22" width="264.1" height="125.08" />
                </g>
                <polygon className="cls-3" points="122.3 167.25 133.42 126.08 363.54 126.08 375.55 167.25 398.15 167.25 381.71 121.65 117.42 121.65 99.7 167.25 122.3 167.25" />
                <polygon className="cls-10" points="106.61 167.67 124.11 121.65 117.42 121.65 99.7 167.25 106.61 167.67" />
                <polygon className="cls-14" points="386.58 167.49 371.79 125.86 363.54 125.86 375.55 167.25 386.58 167.49" />
                <circle className="cls-4" cx="153.22" cy="249.46" r="12" />
                <g className="cls-15">
                  <circle className="cls-2" cx="153.22" cy="243.24" r="12" />
                </g>
              </g>

              {/* Chest Top - Will rotate when opening */}
              <g id="chest-top" style={{ transformOrigin: '250px 190px', transformBox: 'fill-box' }}>
                <rect className="cls-16" x="102.45" y="35.07" width="299.37" height="149.69" />
                <rect className="cls-2" x="153.22" y="39.8" width="56.15" height="93.85" />
                <rect className="cls-4" x="144.67" y="35.07" width="56.15" height="90.43" />
                <rect className="cls-2" x="305.04" y="39.8" width="56.15" height="93.85" />
                <rect className="cls-4" x="296.85" y="39.8" width="56.15" height="85.7" />
                <polyline className="cls-17" points="104.59 35.07 104.59 184.75 403.96 184.75 403.96 35.07" />
                <polygon className="cls-3" points="409.93 192.24 87.04 192.24 87.04 30.79 110.56 30.79 110.56 168.72 386.41 168.72 386.41 30.79 409.93 30.79 409.93 192.24" />
                <g className="cls-18">
                  <polygon className="cls-10" points="96.36 213.21 66.63 213.21 66.63 5.13 96.36 5.13 125.06 30.94 125.06 39.19 96.36 39.33 96.36 213.21" />
                  <rect className="cls-10" x="222.84" y="5.13" width="29.73" height="208.08" />
                  <polygon className="cls-10" points="393.27 173.33 110.56 173.33 110.56 28.47 421.74 28.47 421.3 37.51 393.27 37.08 393.27 173.33" />
                </g>
                <rect className="cls-19" x="110.56" y="35.07" width="275.85" height="9.47" />
                <rect className="cls-3" x="237.79" y="30.79" width="23.52" height="153.96" />
                <g className="cls-20">
                  <polygon className="cls-10" points="246.15 214.03 216.42 214.03 216.42 0 246.15 0 269.66 37.41 246.15 37.41 246.15 214.03" />
                </g>
                <circle className="cls-4" cx="368.5" cy="167.49" r="12" />
                <g className="cls-21">
                  <circle className="cls-2" cx="368.5" cy="161.27" r="12" />
                </g>
              </g>

              {/* Chest Lock */}
              <g id="chest-lock">
                <rect className="cls-2" x="207.23" y="153.94" width="95.67" height="83.43" />
                <rect className="cls-3" x="201.18" y="145.5" width="95.67" height="83.43" />
                <g className="cls-22">
                  <rect className="cls-4" x="178.36" y="134.09" width="95.67" height="64.91" />
                </g>
                <rect className="cls-23" x="237.79" y="153.94" width="23.52" height="74.96" />
                <path className="cls-24" d="M261.31,162.16v-20a11.76,11.76,0,1,0-23.52,0v20" />
                <circle className="cls-25" cx="249.55" cy="185.92" r="11.76" />
                <rect className="cls-26" x="244.91" y="185.92" width="9.29" height="25.86" />
              </g>
            </g>
          </g>
        </g>

        <style>{`
          .cls-1 { fill: #6f583e; }
          .cls-2 { fill: #f8b133; }
          .cls-3 { fill: #c28b2b; }
          .cls-4 { fill: #f9ca63; }
          .cls-5 { fill: #5e4a35; }
          .cls-6 { fill: #846743; }
          .cls-7 { clip-path: url(#clip-path); }
          .cls-8 { clip-path: url(#clip-path-2); }
          .cls-9 { clip-path: url(#clip-path-3); }
          .cls-10 { fill: #332515; }
          .cls-11 { clip-path: url(#clip-path-4); }
          .cls-12 { fill: none; stroke: #332515; stroke-miterlimit: 10; stroke-width: 4.89px; }
          .cls-13 { clip-path: url(#clip-path-5); }
          .cls-14 { fill: #4a3a29; }
          .cls-15 { clip-path: url(#clip-path-6); }
          .cls-16 { fill: #795e42; }
          .cls-17 { fill: none; stroke: #332515; stroke-linecap: round; stroke-linejoin: round; stroke-width: 4.89px; }
          .cls-18 { clip-path: url(#clip-path-7); }
          .cls-19 { fill: #a67c52; }
          .cls-20 { clip-path: url(#clip-path-8); }
          .cls-21 { clip-path: url(#clip-path-9); }
          .cls-22 { clip-path: url(#clip-path-10); }
          .cls-23 { fill: #9c7030; }
          .cls-24 { fill: none; stroke: #c28b2b; stroke-linecap: round; stroke-miterlimit: 10; stroke-width: 4.89px; }
          .cls-25 { fill: #84652f; }
          .cls-26 { fill: #a77e3b; }
        `}</style>
      </svg>
    </div>
  );
}
