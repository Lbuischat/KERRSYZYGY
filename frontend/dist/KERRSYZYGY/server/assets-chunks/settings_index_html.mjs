export default `<!DOCTYPE html><html lang="en"><head>
  <meta charset="utf-8">
  <title>KERRSYZYGY</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <script src="https://accounts.google.com/gsi/client" async="" defer=""></script>
<link rel="stylesheet" href="styles.css"><style ng-app-id="ng">
[_nghost-ng-c3842096765] {
  display: block;
  min-height: 100vh;
  background: #000;
  color: #fff;
}
.settings-page[_ngcontent-ng-c3842096765] {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #000;
}
.star-field[_ngcontent-ng-c3842096765] {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.star[_ngcontent-ng-c3842096765] {
  position: absolute;
  display: block;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: #fff;
  opacity: 0.45;
}
.star-1[_ngcontent-ng-c3842096765] {
  top: 8%;
  left: 14%;
  opacity: 0.3;
}
.star-2[_ngcontent-ng-c3842096765] {
  top: 17%;
  left: 72%;
  width: 1px;
  height: 1px;
  opacity: 0.6;
}
.star-3[_ngcontent-ng-c3842096765] {
  top: 28%;
  left: 38%;
  opacity: 0.25;
}
.star-4[_ngcontent-ng-c3842096765] {
  top: 12%;
  left: 91%;
  width: 1px;
  height: 1px;
  opacity: 0.5;
}
.star-5[_ngcontent-ng-c3842096765] {
  top: 43%;
  left: 8%;
  width: 1px;
  height: 1px;
  opacity: 0.35;
}
.star-6[_ngcontent-ng-c3842096765] {
  top: 52%;
  left: 82%;
  opacity: 0.3;
}
.star-7[_ngcontent-ng-c3842096765] {
  top: 67%;
  left: 23%;
  width: 1px;
  height: 1px;
  opacity: 0.55;
}
.star-8[_ngcontent-ng-c3842096765] {
  top: 76%;
  left: 91%;
  opacity: 0.25;
}
.star-9[_ngcontent-ng-c3842096765] {
  top: 84%;
  left: 47%;
  width: 1px;
  height: 1px;
  opacity: 0.5;
}
.star-10[_ngcontent-ng-c3842096765] {
  top: 35%;
  left: 63%;
  opacity: 0.2;
}
.star-11[_ngcontent-ng-c3842096765] {
  top: 61%;
  left: 55%;
  width: 1px;
  height: 1px;
  opacity: 0.4;
}
.star-12[_ngcontent-ng-c3842096765] {
  top: 91%;
  left: 12%;
  opacity: 0.3;
}
.star-13[_ngcontent-ng-c3842096765] {
  top: 23%;
  left: 5%;
  width: 1px;
  height: 1px;
  opacity: 0.45;
}
.star-14[_ngcontent-ng-c3842096765] {
  top: 72%;
  left: 69%;
  opacity: 0.25;
}
.star-15[_ngcontent-ng-c3842096765] {
  top: 48%;
  left: 31%;
  width: 1px;
  height: 1px;
  opacity: 0.5;
}
.star-16[_ngcontent-ng-c3842096765] {
  top: 94%;
  left: 78%;
  width: 1px;
  height: 1px;
  opacity: 0.35;
}
.star-17[_ngcontent-ng-c3842096765] {
  top: 5%;
  left: 51%;
  opacity: 0.2;
}
.star-18[_ngcontent-ng-c3842096765] {
  top: 57%;
  left: 95%;
  width: 1px;
  height: 1px;
  opacity: 0.4;
}
.back-button[_ngcontent-ng-c3842096765] {
  position: absolute;
  top: 28px;
  left: 32px;
  z-index: 2;
  border: 0;
  padding: 0;
  background: transparent;
  color: #666;
  font: inherit;
  font-size: 14px;
  cursor: pointer;
  transition: color 160ms ease, transform 160ms ease;
}
.back-button[_ngcontent-ng-c3842096765]:hover {
  color: #fff;
  transform: translateX(-3px);
}
.settings-header[_ngcontent-ng-c3842096765] {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  padding-top: 42px;
}
.settings-header[_ngcontent-ng-c3842096765]   h1[_ngcontent-ng-c3842096765] {
  margin: 0;
  color: #fff;
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 400;
  letter-spacing: 0.08em;
  text-align: center;
}
.settings-content[_ngcontent-ng-c3842096765] {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 40px 24px 120px;
}
.settings-section[_ngcontent-ng-c3842096765] {
  width: min(760px, 100%);
  margin: auto 0;
  display: flex;
  flex-direction: column;
  gap: 28px;
  color: #aaa;
  text-align: center;
}
.settings-section[_ngcontent-ng-c3842096765]   p[_ngcontent-ng-c3842096765] {
  margin: 0;
  font-size: 16px;
}
.setting-row[_ngcontent-ng-c3842096765] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  min-height: 64px;
}
.setting-info[_ngcontent-ng-c3842096765] {
  text-align: left;
}
.setting-info[_ngcontent-ng-c3842096765]   h2[_ngcontent-ng-c3842096765] {
  margin: 0;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.04em;
}
.setting-info[_ngcontent-ng-c3842096765]   p[_ngcontent-ng-c3842096765] {
  margin: 6px 0 0;
  color: #555;
  font-size: 12px;
  line-height: 1.5;
}
.star-btn[_ngcontent-ng-c3842096765] {
  position: relative;
  flex: 0 0 44px;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  overflow: visible;
}
.star-system[_ngcontent-ng-c3842096765] {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 44px;
  height: 44px;
  transform: translate(calc(-50% + 2px), calc(-50% - 1px));
  display: block;
  overflow: visible;
  pointer-events: none;
}
.star-orbit-system[_ngcontent-ng-c3842096765] {
  transform-origin: 5px 0px;
}
.star-orbit[_ngcontent-ng-c3842096765] {
  fill: none;
  stroke: rgba(255, 255, 255, 0.6);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
  opacity: 0;
  transition: opacity 180ms ease;
}
.star-btn.on[_ngcontent-ng-c3842096765]   .star-orbit[_ngcontent-ng-c3842096765] {
  opacity: 1;
}
.star-orbit-path[_ngcontent-ng-c3842096765] {
  fill: none;
  stroke: none;
  pointer-events: none;
  opacity: 0;
}
.star-core[_ngcontent-ng-c3842096765] {
  fill: #3f3f3f;
  transition: fill 180ms ease, filter 180ms ease;
}
.star-btn[_ngcontent-ng-c3842096765]:hover   .star-core[_ngcontent-ng-c3842096765] {
  fill: #aaa;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.25));
}
.star-btn.on[_ngcontent-ng-c3842096765]   .star-core[_ngcontent-ng-c3842096765] {
  fill: #fff;
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 9px rgba(255, 255, 255, 0.4));
}
.star-companion[_ngcontent-ng-c3842096765] {
  fill: #fff;
  opacity: 0;
  filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.8));
  pointer-events: none;
}
.star-btn.on[_ngcontent-ng-c3842096765]   .star-companion[_ngcontent-ng-c3842096765] {
  opacity: 1;
}
.star-btn[_ngcontent-ng-c3842096765]:focus-visible {
  outline: 1px solid rgba(255, 255, 255, 0.5);
  outline-offset: 3px;
  border-radius: 50%;
}
@media (prefers-reduced-motion: reduce) {
  .star-btn.on[_ngcontent-ng-c3842096765]   .star-companion[_ngcontent-ng-c3842096765] {
    opacity: 0;
  }
}
.binary-toggle[_ngcontent-ng-c3842096765] {
  position: relative;
  flex: 0 0 64px;
  width: 64px;
  height: 40px;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
  overflow: visible;
}
.binary-star[_ngcontent-ng-c3842096765] {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  margin: -4px 0 0 -4px;
  pointer-events: none;
}
.binary-star-core[_ngcontent-ng-c3842096765] {
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3d3d3d;
  transition: background 180ms ease, box-shadow 180ms ease;
}
.binary-star-left[_ngcontent-ng-c3842096765] {
  transform: translateX(-18px);
}
.binary-star-right[_ngcontent-ng-c3842096765] {
  transform: translateX(18px);
}
.binary-star-trail[_ngcontent-ng-c3842096765] {
  position: absolute;
  width: 10px;
  height: 3px;
  border-radius: 999px;
  background:
    linear-gradient(
      to left,
      rgba(248, 246, 246, 1),
      rgba(71, 71, 71, 0.5));
  opacity: 0;
  filter: blur(1px);
  pointer-events: none;
}
.binary-star-left[_ngcontent-ng-c3842096765]   .binary-star-trail[_ngcontent-ng-c3842096765] {
  left: -2px;
  top: 100%;
  transform: translateY(-50%) rotate(270deg);
}
.binary-star-right[_ngcontent-ng-c3842096765]   .binary-star-trail[_ngcontent-ng-c3842096765] {
  left: -2px;
  bottom: 100%;
  transform: translateY(50%) rotate(90deg);
}
.binary-toggle.on[_ngcontent-ng-c3842096765]   .binary-star-core[_ngcontent-ng-c3842096765] {
  background: #fff;
  box-shadow: 0 0 7px rgba(255, 255, 255, 0.8), 0 0 14px rgba(255, 255, 255, 0.3);
}
.binary-toggle.on[_ngcontent-ng-c3842096765]   .binary-star-trail[_ngcontent-ng-c3842096765] {
  opacity: 0.75;
}
.binary-toggle.on[_ngcontent-ng-c3842096765]   .binary-star-left[_ngcontent-ng-c3842096765] {
  animation: _ngcontent-ng-c3842096765_binary-star-orbit-left 2.4s linear infinite;
}
.binary-toggle.on[_ngcontent-ng-c3842096765]   .binary-star-right[_ngcontent-ng-c3842096765] {
  animation: _ngcontent-ng-c3842096765_binary-star-orbit-right 2.4s linear infinite;
}
@keyframes _ngcontent-ng-c3842096765_binary-star-orbit-left {
  from {
    transform: rotate(0deg) translateX(-18px);
  }
  to {
    transform: rotate(360deg) translateX(-18px);
  }
}
@keyframes _ngcontent-ng-c3842096765_binary-star-orbit-right {
  from {
    transform: rotate(0deg) translateX(18px);
  }
  to {
    transform: rotate(360deg) translateX(18px);
  }
}
.binary-toggle[_ngcontent-ng-c3842096765]:hover   .binary-star-core[_ngcontent-ng-c3842096765] {
  background: #aaa;
}
.binary-toggle.on[_ngcontent-ng-c3842096765]:hover   .binary-star-core[_ngcontent-ng-c3842096765] {
  background: #fff;
}
.binary-toggle[_ngcontent-ng-c3842096765]:focus-visible {
  outline: 1px solid rgba(255, 255, 255, 0.5);
  outline-offset: 4px;
  border-radius: 50%;
}
@media (prefers-reduced-motion: reduce) {
  .binary-toggle.on[_ngcontent-ng-c3842096765]   .binary-star-left[_ngcontent-ng-c3842096765], 
   .binary-toggle.on[_ngcontent-ng-c3842096765]   .binary-star-right[_ngcontent-ng-c3842096765] {
    animation: none;
  }
  .binary-toggle.on[_ngcontent-ng-c3842096765]   .binary-star-trail[_ngcontent-ng-c3842096765] {
    opacity: 0;
  }
}
.constellation-slider[_ngcontent-ng-c3842096765] {
  position: relative;
  flex: 0 0 300px;
  width: 300px;
  height: 42px;
}
.slider-stars[_ngcontent-ng-c3842096765] {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  pointer-events: none;
}
.slider-star[_ngcontent-ng-c3842096765] {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #333;
  transition:
    background 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;
}
.slider-star.lit[_ngcontent-ng-c3842096765] {
  background: #fff;
  box-shadow: 0 0 7px rgba(255, 255, 255, 0.7), 0 0 14px rgba(255, 255, 255, 0.2);
  transform: scale(1.15);
}
.constellation-slider[_ngcontent-ng-c3842096765]   input[_ngcontent-ng-c3842096765] {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: pointer;
}
.constellation-slider[_ngcontent-ng-c3842096765]::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 4px;
  right: 4px;
  height: 1px;
  background: #292929;
  transform: translateY(-50%);
}
.section-navigation[_ngcontent-ng-c3842096765] {
  position: absolute;
  left: 50%;
  bottom: 32px;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px 28px;
  width: max-content;
  max-width: calc(100vw - 32px);
  transform: translateX(-50%);
}
.language-list[_ngcontent-ng-c3842096765] {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.language-option[_ngcontent-ng-c3842096765] {
  width: min(320px, 100%);
  padding: 14px 20px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  background: transparent;
  color: #777;
  font: inherit;
  font-size: 16px;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}
.language-option[_ngcontent-ng-c3842096765]:hover {
  color: #ddd;
  border-color: rgba(255, 255, 255, 0.3);
}
.language-option.active[_ngcontent-ng-c3842096765] {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 0 18px rgba(255, 255, 255, 0.12);
}
.section-navigation[_ngcontent-ng-c3842096765]   button[_ngcontent-ng-c3842096765] {
  border: 0;
  padding: 4px 0;
  background: transparent;
  color: #555;
  font: inherit;
  font-size: 13px;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: color 160ms ease, opacity 160ms ease;
}
.section-navigation[_ngcontent-ng-c3842096765]   button[_ngcontent-ng-c3842096765]:hover {
  color: #aaa;
}
.section-navigation[_ngcontent-ng-c3842096765]   button.active[_ngcontent-ng-c3842096765] {
  color: #fff;
}
@media (max-width: 600px) {
  .back-button[_ngcontent-ng-c3842096765] {
    top: 20px;
    left: 20px;
  }
  .settings-header[_ngcontent-ng-c3842096765] {
    padding-top: 70px;
  }
  .settings-content[_ngcontent-ng-c3842096765] {
    padding-inline: 18px;
  }
  .section-navigation[_ngcontent-ng-c3842096765] {
    gap: 16px;
  }
  .setting-row[_ngcontent-ng-c3842096765] {
    gap: 20px;
  }
  .setting-info[_ngcontent-ng-c3842096765]   h2[_ngcontent-ng-c3842096765] {
    font-size: 15px;
  }
  .constellation-slider[_ngcontent-ng-c3842096765] {
    flex-basis: 220px;
    width: 220px;
  }
}
/*# sourceMappingURL=/settings.css.map */</style></head>
<body><!--nghm--><script type="text/javascript" id="ng-event-dispatch-contract">(()=>{function p(t,n,r,o,e,i,f,m){return{eventType:t,event:n,targetElement:r,eic:o,timeStamp:e,eia:i,eirp:f,eiack:m}}function u(t){let n=[],r=e=>{n.push(e)};return{c:t,q:n,et:[],etc:[],d:r,h:e=>{r(p(e.type,e,e.target,t,Date.now()))}}}function s(t,n,r){for(let o=0;o<n.length;o++){let e=n[o];(r?t.etc:t.et).push(e),t.c.addEventListener(e,t.h,r)}}function c(t,n,r,o,e=window){let i=u(t);e._ejsas||(e._ejsas={}),e._ejsas[n]=i,s(i,r),s(i,o,!0)}window.__jsaction_bootstrap=c;})();
</script><script>window.__jsaction_bootstrap(document.body,"ng",["click","input"],[]);</script>
  <app-root ng-version="22.1.3" ngh="1" ng-server-context="ssg"><router-outlet></router-outlet><app-settings _nghost-ng-c3842096765="" ngh="0"><div _ngcontent-ng-c3842096765="" class="settings-page"><div _ngcontent-ng-c3842096765="" aria-hidden="true" class="star-field"><span _ngcontent-ng-c3842096765="" class="star star-1"></span><span _ngcontent-ng-c3842096765="" class="star star-2"></span><span _ngcontent-ng-c3842096765="" class="star star-3"></span><span _ngcontent-ng-c3842096765="" class="star star-4"></span><span _ngcontent-ng-c3842096765="" class="star star-5"></span><span _ngcontent-ng-c3842096765="" class="star star-6"></span><span _ngcontent-ng-c3842096765="" class="star star-7"></span><span _ngcontent-ng-c3842096765="" class="star star-8"></span><span _ngcontent-ng-c3842096765="" class="star star-9"></span><span _ngcontent-ng-c3842096765="" class="star star-10"></span><span _ngcontent-ng-c3842096765="" class="star star-11"></span><span _ngcontent-ng-c3842096765="" class="star star-12"></span><span _ngcontent-ng-c3842096765="" class="star star-13"></span><span _ngcontent-ng-c3842096765="" class="star star-14"></span><span _ngcontent-ng-c3842096765="" class="star star-15"></span><span _ngcontent-ng-c3842096765="" class="star star-16"></span><span _ngcontent-ng-c3842096765="" class="star star-17"></span><span _ngcontent-ng-c3842096765="" class="star star-18"></span></div><button _ngcontent-ng-c3842096765="" type="button" class="back-button" jsaction="click:;"> ← Back </button><header _ngcontent-ng-c3842096765="" class="settings-header"><h1 _ngcontent-ng-c3842096765="">Gameplay</h1></header><main _ngcontent-ng-c3842096765="" class="settings-content"><!--container--><section _ngcontent-ng-c3842096765="" class="settings-section"><div _ngcontent-ng-c3842096765="" class="setting-row"><div _ngcontent-ng-c3842096765="" class="setting-info"><h2 _ngcontent-ng-c3842096765="">Show Damage Numbers</h2><p _ngcontent-ng-c3842096765="">Display damage values when attacking enemies.</p></div><!--container--><!--container--><button _ngcontent-ng-c3842096765="" type="button" class="star-btn on" aria-pressed="true" aria-label="Show Damage Numbers" jsaction="click:;"><svg _ngcontent-ng-c3842096765="" viewBox="0 0 44 44" aria-hidden="true" class="star-system"><g _ngcontent-ng-c3842096765="" transform="rotate(-25 22 22)" class="star-orbit-system"><ellipse _ngcontent-ng-c3842096765="" cx="22" cy="22" rx="20" ry="11" class="star-orbit"></ellipse><path _ngcontent-ng-c3842096765="" d="
                                    M 42,22
                                    A 20,11 0 1,1 2,22
                                    A 20,11 0 1,1 42,22
                                " class="star-orbit-path"></path><circle _ngcontent-ng-c3842096765="" cx="0" cy="0" r="2.5" class="star-companion"><animateMotion _ngcontent-ng-c3842096765="" dur="2.4s" repeatCount="indefinite" rotate="0" path="
                                        M 42,22
                                        A 20,11 0 1,1 2,22
                                        A 20,11 0 1,1 42,22
                                    "></animateMotion></circle></g><circle _ngcontent-ng-c3842096765="" cx="22" cy="22" r="8" class="star-core"></circle></svg></button><!--container--></div><div _ngcontent-ng-c3842096765="" class="setting-row"><div _ngcontent-ng-c3842096765="" class="setting-info"><h2 _ngcontent-ng-c3842096765="">Show Tutorials</h2><p _ngcontent-ng-c3842096765="">Display tutorial prompts and introductory guidance.</p></div><!--container--><!--container--><button _ngcontent-ng-c3842096765="" type="button" class="star-btn on" aria-pressed="true" aria-label="Show Tutorials" jsaction="click:;"><svg _ngcontent-ng-c3842096765="" viewBox="0 0 44 44" aria-hidden="true" class="star-system"><g _ngcontent-ng-c3842096765="" transform="rotate(-25 22 22)" class="star-orbit-system"><ellipse _ngcontent-ng-c3842096765="" cx="22" cy="22" rx="20" ry="11" class="star-orbit"></ellipse><path _ngcontent-ng-c3842096765="" d="
                                    M 42,22
                                    A 20,11 0 1,1 2,22
                                    A 20,11 0 1,1 42,22
                                " class="star-orbit-path"></path><circle _ngcontent-ng-c3842096765="" cx="0" cy="0" r="2.5" class="star-companion"><animateMotion _ngcontent-ng-c3842096765="" dur="2.4s" repeatCount="indefinite" rotate="0" path="
                                        M 42,22
                                        A 20,11 0 1,1 2,22
                                        A 20,11 0 1,1 42,22
                                    "></animateMotion></circle></g><circle _ngcontent-ng-c3842096765="" cx="22" cy="22" r="8" class="star-core"></circle></svg></button><!--container--></div><div _ngcontent-ng-c3842096765="" class="setting-row"><div _ngcontent-ng-c3842096765="" class="setting-info"><h2 _ngcontent-ng-c3842096765="">Hints</h2><p _ngcontent-ng-c3842096765="">Show contextual hints while playing.</p></div><!--container--><!--container--><button _ngcontent-ng-c3842096765="" type="button" class="star-btn on" aria-pressed="true" aria-label="Hints" jsaction="click:;"><svg _ngcontent-ng-c3842096765="" viewBox="0 0 44 44" aria-hidden="true" class="star-system"><g _ngcontent-ng-c3842096765="" transform="rotate(-25 22 22)" class="star-orbit-system"><ellipse _ngcontent-ng-c3842096765="" cx="22" cy="22" rx="20" ry="11" class="star-orbit"></ellipse><path _ngcontent-ng-c3842096765="" d="
                                    M 42,22
                                    A 20,11 0 1,1 2,22
                                    A 20,11 0 1,1 42,22
                                " class="star-orbit-path"></path><circle _ngcontent-ng-c3842096765="" cx="0" cy="0" r="2.5" class="star-companion"><animateMotion _ngcontent-ng-c3842096765="" dur="2.4s" repeatCount="indefinite" rotate="0" path="
                                        M 42,22
                                        A 20,11 0 1,1 2,22
                                        A 20,11 0 1,1 42,22
                                    "></animateMotion></circle></g><circle _ngcontent-ng-c3842096765="" cx="22" cy="22" r="8" class="star-core"></circle></svg></button><!--container--></div><div _ngcontent-ng-c3842096765="" class="setting-row"><div _ngcontent-ng-c3842096765="" class="setting-info"><h2 _ngcontent-ng-c3842096765="">Difficulty</h2><p _ngcontent-ng-c3842096765="">Adjust the overall challenge level.</p></div><div _ngcontent-ng-c3842096765="" class="constellation-slider"><div _ngcontent-ng-c3842096765="" aria-hidden="true" class="slider-stars"><span _ngcontent-ng-c3842096765="" class="slider-star"></span><span _ngcontent-ng-c3842096765="" class="slider-star"></span><span _ngcontent-ng-c3842096765="" class="slider-star"></span><span _ngcontent-ng-c3842096765="" class="slider-star"></span><span _ngcontent-ng-c3842096765="" class="slider-star"></span><!--container--></div><input _ngcontent-ng-c3842096765="" type="range" step="1" value="1" min="1" max="10" aria-label="Difficulty" jsaction="input:;"></div><!--container--><!--container--><!--container--></div><div _ngcontent-ng-c3842096765="" class="setting-row"><div _ngcontent-ng-c3842096765="" class="setting-info"><h2 _ngcontent-ng-c3842096765="">Enemy Health Bars</h2><p _ngcontent-ng-c3842096765="">Display health bars above enemies.</p></div><!--container--><!--container--><button _ngcontent-ng-c3842096765="" type="button" class="star-btn on" aria-pressed="true" aria-label="Enemy Health Bars" jsaction="click:;"><svg _ngcontent-ng-c3842096765="" viewBox="0 0 44 44" aria-hidden="true" class="star-system"><g _ngcontent-ng-c3842096765="" transform="rotate(-25 22 22)" class="star-orbit-system"><ellipse _ngcontent-ng-c3842096765="" cx="22" cy="22" rx="20" ry="11" class="star-orbit"></ellipse><path _ngcontent-ng-c3842096765="" d="
                                    M 42,22
                                    A 20,11 0 1,1 2,22
                                    A 20,11 0 1,1 42,22
                                " class="star-orbit-path"></path><circle _ngcontent-ng-c3842096765="" cx="0" cy="0" r="2.5" class="star-companion"><animateMotion _ngcontent-ng-c3842096765="" dur="2.4s" repeatCount="indefinite" rotate="0" path="
                                        M 42,22
                                        A 20,11 0 1,1 2,22
                                        A 20,11 0 1,1 42,22
                                    "></animateMotion></circle></g><circle _ngcontent-ng-c3842096765="" cx="22" cy="22" r="8" class="star-core"></circle></svg></button><!--container--></div><div _ngcontent-ng-c3842096765="" class="setting-row"><div _ngcontent-ng-c3842096765="" class="setting-info"><h2 _ngcontent-ng-c3842096765="">Auto Equip</h2><p _ngcontent-ng-c3842096765="">Automatically equip newly acquired gear.</p></div><!--container--><button _ngcontent-ng-c3842096765="" type="button" class="binary-toggle" aria-pressed="false" aria-label="Auto Equip" jsaction="click:;"><span _ngcontent-ng-c3842096765="" class="binary-star binary-star-left"><span _ngcontent-ng-c3842096765="" class="binary-star-trail"></span><span _ngcontent-ng-c3842096765="" class="binary-star-core"></span></span><span _ngcontent-ng-c3842096765="" class="binary-star binary-star-right"><span _ngcontent-ng-c3842096765="" class="binary-star-trail"></span><span _ngcontent-ng-c3842096765="" class="binary-star-core"></span></span></button><!--container--><!--container--></div><div _ngcontent-ng-c3842096765="" class="setting-row"><div _ngcontent-ng-c3842096765="" class="setting-info"><h2 _ngcontent-ng-c3842096765="">Auto Save</h2><p _ngcontent-ng-c3842096765="">Automatically save your progress.</p></div><!--container--><button _ngcontent-ng-c3842096765="" type="button" class="binary-toggle on" aria-pressed="true" aria-label="Auto Save" jsaction="click:;"><span _ngcontent-ng-c3842096765="" class="binary-star binary-star-left"><span _ngcontent-ng-c3842096765="" class="binary-star-trail"></span><span _ngcontent-ng-c3842096765="" class="binary-star-core"></span></span><span _ngcontent-ng-c3842096765="" class="binary-star binary-star-right"><span _ngcontent-ng-c3842096765="" class="binary-star-trail"></span><span _ngcontent-ng-c3842096765="" class="binary-star-core"></span></span></button><!--container--><!--container--></div><!--container--></section><!--container--></main><nav _ngcontent-ng-c3842096765="" class="section-navigation"><button _ngcontent-ng-c3842096765="" type="button" class="active" jsaction="click:;"> Gameplay </button><button _ngcontent-ng-c3842096765="" type="button" class="" jsaction="click:;"> Sound </button><button _ngcontent-ng-c3842096765="" type="button" class="" jsaction="click:;"> Accessibility </button><button _ngcontent-ng-c3842096765="" type="button" class="" jsaction="click:;"> Language </button><!--container--></nav></div></app-settings><!--container--></app-root>
<script src="main.js" type="module"></script>

<script id="ng-state" type="application/json">{"__nghData__":[{"t":{"26":"t10","27":"t11","30":"t17"},"c":{"26":[],"27":[{"i":"t11","r":1,"t":{"2":"t12"},"c":{"2":[{"i":"t12","r":1,"t":{"6":"t13","7":"t14","8":"t15"},"c":{"6":[],"7":[],"8":[{"i":"t15","r":1}]},"x":3},{"i":"t12","r":1,"t":{"6":"t13","7":"t14","8":"t15"},"c":{"6":[{"i":"t13","r":1,"t":{"3":"t16"},"c":{"3":[{"i":"t16","r":1,"x":5}]}}],"7":[],"8":[]}},{"i":"t12","r":1,"t":{"6":"t13","7":"t14","8":"t15"},"c":{"6":[],"7":[],"8":[{"i":"t15","r":1}]}},{"i":"t12","r":1,"t":{"6":"t13","7":"t14","8":"t15"},"c":{"6":[],"7":[{"i":"t14","r":1}],"8":[]},"x":2}]}}],"30":[{"i":"t17","r":1,"x":4}]}},{"c":{"0":[{"i":"c3842096765","r":1}]}}]}</script></body></html>`;