export default function Home() {
  return (
  <>
     <header>
      <div className="header-wrap">
        <video
          autoPlay
          muted
          loop
         >
          <source type="video/mp4" src="/assets/videos/jetcenter.mp4" />
        </video>
        <svg viewBox="0 0 160 90">
          <g className="header-backdrop" mask="url(#header-mask)">
            <rect id="cover" x="-5%" y="-5%" width="110%" height="110%" />
          </g>
          <g className="transparent-text">
            <text
              id="heading"
              className="heading-text"
              text-anchor="middle"
              x="50%"
              y="50%"
              dy="0.3em">
              CSM
            </text>
          </g>
          <mask id="header-mask">
            <use href="#cover" style={{fill:"white"}} />

            <use href="#heading" />
       
            <use href="#text-path" style={{fill:"white"}} />
          </mask>
        </svg>
      </div>
    </header>
  </>
  );
}
