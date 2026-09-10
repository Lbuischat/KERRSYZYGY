export default `<!DOCTYPE html><html lang="en"><head>
  <meta charset="utf-8">
  <title>KERRSYZYGY</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <script src="https://accounts.google.com/gsi/client" async="" defer=""></script>
<link rel="stylesheet" href="styles.css"><style ng-app-id="ng">
.game-shell[_ngcontent-ng-c364297699] {
  width: 100%;
  min-height: 100vh;
}
/*# sourceMappingURL=/game-shell.css.map */</style><style ng-app-id="ng">
#game-world[_ngcontent-ng-c3920300209] {
  position: relative;
  overflow: hidden;
}
#projectile-layer[_ngcontent-ng-c3920300209] {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
app-player[_ngcontent-ng-c3920300209], 
#projectile-layer[_ngcontent-ng-c3920300209] {
  position: relative;
  z-index: 10;
}
app-enemy[_ngcontent-ng-c3920300209] {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
}
.wave-tracker[_ngcontent-ng-c3920300209] {
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: baseline;
  gap: 14px;
  padding: 8px 18px;
  border: 1px solid rgba(216, 210, 184, 0.28);
  border-radius: 999px;
  background: rgba(12, 10, 9, 0.62);
  font-family:
    "IM FELL English",
    Georgia,
    serif;
  letter-spacing: 0.14em;
  pointer-events: none;
  z-index: 500;
}
.wave-tracker-wave[_ngcontent-ng-c3920300209] {
  font-size: 15px;
  color: #f3e9cf;
}
.wave-tracker-detail[_ngcontent-ng-c3920300209] {
  font-size: 11px;
  color: rgba(243, 233, 207, 0.55);
}
.buff-tray[_ngcontent-ng-c3920300209] {
  position: absolute;
  top: 58px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  max-width: min(520px, 80vw);
  pointer-events: none;
  z-index: 500;
}
.buff-chip[_ngcontent-ng-c3920300209] {
  padding: 5px 12px;
  border: 1px solid rgba(246, 217, 138, 0.45);
  border-radius: 999px;
  background: rgba(12, 10, 9, 0.66);
  font-family:
    "IM FELL English",
    Georgia,
    serif;
  font-size: 11px;
  letter-spacing: 0.1em;
  color: #f6d98a;
}
.buff-chip[_ngcontent-ng-c3920300209]   em[_ngcontent-ng-c3920300209] {
  margin-left: 6px;
  font-style: normal;
  color: rgba(243, 233, 207, 0.55);
}
.wave-banner[_ngcontent-ng-c3920300209] {
  position: absolute;
  top: 32%;
  left: 50%;
  font-family:
    "IM FELL English",
    Georgia,
    serif;
  font-size: 58px;
  letter-spacing: 0.22em;
  color: #f3e9cf;
  text-shadow: 0 0 24px rgba(0, 0, 0, 0.85);
  pointer-events: none;
  z-index: 500;
  animation: _ngcontent-ng-c3920300209_wave-banner-pulse 1.6s ease-out forwards;
}
@keyframes _ngcontent-ng-c3920300209_wave-banner-pulse {
  0% {
    opacity: 0;
    transform: translate(-50%, 0) scale(0.94);
  }
  25% {
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
  }
  75% {
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -12px) scale(1);
  }
}
/*# sourceMappingURL=/game-world.css.map */</style><style ng-app-id="ng">
.terrain[_ngcontent-ng-c3520477246] {
  position: absolute;
  top: 0;
  left: 0;
  width: 2560px;
  height: 2560px;
  pointer-events: none;
  z-index: 0;
}
.terrain-tile[_ngcontent-ng-c3520477246] {
  position: absolute;
  width: 128px;
  height: 128px;
  background-repeat: no-repeat;
  background-size: 384px 384px;
  -webkit-user-select: none;
  user-select: none;
  pointer-events: none;
  box-sizing: border-box;
}
.debug-info[_ngcontent-ng-c3520477246] {
  position: absolute;
  top: 4px;
  left: 4px;
  padding: 4px 6px;
  font-family: monospace;
  font-size: 12px;
  line-height: 15px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  pointer-events: none;
  z-index: 100;
}
/*# sourceMappingURL=/terrain.css.map */</style><style ng-app-id="ng">
[_nghost-ng-c2177329525] {
  display: block;
}
.player-card[_ngcontent-ng-c2177329525] {
  display: block;
  width: fit-content;
  min-width: 310px;
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  color: white;
  font-family:
    Garamond,
    Georgia,
    serif;
  cursor: pointer;
}
.player-details[_ngcontent-ng-c2177329525] {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 78px;
  padding: 9px 12px 9px 10px;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 17px;
  background: rgba(20, 20, 20, 0.85);
  transition:
    transform 180ms ease,
    background-color 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease;
}
.player-avatar[_ngcontent-ng-c2177329525] {
  position: relative;
  z-index: 2;
  flex: 0 0 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border: 1px solid rgb(66, 66, 66);
  border-radius: 50%;
  background: #ffffff;
  font-size: 28px;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.37);
  transition: transform 180ms ease, box-shadow 180ms ease;
}
.player-info[_ngcontent-ng-c2177329525] {
  flex: 1 1 auto;
  min-width: 0;
  margin-left: 14px;
  margin-right: 10px;
}
.player-name[_ngcontent-ng-c2177329525] {
  margin: 5px;
  color: #ffffff;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.15;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.player-level[_ngcontent-ng-c2177329525] {
  margin: 3px 0 7px;
  color: rgba(255, 255, 255, 0.55);
  font-size: 14px;
  line-height: 1;
}
.xp-bar[_ngcontent-ng-c2177329525] {
  width: 100%;
  height: 5px;
  overflow: hidden;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
}
.xp-fill[_ngcontent-ng-c2177329525] {
  height: 100%;
  border-radius: inherit;
  background: #5588f7;
  transition: width 400ms ease;
}
.world-level[_ngcontent-ng-c2177329525] {
  position: relative;
  flex: 0 0 52px;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  transition: transform 180ms ease, filter 180ms ease;
}
.world-star[_ngcontent-ng-c2177329525] {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 52px;
  height: 52px;
  display: block;
  transform: translate(-50%, -50%);
  overflow: visible;
  pointer-events: none;
}
.world-point[_ngcontent-ng-c2177329525] {
  fill: #ffffff;
  filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5));
  transform-origin: center;
  transition: transform 180ms ease, filter 180ms ease;
}
.world-star-shape[_ngcontent-ng-c2177329525] {
  fill: #ffffff;
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.45));
  transform-origin: 50% 50%;
  transition: transform 180ms ease, filter 180ms ease;
}
.world-level-number[_ngcontent-ng-c2177329525] {
  position: relative;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  font-family:
    Garamond,
    Georgia,
    serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  pointer-events: none;
}
.player-card[_ngcontent-ng-c2177329525]:hover   .world-level[_ngcontent-ng-c2177329525] {
  transform: scale(1.08);
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.25));
}
.player-card[_ngcontent-ng-c2177329525]:hover   .world-star-shape[_ngcontent-ng-c2177329525] {
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 11px rgba(255, 255, 255, 0.4));
  transform: scale(1.05);
}
.player-card[_ngcontent-ng-c2177329525]:hover   .world-point[_ngcontent-ng-c2177329525] {
  fill: #ffffff;
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.9));
  transform: scale(1.2);
}
.player-card[_ngcontent-ng-c2177329525]:active   .world-level[_ngcontent-ng-c2177329525] {
  transform: scale(0.94);
}
.player-card[_ngcontent-ng-c2177329525]:hover   .player-details[_ngcontent-ng-c2177329525] {
  transform: scale(1.045);
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(30, 30, 30, 0.9);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.08), 0 0 24px rgba(255, 255, 255, 0.04);
}
.player-card[_ngcontent-ng-c2177329525]:hover   .player-avatar[_ngcontent-ng-c2177329525] {
  transform: scale(1.06);
  box-shadow: 0 0 18px rgba(255, 255, 255, 0.45), 0 0 30px rgba(255, 255, 255, 0.18);
}
.player-card[_ngcontent-ng-c2177329525]:active   .player-details[_ngcontent-ng-c2177329525] {
  transform: scale(0.97);
}
.player-card[_ngcontent-ng-c2177329525]:active   .player-avatar[_ngcontent-ng-c2177329525] {
  transform: scale(0.98);
}
.player-card[_ngcontent-ng-c2177329525]:focus-visible {
  outline: none;
}
.player-card[_ngcontent-ng-c2177329525]:focus-visible   .player-details[_ngcontent-ng-c2177329525] {
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.08);
}
@media (prefers-reduced-motion: reduce) {
  .player-details[_ngcontent-ng-c2177329525], 
   .player-avatar[_ngcontent-ng-c2177329525], 
   .world-level[_ngcontent-ng-c2177329525], 
   .world-star-shape[_ngcontent-ng-c2177329525], 
   .world-level-number[_ngcontent-ng-c2177329525] {
    transition: none;
  }
  .player-card[_ngcontent-ng-c2177329525]:hover   .player-details[_ngcontent-ng-c2177329525], 
   .player-card[_ngcontent-ng-c2177329525]:hover   .player-avatar[_ngcontent-ng-c2177329525], 
   .player-card[_ngcontent-ng-c2177329525]:hover   .world-level[_ngcontent-ng-c2177329525], 
   .player-card[_ngcontent-ng-c2177329525]:hover   .world-star-shape[_ngcontent-ng-c2177329525] {
    transform: none;
  }
}
/*# sourceMappingURL=/player-info-bnt.css.map */</style><style ng-app-id="ng">
.inventory-bnt[_ngcontent-ng-c3443742977] {
  position: relative;
  display: flex;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: transparent;
  box-shadow: inset 0 0 12px rgba(255, 255, 255, 0.25);
  cursor: pointer;
}
.inventory-bnt[_ngcontent-ng-c3443742977]   img[_ngcontent-ng-c3443742977] {
  width: 40px;
  height: 40px;
}
/*# sourceMappingURL=/inventory-button.css.map */</style><style ng-app-id="ng">
.currency-control[_ngcontent-ng-c468370764] {
  display: flex;
  align-items: stretch;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 12px;
  background: rgba(10, 10, 14, 0.72);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  overflow: hidden;
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease;
}
.currency-shop-btn[_ngcontent-ng-c468370764] {
  position: relative;
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 112px;
  height: 44px;
  padding: 0 13px 0 8px;
  border: 0;
  background: transparent;
  color: #fff;
  cursor: pointer;
  overflow: visible;
  transition: background 180ms ease, transform 180ms ease;
}
.currency-control[_ngcontent-ng-c468370764]:has(.currency-shop-btn:hover) {
  transform: scale(1.045);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.08), 0 0 24px rgba(255, 255, 255, 0.04);
}
.currency-shop-btn[_ngcontent-ng-c468370764]:hover {
  background: rgba(255, 255, 255, 0.045);
}
.currency-star-system[_ngcontent-ng-c468370764] {
  flex: 0 0 38px;
  width: 38px;
  height: 38px;
  display: block;
  overflow: visible;
  pointer-events: none;
}
.currency-orbit-system[_ngcontent-ng-c468370764] {
  transform-origin: 22px 22px;
  transform: rotate(-20deg);
}
.currency-orbit[_ngcontent-ng-c468370764] {
  fill: none;
  stroke: rgba(255, 255, 255, 0.32);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
  opacity: 0.45;
  transition: opacity 180ms ease, stroke 180ms ease;
}
.currency-orbit-path[_ngcontent-ng-c468370764] {
  fill: none;
  stroke: none;
  opacity: 0;
  pointer-events: none;
}
.currency-companion[_ngcontent-ng-c468370764] {
  fill: #fff;
  opacity: 0.8;
  filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.9));
  pointer-events: none;
}
.currency-star[_ngcontent-ng-c468370764] {
  fill: rgba(255, 255, 255, 0.9);
  transform-origin: 22px 22px;
  filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.45));
  transition:
    fill 180ms ease,
    filter 180ms ease,
    transform 180ms ease;
}
.currency-shop-btn[_ngcontent-ng-c468370764]:hover   .currency-star[_ngcontent-ng-c468370764] {
  fill: #fff;
  transform: scale(1.08);
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 9px rgba(255, 255, 255, 0.35));
}
.currency-shop-btn[_ngcontent-ng-c468370764]:hover   .currency-orbit[_ngcontent-ng-c468370764] {
  opacity: 0.8;
  stroke: rgba(255, 255, 255, 0.55);
}
.currency-amount[_ngcontent-ng-c468370764] {
  position: relative;
  font-family: inherit;
  font-size: 15px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.03em;
  color: rgba(255, 255, 255, 0.92);
  white-space: nowrap;
  transition: color 180ms ease, text-shadow 180ms ease;
}
.currency-shop-btn[_ngcontent-ng-c468370764]:hover   .currency-amount[_ngcontent-ng-c468370764] {
  color: #fff;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
}
.currency-add-btn[_ngcontent-ng-c468370764] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 44px;
  padding: 0;
  border: 0;
  border-left: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.025);
  color: rgba(255, 255, 255, 0.55);
  cursor: pointer;
  transition:
    background 160ms ease,
    color 160ms ease,
    border-color 160ms ease;
}
.currency-add-btn[_ngcontent-ng-c468370764]   span[_ngcontent-ng-c468370764] {
  display: block;
  font-size: 20px;
  font-weight: 300;
  line-height: 1;
  transform: translateY(-1px);
  transition: transform 160ms ease, color 160ms ease;
}
.currency-add-btn[_ngcontent-ng-c468370764]:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border-left-color: rgba(255, 255, 255, 0.2);
}
.currency-add-btn[_ngcontent-ng-c468370764]:hover   span[_ngcontent-ng-c468370764] {
  transform: translateY(-1px) scale(1.15);
  color: #fff;
}
.currency-shop-btn[_ngcontent-ng-c468370764]:active {
  transform: scale(0.97);
}
.currency-add-btn[_ngcontent-ng-c468370764]:active {
  transform: scale(0.94);
}
.currency-shop-btn[_ngcontent-ng-c468370764]:focus-visible, 
.currency-add-btn[_ngcontent-ng-c468370764]:focus-visible {
  outline: 1px solid rgba(255, 255, 255, 0.65);
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .currency-control[_ngcontent-ng-c468370764], 
   .currency-shop-btn[_ngcontent-ng-c468370764], 
   .currency-star[_ngcontent-ng-c468370764], 
   .currency-orbit[_ngcontent-ng-c468370764], 
   .currency-amount[_ngcontent-ng-c468370764], 
   .currency-add-btn[_ngcontent-ng-c468370764], 
   .currency-add-btn[_ngcontent-ng-c468370764]   span[_ngcontent-ng-c468370764] {
    transition: none;
  }
  .currency-companion[_ngcontent-ng-c468370764] {
    opacity: 0;
  }
}
/*# sourceMappingURL=/shop-button.css.map */</style><style ng-app-id="ng">
.mini-map-wrapper[_ngcontent-ng-c1778240528] {
  position: relative;
  width: 160px;
  height: 160px;
  flex-shrink: 0;
}
.mini-map[_ngcontent-ng-c1778240528] {
  position: relative;
  width: 160px;
  height: 160px;
  box-sizing: border-box;
  background:
    radial-gradient(
      circle at center,
      rgba(35, 35, 42, 0.72) 0%,
      rgba(10, 10, 14, 0.88) 75%,
      rgba(5, 5, 8, 0.94) 100%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.42);
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35), inset 0 0 20px rgba(255, 255, 255, 0.025);
  overflow: hidden;
  z-index: 1;
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease;
}
.mini-map[_ngcontent-ng-c1778240528]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background:
    radial-gradient(
      circle at center,
      transparent 35%,
      rgba(255, 255, 255, 0.025) 70%,
      rgba(0, 0, 0, 0.12) 100%);
  pointer-events: none;
  z-index: 1;
}
.mini-map[_ngcontent-ng-c1778240528]:hover {
  transform: scale(1.025);
  border-color: rgba(255, 255, 255, 0.65);
  box-shadow:
    0 0 10px rgba(255, 255, 255, 0.08),
    0 0 24px rgba(255, 255, 255, 0.04),
    0 10px 25px rgba(0, 0, 0, 0.42),
    inset 0 0 20px rgba(255, 255, 255, 0.035);
}
.map-star[_ngcontent-ng-c1778240528] {
  position: absolute;
  width: 11px;
  height: 11px;
  fill: rgba(255, 255, 255, 0.9);
  z-index: 8;
  pointer-events: none;
  filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.55));
  transition:
    fill 180ms ease,
    filter 180ms ease,
    transform 180ms ease;
}
.map-star-north[_ngcontent-ng-c1778240528] {
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
}
.map-star-east[_ngcontent-ng-c1778240528] {
  top: 50%;
  right: -5px;
  transform: translateY(-50%);
}
.map-star-south[_ngcontent-ng-c1778240528] {
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
}
.map-star-west[_ngcontent-ng-c1778240528] {
  top: 50%;
  left: -5px;
  transform: translateY(-50%);
}
.mini-map[_ngcontent-ng-c1778240528]:hover   .map-star[_ngcontent-ng-c1778240528] {
  fill: #fff;
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.85));
}
.linha-radar[_ngcontent-ng-c1778240528] {
  position: absolute;
  left: 50%;
  top: 50%;
  background: rgba(216, 194, 173, 0.22);
  pointer-events: none;
  z-index: 3;
}
.horizontal[_ngcontent-ng-c1778240528] {
  width: 100%;
  height: 1px;
  transform: translate(-50%, -50%);
}
.vertical[_ngcontent-ng-c1778240528] {
  width: 1px;
  height: 100%;
  transform: translate(-50%, -50%);
}
.radar[_ngcontent-ng-c1778240528] {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(216, 194, 173, 0.28);
  border-radius: 50%;
  pointer-events: none;
  z-index: 3;
}
.radar-1[_ngcontent-ng-c1778240528] {
  width: 65%;
  height: 65%;
}
.radar-2[_ngcontent-ng-c1778240528] {
  width: 35%;
  height: 35%;
}
.mini-map[_ngcontent-ng-c1778240528]::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 4px;
  height: 4px;
  transform: translate(-50%, -50%);
  background: rgba(216, 194, 173, 0.65);
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(216, 194, 173, 0.4);
  pointer-events: none;
  z-index: 4;
}
.player-marker[_ngcontent-ng-c1778240528] {
  position: absolute;
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  background: #5dbb63;
  border: 2px solid rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  filter: drop-shadow(0 0 4px rgba(93, 187, 99, 0.9)) drop-shadow(0 0 8px rgba(93, 187, 99, 0.35));
  transition: transform 120ms ease, filter 180ms ease;
}
.player-marker[_ngcontent-ng-c1778240528]::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 18px;
  height: 18px;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(93, 187, 99, 0.45);
  border-radius: 50%;
  pointer-events: none;
  animation: _ngcontent-ng-c1778240528_playerPulse 2s ease-out infinite;
}
@keyframes _ngcontent-ng-c1778240528_playerPulse {
  0% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(0.65);
  }
  70% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.5);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.5);
  }
}
.mini-map[_ngcontent-ng-c1778240528]:hover   .player-marker[_ngcontent-ng-c1778240528] {
  transform: translate(-50%, -50%) scale(1.12);
  filter: drop-shadow(0 0 5px rgba(93, 187, 99, 1)) drop-shadow(0 0 10px rgba(93, 187, 99, 0.4));
}
.enemy-marker[_ngcontent-ng-c1778240528] {
  position: absolute;
  width: 10px;
  height: 10px;
  box-sizing: border-box;
  background: #e53935;
  border: 2px solid rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 9;
  box-shadow: 0 0 5px rgba(229, 57, 53, 0.85), 0 0 10px rgba(229, 57, 53, 0.3);
  transition:
    transform 120ms ease,
    opacity 180ms ease,
    filter 180ms ease;
}
.mini-map[_ngcontent-ng-c1778240528]:hover   .enemy-marker[_ngcontent-ng-c1778240528] {
  transform: translate(-50%, -50%) scale(1.08);
  filter: drop-shadow(0 0 5px rgba(229, 57, 53, 0.95));
}
.mini-map[_ngcontent-ng-c1778240528]:active {
  transform: scale(0.99);
}
.mini-map[_ngcontent-ng-c1778240528]:focus-visible {
  outline: 1px solid rgba(255, 255, 255, 0.65);
  outline-offset: 3px;
}
@media (prefers-reduced-motion: reduce) {
  .mini-map[_ngcontent-ng-c1778240528], 
   .map-star[_ngcontent-ng-c1778240528], 
   .player-marker[_ngcontent-ng-c1778240528], 
   .enemy-marker[_ngcontent-ng-c1778240528] {
    transition: none;
  }
  .player-marker[_ngcontent-ng-c1778240528]::after {
    animation: none;
  }
}
@media (max-width: 600px) {
  .mini-map-wrapper[_ngcontent-ng-c1778240528] {
    width: 140px;
    height: 140px;
  }
  .mini-map[_ngcontent-ng-c1778240528] {
    width: 140px;
    height: 140px;
  }
  .map-star[_ngcontent-ng-c1778240528] {
    width: 10px;
    height: 10px;
  }
}
/*# sourceMappingURL=/mini-map.css.map */</style><style ng-app-id="ng">
#attack-btn[_ngcontent-ng-c1204104698] {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 999%;
  height: 200px;
  width: 200px;
  right: 30px;
  bottom: 30px;
}
#skill1-btn[_ngcontent-ng-c1204104698] {
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 999%;
  height: 150px;
  width: 150px;
  right: 30px;
  bottom: 250px;
}
#skill2-btn[_ngcontent-ng-c1204104698] {
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 999%;
  height: 125px;
  width: 125px;
  right: 200px;
  bottom: 195px;
}
#skill3-btn[_ngcontent-ng-c1204104698] {
  position: fixed;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 999%;
  height: 100px;
  width: 100px;
  right: 265px;
  bottom: 50px;
}
#attack-btn[_ngcontent-ng-c1204104698]   img[_ngcontent-ng-c1204104698], 
#skill1-btn[_ngcontent-ng-c1204104698]   img[_ngcontent-ng-c1204104698], 
#skill2-btn[_ngcontent-ng-c1204104698]   img[_ngcontent-ng-c1204104698], 
#skill3-btn[_ngcontent-ng-c1204104698]   img[_ngcontent-ng-c1204104698] {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  opacity: 0.6;
}
#attack-btn[_ngcontent-ng-c1204104698]   span[_ngcontent-ng-c1204104698] {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: antiquewhite;
}
#skill1-btn[_ngcontent-ng-c1204104698]   span[_ngcontent-ng-c1204104698] {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  color: antiquewhite;
}
#skill2-btn[_ngcontent-ng-c1204104698]   span[_ngcontent-ng-c1204104698] {
  position: absolute;
  right: 35px;
  bottom: 15px;
  color: antiquewhite;
}
#skill3-btn[_ngcontent-ng-c1204104698]   span[_ngcontent-ng-c1204104698] {
  position: absolute;
  right: 25px;
  bottom: 15px;
  color: antiquewhite;
}
#attack-btn[_ngcontent-ng-c1204104698], 
#skill1-btn[_ngcontent-ng-c1204104698], 
#skill2-btn[_ngcontent-ng-c1204104698], 
#skill3-btn[_ngcontent-ng-c1204104698] {
  transition: filter 0.1s ease, transform 0.1s ease;
}
#attack-btn.active[_ngcontent-ng-c1204104698] {
  background: yellow;
  transform: scale(0.95);
}
#skill1-btn.active[_ngcontent-ng-c1204104698] {
  background: teal;
  transform: scale(0.95);
}
#skill2-btn.active[_ngcontent-ng-c1204104698] {
  background: purple;
  transform: scale(1.05);
}
#skill3-btn.active[_ngcontent-ng-c1204104698] {
  background: whitesmoke;
  transform: scale(1.05);
}
/*# sourceMappingURL=/action-bar.css.map */</style><style ng-app-id="ng">
.Settings-btn[_ngcontent-ng-c1226894155] {
  background: rgba(0, 0, 0, 0.589);
  border-radius: 50%;
  transition: background 180ms ease, transform 180ms ease;
}
.Settings-btn[_ngcontent-ng-c1226894155]:hover {
  background: rgba(255, 255, 255, 0.432);
  border-radius: 50%;
  transform: scale(1.1);
}
/*# sourceMappingURL=/settings-button.css.map */</style></head>
<body><!--nghm--><script type="text/javascript" id="ng-event-dispatch-contract">(()=>{function p(t,n,r,o,e,i,f,m){return{eventType:t,event:n,targetElement:r,eic:o,timeStamp:e,eia:i,eirp:f,eiack:m}}function u(t){let n=[],r=e=>{n.push(e)};return{c:t,q:n,et:[],etc:[],d:r,h:e=>{r(p(e.type,e,e.target,t,Date.now()))}}}function s(t,n,r){for(let o=0;o<n.length;o++){let e=n[o];(r?t.etc:t.et).push(e),t.c.addEventListener(e,t.h,r)}}function c(t,n,r,o,e=window){let i=u(t);e._ejsas||(e._ejsas={}),e._ejsas[n]=i,s(i,r),s(i,o,!0)}window.__jsaction_bootstrap=c;})();
</script><script>window.__jsaction_bootstrap(document.body,"ng",["keydown","mousedown","mouseup","click"],[]);</script>
  <app-root ng-version="22.1.3" ngh="6" ng-server-context="ssg"><router-outlet></router-outlet><app-game-shell _nghost-ng-c364297699="" ngh="5"><div _ngcontent-ng-c364297699="" class="relative min-h-screen w-full"><app-game-world _ngcontent-ng-c364297699="" _nghost-ng-c3920300209="" ngh="2"><div _ngcontent-ng-c3920300209="" id="game-world" class="relative h-screen w-full overflow-hidden bg-green-900" jsaction="mousedown:;mouseup:;"><div _ngcontent-ng-c3920300209="" id="world-layer" class="absolute left-0 top-0" style="transform: translate(0px, 0px);"><app-terrain _ngcontent-ng-c3920300209="" _nghost-ng-c3520477246="" ngh="0"><div _ngcontent-ng-c3520477246="" class="terrain"><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 0px; top: 0px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 128px; top: 0px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 256px; top: 0px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 384px; top: 0px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 512px; top: 0px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 640px; top: 0px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 768px; top: 0px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 896px; top: 0px; background-image: url(/gassets/floors/grass.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1024px; top: 0px; background-image: url(/gassets/floors/dirt.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1152px; top: 0px; background-image: url(/gassets/floors/dirt.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1280px; top: 0px; background-image: url(/gassets/floors/dirt.png); background-position: -128px -256px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1408px; top: 0px; background-image: url(/gassets/floors/dirt.png); background-position: -256px -256px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1536px; top: 0px; background-image: url(/gassets/floors/grass.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1664px; top: 0px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1792px; top: 0px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1920px; top: 0px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2048px; top: 0px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2176px; top: 0px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2304px; top: 0px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2432px; top: 0px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><!--container--><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 0px; top: 128px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 128px; top: 128px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 256px; top: 128px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 384px; top: 128px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 512px; top: 128px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 640px; top: 128px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 768px; top: 128px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 896px; top: 128px; background-image: url(/gassets/floors/grass.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1024px; top: 128px; background-image: url(/gassets/floors/dirt.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1152px; top: 128px; background-image: url(/gassets/floors/dirt.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1280px; top: 128px; background-image: url(/gassets/floors/grass.png); background-position: -0px -0px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1408px; top: 128px; background-image: url(/gassets/floors/grass.png); background-position: -128px -0px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1536px; top: 128px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1664px; top: 128px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1792px; top: 128px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1920px; top: 128px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2048px; top: 128px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2176px; top: 128px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2304px; top: 128px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2432px; top: 128px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><!--container--><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 0px; top: 256px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 128px; top: 256px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 256px; top: 256px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 384px; top: 256px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 512px; top: 256px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 640px; top: 256px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 768px; top: 256px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 896px; top: 256px; background-image: url(/gassets/floors/grass.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1024px; top: 256px; background-image: url(/gassets/floors/dirt.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1152px; top: 256px; background-image: url(/gassets/floors/dirt.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1280px; top: 256px; background-image: url(/gassets/floors/grass.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1408px; top: 256px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1536px; top: 256px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1664px; top: 256px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1792px; top: 256px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1920px; top: 256px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2048px; top: 256px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2176px; top: 256px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2304px; top: 256px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2432px; top: 256px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><!--container--><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 0px; top: 384px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 128px; top: 384px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 256px; top: 384px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 384px; top: 384px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 512px; top: 384px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 640px; top: 384px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 768px; top: 384px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 896px; top: 384px; background-image: url(/gassets/floors/grass.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1024px; top: 384px; background-image: url(/gassets/floors/dirt.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1152px; top: 384px; background-image: url(/gassets/floors/dirt.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1280px; top: 384px; background-image: url(/gassets/floors/grass.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1408px; top: 384px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1536px; top: 384px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1664px; top: 384px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1792px; top: 384px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1920px; top: 384px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2048px; top: 384px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2176px; top: 384px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2304px; top: 384px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2432px; top: 384px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><!--container--><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 0px; top: 512px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 128px; top: 512px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 256px; top: 512px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 384px; top: 512px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 512px; top: 512px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 640px; top: 512px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 768px; top: 512px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 896px; top: 512px; background-image: url(/gassets/floors/grass.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1024px; top: 512px; background-image: url(/gassets/floors/dirt.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1152px; top: 512px; background-image: url(/gassets/floors/dirt.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1280px; top: 512px; background-image: url(/gassets/floors/grass.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1408px; top: 512px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1536px; top: 512px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1664px; top: 512px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1792px; top: 512px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1920px; top: 512px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2048px; top: 512px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2176px; top: 512px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2304px; top: 512px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2432px; top: 512px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><!--container--><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 0px; top: 640px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 128px; top: 640px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 256px; top: 640px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 384px; top: 640px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 512px; top: 640px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 640px; top: 640px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 768px; top: 640px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 896px; top: 640px; background-image: url(/gassets/floors/grass.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1024px; top: 640px; background-image: url(/gassets/floors/dirt.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1152px; top: 640px; background-image: url(/gassets/floors/dirt.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1280px; top: 640px; background-image: url(/gassets/floors/grass.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1408px; top: 640px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1536px; top: 640px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1664px; top: 640px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1792px; top: 640px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1920px; top: 640px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2048px; top: 640px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2176px; top: 640px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2304px; top: 640px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2432px; top: 640px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><!--container--><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 0px; top: 768px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 128px; top: 768px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 256px; top: 768px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 384px; top: 768px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 512px; top: 768px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 640px; top: 768px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 768px; top: 768px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 896px; top: 768px; background-image: url(/gassets/floors/grass.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1024px; top: 768px; background-image: url(/gassets/floors/dirt.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1152px; top: 768px; background-image: url(/gassets/floors/dirt.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1280px; top: 768px; background-image: url(/gassets/floors/grass.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1408px; top: 768px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1536px; top: 768px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1664px; top: 768px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1792px; top: 768px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1920px; top: 768px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2048px; top: 768px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2176px; top: 768px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2304px; top: 768px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2432px; top: 768px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><!--container--><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 0px; top: 896px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 128px; top: 896px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 256px; top: 896px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 384px; top: 896px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 512px; top: 896px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 640px; top: 896px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 768px; top: 896px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 896px; top: 896px; background-image: url(/gassets/floors/grass.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1024px; top: 896px; background-image: url(/gassets/floors/dirt.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1152px; top: 896px; background-image: url(/gassets/floors/dirt.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1280px; top: 896px; background-image: url(/gassets/floors/grass.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1408px; top: 896px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1536px; top: 896px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1664px; top: 896px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1792px; top: 896px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1920px; top: 896px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2048px; top: 896px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2176px; top: 896px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2304px; top: 896px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2432px; top: 896px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><!--container--><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 0px; top: 1024px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 128px; top: 1024px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 256px; top: 1024px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 384px; top: 1024px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 512px; top: 1024px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 640px; top: 1024px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 768px; top: 1024px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 896px; top: 1024px; background-image: url(/gassets/floors/grass.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1024px; top: 1024px; background-image: url(/gassets/floors/dirt.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1152px; top: 1024px; background-image: url(/gassets/floors/dirt.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1280px; top: 1024px; background-image: url(/gassets/floors/grass.png); background-position: -0px -256px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1408px; top: 1024px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1536px; top: 1024px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1664px; top: 1024px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1792px; top: 1024px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1920px; top: 1024px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2048px; top: 1024px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2176px; top: 1024px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2304px; top: 1024px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2432px; top: 1024px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><!--container--><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 0px; top: 1152px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 128px; top: 1152px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 256px; top: 1152px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 384px; top: 1152px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 512px; top: 1152px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 640px; top: 1152px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 768px; top: 1152px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 896px; top: 1152px; background-image: url(/gassets/floors/grass.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1024px; top: 1152px; background-image: url(/gassets/floors/dirt.png); background-position: -0px -256px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1152px; top: 1152px; background-image: url(/gassets/floors/dirt.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1280px; top: 1152px; background-image: url(/gassets/floors/dirt.png); background-position: -256px -0px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1408px; top: 1152px; background-image: url(/gassets/floors/grass.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1536px; top: 1152px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1664px; top: 1152px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1792px; top: 1152px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1920px; top: 1152px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2048px; top: 1152px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2176px; top: 1152px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2304px; top: 1152px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2432px; top: 1152px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><!--container--><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 0px; top: 1280px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 128px; top: 1280px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 256px; top: 1280px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 384px; top: 1280px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 512px; top: 1280px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 640px; top: 1280px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 768px; top: 1280px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 896px; top: 1280px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1024px; top: 1280px; background-image: url(/gassets/floors/grass.png); background-position: -256px -0px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1152px; top: 1280px; background-image: url(/gassets/floors/dirt.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1280px; top: 1280px; background-image: url(/gassets/floors/dirt.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1408px; top: 1280px; background-image: url(/gassets/floors/grass.png); background-position: -0px -256px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1536px; top: 1280px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1664px; top: 1280px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1792px; top: 1280px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1920px; top: 1280px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2048px; top: 1280px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2176px; top: 1280px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2304px; top: 1280px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2432px; top: 1280px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><!--container--><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 0px; top: 1408px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 128px; top: 1408px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 256px; top: 1408px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 384px; top: 1408px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 512px; top: 1408px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 640px; top: 1408px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 768px; top: 1408px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 896px; top: 1408px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1024px; top: 1408px; background-image: url(/gassets/floors/grass.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1152px; top: 1408px; background-image: url(/gassets/floors/dirt.png); background-position: -0px -256px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1280px; top: 1408px; background-image: url(/gassets/floors/dirt.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1408px; top: 1408px; background-image: url(/gassets/floors/dirt.png); background-position: -256px -0px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1536px; top: 1408px; background-image: url(/gassets/floors/grass.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1664px; top: 1408px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1792px; top: 1408px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1920px; top: 1408px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2048px; top: 1408px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2176px; top: 1408px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2304px; top: 1408px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2432px; top: 1408px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><!--container--><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 0px; top: 1536px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 128px; top: 1536px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 256px; top: 1536px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 384px; top: 1536px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 512px; top: 1536px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 640px; top: 1536px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 768px; top: 1536px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 896px; top: 1536px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1024px; top: 1536px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1152px; top: 1536px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1280px; top: 1536px; background-image: url(/gassets/floors/dirt.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1408px; top: 1536px; background-image: url(/gassets/floors/dirt.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1536px; top: 1536px; background-image: url(/gassets/floors/grass.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1664px; top: 1536px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1792px; top: 1536px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1920px; top: 1536px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2048px; top: 1536px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2176px; top: 1536px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2304px; top: 1536px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2432px; top: 1536px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><!--container--><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 0px; top: 1664px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 128px; top: 1664px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 256px; top: 1664px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 384px; top: 1664px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 512px; top: 1664px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 640px; top: 1664px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 768px; top: 1664px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 896px; top: 1664px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1024px; top: 1664px; background-image: url(/gassets/floors/grass.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1152px; top: 1664px; background-image: url(/gassets/floors/dirt.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1280px; top: 1664px; background-image: url(/gassets/floors/dirt.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1408px; top: 1664px; background-image: url(/gassets/floors/dirt.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1536px; top: 1664px; background-image: url(/gassets/floors/grass.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1664px; top: 1664px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1792px; top: 1664px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1920px; top: 1664px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2048px; top: 1664px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2176px; top: 1664px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2304px; top: 1664px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2432px; top: 1664px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><!--container--><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 0px; top: 1792px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 128px; top: 1792px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 256px; top: 1792px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 384px; top: 1792px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 512px; top: 1792px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 640px; top: 1792px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 768px; top: 1792px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 896px; top: 1792px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1024px; top: 1792px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1152px; top: 1792px; background-image: url(/gassets/floors/grass.png); background-position: -256px -0px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1280px; top: 1792px; background-image: url(/gassets/floors/dirt.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1408px; top: 1792px; background-image: url(/gassets/floors/dirt.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1536px; top: 1792px; background-image: url(/gassets/floors/grass.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1664px; top: 1792px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1792px; top: 1792px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1920px; top: 1792px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2048px; top: 1792px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2176px; top: 1792px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2304px; top: 1792px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2432px; top: 1792px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><!--container--><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 0px; top: 1920px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 128px; top: 1920px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 256px; top: 1920px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 384px; top: 1920px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 512px; top: 1920px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 640px; top: 1920px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 768px; top: 1920px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 896px; top: 1920px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1024px; top: 1920px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1152px; top: 1920px; background-image: url(/gassets/floors/grass.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1280px; top: 1920px; background-image: url(/gassets/floors/dirt.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1408px; top: 1920px; background-image: url(/gassets/floors/dirt.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1536px; top: 1920px; background-image: url(/gassets/floors/grass.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1664px; top: 1920px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1792px; top: 1920px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1920px; top: 1920px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2048px; top: 1920px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2176px; top: 1920px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2304px; top: 1920px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2432px; top: 1920px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><!--container--><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 0px; top: 2048px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 128px; top: 2048px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 256px; top: 2048px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 384px; top: 2048px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 512px; top: 2048px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 640px; top: 2048px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 768px; top: 2048px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 896px; top: 2048px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1024px; top: 2048px; background-image: url(/gassets/floors/grass.png); background-position: -128px -256px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1152px; top: 2048px; background-image: url(/gassets/floors/grass.png); background-position: -256px -256px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1280px; top: 2048px; background-image: url(/gassets/floors/dirt.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1408px; top: 2048px; background-image: url(/gassets/floors/dirt.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1536px; top: 2048px; background-image: url(/gassets/floors/grass.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1664px; top: 2048px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1792px; top: 2048px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1920px; top: 2048px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2048px; top: 2048px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2176px; top: 2048px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2304px; top: 2048px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2432px; top: 2048px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><!--container--><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 0px; top: 2176px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 128px; top: 2176px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 256px; top: 2176px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 384px; top: 2176px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 512px; top: 2176px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 640px; top: 2176px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 768px; top: 2176px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 896px; top: 2176px; background-image: url(/gassets/floors/grass.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1024px; top: 2176px; background-image: url(/gassets/floors/dirt.png); background-position: -0px -0px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1152px; top: 2176px; background-image: url(/gassets/floors/dirt.png); background-position: -128px -0px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1280px; top: 2176px; background-image: url(/gassets/floors/dirt.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1408px; top: 2176px; background-image: url(/gassets/floors/dirt.png); background-position: -256px -256px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1536px; top: 2176px; background-image: url(/gassets/floors/grass.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1664px; top: 2176px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1792px; top: 2176px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1920px; top: 2176px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2048px; top: 2176px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2176px; top: 2176px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2304px; top: 2176px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2432px; top: 2176px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><!--container--><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 0px; top: 2304px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 128px; top: 2304px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 256px; top: 2304px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 384px; top: 2304px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 512px; top: 2304px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 640px; top: 2304px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 768px; top: 2304px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 896px; top: 2304px; background-image: url(/gassets/floors/grass.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1024px; top: 2304px; background-image: url(/gassets/floors/dirt.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1152px; top: 2304px; background-image: url(/gassets/floors/dirt.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1280px; top: 2304px; background-image: url(/gassets/floors/dirt.png); background-position: -256px -256px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1408px; top: 2304px; background-image: url(/gassets/floors/grass.png); background-position: -0px -0px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1536px; top: 2304px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1664px; top: 2304px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1792px; top: 2304px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1920px; top: 2304px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2048px; top: 2304px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2176px; top: 2304px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2304px; top: 2304px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2432px; top: 2304px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><!--container--><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 0px; top: 2432px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 128px; top: 2432px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 256px; top: 2432px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 384px; top: 2432px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 512px; top: 2432px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 640px; top: 2432px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 768px; top: 2432px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 896px; top: 2432px; background-image: url(/gassets/floors/grass.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1024px; top: 2432px; background-image: url(/gassets/floors/dirt.png); background-position: -0px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1152px; top: 2432px; background-image: url(/gassets/floors/dirt.png); background-position: -256px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1280px; top: 2432px; background-image: url(/gassets/floors/grass.png); background-position: -0px -0px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1408px; top: 2432px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1536px; top: 2432px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1664px; top: 2432px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1792px; top: 2432px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 1920px; top: 2432px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2048px; top: 2432px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2176px; top: 2432px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2304px; top: 2432px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><div _ngcontent-ng-c3520477246="" class="terrain-tile" style="left: 2432px; top: 2432px; background-image: url(/gassets/floors/grass.png); background-position: -128px -128px;"><!--container--></div><!--container--><!--container--></div></app-terrain><app-player _ngcontent-ng-c3920300209="" ngh="1"><div id="player" class="absolute"><div id="player-health-container" class="absolute bottom-full left-1/2 mb-3 h-2 w-10 -translate-x-1/2 overflow-hidden rounded-full bg-black/50"><div id="player-health-bar" class="h-full bg-red-500" style="width: 100%;"></div></div><div id="stamina-container" class="absolute bottom-full left-1/2 mb-1 hidden h-2 w-10 -translate-x-1/2 overflow-hidden rounded-full bg-black/50"><div id="stamina-bar" class="h-full bg-yellow-400" style="width: 100%;"></div></div><div id="player-character" class="h-10 w-10 rounded bg-red-500"></div></div></app-player><div _ngcontent-ng-c3920300209="" id="projectile-layer" class="pointer-events-none absolute inset-0"></div><!--container--></div><div _ngcontent-ng-c3920300209="" class="wave-tracker"><span _ngcontent-ng-c3920300209="" class="wave-tracker-wave"> WAVE 1 / 6 </span><span _ngcontent-ng-c3920300209="" class="wave-tracker-detail"> 0 LEFT </span><span _ngcontent-ng-c3920300209="" class="wave-tracker-detail"> 0 PTS </span></div><!--container--><!--container--><!--container--><!--container--></div></app-game-world><app-hud _ngcontent-ng-c364297699="" ngh="1"><div class="pointer-events-none absolute inset-0"><div class="pointer-events-auto absolute left-6 top-10"><app-player-info-bnt _nghost-ng-c2177329525="" ngh="3"><button _ngcontent-ng-c2177329525="" type="button" class="player-card" jsaction="click:;"><div _ngcontent-ng-c2177329525="" class="player-details"><div _ngcontent-ng-c2177329525="" class="player-avatar"> 👤 </div><div _ngcontent-ng-c2177329525="" class="player-info"><p _ngcontent-ng-c2177329525="" class="player-name"> Player </p><div _ngcontent-ng-c2177329525="" class="xp-bar"><div _ngcontent-ng-c2177329525="" class="xp-fill" style="width: 0%;"></div></div></div><div _ngcontent-ng-c2177329525="" class="world-level"><svg _ngcontent-ng-c2177329525="" viewBox="0 0 100 100" aria-hidden="true" class="world-star"><circle _ngcontent-ng-c2177329525="" class="world-point" cx="50" cy="15" r="3"></circle><!--ng-container--><!--container--><!--container--><!--container--></svg></div></div></button></app-player-info-bnt></div><div class="pointer-events-auto absolute right-6 top-10 flex items-center gap-3"><app-inventory-button _nghost-ng-c3443742977="" ngh="1"><button _ngcontent-ng-c3443742977="" aria-label="Open inventory" class="inventory-bnt" jsaction="mousedown:;click:;"><img _ngcontent-ng-c3443742977="" src="icons/Inventory.png" alt="Inventory Button"></button></app-inventory-button><app-shop-button _nghost-ng-c468370764="" ngh="1"><div _ngcontent-ng-c468370764="" class="currency-control"><button _ngcontent-ng-c468370764="" type="button" routerlink="/shop" aria-label="Abrir loja" class="currency-shop-btn" tabindex="0" jsaction="click:;"><svg _ngcontent-ng-c468370764="" viewBox="0 0 44 44" aria-hidden="true" class="currency-star-system"><g _ngcontent-ng-c468370764="" class="currency-orbit-system"><ellipse _ngcontent-ng-c468370764="" cx="22" cy="22" rx="19" ry="10" class="currency-orbit"></ellipse><path _ngcontent-ng-c468370764="" d="
                        M 41,22
                        A 19,10 0 1,1 3,22
                        A 19,10 0 1,1 41,22
                    " class="currency-orbit-path"></path><circle _ngcontent-ng-c468370764="" cx="0" cy="0" r="2" class="currency-companion"><animateMotion _ngcontent-ng-c468370764="" dur="3s" repeatCount="indefinite" rotate="0" path="
                            M 41,22
                            A 19,10 0 1,1 3,22
                            A 19,10 0 1,1 41,22
                        "></animateMotion></circle></g><path _ngcontent-ng-c468370764="" d="
        M 22,3

        C 22.8,9
          23.8,15
          26.5,18.5

        C 30,20
          35,21
          41,22

        C 35,23
          30,24
          26.5,25.5

        C 23.8,29
          22.8,35
          22,41

        C 21.2,35
          20.2,29
          17.5,25.5

        C 14,24
          9,23
          3,22

        C 9,21
          14,20
          17.5,18.5

        C 20.2,15
          21.2,9
          22,3

        Z
    " class="currency-star"></path></svg><span _ngcontent-ng-c468370764="" class="currency-amount"> 1,250 </span></button><button _ngcontent-ng-c468370764="" type="button" aria-label="Obter mais moedas" class="currency-add-btn"><span _ngcontent-ng-c468370764="">+</span></button></div></app-shop-button></div><div class="pointer-events-auto absolute left-6 top-35"><app-task-panel ngh="1"><div class="w-64 rounded-2xl bg-amber-900 p-4"><h2 class="mb-3 font-bold text-white"> Tasks </h2><div class="space-y-2"><button class="flex w-full items-center justify-between rounded-xl bg-black/20 p-2 text-left text-white"><span>💧 Drink Water</span><span class="text-sm">+20</span></button><button class="flex w-full items-center justify-between rounded-xl bg-black/20 p-2 text-left text-white"><span>📚 Study</span><span class="text-sm">+100</span></button><button class="flex w-full items-center justify-between rounded-xl bg-black/20 p-2 text-left text-white"><span>🏃 Exercise</span><span class="text-sm">+50</span></button></div></div></app-task-panel></div><div class="pointer-events-auto absolute right-6 top-35"><app-mini-map _nghost-ng-c1778240528="" ngh="4"><div _ngcontent-ng-c1778240528="" class="mini-map-wrapper"><svg _ngcontent-ng-c1778240528="" viewBox="0 0 20 20" aria-hidden="true" class="map-star map-star-north"><path _ngcontent-ng-c1778240528="" d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z"></path></svg><svg _ngcontent-ng-c1778240528="" viewBox="0 0 20 20" aria-hidden="true" class="map-star map-star-east"><path _ngcontent-ng-c1778240528="" d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z"></path></svg><svg _ngcontent-ng-c1778240528="" viewBox="0 0 20 20" aria-hidden="true" class="map-star map-star-south"><path _ngcontent-ng-c1778240528="" d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z"></path></svg><svg _ngcontent-ng-c1778240528="" viewBox="0 0 20 20" aria-hidden="true" class="map-star map-star-west"><path _ngcontent-ng-c1778240528="" d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z"></path></svg><div _ngcontent-ng-c1778240528="" class="mini-map"><div _ngcontent-ng-c1778240528="" class="player-marker" style="left: 11.71875%; top: 11.71875%;"></div><!--container--></div></div></app-mini-map></div><div class="pointer-events-auto absolute bottom-6 right-6"><app-action-bar _nghost-ng-c1204104698="" ngh="1"><div _ngcontent-ng-c1204104698="" class="relative h-52 w-52"><button _ngcontent-ng-c1204104698="" id="attack-btn"><img _ngcontent-ng-c1204104698="" src="" alt=""><span _ngcontent-ng-c1204104698="">LMB</span></button><button _ngcontent-ng-c1204104698="" id="skill1-btn"><img _ngcontent-ng-c1204104698="" src="images/9pstar.svg" alt=""><span _ngcontent-ng-c1204104698="">HOLD</span></button><button _ngcontent-ng-c1204104698="" id="skill2-btn"><img _ngcontent-ng-c1204104698="" src="images/6pstar.svg" alt=""><span _ngcontent-ng-c1204104698="">F</span></button><button _ngcontent-ng-c1204104698="" id="skill3-btn"><img _ngcontent-ng-c1204104698="" src="images/4pstar.svg" alt=""><span _ngcontent-ng-c1204104698="">Q</span></button></div></app-action-bar></div><div class="pointer-events-auto absolute bottom-6 left-15 -translate-x-1/2"><app-settings-button _nghost-ng-c1226894155="" ngh="1"><button _ngcontent-ng-c1226894155="" class="Settings-btn" jsaction="mousedown:;click:;"><img _ngcontent-ng-c1226894155="" src="images/gearicn.svg" alt="Settings Button"></button></app-settings-button></div></div></app-hud><!--container--></div></app-game-shell><!--container--></app-root>
<script src="main.js" type="module"></script>

<script id="ng-state" type="application/json">{"__nghData__":[{"t":{"2":"t18"},"c":{"2":[{"i":"t18","r":21,"t":{"1":"t19"},"c":{"1":[{"i":"t19","r":1,"t":{"1":"t20"},"c":{"1":[]},"x":20}]},"x":20}]}},{},{"t":{"6":"t21","7":"t22","8":"t23","9":"t24","10":"t25"},"c":{"6":[],"7":[{"i":"t22","r":1}],"8":[],"9":[],"10":[]}},{"t":{"11":"t26","12":"t27","13":"t28"},"c":{"11":[{"i":"t26","r":2,"e":{"0":1}}],"12":[],"13":[]}},{"t":{"12":"t29"},"c":{"12":[]}},{"t":{"3":"t30"},"c":{"3":[]}},{"c":{"0":[{"i":"c364297699","r":1}]}}]}</script></body></html>`;