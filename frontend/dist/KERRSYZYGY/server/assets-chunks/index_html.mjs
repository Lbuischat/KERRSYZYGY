export default `<!DOCTYPE html><html lang="en"><head>
  <meta charset="utf-8">
  <title>KERRSYZYGY</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <script src="https://accounts.google.com/gsi/client" async="" defer=""></script>
<link rel="stylesheet" href="styles.css"><style ng-app-id="ng">
[_nghost-ng-c1022837747] {
  display: block;
  width: 100%;
  height: 100%;
  background: black;
}
.game-entry[_ngcontent-ng-c1022837747] {
  position: relative;
  width: 100%;
  height: 100%;
}
.title-layer[_ngcontent-ng-c1022837747] {
  position: absolute;
  inset: 0;
  z-index: 1;
}
.login-layer[_ngcontent-ng-c1022837747] {
  opacity: 0;
  pointer-events: none;
}
.game-entry.login-visible[_ngcontent-ng-c1022837747]   .login-layer[_ngcontent-ng-c1022837747] {
  opacity: 1;
  pointer-events: auto;
}
.title-screen.zooming-out[_ngcontent-ng-c1022837747]   button[_ngcontent-ng-c1022837747] {
  opacity: 0 !important;
  transform: translateY(-30px) scale(0.7);
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.3s ease;
}
.title-screen.zooming-out[_ngcontent-ng-c1022837747]   .title-content[_ngcontent-ng-c1022837747] {
  opacity: 1;
  transform: none;
}
.language-container[_ngcontent-ng-c1022837747] {
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 20;
}
.language-button[_ngcontent-ng-c1022837747] {
  padding: 10px 16px;
  background: rgba(0, 0, 0, 0.65);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 4px;
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}
.language-button[_ngcontent-ng-c1022837747]:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.7);
  transform: translateY(-1px);
}
.language-menu[_ngcontent-ng-c1022837747] {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 150px;
  padding: 6px;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
}
.language-menu[_ngcontent-ng-c1022837747]   button[_ngcontent-ng-c1022837747] {
  display: block;
  width: 100%;
  padding: 10px 12px;
  background: transparent;
  color: white;
  border: none;
  text-align: left;
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s ease;
}
.language-menu[_ngcontent-ng-c1022837747]   button[_ngcontent-ng-c1022837747]:hover {
  background: rgba(255, 255, 255, 0.12);
}
.game-entry.transitioning[_ngcontent-ng-c1022837747]   .language-container[_ngcontent-ng-c1022837747] {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}
.game-entry.login-visible[_ngcontent-ng-c1022837747]   .language-container[_ngcontent-ng-c1022837747] {
  opacity: 0;
  pointer-events: none;
}
/*# sourceMappingURL=/game-entry.css.map */</style><style ng-app-id="ng">
[_nghost-ng-c606756069] {
  display: block;
  width: 100%;
  height: 100%;
  background: black;
  -webkit-user-select: none;
  user-select: none;
}
.title-screen[_ngcontent-ng-c606756069] {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: black;
  overflow: hidden;
  opacity: 1;
}
.background-stars[_ngcontent-ng-c606756069] {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.background-star[_ngcontent-ng-c606756069] {
  position: absolute;
  width: auto;
  height: auto;
  opacity: 0;
  background: rgb(202, 202, 202);
  border-radius: 50%;
  animation: _ngcontent-ng-c606756069_background-star-reveal 2.5s ease-out forwards;
}
@keyframes _ngcontent-ng-c606756069_background-star-reveal {
  0% {
    opacity: 0;
  }
  100% {
    opacity: var(--star-opacity);
  }
}
.stars[_ngcontent-ng-c606756069] {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.star[_ngcontent-ng-c606756069] {
  position: absolute;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: aliceblue;
  opacity: 0;
  animation: _ngcontent-ng-c606756069_star-appear 1.5s ease-out forwards;
}
.star-1[_ngcontent-ng-c606756069] {
  left: 8%;
  top: 20%;
  animation-delay: 0.2s;
}
.star-2[_ngcontent-ng-c606756069] {
  left: 18%;
  top: 72%;
  animation-delay: 0.45s;
}
.star-3[_ngcontent-ng-c606756069] {
  left: 29%;
  top: 15%;
  animation-delay: 0.7s;
}
.star-4[_ngcontent-ng-c606756069] {
  left: 42%;
  top: 10%;
  animation-delay: 1s;
}
.star-5[_ngcontent-ng-c606756069] {
  left: 57%;
  top: 18%;
  animation-delay: 0.35s;
}
.star-6[_ngcontent-ng-c606756069] {
  left: 72%;
  top: 29%;
  animation-delay: 0.85s;
}
.star-7[_ngcontent-ng-c606756069] {
  left: 87%;
  top: 65%;
  animation-delay: 0.6s;
}
.star-8[_ngcontent-ng-c606756069] {
  left: 75%;
  top: 84%;
  animation-delay: 1.1s;
}
.star-9[_ngcontent-ng-c606756069] {
  left: 48%;
  top: 88%;
  animation-delay: 0.75s;
}
.star-10[_ngcontent-ng-c606756069] {
  left: 27%;
  top: 84%;
  animation-delay: 1.25s;
}
.star-11[_ngcontent-ng-c606756069] {
  left: 12%;
  top: 45%;
  animation-delay: 1.4s;
}
.star-12[_ngcontent-ng-c606756069] {
  left: 91%;
  top: 16%;
  animation-delay: 1.6s;
}
@keyframes _ngcontent-ng-c606756069_star-appear {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  60% {
    opacity: 0.65;
    transform: scale(1);
  }
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
}
.celestial-events[_ngcontent-ng-c606756069] {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}
.celestial-event[_ngcontent-ng-c606756069] {
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--event-size);
  height: var(--event-size);
  opacity: var(--event-opacity);
  pointer-events: none;
  animation-duration: var(--event-duration);
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  transform-origin: center;
}
.comet[_ngcontent-ng-c606756069] {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: aliceblue;
  filter: drop-shadow(0 0 4px rgba(240, 248, 255, 0.9));
  animation-name: _ngcontent-ng-c606756069_comet-cross-screen;
}
.comet[_ngcontent-ng-c606756069]::before {
  content: "";
  position: absolute;
  right: 2px;
  top: 50%;
  width: 70px;
  height: 1px;
  transform: translateY(-50%);
  transform-origin: right center;
  background:
    linear-gradient(
      to left,
      rgba(240, 248, 255, 0.75),
      rgba(240, 248, 255, 0));
}
@keyframes _ngcontent-ng-c606756069_comet-cross-screen {
  0% {
    opacity: 0;
    transform: rotate(var(--event-angle)) translateX(-20vw);
  }
  8% {
    opacity: var(--event-opacity);
  }
  88% {
    opacity: var(--event-opacity);
  }
  100% {
    opacity: 0;
    transform: rotate(var(--event-angle)) translateX(120vw);
  }
}
.asteroid[_ngcontent-ng-c606756069] {
  border-radius: 35% 50% 45% 40%;
  background: rgb(130, 130, 130);
  filter: drop-shadow(0 0 2px rgba(180, 180, 180, 0.5));
  animation-name: _ngcontent-ng-c606756069_asteroid-cross-screen;
}
.asteroid[_ngcontent-ng-c606756069]::before {
  content: "";
  position: absolute;
  width: 30%;
  height: 30%;
  left: 20%;
  top: 20%;
  border-radius: 50%;
  background: rgba(230, 230, 230, 0.35);
}
@keyframes _ngcontent-ng-c606756069_asteroid-cross-screen {
  0% {
    opacity: 0;
    transform: rotate(var(--event-angle)) translateX(-20vw) rotate(0deg);
  }
  8% {
    opacity: var(--event-opacity);
  }
  92% {
    opacity: var(--event-opacity);
  }
  100% {
    opacity: 0;
    transform: rotate(var(--event-angle)) translateX(120vw) rotate(220deg);
  }
}
.special-comet[_ngcontent-ng-c606756069] {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: white;
  filter: drop-shadow(0 0 7px rgba(255, 255, 255, 1)) drop-shadow(0 0 18px rgba(200, 220, 255, 0.8));
  animation-name: _ngcontent-ng-c606756069_special-comet-cross-screen;
}
.special-comet[_ngcontent-ng-c606756069]::before {
  content: "";
  position: absolute;
  right: 4px;
  top: 50%;
  width: 180px;
  height: 2px;
  transform: translateY(-50%);
  background:
    linear-gradient(
      to left,
      rgba(255, 255, 255, 0.95),
      rgba(210, 225, 255, 0.35),
      rgba(210, 225, 255, 0));
}
.special-comet[_ngcontent-ng-c606756069]::after {
  content: "";
  position: absolute;
  right: 5px;
  top: 50%;
  width: 100px;
  height: 6px;
  transform: translateY(-50%);
  background:
    linear-gradient(
      to left,
      rgba(210, 225, 255, 0.2),
      transparent);
  filter: blur(3px);
}
@keyframes _ngcontent-ng-c606756069_special-comet-cross-screen {
  0% {
    opacity: 0;
    transform: rotate(var(--event-angle)) translateX(-25vw) scale(0.6);
  }
  10% {
    opacity: 0.3;
  }
  20% {
    opacity: 1;
    transform: rotate(var(--event-angle)) translateX(0vw) scale(1);
  }
  75% {
    opacity: 1;
  }
  92% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    transform: rotate(var(--event-angle)) translateX(125vw) scale(1.1);
  }
}
.persistent-scene[_ngcontent-ng-c606756069] {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform-origin: center center;
  transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}
.celestial-system[_ngcontent-ng-c606756069] {
  position: relative;
  width: min(1200px, 96vw);
  height: min(700px, 68vh);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  overflow: visible;
}
.orbit[_ngcontent-ng-c606756069] {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
}
.companion-orbit[_ngcontent-ng-c606756069] {
  fill: none;
  stroke: rgba(240, 248, 255, 0.45);
  stroke-width: 2;
  stroke-linecap: round;
  opacity: 0;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: _ngcontent-ng-c606756069_stellar-orbit-draw 3s cubic-bezier(0.4, 0, 0.2, 1) 3.5s forwards;
}
@keyframes _ngcontent-ng-c606756069_stellar-orbit-draw {
  0% {
    opacity: 0;
    stroke-dashoffset: 1000;
  }
  12% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    stroke-dashoffset: 0;
  }
}
.companion-star[_ngcontent-ng-c606756069] {
  pointer-events: none;
  opacity: 0;
  animation: _ngcontent-ng-c606756069_system-star-appear 1.2s ease-out 8.5s forwards;
}
@keyframes _ngcontent-ng-c606756069_system-star-appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.companion-star-one[_ngcontent-ng-c606756069] {
  filter: brightness(1.1);
}
.companion-star-two[_ngcontent-ng-c606756069] {
  opacity: 0;
}
.star-glow[_ngcontent-ng-c606756069] {
  fill: white;
  opacity: 0.12;
  filter: blur(5px);
}
.stellar-body[_ngcontent-ng-c606756069] {
  fill: white;
  opacity: 1;
  animation: _ngcontent-ng-c606756069_stellar-pulse 4s ease-in-out infinite;
}
@keyframes _ngcontent-ng-c606756069_stellar-pulse {
  0% {
    filter: drop-shadow(0 0 4px rgba(240, 248, 255, 0.9)) drop-shadow(0 0 10px rgba(200, 220, 255, 0.7)) drop-shadow(0 0 20px rgba(180, 210, 255, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 7px rgba(240, 248, 255, 1)) drop-shadow(0 0 16px rgba(200, 220, 255, 0.9)) drop-shadow(0 0 30px rgba(180, 210, 255, 0.45));
  }
  100% {
    filter: drop-shadow(0 0 4px rgba(240, 248, 255, 0.9)) drop-shadow(0 0 10px rgba(200, 220, 255, 0.7)) drop-shadow(0 0 20px rgba(180, 210, 255, 0.3));
  }
}
.moon-system[_ngcontent-ng-c606756069] {
  pointer-events: none;
}
.moon-1-system[_ngcontent-ng-c606756069] {
  pointer-events: none;
}
.star-moon[_ngcontent-ng-c606756069] {
  fill: rgb(145, 145, 145);
  opacity: 0.85;
  pointer-events: none;
  filter: none;
}
.moon-one[_ngcontent-ng-c606756069] {
  opacity: 0.9;
  fill: rgba(100, 100, 100, 0.61);
}
.central-star[_ngcontent-ng-c606756069] {
  pointer-events: none;
}
.central-star-glow[_ngcontent-ng-c606756069] {
  fill: white;
  opacity: 0;
  filter: blur(100px);
  animation: _ngcontent-ng-c606756069_central-star-support-appear 1.2s ease-out 2.2s forwards;
}
.central-star-rays[_ngcontent-ng-c606756069] {
  fill: white;
  opacity: 0;
  filter: blur(2px) drop-shadow(0 0 12px rgba(240, 248, 255, 0.8));
  animation: _ngcontent-ng-c606756069_central-star-support-appear 1.2s ease-out 2.2s forwards;
}
@keyframes _ngcontent-ng-c606756069_central-star-support-appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.3;
  }
}
.game-logo[_ngcontent-ng-c606756069] {
  position: relative;
  z-index: 2;
  width: 25%;
  height: auto;
  opacity: 0;
  animation: _ngcontent-ng-c606756069_logo-appear 1.2s ease-out 2.2s forwards;
}
@keyframes _ngcontent-ng-c606756069_logo-appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.title-content[_ngcontent-ng-c606756069] {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  color: aliceblue;
  opacity: 0;
  animation: _ngcontent-ng-c606756069_title-appear 1s ease-out 7.65s forwards;
}
h1[_ngcontent-ng-c606756069] {
  margin: 0;
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(48px, 7vw, 100px);
  letter-spacing: 0.08em;
  cursor: default;
}
#remember[_ngcontent-ng-c606756069] {
  margin-top: 40px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  font-family: "IM FELL English", serif;
  font-size: 18px;
  color: grey;
  opacity: 0;
  animation: _ngcontent-ng-c606756069_button-appear 0.8s ease-out 8.5s forwards;
  transition:
    color 0.3s ease,
    transform 0.3s ease,
    opacity 0.25s ease;
}
#remember[_ngcontent-ng-c606756069]:hover {
  color: aliceblue;
  transform: scale(1.2);
}
#remember.leaving[_ngcontent-ng-c606756069] {
  opacity: 0 !important;
  pointer-events: none;
  transform: translateY(-30px) scale(0.7);
}
@keyframes _ngcontent-ng-c606756069_title-appear {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes _ngcontent-ng-c606756069_button-appear {
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes _ngcontent-ng-c606756069_point-appear {
  0% {
    opacity: 0;
    transform: translateY(-50%) scale(0);
  }
  100% {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
}
@keyframes _ngcontent-ng-c606756069_point-blink {
  0% {
    opacity: 1;
    transform: translateY(-50%) scale(1);
    box-shadow: 0 0 5px rgba(240, 248, 255, 0.7);
  }
  35% {
    opacity: 1;
    transform: translateY(-50%) scale(3);
    box-shadow: 0 0 18px rgba(240, 248, 255, 1);
  }
  100% {
    opacity: 0.55;
    transform: translateY(-50%) scale(1);
    box-shadow: 0 0 5px rgba(240, 248, 255, 0.5);
  }
}
@media (max-width: 900px) {
  .celestial-system[_ngcontent-ng-c606756069] {
    width: 110vw;
    height: 65vh;
  }
  .game-logo[_ngcontent-ng-c606756069] {
    width: 30%;
  }
}
@media (max-width: 600px) {
  .celestial-system[_ngcontent-ng-c606756069] {
    width: 125vw;
    height: 58vh;
  }
  .game-logo[_ngcontent-ng-c606756069] {
    width: 38%;
  }
}
.persistent-scene[_ngcontent-ng-c606756069] {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform-origin: center center;
  transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
}
.title-screen.zooming-out[_ngcontent-ng-c606756069]   .persistent-scene[_ngcontent-ng-c606756069] {
  transform: translateY(-20vh) scale(0.5);
}
.title-screen.zooming-out[_ngcontent-ng-c606756069]   #remember[_ngcontent-ng-c606756069] {
  opacity: 0;
  pointer-events: none;
}
/*# sourceMappingURL=/title.css.map */</style><style ng-app-id="ng">
[_nghost-ng-c2590426810] {
  display: block;
  width: 100%;
  height: 100%;
  background: black;
  color: aliceblue;
  -webkit-user-select: none;
  user-select: none;
}
.login-screen[_ngcontent-ng-c2590426810] {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  overflow: hidden;
  transition: ease-in;
}
.background-stars[_ngcontent-ng-c2590426810] {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.background-star[_ngcontent-ng-c2590426810] {
  position: absolute;
  border-radius: 50%;
  background: rgb(202, 202, 202);
  opacity: 0;
  animation: _ngcontent-ng-c2590426810_background-star-reveal 2.5s ease-out forwards;
}
@keyframes _ngcontent-ng-c2590426810_background-star-reveal {
  0% {
    opacity: 0;
  }
  100% {
    opacity: var(--star-opacity);
  }
}
.stars[_ngcontent-ng-c2590426810] {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}
.star[_ngcontent-ng-c2590426810] {
  position: absolute;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: aliceblue;
  opacity: 0;
  animation: _ngcontent-ng-c2590426810_star-appear 1.5s ease-out forwards;
}
.star-1[_ngcontent-ng-c2590426810] {
  left: 8%;
  top: 20%;
  animation-delay: 0.8s;
}
.star-2[_ngcontent-ng-c2590426810] {
  left: 18%;
  top: 72%;
  animation-delay: 1.1s;
}
.star-3[_ngcontent-ng-c2590426810] {
  left: 29%;
  top: 15%;
  animation-delay: 1.4s;
}
.star-4[_ngcontent-ng-c2590426810] {
  left: 42%;
  top: 10%;
  animation-delay: 1.7s;
}
.star-5[_ngcontent-ng-c2590426810] {
  left: 57%;
  top: 18%;
  animation-delay: 1.05s;
}
.star-6[_ngcontent-ng-c2590426810] {
  left: 72%;
  top: 29%;
  animation-delay: 1.55s;
}
.star-7[_ngcontent-ng-c2590426810] {
  left: 87%;
  top: 65%;
  animation-delay: 1.25s;
}
.star-8[_ngcontent-ng-c2590426810] {
  left: 75%;
  top: 84%;
  animation-delay: 1.8s;
}
.star-9[_ngcontent-ng-c2590426810] {
  left: 48%;
  top: 88%;
  animation-delay: 1.45s;
}
.star-10[_ngcontent-ng-c2590426810] {
  left: 27%;
  top: 84%;
  animation-delay: 1.95s;
}
.star-11[_ngcontent-ng-c2590426810] {
  left: 12%;
  top: 45%;
  animation-delay: 2.1s;
}
.star-12[_ngcontent-ng-c2590426810] {
  left: 91%;
  top: 16%;
  animation-delay: 2.3s;
}
@keyframes _ngcontent-ng-c2590426810_star-appear {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  60% {
    opacity: 0.65;
    transform: scale(1);
  }
  100% {
    opacity: 0.4;
    transform: scale(1);
  }
}
.login-content[_ngcontent-ng-c2590426810] {
  position: relative;
  z-index: 5;
  width: min(360px, 86vw);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 350px;
  text-align: center;
  opacity: 0;
  animation: _ngcontent-ng-c2590426810_login-content-appear 1s ease-out forwards;
}
@keyframes _ngcontent-ng-c2590426810_login-content-appear {
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.journey-text[_ngcontent-ng-c2590426810] {
  margin: 0 0 24px;
  font-family: "IM FELL English", serif;
  font-size: 10px;
  letter-spacing: 0.08em;
  color: aliceblue;
  opacity: 0.9;
}
.google-area[_ngcontent-ng-c2590426810] {
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.google-button[_ngcontent-ng-c2590426810] {
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-divider[_ngcontent-ng-c2590426810] {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 25px 0 18px;
  color: rgba(240, 248, 255, 0.35);
}
.login-divider[_ngcontent-ng-c2590426810]   span[_ngcontent-ng-c2590426810] {
  flex: 1;
  height: 1px;
  background: rgba(240, 248, 255, 0.12);
}
.login-divider[_ngcontent-ng-c2590426810]   em[_ngcontent-ng-c2590426810] {
  font-family: "Cormorant Garamond", serif;
  font-size: 15px;
  font-style: normal;
}
.credentials[_ngcontent-ng-c2590426810] {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}
.field[_ngcontent-ng-c2590426810] {
  position: relative;
  width: 100%;
}
.field[_ngcontent-ng-c2590426810]   input[_ngcontent-ng-c2590426810] {
  width: 100%;
  padding: 18px 0 8px;
  border: none;
  border-bottom: 1px solid rgba(240, 248, 255, 0.25);
  background: transparent;
  outline: none;
  color: aliceblue;
  font-family: "IM FELL English", serif;
  font-size: 16px;
  border-radius: 0;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.field[_ngcontent-ng-c2590426810]   input[_ngcontent-ng-c2590426810]:-webkit-autofill, 
.field[_ngcontent-ng-c2590426810]   input[_ngcontent-ng-c2590426810]:-webkit-autofill:hover, 
.field[_ngcontent-ng-c2590426810]   input[_ngcontent-ng-c2590426810]:-webkit-autofill:focus {
  -webkit-text-fill-color: aliceblue;
  transition: background-color 9999s ease-out;
}
.field[_ngcontent-ng-c2590426810]   label[_ngcontent-ng-c2590426810] {
  position: absolute;
  left: 0;
  top: 15px;
  pointer-events: none;
  color: rgba(240, 248, 255, 0.45);
  font-family: "IM FELL English", serif;
  font-size: 15px;
  letter-spacing: 0.04em;
  transition:
    transform 0.25s ease,
    color 0.25s ease,
    font-size 0.25s ease;
}
.field[_ngcontent-ng-c2590426810]   input[_ngcontent-ng-c2590426810]:focus {
  border-bottom-color: rgba(240, 248, 255, 0.7);
  box-shadow: 0 1px 8px rgba(240, 248, 255, 0.08);
}
.field[_ngcontent-ng-c2590426810]   input[_ngcontent-ng-c2590426810]:focus    + label[_ngcontent-ng-c2590426810], 
.field[_ngcontent-ng-c2590426810]   input[_ngcontent-ng-c2590426810]:not(:placeholder-shown)    + label[_ngcontent-ng-c2590426810] {
  transform: translateY(-15px);
  color: rgba(240, 248, 255, 0.8);
  font-size: 11px;
}
.login-button[_ngcontent-ng-c2590426810] {
  margin-top: 4px;
  padding: 0;
  border: none;
  background: transparent;
  color: rgba(240, 248, 255, 0.45);
  cursor: pointer;
  font-family: "IM FELL English", serif;
  font-size: 17px;
  letter-spacing: 0.05em;
  transition: color 0.3s ease, transform 0.3s ease;
}
.login-button[_ngcontent-ng-c2590426810]:hover {
  color: aliceblue;
  transform: scale(1.12);
}
.create-account[_ngcontent-ng-c2590426810] {
  margin: 31px 0 0;
  font-family: "IM FELL English", serif;
  font-size: 12px;
  color: rgba(240, 248, 255, 0.38);
}
.create-account-button[_ngcontent-ng-c2590426810] {
  padding: 0;
  border: none;
  background: transparent;
  color: rgba(240, 248, 255, 0.55);
  cursor: pointer;
  font-family: "IM FELL English", serif;
  font-size: inherit;
  transition: color 0.3s ease;
}
.create-account-button[_ngcontent-ng-c2590426810]:hover {
  color: aliceblue;
}
@media (max-width: 700px) {
  .login-celestial-system[_ngcontent-ng-c2590426810] {
    width: 115vw;
    height: 55vh;
  }
  .game-logo[_ngcontent-ng-c2590426810] {
    width: 105px;
  }
  .login-content[_ngcontent-ng-c2590426810] {
    margin-top: 250px;
  }
}
@media (max-width: 450px) {
  .login-content[_ngcontent-ng-c2590426810] {
    width: 80vw;
    margin-top: 225px;
  }
  .login-celestial-system[_ngcontent-ng-c2590426810] {
    width: 125vw;
    height: 48vh;
  }
  .game-logo[_ngcontent-ng-c2590426810] {
    width: 90px;
  }
}
/*# sourceMappingURL=/login.css.map */</style></head>
<body><!--nghm--><script type="text/javascript" id="ng-event-dispatch-contract">(()=>{function p(t,n,r,o,e,i,f,m){return{eventType:t,event:n,targetElement:r,eic:o,timeStamp:e,eia:i,eirp:f,eiack:m}}function u(t){let n=[],r=e=>{n.push(e)};return{c:t,q:n,et:[],etc:[],d:r,h:e=>{r(p(e.type,e,e.target,t,Date.now()))}}}function s(t,n,r){for(let o=0;o<n.length;o++){let e=n[o];(r?t.etc:t.et).push(e),t.c.addEventListener(e,t.h,r)}}function c(t,n,r,o,e=window){let i=u(t);e._ejsas||(e._ejsas={}),e._ejsas[n]=i,s(i,r),s(i,o,!0)}window.__jsaction_bootstrap=c;})();
</script><script>window.__jsaction_bootstrap(document.body,"ng",["click","submit","input","compositionstart","compositionend"],["blur"]);</script>
  <app-root ng-version="22.1.3" ngh="3" ng-server-context="ssg"><router-outlet></router-outlet><app-game-entry _nghost-ng-c1022837747="" ngh="2"><div _ngcontent-ng-c1022837747="" class="game-entry"><div _ngcontent-ng-c1022837747="" class="title-layer"><app-title _ngcontent-ng-c1022837747="" _nghost-ng-c606756069="" ngh="0"><div _ngcontent-ng-c606756069="" class="title-screen"><div _ngcontent-ng-c606756069="" aria-hidden="true" class="background-stars"><span _ngcontent-ng-c606756069="" class="background-star" style="left: 37.12218411521238%; top: 57.73840671611903%; width: 1px; height: 1px; --star-opacity: 0.24714586621298712; animation-delay: 13.386252189121937s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 18.806852913534367%; top: 76.17338987595885%; width: 1px; height: 1px; --star-opacity: 0.17350871199220122; animation-delay: 13.464873329530521s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 29.585541968991492%; top: 75.74116507335003%; width: 1px; height: 1px; --star-opacity: 0.23380887433374153; animation-delay: 12.887139487986811s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 4.546239004552987%; top: 57.805328041608185%; width: 1px; height: 1px; --star-opacity: 0.17527089079574687; animation-delay: 13.444425632061519s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 58.37764709884633%; top: 18.7863978979805%; width: 1px; height: 1px; --star-opacity: 0.2263341881882504; animation-delay: 13.01032843087583s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 16.006484345887795%; top: 82.74142995927711%; width: 1px; height: 1px; --star-opacity: 0.16097973178712688; animation-delay: 10.974142448692657s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 42.35601949315956%; top: 36.395517937697406%; width: 2px; height: 2px; --star-opacity: 0.11328908336922716; animation-delay: 9.195180654727297s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 6.249966664564377%; top: 78.38866480987535%; width: 1px; height: 1px; --star-opacity: 0.19979607614190092; animation-delay: 10.704939213157541s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 22.583602135454605%; top: 5.687718097248162%; width: 1px; height: 1px; --star-opacity: 0.22647803506588665; animation-delay: 11.789223165885437s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 97.28428923241476%; top: 33.15158053826448%; width: 1px; height: 1px; --star-opacity: 0.20971944326431458; animation-delay: 9.099095517993954s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 74.47233762997416%; top: 42.97371905849005%; width: 1px; height: 1px; --star-opacity: 0.24826364482548918; animation-delay: 12.093704609143884s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 15.639964260969075%; top: 37.568912946416376%; width: 1px; height: 1px; --star-opacity: 0.24208146065181374; animation-delay: 12.269987941252442s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 80.68673154080778%; top: 55.49583323067038%; width: 1px; height: 1px; --star-opacity: 0.18708595950962023; animation-delay: 11.505590787188563s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 6.325013671588742%; top: 86.55677204624085%; width: 1px; height: 1px; --star-opacity: 0.1709399516454359; animation-delay: 11.335578110724558s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 4.526984177155002%; top: 95.11680079116279%; width: 1px; height: 1px; --star-opacity: 0.15148788559080384; animation-delay: 13.487342301850232s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 69.17869148306532%; top: 0.3833452304410123%; width: 1px; height: 1px; --star-opacity: 0.19786101513369003; animation-delay: 11.77731128645784s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 23.000896241702094%; top: 22.370225824089964%; width: 2px; height: 2px; --star-opacity: 0.18715930492639513; animation-delay: 11.538729212132179s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 60.974022592350586%; top: 97.77954703832691%; width: 1px; height: 1px; --star-opacity: 0.17522764527760948; animation-delay: 13.352183057016271s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 12.827270542843127%; top: 25.765761731454695%; width: 1px; height: 1px; --star-opacity: 0.19598679834069496; animation-delay: 11.58910130226631s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 86.31321149012288%; top: 90.81637486899642%; width: 1px; height: 1px; --star-opacity: 0.1002853086653709; animation-delay: 12.200265022389514s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 83.07953374347133%; top: 0.12720186039429926%; width: 1px; height: 1px; --star-opacity: 0.0874944186532428; animation-delay: 13.323584366729847s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 26.11077524501274%; top: 31.73399934105321%; width: 1px; height: 1px; --star-opacity: 0.10696600597576657; animation-delay: 12.103603219613746s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 42.71895713756151%; top: 15.312550428010873%; width: 1px; height: 1px; --star-opacity: 0.16337022693054812; animation-delay: 10.917645347410746s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 68.18638672919954%; top: 93.0047170593094%; width: 1px; height: 1px; --star-opacity: 0.20969302677533747; animation-delay: 10.178480123743325s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 97.77801061651145%; top: 96.97169354883665%; width: 1px; height: 1px; --star-opacity: 0.21256583348389646; animation-delay: 10.525361526528828s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 45.216583948189516%; top: 53.39454065118587%; width: 1px; height: 1px; --star-opacity: 0.08536876406309424; animation-delay: 10.618762573237468s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 84.52242028805664%; top: 34.53398732992243%; width: 1px; height: 1px; --star-opacity: 0.2100032349606829; animation-delay: 12.73994970148735s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 0.23636203907192455%; top: 28.240656465134016%; width: 1px; height: 1px; --star-opacity: 0.21962493393079002; animation-delay: 9.148675184041375s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 30.635626413956107%; top: 48.221042124335575%; width: 1px; height: 1px; --star-opacity: 0.15717639356397714; animation-delay: 10.782423376467463s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 75.92340620037575%; top: 93.21227630142198%; width: 1px; height: 1px; --star-opacity: 0.18778244775002695; animation-delay: 13.052009211387352s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 28.406097251118922%; top: 88.94460669193457%; width: 1px; height: 1px; --star-opacity: 0.14247758529952015; animation-delay: 10.342847733146463s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 50.97698682616924%; top: 5.5949542704929245%; width: 1px; height: 1px; --star-opacity: 0.1093467510307595; animation-delay: 13.271271808541481s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 32.13194183785474%; top: 74.09971008313273%; width: 1px; height: 1px; --star-opacity: 0.13712631002583242; animation-delay: 10.70543748296181s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 47.39630781161963%; top: 3.559674653103584%; width: 1px; height: 1px; --star-opacity: 0.17214517845580596; animation-delay: 13.832513292172143s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 44.38657816776516%; top: 85.33972933473281%; width: 1px; height: 1px; --star-opacity: 0.2150409031194258; animation-delay: 9.579498278758871s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 91.19645652942874%; top: 20.416447548176208%; width: 1px; height: 1px; --star-opacity: 0.24523293313957933; animation-delay: 11.583186597220092s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 74.87952425747618%; top: 95.22394874197043%; width: 1px; height: 1px; --star-opacity: 0.14512560586207743; animation-delay: 11.087536732039496s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 37.91481750018981%; top: 2.6549464626326236%; width: 1px; height: 1px; --star-opacity: 0.13975911789850146; animation-delay: 9.576757164271294s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 26.058507282732535%; top: 3.9748112261568602%; width: 2px; height: 2px; --star-opacity: 0.09378603670407874; animation-delay: 12.30108125045957s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 8.167274722956186%; top: 73.44639310302128%; width: 1px; height: 1px; --star-opacity: 0.24732396361635178; animation-delay: 12.740967304604368s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 63.63562227231502%; top: 23.532952432133204%; width: 1px; height: 1px; --star-opacity: 0.18293538371365992; animation-delay: 11.492475117715674s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 23.760245381820788%; top: 6.384936863936774%; width: 1px; height: 1px; --star-opacity: 0.12646559704986893; animation-delay: 13.840906596784075s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 71.0539821433151%; top: 51.98234055065972%; width: 1px; height: 1px; --star-opacity: 0.1736554760241441; animation-delay: 11.091132247509936s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 53.16086327942179%; top: 1.7242181782263666%; width: 1px; height: 1px; --star-opacity: 0.20912992187238383; animation-delay: 11.157055431863796s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 12.79408395134981%; top: 80.58773879849048%; width: 1px; height: 1px; --star-opacity: 0.1910946309373704; animation-delay: 13.998414023950655s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 31.763673291445194%; top: 43.10141508125618%; width: 1px; height: 1px; --star-opacity: 0.13070162424170803; animation-delay: 11.195284965041914s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 24.195420826325343%; top: 65.84370011001471%; width: 1px; height: 1px; --star-opacity: 0.13737661560609843; animation-delay: 13.771748611638886s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 37.18581185767135%; top: 14.740128017381105%; width: 1px; height: 1px; --star-opacity: 0.24605135559000213; animation-delay: 12.75935910322776s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 49.04140569209851%; top: 38.464985766286574%; width: 2px; height: 2px; --star-opacity: 0.23514487254602406; animation-delay: 9.858852375298067s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 77.24002636460037%; top: 16.954562307001297%; width: 1px; height: 1px; --star-opacity: 0.24758249504176033; animation-delay: 12.196317759389057s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 59.86816616383754%; top: 24.749768046952436%; width: 1px; height: 1px; --star-opacity: 0.1612236684170373; animation-delay: 13.604651958817474s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 70.99732329710169%; top: 19.48455448864006%; width: 2px; height: 2px; --star-opacity: 0.1316918697736114; animation-delay: 11.299637681221649s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 74.3825140411031%; top: 77.14082070997057%; width: 1px; height: 1px; --star-opacity: 0.0876735962452238; animation-delay: 12.507260538370172s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 61.188067715557196%; top: 5.800129563306333%; width: 1px; height: 1px; --star-opacity: 0.18989013971148652; animation-delay: 10.022056308561666s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 55.29332294286237%; top: 77.74230832513773%; width: 1px; height: 1px; --star-opacity: 0.18497974063567132; animation-delay: 12.03053915906138s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 14.790619950963624%; top: 46.31178120515686%; width: 1px; height: 1px; --star-opacity: 0.1272416735491764; animation-delay: 11.529421604061916s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 70.48718271840532%; top: 62.396295848847586%; width: 1px; height: 1px; --star-opacity: 0.16323536627871188; animation-delay: 11.941760786086203s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 12.338685447994791%; top: 33.75538435681301%; width: 1px; height: 1px; --star-opacity: 0.15882600033872046; animation-delay: 12.155606661301626s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 5.425296479580677%; top: 19.60476181754156%; width: 1px; height: 1px; --star-opacity: 0.14195046497729868; animation-delay: 13.871093427871756s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 8.5883104155278%; top: 62.25071492496895%; width: 1px; height: 1px; --star-opacity: 0.08418504885857639; animation-delay: 10.441038784538037s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 28.823030286723718%; top: 1.4441611123401032%; width: 2px; height: 2px; --star-opacity: 0.12987940104383683; animation-delay: 9.164557517178743s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 60.916600772590435%; top: 41.953253418726035%; width: 1px; height: 1px; --star-opacity: 0.1943643765671319; animation-delay: 10.843352832734423s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 52.802568183298405%; top: 23.491083338547092%; width: 2px; height: 2px; --star-opacity: 0.10157489555414902; animation-delay: 13.099159859590715s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 51.44928033260624%; top: 57.46562188902294%; width: 1px; height: 1px; --star-opacity: 0.20955684424595672; animation-delay: 11.09875792488633s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 66.6006390403085%; top: 59.789683263802104%; width: 1px; height: 1px; --star-opacity: 0.08209999626789952; animation-delay: 9.890528244477235s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 96.08701296571776%; top: 6.521258168942867%; width: 1px; height: 1px; --star-opacity: 0.09866898795160717; animation-delay: 9.821841740348797s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 2.522315852564172%; top: 73.92376146157616%; width: 1px; height: 1px; --star-opacity: 0.19044217063263685; animation-delay: 13.301939603650307s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 69.88366585950588%; top: 19.907097347268387%; width: 1px; height: 1px; --star-opacity: 0.12554247590074996; animation-delay: 13.621220172439461s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 34.06383987674138%; top: 98.03556508115423%; width: 1px; height: 1px; --star-opacity: 0.12506504804792482; animation-delay: 11.60005524005337s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 22.916793656163936%; top: 72.21794162566194%; width: 1px; height: 1px; --star-opacity: 0.1909551339934928; animation-delay: 13.212166527002761s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 88.8312766248657%; top: 62.88623308005854%; width: 1px; height: 1px; --star-opacity: 0.18489234699196738; animation-delay: 10.291949190852712s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 85.16277101978332%; top: 66.24164812783165%; width: 1px; height: 1px; --star-opacity: 0.22267556890377282; animation-delay: 9.87328387396958s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 23.37095447439147%; top: 25.919405614090586%; width: 1px; height: 1px; --star-opacity: 0.12933222317858256; animation-delay: 13.397352333443527s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 98.84249374228659%; top: 37.23314122699007%; width: 1px; height: 1px; --star-opacity: 0.2474114714678577; animation-delay: 13.365656492709553s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 33.637290704616916%; top: 67.5517338080568%; width: 1px; height: 1px; --star-opacity: 0.13608198663441212; animation-delay: 11.112269417072929s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 85.28429130199872%; top: 25.96416417538675%; width: 1px; height: 1px; --star-opacity: 0.20126938793377655; animation-delay: 11.783318870505482s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 99.13432327288962%; top: 4.8317610794786585%; width: 1px; height: 1px; --star-opacity: 0.20480339808283407; animation-delay: 13.597034947797415s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 23.455463307449286%; top: 44.66743045719635%; width: 1px; height: 1px; --star-opacity: 0.10307038851070796; animation-delay: 12.076333666300801s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 44.33073765887057%; top: 10.002707941317334%; width: 1px; height: 1px; --star-opacity: 0.17517842741578415; animation-delay: 13.129027255203159s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 30.583930876941857%; top: 84.12450898742374%; width: 1px; height: 1px; --star-opacity: 0.11488470706465392; animation-delay: 12.842863636080898s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 67.59980159242825%; top: 85.16753557056212%; width: 1px; height: 1px; --star-opacity: 0.19942420763873017; animation-delay: 10.12159365325249s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 46.78547370701368%; top: 70.8228943825777%; width: 1px; height: 1px; --star-opacity: 0.12140086457391658; animation-delay: 9.125611341129288s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 48.64073119588564%; top: 82.11240362694173%; width: 2px; height: 2px; --star-opacity: 0.11754079194992441; animation-delay: 11.797749209177821s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 56.25299400257337%; top: 7.474041549245225%; width: 1px; height: 1px; --star-opacity: 0.16861512673741513; animation-delay: 9.286535370813684s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 12.235028507728163%; top: 98.58322058107882%; width: 1px; height: 1px; --star-opacity: 0.2202843587519357; animation-delay: 10.129220583558032s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 38.00888712820398%; top: 55.87721874889511%; width: 1px; height: 1px; --star-opacity: 0.11722760119069883; animation-delay: 13.781558931156628s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 3.8899155876614855%; top: 43.283183310266324%; width: 1px; height: 1px; --star-opacity: 0.2428804425241557; animation-delay: 9.305353590697202s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 19.7373960346213%; top: 88.27904299175634%; width: 1px; height: 1px; --star-opacity: 0.13213601611760106; animation-delay: 12.916509144081857s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 88.97468325503415%; top: 25.3927757151306%; width: 2px; height: 2px; --star-opacity: 0.20326650202533453; animation-delay: 9.866263796976114s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 45.59582329754615%; top: 21.31783284440979%; width: 1px; height: 1px; --star-opacity: 0.15835469886617592; animation-delay: 10.398226331111134s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 26.327686806122795%; top: 77.96959594905674%; width: 1px; height: 1px; --star-opacity: 0.23903020203893294; animation-delay: 11.687878184115245s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 32.92802808248301%; top: 65.98281214231241%; width: 1px; height: 1px; --star-opacity: 0.0904236173634932; animation-delay: 11.990325026081365s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 95.49278481262733%; top: 3.6161230958933643%; width: 1px; height: 1px; --star-opacity: 0.22876555051755287; animation-delay: 11.826127297761696s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 44.75888023779737%; top: 40.324956416702385%; width: 1px; height: 1px; --star-opacity: 0.10776090638295868; animation-delay: 13.31595782486351s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 12.218164393709719%; top: 66.53295056571376%; width: 1px; height: 1px; --star-opacity: 0.13546869687940072; animation-delay: 10.00230201548948s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 22.58334574413957%; top: 53.093284993216805%; width: 1px; height: 1px; --star-opacity: 0.1409701089079558; animation-delay: 10.125232753230183s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 47.68140429455229%; top: 25.303721581434125%; width: 1px; height: 1px; --star-opacity: 0.239276079315557; animation-delay: 10.39637697311488s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 28.682826542818095%; top: 77.82357675777605%; width: 1px; height: 1px; --star-opacity: 0.1621418864874146; animation-delay: 13.723641981001933s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 90.99110823667446%; top: 87.4357912172298%; width: 1px; height: 1px; --star-opacity: 0.2157611342651094; animation-delay: 11.259920270841071s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 72.13327919245576%; top: 2.7521943716622643%; width: 1px; height: 1px; --star-opacity: 0.1628517207709655; animation-delay: 11.532752881720302s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 63.7309237514864%; top: 90.45059406314252%; width: 1px; height: 1px; --star-opacity: 0.10415648481484038; animation-delay: 11.485031706418301s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 97.13908005333406%; top: 20.65218329808076%; width: 2px; height: 2px; --star-opacity: 0.16611319371640237; animation-delay: 10.113435200055628s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 19.121069105372122%; top: 3.22706707298398%; width: 1px; height: 1px; --star-opacity: 0.10078806567430741; animation-delay: 13.623034300178876s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 23.076603232380478%; top: 92.22889224678939%; width: 1px; height: 1px; --star-opacity: 0.217966303496183; animation-delay: 11.277533229241662s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 64.35372977871818%; top: 45.13947533782394%; width: 1px; height: 1px; --star-opacity: 0.11883204340299339; animation-delay: 10.447905709913218s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 34.20877641968758%; top: 15.814688327136894%; width: 1px; height: 1px; --star-opacity: 0.13571413049462028; animation-delay: 12.093043991953545s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 99.0492485542816%; top: 26.17159044351537%; width: 1px; height: 1px; --star-opacity: 0.10665252010009009; animation-delay: 9.598056524516682s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 62.896973999226304%; top: 8.045562124257211%; width: 1px; height: 1px; --star-opacity: 0.17943697684491672; animation-delay: 13.561156600564225s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 94.3969792486831%; top: 63.97561709909469%; width: 1px; height: 1px; --star-opacity: 0.11419340864386628; animation-delay: 13.19893516231527s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 23.11016165922526%; top: 34.03236543712492%; width: 1px; height: 1px; --star-opacity: 0.22433560040223344; animation-delay: 10.19381837749063s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 63.230815790874175%; top: 15.733000102027294%; width: 1px; height: 1px; --star-opacity: 0.12560433327778484; animation-delay: 9.880826437761733s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 75.33175542135491%; top: 65.75022067739134%; width: 1px; height: 1px; --star-opacity: 0.23038449897023988; animation-delay: 12.9790699288988s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 39.328674105133054%; top: 55.55354511084432%; width: 1px; height: 1px; --star-opacity: 0.16399947678096483; animation-delay: 9.038357903381227s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 59.25360807319111%; top: 81.77460762985305%; width: 1px; height: 1px; --star-opacity: 0.08715881680794457; animation-delay: 12.62511121489393s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 10.256262547972028%; top: 53.61036261979433%; width: 1px; height: 1px; --star-opacity: 0.18927722730455757; animation-delay: 11.539462306783236s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 71.13558727165122%; top: 17.210417009875712%; width: 1px; height: 1px; --star-opacity: 0.2313957875058984; animation-delay: 12.223797199525544s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 67.41176743086724%; top: 79.14902879912434%; width: 1px; height: 1px; --star-opacity: 0.21343297352943125; animation-delay: 10.103076296963227s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 48.360056213329514%; top: 59.95909994415507%; width: 1px; height: 1px; --star-opacity: 0.22837870171542735; animation-delay: 12.43226274120245s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 67.39568543922701%; top: 14.944745853612263%; width: 1px; height: 1px; --star-opacity: 0.22466736433227819; animation-delay: 12.77710565260065s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 59.98399859350387%; top: 0.6078642505887855%; width: 1px; height: 1px; --star-opacity: 0.14085818081019671; animation-delay: 12.574119999412957s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 9.591340545405568%; top: 30.110238650774836%; width: 1px; height: 1px; --star-opacity: 0.12955763019601527; animation-delay: 11.781320083361503s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 18.426059741661092%; top: 63.46007600541337%; width: 1px; height: 1px; --star-opacity: 0.20327731493761522; animation-delay: 13.675619553414197s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 92.22381985009683%; top: 25.343564319089495%; width: 1px; height: 1px; --star-opacity: 0.1754626235699826; animation-delay: 11.463512825764706s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 86.605145611488%; top: 57.406022463965634%; width: 1px; height: 1px; --star-opacity: 0.08189872683279577; animation-delay: 9.511421998977461s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 40.432089541930026%; top: 84.44475706261585%; width: 1px; height: 1px; --star-opacity: 0.17227489203352567; animation-delay: 12.187573987795552s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 99.2676000985281%; top: 35.18925937853821%; width: 1px; height: 1px; --star-opacity: 0.08507724210645892; animation-delay: 13.259768579928203s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 63.952082304445725%; top: 86.83642930757486%; width: 2px; height: 2px; --star-opacity: 0.19492315200669075; animation-delay: 12.81117259717569s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 48.72800198210514%; top: 58.84137345669311%; width: 1px; height: 1px; --star-opacity: 0.10912741794541315; animation-delay: 12.01853191609505s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 51.03148076140822%; top: 0.955252467776202%; width: 1px; height: 1px; --star-opacity: 0.13440282634282869; animation-delay: 11.203108940270416s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 63.32724705539435%; top: 5.619810367378674%; width: 1px; height: 1px; --star-opacity: 0.13162883670834757; animation-delay: 13.372961448100686s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 26.413212053761793%; top: 54.9741752796311%; width: 1px; height: 1px; --star-opacity: 0.15025668896202832; animation-delay: 9.14263182502305s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 68.38663525708726%; top: 44.513295295509735%; width: 1px; height: 1px; --star-opacity: 0.2078676008815521; animation-delay: 11.57528893323382s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 98.75596461496418%; top: 88.14310574365312%; width: 1px; height: 1px; --star-opacity: 0.1506450634952983; animation-delay: 12.76030092422944s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 6.42329131166438%; top: 54.350118144811844%; width: 1px; height: 1px; --star-opacity: 0.19951005283397677; animation-delay: 9.921574616744758s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 7.817465479382857%; top: 36.43640756689097%; width: 1px; height: 1px; --star-opacity: 0.08394202609788697; animation-delay: 13.98355980880439s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 48.87216723792497%; top: 34.66415230821012%; width: 1px; height: 1px; --star-opacity: 0.1805053592221025; animation-delay: 9.18919665293376s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 9.646910720905188%; top: 56.654149297753584%; width: 2px; height: 2px; --star-opacity: 0.2326964890742546; animation-delay: 9.791675594541296s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 45.38308053013559%; top: 83.4106628402497%; width: 1px; height: 1px; --star-opacity: 0.11856743627503358; animation-delay: 12.564089533533483s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 1.4035888015085263%; top: 93.42556422486341%; width: 1px; height: 1px; --star-opacity: 0.13505478901007065; animation-delay: 9.082462498275511s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 54.53845100734114%; top: 2.2971813697434063%; width: 1px; height: 1px; --star-opacity: 0.1615182851134494; animation-delay: 10.38011031046478s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 66.97593438982604%; top: 25.241442642156244%; width: 1px; height: 1px; --star-opacity: 0.1742830747427514; animation-delay: 13.361705112187408s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 95.04806411903563%; top: 8.17007091414903%; width: 1px; height: 1px; --star-opacity: 0.15860204418510226; animation-delay: 13.914124971290118s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 75.21953942637197%; top: 4.863193230757512%; width: 1px; height: 1px; --star-opacity: 0.21050789481653215; animation-delay: 9.281407724837678s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 76.80583067429255%; top: 11.977563256908297%; width: 1px; height: 1px; --star-opacity: 0.10570942820988882; animation-delay: 12.022350012409602s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 87.82982066364977%; top: 7.641689943306085%; width: 1px; height: 1px; --star-opacity: 0.18578463587197863; animation-delay: 13.076173594172356s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 38.726820650393336%; top: 25.050937557172826%; width: 1px; height: 1px; --star-opacity: 0.20362558818069754; animation-delay: 9.801789430096738s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 13.475831660729053%; top: 76.48731212758523%; width: 1px; height: 1px; --star-opacity: 0.18381779856287522; animation-delay: 12.395609224506305s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 1.456072284584542%; top: 42.26325463121099%; width: 1px; height: 1px; --star-opacity: 0.1307012873537101; animation-delay: 12.754795686126434s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 88.98026271147296%; top: 20.030904593958066%; width: 1px; height: 1px; --star-opacity: 0.16036030714693805; animation-delay: 12.015291787499326s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 19.55995342939999%; top: 88.3356009761068%; width: 1px; height: 1px; --star-opacity: 0.11349259245579138; animation-delay: 11.130429288455495s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 41.56741151051677%; top: 61.621518187562074%; width: 1px; height: 1px; --star-opacity: 0.16975113326978072; animation-delay: 10.661399434131633s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 26.57563193919237%; top: 22.384275884015313%; width: 1px; height: 1px; --star-opacity: 0.219764804782011; animation-delay: 11.160607922903676s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 11.16151364789425%; top: 37.5019201099699%; width: 1px; height: 1px; --star-opacity: 0.2360259824258314; animation-delay: 12.464721663110613s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 54.86954263892863%; top: 50.1313893716576%; width: 1px; height: 1px; --star-opacity: 0.23243768056226471; animation-delay: 9.134957104707295s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 85.81962850144468%; top: 25.44928325736976%; width: 1px; height: 1px; --star-opacity: 0.1451427399152601; animation-delay: 9.139750945843593s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 74.21880789323555%; top: 28.195714253840766%; width: 1px; height: 1px; --star-opacity: 0.2184084165276335; animation-delay: 10.135390057093383s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 60.917513898693564%; top: 21.041185597815016%; width: 1px; height: 1px; --star-opacity: 0.1332861361420822; animation-delay: 13.11868445141978s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 98.27390281916195%; top: 7.168581857461998%; width: 1px; height: 1px; --star-opacity: 0.24178306136340671; animation-delay: 13.003412089738575s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 55.599626202465835%; top: 37.69806782614719%; width: 1px; height: 1px; --star-opacity: 0.1527752098797307; animation-delay: 9.949327685901853s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 61.4315599347987%; top: 99.04441015481125%; width: 1px; height: 1px; --star-opacity: 0.18683180115242787; animation-delay: 12.913872168405687s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 96.84500244617108%; top: 7.164754618282643%; width: 1px; height: 1px; --star-opacity: 0.243301548436189; animation-delay: 13.603089368948758s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 38.822930918621566%; top: 47.77886805231727%; width: 1px; height: 1px; --star-opacity: 0.23628567734099665; animation-delay: 12.70314770657745s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 14.961200232979%; top: 20.067044000179802%; width: 1px; height: 1px; --star-opacity: 0.17872229799176786; animation-delay: 10.51811724905064s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 22.579644660781383%; top: 67.68876133704997%; width: 1px; height: 1px; --star-opacity: 0.1779294413875678; animation-delay: 11.79936087635129s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 57.29039378974464%; top: 87.94405445679581%; width: 1px; height: 1px; --star-opacity: 0.11362077311069904; animation-delay: 12.88481056768093s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 22.644958540172244%; top: 83.87854293191556%; width: 1px; height: 1px; --star-opacity: 0.21183684135797903; animation-delay: 9.089237428445987s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 56.559673830057044%; top: 68.23932206794848%; width: 1px; height: 1px; --star-opacity: 0.22963395779686374; animation-delay: 11.085328031198152s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 77.60271193582882%; top: 62.90360751548666%; width: 1px; height: 1px; --star-opacity: 0.19448807337862956; animation-delay: 10.673963234479743s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 36.8880350022027%; top: 77.38841538217231%; width: 1px; height: 1px; --star-opacity: 0.16396312135807684; animation-delay: 10.93671636272475s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 97.36778606208404%; top: 31.42467486180387%; width: 1px; height: 1px; --star-opacity: 0.14469682880723633; animation-delay: 12.131204230550349s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 75.82395091445684%; top: 45.06179173789544%; width: 1px; height: 1px; --star-opacity: 0.1806291368535071; animation-delay: 9.987161184587842s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 37.40055536572269%; top: 89.2329518384451%; width: 1px; height: 1px; --star-opacity: 0.08979371092088331; animation-delay: 13.619959718691844s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 64.69556426957847%; top: 35.806311049688865%; width: 1px; height: 1px; --star-opacity: 0.19898324047882668; animation-delay: 12.057499742496606s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 11.241807945866434%; top: 56.731880524537004%; width: 1px; height: 1px; --star-opacity: 0.2486991104385317; animation-delay: 10.114841860570884s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 33.32957710603633%; top: 2.3052145552606484%; width: 1px; height: 1px; --star-opacity: 0.21503590595861616; animation-delay: 13.53473778241472s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 28.551547712969626%; top: 61.144283308733215%; width: 1px; height: 1px; --star-opacity: 0.14351426479466972; animation-delay: 10.40616085181579s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 32.11564172170903%; top: 19.020666436872304%; width: 1px; height: 1px; --star-opacity: 0.182795913349527; animation-delay: 13.65758333989708s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 42.03325654986961%; top: 73.29087548180337%; width: 1px; height: 1px; --star-opacity: 0.24482434240139506; animation-delay: 12.120190091489205s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 82.6870048581945%; top: 71.78839424926639%; width: 1px; height: 1px; --star-opacity: 0.22652966497166332; animation-delay: 13.264845513417576s;"></span><span _ngcontent-ng-c606756069="" class="background-star" style="left: 56.443638659179896%; top: 52.073745554630925%; width: 1px; height: 1px; --star-opacity: 0.24243945468094086; animation-delay: 12.857917493724747s;"></span><!--container--></div><div _ngcontent-ng-c606756069="" aria-hidden="true" class="stars"><span _ngcontent-ng-c606756069="" class="star star-1"></span><span _ngcontent-ng-c606756069="" class="star star-2"></span><span _ngcontent-ng-c606756069="" class="star star-3"></span><span _ngcontent-ng-c606756069="" class="star star-4"></span><span _ngcontent-ng-c606756069="" class="star star-5"></span><span _ngcontent-ng-c606756069="" class="star star-6"></span><span _ngcontent-ng-c606756069="" class="star star-7"></span><span _ngcontent-ng-c606756069="" class="star star-8"></span><span _ngcontent-ng-c606756069="" class="star star-9"></span><span _ngcontent-ng-c606756069="" class="star star-10"></span><span _ngcontent-ng-c606756069="" class="star star-11"></span><span _ngcontent-ng-c606756069="" class="star star-12"></span></div><div _ngcontent-ng-c606756069="" aria-hidden="true" class="celestial-events"><!--container--></div><div _ngcontent-ng-c606756069="" class="persistent-scene"><div _ngcontent-ng-c606756069="" class="celestial-system"><svg _ngcontent-ng-c606756069="" viewBox="0 0 1200 700" aria-hidden="true" class="orbit"><ellipse _ngcontent-ng-c606756069="" cx="400" cy="350" rx="400" ry="250" pathLength="1000" class="companion-orbit companion-one-orbit"></ellipse><ellipse _ngcontent-ng-c606756069="" cx="800" cy="350" rx="400" ry="250" pathLength="1000" class="companion-orbit companion-two-orbit"></ellipse><g _ngcontent-ng-c606756069="" class="orbit-intersections"><g _ngcontent-ng-c606756069="" transform="translate(600 170)"><line _ngcontent-ng-c606756069="" x1="-8" y1="-8" x2="8" y2="8"></line><line _ngcontent-ng-c606756069="" x1="8" y1="-8" x2="-8" y2="8"></line></g><g _ngcontent-ng-c606756069="" transform="translate(600 530)"><line _ngcontent-ng-c606756069="" x1="-8" y1="-8" x2="8" y2="8"></line><line _ngcontent-ng-c606756069="" x1="8" y1="-8" x2="-8" y2="8"></line></g></g><g _ngcontent-ng-c606756069="" class="companion-star companion-star-one" transform="translate(600 350)"><circle _ngcontent-ng-c606756069="" cx="0" cy="0" r="38" class="star-glow"></circle><circle _ngcontent-ng-c606756069="" cx="0" cy="0" r="17" class="stellar-body"></circle><g _ngcontent-ng-c606756069="" class="moon-system" transform="translate(0 0)"><circle _ngcontent-ng-c606756069="" cx="0" cy="0" r="5" class="star-moon"></circle><g _ngcontent-ng-c606756069="" class="moon-1-system" transform="translate(0 0)"><circle _ngcontent-ng-c606756069="" cx="0" cy="0" r="4" class="moon-one"></circle></g></g></g><g _ngcontent-ng-c606756069="" class="companion-star companion-star-two" transform="translate(600 350)"><circle _ngcontent-ng-c606756069="" cx="0" cy="0" r="31" class="star-glow"></circle><circle _ngcontent-ng-c606756069="" cx="0" cy="0" r="13" class="stellar-body"></circle></g><g _ngcontent-ng-c606756069="" aria-hidden="true" class="central-star"><circle _ngcontent-ng-c606756069="" cx="600" cy="350" r="145" class="central-star-glow"></circle><path _ngcontent-ng-c606756069="" d="
                            M 600 165
                            L 616 334
                            L 600 350
                            L 584 334
                            Z

                            M 785 350
                            L 616 366
                            L 600 350
                            L 616 334
                            Z

                            M 600 535
                            L 584 366
                            L 600 350
                            L 616 366
                            Z

                            M 415 350
                            L 584 334
                            L 600 350
                            L 584 366
                            Z
                        " class="central-star-rays"></path></g></svg><img _ngcontent-ng-c606756069="" src="assets/logo.png" alt="Game logo" class="game-logo"></div><div _ngcontent-ng-c606756069="" class="title-content"><h1 _ngcontent-ng-c606756069="">KERRSYZYGY</h1><button _ngcontent-ng-c606756069="" type="button" id="remember" class="" jsaction="click:;"> REMEMBER </button></div></div></div></app-title></div><div _ngcontent-ng-c1022837747="" class="login-layer"><app-login _ngcontent-ng-c1022837747="" _nghost-ng-c2590426810="" ngh="1"><div _ngcontent-ng-c2590426810="" class="login-screen"><div _ngcontent-ng-c2590426810="" aria-hidden="true" class="background-stars"><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 93.14681139940966%; top: 14.844966584149244%; width: 1px; height: 1px; --star-opacity: 0.2252281989159695; animation-delay: 1.6355419450119746s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 34.873511109271874%; top: 0.43591256865521677%; width: 1px; height: 1px; --star-opacity: 0.23345768337435457; animation-delay: 1.4482965836000015s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 35.33381415409802%; top: 46.30571271716941%; width: 1px; height: 1px; --star-opacity: 0.11744126403167623; animation-delay: 0.03500807270207934s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 32.84980579847726%; top: 11.983874865142264%; width: 1px; height: 1px; --star-opacity: 0.11296732058812065; animation-delay: 1.934463552439383s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 24.60744126239389%; top: 57.288043678318054%; width: 1px; height: 1px; --star-opacity: 0.09565228137799678; animation-delay: 1.904759896601484s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 59.24469545513513%; top: 34.39295350933067%; width: 2px; height: 2px; --star-opacity: 0.10468460207542091; animation-delay: 2.3808539618294002s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 37.379914956091675%; top: 32.653164859607905%; width: 1px; height: 1px; --star-opacity: 0.13676797645526922; animation-delay: 2.445429987362287s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 69.77950472937441%; top: 87.57066321079773%; width: 1px; height: 1px; --star-opacity: 0.21812142385727407; animation-delay: 0.09736191587372822s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 26.28722811590325%; top: 48.102464601034626%; width: 2px; height: 2px; --star-opacity: 0.2281372974225242; animation-delay: 1.8664168048446397s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 80.81240276446023%; top: 75.6132804057613%; width: 1px; height: 1px; --star-opacity: 0.1448652343923777; animation-delay: 2.2311877677915555s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 28.230795896119076%; top: 90.38726442232604%; width: 1px; height: 1px; --star-opacity: 0.0932005810526803; animation-delay: 1.495345262077907s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 82.45497168582509%; top: 34.14646523892456%; width: 1px; height: 1px; --star-opacity: 0.10643549845438931; animation-delay: 0.3768585088401208s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 13.053200698941492%; top: 87.9985844410029%; width: 1px; height: 1px; --star-opacity: 0.15831383070095287; animation-delay: 0.4389048892320446s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 16.661291742794027%; top: 88.35040202754301%; width: 1px; height: 1px; --star-opacity: 0.16933618159802222; animation-delay: 0.9283761522771378s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 34.44387324743917%; top: 15.795447645773342%; width: 1px; height: 1px; --star-opacity: 0.16838781162774147; animation-delay: 0.28229461841028286s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 17.902823730888418%; top: 85.11097323474756%; width: 1px; height: 1px; --star-opacity: 0.15675549254704038; animation-delay: 0.8644164544754043s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 30.541233962512372%; top: 1.0753998728240899%; width: 1px; height: 1px; --star-opacity: 0.09608264985053586; animation-delay: 0.9701857013983578s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 52.37810599967118%; top: 12.526437890384257%; width: 1px; height: 1px; --star-opacity: 0.227483454494685; animation-delay: 1.035951923082174s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 17.90802003143862%; top: 84.26280694451572%; width: 1px; height: 1px; --star-opacity: 0.1651603100034206; animation-delay: 1.8719610910627096s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 62.20439228704924%; top: 73.69732391748877%; width: 1px; height: 1px; --star-opacity: 0.20943174130010406; animation-delay: 1.3059212139649332s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 67.46927406234717%; top: 73.77542955150228%; width: 1px; height: 1px; --star-opacity: 0.13191627210843904; animation-delay: 1.666053692654221s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 45.91178378256265%; top: 26.183087941365535%; width: 1px; height: 1px; --star-opacity: 0.16610864086902127; animation-delay: 2.070169165825539s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 35.52356998694547%; top: 33.70559063142419%; width: 1px; height: 1px; --star-opacity: 0.1848349735561658; animation-delay: 1.0033803972332933s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 99.79475755690129%; top: 8.921391473364848%; width: 2px; height: 2px; --star-opacity: 0.14895698849033123; animation-delay: 1.748708833780054s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 54.275624370428744%; top: 27.488034951576%; width: 1px; height: 1px; --star-opacity: 0.23385868160807288; animation-delay: 2.3968381651684263s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 4.881007417994954%; top: 47.39817978258857%; width: 1px; height: 1px; --star-opacity: 0.1943797395766207; animation-delay: 0.13852701851320148s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 86.34871836334746%; top: 16.964745162922934%; width: 1px; height: 1px; --star-opacity: 0.10094778030669731; animation-delay: 1.8329389717948994s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 43.07497490659992%; top: 48.7301905310709%; width: 1px; height: 1px; --star-opacity: 0.13750148800957418; animation-delay: 0.44987407815099717s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 73.02751254564399%; top: 92.0258700593386%; width: 1px; height: 1px; --star-opacity: 0.1322202360879533; animation-delay: 2.2845422192037916s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 60.444238685930344%; top: 65.12883705612968%; width: 1px; height: 1px; --star-opacity: 0.09281797912401021; animation-delay: 0.49785452789973983s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 34.39230293676804%; top: 80.6592779491069%; width: 1px; height: 1px; --star-opacity: 0.20566131034321417; animation-delay: 0.3072388483284136s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 23.3497333500194%; top: 41.20469455585079%; width: 1px; height: 1px; --star-opacity: 0.09325087078110145; animation-delay: 2.4274484440770445s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 31.88897048910906%; top: 58.24524444380277%; width: 1px; height: 1px; --star-opacity: 0.2341556287273937; animation-delay: 2.192889783074019s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 7.65427477725118%; top: 7.822452815156778%; width: 1px; height: 1px; --star-opacity: 0.16633937112118788; animation-delay: 1.5307227980331148s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 97.5464928434474%; top: 86.11620336082865%; width: 1px; height: 1px; --star-opacity: 0.11917598348465971; animation-delay: 1.3762332236596033s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 43.52131902592775%; top: 48.485191147518606%; width: 1px; height: 1px; --star-opacity: 0.16886879504063482; animation-delay: 2.2205254845612927s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 56.89868885599743%; top: 88.97628267584976%; width: 1px; height: 1px; --star-opacity: 0.16929574099088202; animation-delay: 1.302443782031166s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 7.783139533787676%; top: 48.67786067475557%; width: 1px; height: 1px; --star-opacity: 0.1820503378042409; animation-delay: 0.4572969887248965s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 10.42166565665612%; top: 78.65191684822913%; width: 1px; height: 1px; --star-opacity: 0.1468824988156007; animation-delay: 0.6002684187821533s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 93.57952728466785%; top: 23.626135969991545%; width: 1px; height: 1px; --star-opacity: 0.08707361009561791; animation-delay: 1.2117236230322892s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 46.43243553286835%; top: 93.72697943936227%; width: 1px; height: 1px; --star-opacity: 0.21541308275921212; animation-delay: 0.7849832281409425s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 56.68170501339114%; top: 24.24134013519691%; width: 1px; height: 1px; --star-opacity: 0.10537531890955769; animation-delay: 1.0732673158733648s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 98.351319883473%; top: 87.84052687695667%; width: 1px; height: 1px; --star-opacity: 0.20429882975132435; animation-delay: 2.474432017463698s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 6.600157481710445%; top: 85.59879319050918%; width: 1px; height: 1px; --star-opacity: 0.11196365600788011; animation-delay: 1.4052807931906244s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 42.73000744422916%; top: 16.975507603000516%; width: 1px; height: 1px; --star-opacity: 0.21079570995479363; animation-delay: 0.7918821324294528s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 30.083070364210318%; top: 24.882604351765913%; width: 1px; height: 1px; --star-opacity: 0.15112166495732232; animation-delay: 1.6604400912378272s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 63.652078990304005%; top: 54.650575065852%; width: 1px; height: 1px; --star-opacity: 0.13356621704820978; animation-delay: 0.1915491086564064s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 8.260862067021435%; top: 17.74740423252149%; width: 1px; height: 1px; --star-opacity: 0.09813289550379777; animation-delay: 2.459128174322605s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 75.39086498411478%; top: 37.621824192946804%; width: 1px; height: 1px; --star-opacity: 0.20636553239760497; animation-delay: 0.3990619459610553s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 68.5451772962577%; top: 75.55622192015392%; width: 1px; height: 1px; --star-opacity: 0.19427300089666769; animation-delay: 1.952998034909697s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 79.28092037873039%; top: 42.66592712095642%; width: 1px; height: 1px; --star-opacity: 0.17114171652808569; animation-delay: 2.366005565893877s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 8.295624622476227%; top: 68.04021938393234%; width: 1px; height: 1px; --star-opacity: 0.16816782823240828; animation-delay: 1.7213632701850392s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 33.84997109647442%; top: 30.414791929021355%; width: 1px; height: 1px; --star-opacity: 0.22070362636582025; animation-delay: 2.3606953236706625s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 16.23603160519912%; top: 30.88892210497889%; width: 1px; height: 1px; --star-opacity: 0.24084822586815452; animation-delay: 0.9378745691412151s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 8.306175819233152%; top: 5.3773340096916815%; width: 1px; height: 1px; --star-opacity: 0.21829800234650976; animation-delay: 1.245779898429142s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 19.6726872380226%; top: 70.70126501840778%; width: 1px; height: 1px; --star-opacity: 0.1388643705012968; animation-delay: 2.0411880922620043s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 42.77554620661014%; top: 51.642945068489986%; width: 1px; height: 1px; --star-opacity: 0.22914929805600986; animation-delay: 0.7173778289219244s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 34.67156818046576%; top: 28.46316515541254%; width: 2px; height: 2px; --star-opacity: 0.21763952783840235; animation-delay: 0.39529655087656573s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 5.976377820923428%; top: 2.71189370097048%; width: 1px; height: 1px; --star-opacity: 0.10190449854165881; animation-delay: 0.3691724532271848s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 14.077402708099795%; top: 16.959442695756334%; width: 2px; height: 2px; --star-opacity: 0.24729874272601254; animation-delay: 0.530034375420883s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 44.20516176651545%; top: 38.65890678050681%; width: 1px; height: 1px; --star-opacity: 0.13023082046836043; animation-delay: 1.7554133340660436s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 86.28446033804093%; top: 40.38924017353375%; width: 1px; height: 1px; --star-opacity: 0.11915014160289453; animation-delay: 1.6014372793037084s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 47.04570627795369%; top: 91.4596819173325%; width: 1px; height: 1px; --star-opacity: 0.24332003226647364; animation-delay: 1.3301142379814392s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 64.56168706134498%; top: 64.1732755161183%; width: 1px; height: 1px; --star-opacity: 0.1642712461444271; animation-delay: 2.1904029210196785s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 99.00178182189671%; top: 24.99926252100767%; width: 1px; height: 1px; --star-opacity: 0.11643475841326922; animation-delay: 1.9394892062926123s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 7.593928427356033%; top: 86.99843936436523%; width: 1px; height: 1px; --star-opacity: 0.21455048294505624; animation-delay: 1.0945343882873413s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 16.62527993418702%; top: 41.8829106557126%; width: 1px; height: 1px; --star-opacity: 0.16468703031513077; animation-delay: 0.14735786562236647s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 96.61629832261379%; top: 23.8359185528619%; width: 1px; height: 1px; --star-opacity: 0.10928097946626425; animation-delay: 0.22378879769805682s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 88.92588435481528%; top: 74.92419828233959%; width: 1px; height: 1px; --star-opacity: 0.22456220031275098; animation-delay: 2.1262390648672453s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 43.85991619265618%; top: 82.5342831543609%; width: 2px; height: 2px; --star-opacity: 0.22072499224631886; animation-delay: 0.333197425112744s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 3.2845255737234957%; top: 98.0705835611882%; width: 1px; height: 1px; --star-opacity: 0.08997903788369699; animation-delay: 0.5620369061361432s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 97.80587912129826%; top: 76.8368724436723%; width: 1px; height: 1px; --star-opacity: 0.19389665998026; animation-delay: 1.8664726518903256s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 11.124539787350752%; top: 50.75276059649529%; width: 1px; height: 1px; --star-opacity: 0.22653475842977205; animation-delay: 0.41027124080488087s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 25.024231832977783%; top: 79.78045522181426%; width: 1px; height: 1px; --star-opacity: 0.10696700798313159; animation-delay: 1.6227233999494035s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 81.85549225852291%; top: 61.13233472460487%; width: 1px; height: 1px; --star-opacity: 0.11071752749834474; animation-delay: 2.4477582156657993s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 46.174462271259934%; top: 77.4241005373432%; width: 1px; height: 1px; --star-opacity: 0.0829550392353189; animation-delay: 1.9516744275135438s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 23.27685988559344%; top: 16.00366231217617%; width: 1px; height: 1px; --star-opacity: 0.1750549798602275; animation-delay: 0.48977416693635645s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 24.96251477356547%; top: 71.93197858962057%; width: 2px; height: 2px; --star-opacity: 0.24225833982007905; animation-delay: 0.5499360531236106s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 58.84337847315615%; top: 93.41991254266094%; width: 1px; height: 1px; --star-opacity: 0.10710494222877287; animation-delay: 2.335956894774282s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 24.43650930299428%; top: 5.157182950398287%; width: 1px; height: 1px; --star-opacity: 0.21042332893202803; animation-delay: 0.30545529422167095s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 18.971573360794302%; top: 39.39501396664254%; width: 1px; height: 1px; --star-opacity: 0.22952764618218763; animation-delay: 1.2997311772165552s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 75.29502683265626%; top: 62.05599135934419%; width: 1px; height: 1px; --star-opacity: 0.12674042947426745; animation-delay: 2.031948788879452s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 21.43363508768119%; top: 69.37927414273585%; width: 1px; height: 1px; --star-opacity: 0.08842032143766586; animation-delay: 1.7361786007091737s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 62.73312708333566%; top: 67.84437582798304%; width: 1px; height: 1px; --star-opacity: 0.10630176202088934; animation-delay: 0.5582312941287246s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 58.40171031611832%; top: 93.43502836315251%; width: 1px; height: 1px; --star-opacity: 0.08851887702304514; animation-delay: 1.112777738664702s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 99.58990234115156%; top: 64.24665653485566%; width: 1px; height: 1px; --star-opacity: 0.09241443224738266; animation-delay: 1.9209898907602387s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 5.083237356936554%; top: 77.88528273017874%; width: 1px; height: 1px; --star-opacity: 0.1911727346770673; animation-delay: 1.5692258714105098s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 69.53336847228569%; top: 48.69567668502576%; width: 1px; height: 1px; --star-opacity: 0.18762985824799192; animation-delay: 2.20290642064969s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 0.893059456081069%; top: 69.61958789671417%; width: 2px; height: 2px; --star-opacity: 0.21694407533390608; animation-delay: 1.4787712927935728s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 41.034511420256024%; top: 32.25112766687969%; width: 1px; height: 1px; --star-opacity: 0.1500688769968987; animation-delay: 2.2643759402225903s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 74.94584552486153%; top: 5.401245775315521%; width: 1px; height: 1px; --star-opacity: 0.21277534513009577; animation-delay: 2.005101547865201s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 11.640776295057831%; top: 2.396080956587443%; width: 2px; height: 2px; --star-opacity: 0.2434054207312893; animation-delay: 1.0277692817744974s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 25.255797781658572%; top: 8.875504095576026%; width: 1px; height: 1px; --star-opacity: 0.24838394862588536; animation-delay: 1.9692583463802134s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 62.9942963576516%; top: 32.16657912082044%; width: 1px; height: 1px; --star-opacity: 0.22115830328645292; animation-delay: 2.359538146018271s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 75.0640499007774%; top: 15.233446252276984%; width: 1px; height: 1px; --star-opacity: 0.08671945176578406; animation-delay: 1.4269450621950444s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 60.36661875140459%; top: 21.69678505095769%; width: 1px; height: 1px; --star-opacity: 0.22369133081902576; animation-delay: 1.549792756751571s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 64.79893788668664%; top: 97.81179135710609%; width: 1px; height: 1px; --star-opacity: 0.0982661797497285; animation-delay: 0.6826372817022502s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 15.511721084971464%; top: 31.249835233935176%; width: 1px; height: 1px; --star-opacity: 0.18799051452491244; animation-delay: 0.5523360394585025s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 65.80463882494708%; top: 17.473229591561168%; width: 1px; height: 1px; --star-opacity: 0.10902423065139047; animation-delay: 0.050259926628391516s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 31.07319330388083%; top: 1.6802705308945232%; width: 1px; height: 1px; --star-opacity: 0.1897155387162768; animation-delay: 0.4636657400177077s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 78.7648113412274%; top: 7.054864840572006%; width: 1px; height: 1px; --star-opacity: 0.189027455693698; animation-delay: 1.1958344898193143s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 78.30818994603831%; top: 81.26821974432424%; width: 1px; height: 1px; --star-opacity: 0.16248127101767806; animation-delay: 1.8891007415060235s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 8.513017397477785%; top: 13.725208844728776%; width: 1px; height: 1px; --star-opacity: 0.1459649980595235; animation-delay: 1.4635507003424486s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 24.82384187297385%; top: 47.8227116283658%; width: 1px; height: 1px; --star-opacity: 0.10506150865265226; animation-delay: 0.9210070499468392s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 77.51390624857838%; top: 70.29292787543015%; width: 1px; height: 1px; --star-opacity: 0.24843211067142745; animation-delay: 2.260300433224945s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 21.356036350348706%; top: 70.9669755981033%; width: 1px; height: 1px; --star-opacity: 0.2296395653149647; animation-delay: 0.5566286809626342s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 41.24340639617303%; top: 54.45241751425529%; width: 1px; height: 1px; --star-opacity: 0.12941832962400351; animation-delay: 0.560028541521618s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 97.03272037816497%; top: 67.57172857255433%; width: 1px; height: 1px; --star-opacity: 0.15195154254682436; animation-delay: 0.002685705573946262s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 53.968428364772045%; top: 91.5584966564633%; width: 1px; height: 1px; --star-opacity: 0.11281341393787699; animation-delay: 2.448341805846345s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 58.28366721555177%; top: 99.4931288621741%; width: 1px; height: 1px; --star-opacity: 0.17776828912269316; animation-delay: 2.2277400000320986s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 49.526787266453844%; top: 2.782733635241852%; width: 1px; height: 1px; --star-opacity: 0.21362117658609336; animation-delay: 2.052635596395293s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 34.34210181828698%; top: 94.79103644570071%; width: 1px; height: 1px; --star-opacity: 0.19143942444463533; animation-delay: 2.1030476596768386s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 78.75188258772232%; top: 78.27501104378916%; width: 1px; height: 1px; --star-opacity: 0.19598953932697566; animation-delay: 2.0732510709807888s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 86.90620235234562%; top: 49.90231346022177%; width: 1px; height: 1px; --star-opacity: 0.1864373952664778; animation-delay: 1.126451480633904s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 20.28316114986971%; top: 69.00643036312289%; width: 1px; height: 1px; --star-opacity: 0.23459084650637768; animation-delay: 1.8988911318636656s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 19.88136881782743%; top: 83.54327852315078%; width: 1px; height: 1px; --star-opacity: 0.1567204705242372; animation-delay: 0.2981795027539097s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 61.009501721071715%; top: 46.314322399754616%; width: 1px; height: 1px; --star-opacity: 0.2219965686248036; animation-delay: 0.5299621357143312s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 9.5423458140393%; top: 83.44010094630407%; width: 1px; height: 1px; --star-opacity: 0.18966805042902743; animation-delay: 0.30819984215268437s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 67.3902283507082%; top: 86.0794357647645%; width: 1px; height: 1px; --star-opacity: 0.24329794315816333; animation-delay: 2.1344166062686902s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 62.01740138850261%; top: 32.574845441496414%; width: 1px; height: 1px; --star-opacity: 0.22947286352295254; animation-delay: 1.5307206780038949s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 30.247940904373426%; top: 71.23858218822417%; width: 1px; height: 1px; --star-opacity: 0.1041308904111692; animation-delay: 0.5736414712501572s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 42.2200733327177%; top: 86.82138365322346%; width: 1px; height: 1px; --star-opacity: 0.14863437165253254; animation-delay: 0.6888578878727758s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 31.25833803031608%; top: 67.59555020979192%; width: 1px; height: 1px; --star-opacity: 0.15812018850651322; animation-delay: 1.4334089600089153s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 65.947309868255%; top: 54.61520784379873%; width: 1px; height: 1px; --star-opacity: 0.2421498429233906; animation-delay: 0.761088494319806s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 11.810656264181452%; top: 68.14774263878377%; width: 1px; height: 1px; --star-opacity: 0.20482321741978876; animation-delay: 1.67344088435901s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 77.70081564342765%; top: 60.363983700184335%; width: 1px; height: 1px; --star-opacity: 0.15012108255443055; animation-delay: 1.801627087897443s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 95.87831667563252%; top: 55.205079930118316%; width: 1px; height: 1px; --star-opacity: 0.1039389355387878; animation-delay: 0.12715410008286382s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 50.778027295776575%; top: 5.718723694334971%; width: 1px; height: 1px; --star-opacity: 0.2113608007897555; animation-delay: 0.1995633077875772s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 45.94128896193271%; top: 2.6252317844777995%; width: 1px; height: 1px; --star-opacity: 0.24775863956097943; animation-delay: 0.25912270330935877s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 35.014519081619454%; top: 38.757123058233645%; width: 1px; height: 1px; --star-opacity: 0.23511716417697082; animation-delay: 1.633432173253008s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 17.328958331465603%; top: 14.70073083142286%; width: 1px; height: 1px; --star-opacity: 0.11239199210328464; animation-delay: 2.4217558030899253s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 69.68610833258916%; top: 26.41316680376069%; width: 1px; height: 1px; --star-opacity: 0.1444263827291035; animation-delay: 0.4598845876430144s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 44.11648804729086%; top: 99.24302855078075%; width: 1px; height: 1px; --star-opacity: 0.235547619595659; animation-delay: 0.2856654665351577s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 40.48435170545969%; top: 15.750602758125298%; width: 1px; height: 1px; --star-opacity: 0.15238727335531682; animation-delay: 1.973404582725467s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 36.29144411343328%; top: 60.56647365785144%; width: 1px; height: 1px; --star-opacity: 0.20514953552935433; animation-delay: 1.8007820218727724s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 73.07127411994905%; top: 25.625327366338947%; width: 1px; height: 1px; --star-opacity: 0.20114976451913882; animation-delay: 1.4762910877626871s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 59.111412897020635%; top: 58.00024960269609%; width: 1px; height: 1px; --star-opacity: 0.10272382872898267; animation-delay: 0.4934469052667728s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 94.91211037508324%; top: 17.582940193406838%; width: 1px; height: 1px; --star-opacity: 0.20262502846308655; animation-delay: 1.9628883503786811s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 8.996133846965726%; top: 4.2161206342314905%; width: 1px; height: 1px; --star-opacity: 0.0875896516331677; animation-delay: 1.843435999580634s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 41.29851898477821%; top: 66.84733025550602%; width: 1px; height: 1px; --star-opacity: 0.09619663687204989; animation-delay: 1.7655766247968538s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 24.67250241224461%; top: 99.211110676554%; width: 2px; height: 2px; --star-opacity: 0.10908562816291245; animation-delay: 0.24050706020912194s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 87.07492265482672%; top: 98.36696673163576%; width: 1px; height: 1px; --star-opacity: 0.15090371511596246; animation-delay: 1.2155809366833026s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 75.43171456319718%; top: 46.30824085026799%; width: 2px; height: 2px; --star-opacity: 0.1548129390127222; animation-delay: 1.6880950755056192s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 63.60556476871675%; top: 36.70384082921688%; width: 1px; height: 1px; --star-opacity: 0.1797694698375739; animation-delay: 2.173474827367762s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 51.79614779569518%; top: 74.61664551186108%; width: 1px; height: 1px; --star-opacity: 0.17473451185832697; animation-delay: 1.668817401875471s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 97.6319773929842%; top: 81.41962902083793%; width: 1px; height: 1px; --star-opacity: 0.24104212904216005; animation-delay: 2.461957110118956s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 37.49285123255783%; top: 37.737390560898184%; width: 1px; height: 1px; --star-opacity: 0.21270259867780333; animation-delay: 0.8441083933023898s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 6.9366038070907905%; top: 2.5001079674281668%; width: 1px; height: 1px; --star-opacity: 0.23241467139105731; animation-delay: 2.286023685728568s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 70.55942691870979%; top: 71.71016825099667%; width: 2px; height: 2px; --star-opacity: 0.1354914534644876; animation-delay: 2.0542843384169123s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 3.1764929143513365%; top: 35.1485075197928%; width: 1px; height: 1px; --star-opacity: 0.16087387358188643; animation-delay: 1.0930560455371667s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 4.904629041780106%; top: 73.37226684731829%; width: 1px; height: 1px; --star-opacity: 0.20160264319766247; animation-delay: 0.4040115888272672s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 79.84524155750468%; top: 18.988023215573158%; width: 1px; height: 1px; --star-opacity: 0.2310752235988387; animation-delay: 2.2937981225331407s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 56.45206691233401%; top: 65.03759455405529%; width: 1px; height: 1px; --star-opacity: 0.143777357970843; animation-delay: 1.4826066508824707s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 65.92880063387982%; top: 94.43437824195493%; width: 2px; height: 2px; --star-opacity: 0.15935566063326523; animation-delay: 1.6462573952971287s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 49.64760095078184%; top: 77.05124704126467%; width: 1px; height: 1px; --star-opacity: 0.2256761201362648; animation-delay: 0.718625081369537s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 33.326492067456485%; top: 46.326856797941495%; width: 1px; height: 1px; --star-opacity: 0.1477319567004482; animation-delay: 1.4675039934365244s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 92.9685368328194%; top: 63.25341287731374%; width: 1px; height: 1px; --star-opacity: 0.1241682465352851; animation-delay: 1.9367090812898333s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 83.59144111974089%; top: 28.663067278011546%; width: 1px; height: 1px; --star-opacity: 0.1035669879811433; animation-delay: 1.8702780524773268s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 99.19093107247042%; top: 43.866231392529286%; width: 1px; height: 1px; --star-opacity: 0.19157373468882244; animation-delay: 0.20414925625405228s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 17.33141619442734%; top: 95.99340916753832%; width: 1px; height: 1px; --star-opacity: 0.21963459029500337; animation-delay: 1.2519124636251064s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 61.38732206622167%; top: 56.934553982187076%; width: 1px; height: 1px; --star-opacity: 0.22033016273653888; animation-delay: 1.9633187133379424s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 97.63734208731051%; top: 75.94093021764274%; width: 1px; height: 1px; --star-opacity: 0.09290406431549769; animation-delay: 2.060951829137986s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 94.35444110573191%; top: 24.933887893349105%; width: 1px; height: 1px; --star-opacity: 0.22087571751205626; animation-delay: 1.8020933849125333s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 64.50158104768697%; top: 90.56111547418301%; width: 1px; height: 1px; --star-opacity: 0.09013379723851293; animation-delay: 0.4434878962953817s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 98.75792111170881%; top: 7.355854074724444%; width: 2px; height: 2px; --star-opacity: 0.12044348480148945; animation-delay: 1.074636801061615s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 73.77213156844553%; top: 33.55563316560286%; width: 2px; height: 2px; --star-opacity: 0.24893586887811064; animation-delay: 1.3469245970671704s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 17.618052408765394%; top: 28.665875530872786%; width: 1px; height: 1px; --star-opacity: 0.23027538115244428; animation-delay: 1.5525878520710017s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 41.128767560118696%; top: 63.43416375207478%; width: 1px; height: 1px; --star-opacity: 0.1501144671454774; animation-delay: 0.33639835080016195s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 87.48062346505337%; top: 33.69357193589876%; width: 1px; height: 1px; --star-opacity: 0.19723298641503406; animation-delay: 1.9562194849961627s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 1.52263023173701%; top: 56.13257009675798%; width: 1px; height: 1px; --star-opacity: 0.1471705543756545; animation-delay: 0.09641257980686574s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 81.40200062669723%; top: 70.04480859832583%; width: 1px; height: 1px; --star-opacity: 0.16417164084120994; animation-delay: 0.2599118599104805s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 21.651641427965174%; top: 49.84916832431736%; width: 1px; height: 1px; --star-opacity: 0.11543134746668265; animation-delay: 0.940511535876335s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 44.194616573671574%; top: 48.48517689145393%; width: 2px; height: 2px; --star-opacity: 0.17854292061494398; animation-delay: 1.5872245432725989s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 68.8278976303692%; top: 85.37562825747675%; width: 1px; height: 1px; --star-opacity: 0.2406505268616564; animation-delay: 0.18639364202581388s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 76.18048349256601%; top: 24.82113761820497%; width: 1px; height: 1px; --star-opacity: 0.1337975804275512; animation-delay: 1.1612692775398616s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 14.664900413557891%; top: 20.999686728694122%; width: 1px; height: 1px; --star-opacity: 0.18169898752696886; animation-delay: 1.9152437431720495s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 65.58629250466106%; top: 59.2831963781826%; width: 1px; height: 1px; --star-opacity: 0.16141635454963293; animation-delay: 0.1275290505305543s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 84.70496755569998%; top: 75.1643190969825%; width: 1px; height: 1px; --star-opacity: 0.1276178476673746; animation-delay: 0.4037368355691473s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 41.99931646723387%; top: 60.92811642064131%; width: 2px; height: 2px; --star-opacity: 0.08485720557091393; animation-delay: 0.05607185082501659s;"></span><span _ngcontent-ng-c2590426810="" class="background-star" style="left: 89.4790638233462%; top: 19.89300037976124%; width: 1px; height: 1px; --star-opacity: 0.2214139441373807; animation-delay: 1.7655207646631341s;"></span><!--container--></div><div _ngcontent-ng-c2590426810="" aria-hidden="true" class="stars"><span _ngcontent-ng-c2590426810="" class="star star-1"></span><span _ngcontent-ng-c2590426810="" class="star star-2"></span><span _ngcontent-ng-c2590426810="" class="star star-3"></span><span _ngcontent-ng-c2590426810="" class="star star-4"></span><span _ngcontent-ng-c2590426810="" class="star star-5"></span><span _ngcontent-ng-c2590426810="" class="star star-6"></span><span _ngcontent-ng-c2590426810="" class="star star-7"></span><span _ngcontent-ng-c2590426810="" class="star star-8"></span><span _ngcontent-ng-c2590426810="" class="star star-9"></span><span _ngcontent-ng-c2590426810="" class="star star-10"></span><span _ngcontent-ng-c2590426810="" class="star star-11"></span><span _ngcontent-ng-c2590426810="" class="star star-12"></span></div><main _ngcontent-ng-c2590426810="" class="login-content"><p _ngcontent-ng-c2590426810="" class="journey-text"> CONTINUE YOUR JOURNEY </p><div _ngcontent-ng-c2590426810="" class="google-area"><div _ngcontent-ng-c2590426810="" id="google-button" class="google-button"></div></div><div _ngcontent-ng-c2590426810="" aria-hidden="true" class="login-divider"><span _ngcontent-ng-c2590426810=""></span><em _ngcontent-ng-c2590426810=""> OR </em><span _ngcontent-ng-c2590426810=""></span></div><form _ngcontent-ng-c2590426810="" novalidate="" class="credentials ng-untouched ng-pristine ng-valid" jsaction="submit:;"><div _ngcontent-ng-c2590426810="" class="field"><input _ngcontent-ng-c2590426810="" id="email" name="email" type="email" placeholder=" " autocomplete="email" class="ng-untouched ng-pristine ng-valid" value="" jsaction="input:;blur:;compositionstart:;compositionend:;"><label _ngcontent-ng-c2590426810="" for="email"> EMAIL </label></div><div _ngcontent-ng-c2590426810="" class="field"><input _ngcontent-ng-c2590426810="" id="password" name="password" type="password" placeholder=" " autocomplete="current-password" class="ng-untouched ng-pristine ng-valid" value="" jsaction="input:;blur:;compositionstart:;compositionend:;"><label _ngcontent-ng-c2590426810="" for="password"> PASSWORD </label></div><button _ngcontent-ng-c2590426810="" type="submit" class="login-button"> LOG IN </button></form><!--container--><p _ngcontent-ng-c2590426810="" class="create-account"><span _ngcontent-ng-c2590426810=""> DON'T HAVE AN ACCOUNT? </span><button _ngcontent-ng-c2590426810="" type="button" routerlink="/create-account" class="create-account-button" tabindex="0" jsaction="click:;"> CREATE ONE. </button></p></main></div></app-login></div></div><div _ngcontent-ng-c1022837747="" class="language-container"><button _ngcontent-ng-c1022837747="" type="button" class="language-button" jsaction="click:;"> 🌐 English </button><!--container--></div></app-game-entry><!--container--></app-root>
<script src="main.js" type="module"></script>

<script id="ng-state" type="application/json">{"__nghData__":[{"t":{"3":"t0","19":"t1"},"c":{"3":[{"i":"t0","r":1,"x":180}],"19":[]}},{"t":{"3":"t2","38":"t3"},"c":{"3":[{"i":"t2","r":1,"x":180}],"38":[]}},{"t":{"9":"t4"},"c":{"9":[]}},{"c":{"0":[{"i":"c1022837747","r":1}]}}]}</script></body></html>`;