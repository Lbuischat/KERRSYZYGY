export default `<!DOCTYPE html><html lang="en"><head>
  <meta charset="utf-8">
  <title>KERRSYZYGY</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <script src="https://accounts.google.com/gsi/client" async="" defer=""></script>
<link rel="stylesheet" href="styles.css"><style ng-app-id="ng">
*[_ngcontent-ng-c2916131234] {
  box-sizing: border-box;
}
[_nghost-ng-c2916131234] {
  display: block;
  min-height: 100vh;
  font-family:
    Arial,
    Helvetica,
    sans-serif;
  --background: #030303;
  --surface: rgba(10, 10, 10, 0.65);
  --surface-light: rgba(255, 255, 255, 0.04);
  --border: rgba(255, 255, 255, 0.15);
  --border-hover: rgba(255, 255, 255, 0.4);
  --border-focus: rgba(255, 255, 255, 0.7);
  --text-primary: #ffffff;
  --text-secondary: #bdbdbd;
  --text-muted: rgba(255, 255, 255, 0.5);
  --radius-small: 8px;
  --radius-medium: 10px;
  --radius-large: 20px;
  --transition: 0.2s ease;
}
.start-page[_ngcontent-ng-c2916131234] {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  overflow: hidden;
  background: var(--background);
}
.background-stars[_ngcontent-ng-c2916131234] {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.background-star[_ngcontent-ng-c2916131234] {
  position: absolute;
  border-radius: 50%;
  background: rgb(202, 202, 202);
  opacity: var(--star-opacity);
}
.celestial-events[_ngcontent-ng-c2916131234] {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}
.celestial-event[_ngcontent-ng-c2916131234] {
  position: absolute;
  display: block;
  opacity: 0;
}
.comet[_ngcontent-ng-c2916131234] {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: aliceblue;
  box-shadow:
    0 0 4px rgba(240, 248, 255, 0.8),
    -25px 15px 8px rgba(240, 248, 255, 0.15),
    -50px 30px 12px rgba(240, 248, 255, 0.05);
  animation: _ngcontent-ng-c2916131234_comet-fly var(--event-duration) ease-in-out var(--event-delay) infinite;
}
@keyframes _ngcontent-ng-c2916131234_comet-fly {
  0% {
    opacity: 0;
    transform: translate(0, 0) rotate(-25deg);
  }
  10% {
    opacity: 0.8;
  }
  30% {
    opacity: 0.5;
  }
  45% {
    opacity: 0;
    transform: translate(180px, 110px) rotate(-25deg);
  }
  100% {
    opacity: 0;
    transform: translate(180px, 110px) rotate(-25deg);
  }
}
.meteor[_ngcontent-ng-c2916131234] {
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
  animation: _ngcontent-ng-c2916131234_meteor-fall var(--event-duration) ease-out var(--event-delay) infinite;
}
@keyframes _ngcontent-ng-c2916131234_meteor-fall {
  0% {
    opacity: 0;
    transform: translate(0, 0);
  }
  8% {
    opacity: 0.7;
  }
  35% {
    opacity: 0;
    transform: translate(100px, 100px);
  }
  100% {
    opacity: 0;
    transform: translate(100px, 100px);
  }
}
.stars[_ngcontent-ng-c2916131234] {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}
.star[_ngcontent-ng-c2916131234] {
  position: absolute;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: aliceblue;
  opacity: 0.4;
}
.star-1[_ngcontent-ng-c2916131234] {
  left: 8%;
  top: 20%;
}
.star-2[_ngcontent-ng-c2916131234] {
  left: 18%;
  top: 72%;
}
.star-3[_ngcontent-ng-c2916131234] {
  left: 29%;
  top: 15%;
}
.star-4[_ngcontent-ng-c2916131234] {
  left: 42%;
  top: 10%;
}
.star-5[_ngcontent-ng-c2916131234] {
  left: 57%;
  top: 18%;
}
.star-6[_ngcontent-ng-c2916131234] {
  left: 72%;
  top: 29%;
}
.star-7[_ngcontent-ng-c2916131234] {
  left: 87%;
  top: 65%;
}
.star-8[_ngcontent-ng-c2916131234] {
  left: 75%;
  top: 84%;
}
.star-9[_ngcontent-ng-c2916131234] {
  left: 48%;
  top: 88%;
}
.star-10[_ngcontent-ng-c2916131234] {
  left: 27%;
  top: 84%;
}
.star-11[_ngcontent-ng-c2916131234] {
  left: 12%;
  top: 45%;
}
.star-12[_ngcontent-ng-c2916131234] {
  left: 91%;
  top: 16%;
}
.question-container[_ngcontent-ng-c2916131234] {
  position: relative;
  z-index: 2;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
}
.question-screen[_ngcontent-ng-c2916131234] {
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(700px, calc(100% - 40px));
  text-align: center;
  transform: translate(-50%, -50%);
}
.question-enter[_ngcontent-ng-c2916131234] {
  animation: _ngcontent-ng-c2916131234_question-enter-animation 650ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes _ngcontent-ng-c2916131234_question-enter-animation {
  from {
    opacity: 0;
    transform: translate(-50%, calc(-50% + 110px));
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
.question-leave[_ngcontent-ng-c2916131234] {
  animation: _ngcontent-ng-c2916131234_question-leave-animation 650ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes _ngcontent-ng-c2916131234_question-leave-animation {
  from {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  to {
    opacity: 0;
    transform: translate(-50%, calc(-50% - 120px));
  }
}
.story-screen[_ngcontent-ng-c2916131234], 
.choice-screen[_ngcontent-ng-c2916131234] {
  text-align: center;
}
.choice-screen[_ngcontent-ng-c2916131234] {
  width: min(650px, calc(100% - 40px));
}
.story-content[_ngcontent-ng-c2916131234], 
.choice-content[_ngcontent-ng-c2916131234] {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-large);
  background: var(--surface);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.story-content[_ngcontent-ng-c2916131234] {
  gap: 18px;
  padding: 50px 35px;
}
.choice-content[_ngcontent-ng-c2916131234] {
  padding: 50px 35px;
}
.story-logo[_ngcontent-ng-c2916131234]   img[_ngcontent-ng-c2916131234] {
  display: block;
  width: 100px;
  height: auto;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.4));
  animation: _ngcontent-ng-c2916131234_logoPulse 1.8s ease-in-out infinite alternate;
}
@keyframes _ngcontent-ng-c2916131234_logoPulse {
  from {
    opacity: 0.7;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1.05);
  }
}
.story-text[_ngcontent-ng-c2916131234] {
  margin: 0;
  color: #dedede;
  font-family:
    Garamond,
    Georgia,
    serif;
  font-size: 20px;
  line-height: 1.6;
  letter-spacing: 1px;
}
.eyebrow[_ngcontent-ng-c2916131234] {
  margin: 0 0 10px;
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 4px;
}
.choice-content[_ngcontent-ng-c2916131234]   h1[_ngcontent-ng-c2916131234] {
  margin: 0;
  color: var(--text-primary);
  font-family:
    Garamond,
    Georgia,
    serif;
  font-size: 42px;
  font-weight: 500;
}
.choice-description[_ngcontent-ng-c2916131234] {
  max-width: 450px;
  margin: 15px 0 30px;
  color: var(--text-secondary);
  font-size: 17px;
  line-height: 1.5;
}
.choice-list[_ngcontent-ng-c2916131234] {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  width: 100%;
  max-width: 500px;
}
.choice-button[_ngcontent-ng-c2916131234] {
  padding: 16px 20px;
  border: 1px solid var(--border);
  border-radius: var(--radius-medium);
  color: var(--text-primary);
  background: var(--surface-light);
  font-family: inherit;
  font-size: 15px;
  cursor: pointer;
  transition:
    background-color var(--transition),
    border-color var(--transition),
    transform var(--transition),
    box-shadow var(--transition);
}
.choice-button[_ngcontent-ng-c2916131234]:hover {
  border-color: var(--border-hover);
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}
.choice-button.selected[_ngcontent-ng-c2916131234] {
  border-color: var(--text-primary);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.08);
}
.username-input[_ngcontent-ng-c2916131234] {
  width: 100%;
  max-width: 500px;
  padding: 16px 20px;
  border: 1px solid var(--border);
  border-radius: var(--radius-medium);
  outline: none;
  color: var(--text-primary);
  background: var(--surface-light);
  font-family: inherit;
  font-size: 16px;
  text-align: center;
  transition:
    border-color var(--transition),
    background-color var(--transition),
    box-shadow var(--transition);
}
.username-input[_ngcontent-ng-c2916131234]::placeholder {
  color: rgba(255, 255, 255, 0.3);
}
.username-input[_ngcontent-ng-c2916131234]:hover {
  border-color: var(--border-hover);
}
.username-input[_ngcontent-ng-c2916131234]:focus {
  border-color: var(--border-focus);
  background: rgba(255, 255, 255, 0.07);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.06);
}
.birthday-selects[_ngcontent-ng-c2916131234] {
  display: flex;
  gap: 12px;
  width: 100%;
  max-width: 320px;
  margin-top: 10px;
}
.custom-select[_ngcontent-ng-c2916131234] {
  position: relative;
  flex: 1;
}
.custom-select[_ngcontent-ng-c2916131234]::after {
  content: "\\2304";
  position: absolute;
  top: 50%;
  right: 16px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 18px;
  pointer-events: none;
  transform: translateY(-55%);
}
.custom-select[_ngcontent-ng-c2916131234]   select[_ngcontent-ng-c2916131234] {
  width: 100%;
  padding: 16px 42px 16px 18px;
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid var(--border);
  border-radius: 12px;
  outline: none;
  color: var(--text-primary);
  background: rgba(20, 20, 20, 0.85);
  font-family:
    Garamond,
    Georgia,
    serif;
  font-size: 17px;
  cursor: pointer;
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease,
    box-shadow 0.25s ease;
}
.custom-select[_ngcontent-ng-c2916131234]   select[_ngcontent-ng-c2916131234]:hover {
  border-color: var(--border-hover);
  background: rgba(30, 30, 30, 0.95);
}
.custom-select[_ngcontent-ng-c2916131234]   select[_ngcontent-ng-c2916131234]:focus {
  border-color: var(--border-focus);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.08), 0 0 35px rgba(255, 255, 255, 0.04);
}
.custom-select[_ngcontent-ng-c2916131234]   select[_ngcontent-ng-c2916131234]   option[_ngcontent-ng-c2916131234] {
  color: var(--text-primary);
  background: #101010;
}
.birthday-checkbox[_ngcontent-ng-c2916131234] {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 320px;
  margin-top: 22px;
  color: rgba(255, 255, 255, 0.65);
  font-family:
    Garamond,
    Georgia,
    serif;
  font-size: 16px;
  line-height: 1.3;
  text-align: left;
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}
.birthday-checkbox[_ngcontent-ng-c2916131234]   input[_ngcontent-ng-c2916131234] {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}
.checkbox-box[_ngcontent-ng-c2916131234] {
  position: relative;
  width: 20px;
  height: 20px;
  flex: 0 0 20px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 5px;
  background: var(--surface-light);
  transition:
    border-color var(--transition),
    background-color var(--transition),
    box-shadow var(--transition);
}
.birthday-checkbox[_ngcontent-ng-c2916131234]:hover   .checkbox-box[_ngcontent-ng-c2916131234] {
  border-color: rgba(255, 255, 255, 0.6);
}
.birthday-checkbox[_ngcontent-ng-c2916131234]   input[_ngcontent-ng-c2916131234]:checked    + .checkbox-box[_ngcontent-ng-c2916131234] {
  border-color: var(--text-primary);
  background: var(--text-primary);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.35), 0 0 20px rgba(255, 255, 255, 0.08);
}
.birthday-checkbox[_ngcontent-ng-c2916131234]   input[_ngcontent-ng-c2916131234]:checked    + .checkbox-box[_ngcontent-ng-c2916131234]::after {
  content: "\\2713";
  position: absolute;
  top: 50%;
  left: 50%;
  color: #111;
  font-family: Arial, sans-serif;
  font-size: 13px;
  font-weight: bold;
  transform: translate(-50%, -52%);
}
.continue-button[_ngcontent-ng-c2916131234] {
  margin-top: 25px;
  padding: 13px 30px;
  border: 1px solid var(--text-primary);
  border-radius: var(--radius-small);
  color: #000;
  background: var(--text-primary);
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    transform var(--transition),
    background-color var(--transition),
    color var(--transition),
    box-shadow var(--transition);
}
.choice-content[_ngcontent-ng-c2916131234]   .continue-button[_ngcontent-ng-c2916131234] {
  margin-top: 30px;
}
.continue-button[_ngcontent-ng-c2916131234]:hover:not(:disabled) {
  color: var(--text-primary);
  background: transparent;
  transform: translateY(-2px);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.7), 0 0 25px rgba(255, 255, 255, 0.15);
}
.continue-button[_ngcontent-ng-c2916131234]:active:not(:disabled) {
  transform: scale(0.96);
}
.continue-button[_ngcontent-ng-c2916131234]:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  box-shadow: none;
}
@media (max-width: 600px) {
  .start-page[_ngcontent-ng-c2916131234] {
    padding: 20px;
  }
  .question-screen[_ngcontent-ng-c2916131234] {
    width: calc(100% - 40px);
  }
  .story-content[_ngcontent-ng-c2916131234], 
   .choice-content[_ngcontent-ng-c2916131234] {
    padding: 40px 25px;
  }
  .choice-content[_ngcontent-ng-c2916131234]   h1[_ngcontent-ng-c2916131234] {
    font-size: 34px;
  }
  .choice-list[_ngcontent-ng-c2916131234] {
    grid-template-columns: 1fr;
  }
  .birthday-selects[_ngcontent-ng-c2916131234] {
    flex-direction: column;
  }
  .birthday-checkbox[_ngcontent-ng-c2916131234], 
   .birthday-selects[_ngcontent-ng-c2916131234] {
    max-width: 320px;
  }
}
@media (max-width: 400px) {
  .start-page[_ngcontent-ng-c2916131234] {
    padding: 15px;
  }
  .question-screen[_ngcontent-ng-c2916131234] {
    width: calc(100% - 30px);
  }
  .story-content[_ngcontent-ng-c2916131234], 
   .choice-content[_ngcontent-ng-c2916131234] {
    padding: 35px 20px;
  }
  .story-text[_ngcontent-ng-c2916131234] {
    font-size: 18px;
  }
  .choice-content[_ngcontent-ng-c2916131234]   h1[_ngcontent-ng-c2916131234] {
    font-size: 30px;
  }
  .choice-description[_ngcontent-ng-c2916131234] {
    font-size: 15px;
  }
}
@media (prefers-reduced-motion: reduce) {
  *[_ngcontent-ng-c2916131234], 
   *[_ngcontent-ng-c2916131234]::before, 
   *[_ngcontent-ng-c2916131234]::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
/*# sourceMappingURL=/start.css.map */</style></head>
<body><!--nghm--><script type="text/javascript" id="ng-event-dispatch-contract">(()=>{function p(t,n,r,o,e,i,f,m){return{eventType:t,event:n,targetElement:r,eic:o,timeStamp:e,eia:i,eirp:f,eiack:m}}function u(t){let n=[],r=e=>{n.push(e)};return{c:t,q:n,et:[],etc:[],d:r,h:e=>{r(p(e.type,e,e.target,t,Date.now()))}}}function s(t,n,r){for(let o=0;o<n.length;o++){let e=n[o];(r?t.etc:t.et).push(e),t.c.addEventListener(e,t.h,r)}}function c(t,n,r,o,e=window){let i=u(t);e._ejsas||(e._ejsas={}),e._ejsas[n]=i,s(i,r),s(i,o,!0)}window.__jsaction_bootstrap=c;})();
</script><script>window.__jsaction_bootstrap(document.body,"ng",["click"],[]);</script>
  <app-root ng-version="22.1.3" ngh="1" ng-server-context="ssg"><router-outlet></router-outlet><app-start _nghost-ng-c2916131234="" ngh="0"><main _ngcontent-ng-c2916131234="" class="start-page"><div _ngcontent-ng-c2916131234="" aria-hidden="true" class="background-stars"><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 55.00358225257526%; top: 31.430080023387863%; width: 1px; height: 1px; --star-opacity: 0.10415984693662472;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 66.11879266144955%; top: 74.2807054445643%; width: 1px; height: 1px; --star-opacity: 0.14698561232017598;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 26.213938028331086%; top: 23.489834177341773%; width: 2px; height: 2px; --star-opacity: 0.20214728259808862;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 3.32615747213576%; top: 89.33548162478033%; width: 1px; height: 1px; --star-opacity: 0.21562336285005285;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 0.2039991812751718%; top: 13.54082739350153%; width: 1px; height: 1px; --star-opacity: 0.1574095572319307;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 86.52041581260734%; top: 43.15335487908434%; width: 1px; height: 1px; --star-opacity: 0.1831373986284967;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 23.754372027377702%; top: 67.42160371623487%; width: 1px; height: 1px; --star-opacity: 0.11925584297119968;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 8.265845793196448%; top: 71.26171106251985%; width: 2px; height: 2px; --star-opacity: 0.1982264101210191;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 56.24719588971205%; top: 78.54057498745365%; width: 2px; height: 2px; --star-opacity: 0.10267617231221879;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 34.13814905335193%; top: 34.09099737269926%; width: 1px; height: 1px; --star-opacity: 0.12774721534388878;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 50.99873983947744%; top: 48.25058872479406%; width: 1px; height: 1px; --star-opacity: 0.11585706673217655;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 26.558269613973305%; top: 31.05620413605483%; width: 1px; height: 1px; --star-opacity: 0.23903470828496715;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 28.057174942737806%; top: 98.6550251082967%; width: 1px; height: 1px; --star-opacity: 0.14181750346099378;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 6.356948766053449%; top: 53.108820814730166%; width: 1px; height: 1px; --star-opacity: 0.1791959824384392;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 0.32930039586328563%; top: 95.61620212338019%; width: 1px; height: 1px; --star-opacity: 0.24767324451568673;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 25.52019836180417%; top: 11.974628434837097%; width: 1px; height: 1px; --star-opacity: 0.13571860101791544;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 3.848736890079363%; top: 97.97185153488542%; width: 1px; height: 1px; --star-opacity: 0.11789715702734552;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 81.56326952255031%; top: 18.602523499421153%; width: 1px; height: 1px; --star-opacity: 0.24537225186393397;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 97.56999309233794%; top: 41.401438845122925%; width: 1px; height: 1px; --star-opacity: 0.1412549255623502;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 62.98386919445983%; top: 13.54706136870939%; width: 2px; height: 2px; --star-opacity: 0.17145931442558085;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 73.24428406621288%; top: 13.32863644426121%; width: 1px; height: 1px; --star-opacity: 0.11776318714221323;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 4.67532920542194%; top: 37.52711206692921%; width: 1px; height: 1px; --star-opacity: 0.11009404727324927;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 59.72184739487212%; top: 71.0426092344328%; width: 1px; height: 1px; --star-opacity: 0.18138831562626712;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 30.731053360923%; top: 77.33887527038573%; width: 1px; height: 1px; --star-opacity: 0.08347108916796643;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 64.36616669792019%; top: 41.649982863379975%; width: 1px; height: 1px; --star-opacity: 0.16185483373248055;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 39.68958273341484%; top: 51.00858939358681%; width: 1px; height: 1px; --star-opacity: 0.1501412557533668;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 68.21857409400359%; top: 50.65342516468077%; width: 1px; height: 1px; --star-opacity: 0.16125132642341322;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 11.291208755256864%; top: 33.58807802458729%; width: 1px; height: 1px; --star-opacity: 0.20268695472620646;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 0.6096025996597421%; top: 16.972894325601228%; width: 2px; height: 2px; --star-opacity: 0.14753112416049502;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 39.68992148831572%; top: 33.32991998060082%; width: 1px; height: 1px; --star-opacity: 0.2235724940177543;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 16.812780560318373%; top: 87.85969111297995%; width: 1px; height: 1px; --star-opacity: 0.22377179181663426;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 13.425496906676837%; top: 8.301436138258989%; width: 1px; height: 1px; --star-opacity: 0.23520169907801292;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 30.10277092927677%; top: 11.550757695713587%; width: 1px; height: 1px; --star-opacity: 0.17467380205098476;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 69.9998729825347%; top: 84.01254316272035%; width: 1px; height: 1px; --star-opacity: 0.23688618163727437;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 49.518721863707306%; top: 45.38037658934382%; width: 1px; height: 1px; --star-opacity: 0.1418095779597452;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 5.629552938826022%; top: 9.355619761109146%; width: 1px; height: 1px; --star-opacity: 0.14063685880008558;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 56.882683531192%; top: 88.3260149880329%; width: 2px; height: 2px; --star-opacity: 0.2291691313045514;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 23.974623588901935%; top: 81.10922660603241%; width: 2px; height: 2px; --star-opacity: 0.13170352158358695;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 19.57274089001966%; top: 94.57798664692308%; width: 1px; height: 1px; --star-opacity: 0.13953020303840652;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 52.51526074633394%; top: 48.32096865404083%; width: 1px; height: 1px; --star-opacity: 0.24498207094128072;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 46.51703291559096%; top: 24.415072141714823%; width: 1px; height: 1px; --star-opacity: 0.23231856159383346;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 54.28956142592335%; top: 28.454210211101007%; width: 1px; height: 1px; --star-opacity: 0.08524704509378979;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 62.52605673350793%; top: 98.6466569590609%; width: 1px; height: 1px; --star-opacity: 0.23902753493027645;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 22.401996415017102%; top: 96.87835192908862%; width: 1px; height: 1px; --star-opacity: 0.20371686928664112;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 60.15876808597645%; top: 14.538300292759343%; width: 1px; height: 1px; --star-opacity: 0.17919659597564447;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 24.892289933485166%; top: 78.57776153566331%; width: 1px; height: 1px; --star-opacity: 0.1865638601393243;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 46.394478072912634%; top: 76.02570150587843%; width: 1px; height: 1px; --star-opacity: 0.23750164427003756;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 91.97997528720647%; top: 70.16754997806784%; width: 1px; height: 1px; --star-opacity: 0.1439534620730113;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 33.826761596936514%; top: 57.32684720120924%; width: 1px; height: 1px; --star-opacity: 0.2419643109089924;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 68.33548341072603%; top: 73.30729843759164%; width: 1px; height: 1px; --star-opacity: 0.09231537152023182;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 47.97649637152208%; top: 3.3000871613349414%; width: 1px; height: 1px; --star-opacity: 0.20956906126679153;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 11.157265575136954%; top: 71.35112775238726%; width: 2px; height: 2px; --star-opacity: 0.2052729743140405;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 53.775665571372464%; top: 71.3615359564712%; width: 1px; height: 1px; --star-opacity: 0.10896000358140895;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 58.182765290969684%; top: 78.51456960524474%; width: 1px; height: 1px; --star-opacity: 0.24697557671850978;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 81.68087664254799%; top: 78.08964166337582%; width: 1px; height: 1px; --star-opacity: 0.16455139962941367;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 44.48435730187048%; top: 89.08065458411583%; width: 1px; height: 1px; --star-opacity: 0.1585167335349566;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 58.31003934868724%; top: 86.7468385681839%; width: 1px; height: 1px; --star-opacity: 0.09794812517978772;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 73.58866557193802%; top: 94.17184993802718%; width: 1px; height: 1px; --star-opacity: 0.20697794758432436;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 55.07923438202291%; top: 74.31841550702305%; width: 1px; height: 1px; --star-opacity: 0.15825329313928593;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 47.31691693058394%; top: 54.347044594465565%; width: 1px; height: 1px; --star-opacity: 0.08688910170448667;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 87.09738628817624%; top: 59.914723680084826%; width: 1px; height: 1px; --star-opacity: 0.18877491729470347;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 93.66133348953525%; top: 86.59493409327861%; width: 1px; height: 1px; --star-opacity: 0.19647237773153614;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 50.36281241964085%; top: 86.25500143262508%; width: 1px; height: 1px; --star-opacity: 0.19702673252761504;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 58.16776137941613%; top: 30.901174796208885%; width: 1px; height: 1px; --star-opacity: 0.18109807315126103;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 87.5441629671646%; top: 80.61226968471594%; width: 1px; height: 1px; --star-opacity: 0.18356069211756187;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 33.60605668300808%; top: 27.84761836246673%; width: 1px; height: 1px; --star-opacity: 0.1301656078553266;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 31.648547241554947%; top: 49.79652641136006%; width: 1px; height: 1px; --star-opacity: 0.22595515139800354;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 93.64440972558802%; top: 4.28723388066129%; width: 1px; height: 1px; --star-opacity: 0.1588776473685433;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 2.900493527308301%; top: 13.77914338034316%; width: 1px; height: 1px; --star-opacity: 0.13289641805021749;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 53.742373213374705%; top: 90.61842122039833%; width: 1px; height: 1px; --star-opacity: 0.10951822538679662;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 10.35737341775491%; top: 62.772972428186094%; width: 1px; height: 1px; --star-opacity: 0.2273823125532184;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 4.0001202165368515%; top: 28.297920512707396%; width: 1px; height: 1px; --star-opacity: 0.11206502997224808;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 89.85944190596153%; top: 20.687662191403078%; width: 1px; height: 1px; --star-opacity: 0.19669206814101003;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 19.965174893156235%; top: 96.26424809883397%; width: 1px; height: 1px; --star-opacity: 0.10681501146714747;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 41.88373689405357%; top: 20.597964147327996%; width: 1px; height: 1px; --star-opacity: 0.15024378792697787;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 26.387383571008726%; top: 47.45690018009404%; width: 1px; height: 1px; --star-opacity: 0.19403356200180338;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 9.702784568640288%; top: 21.249717708295513%; width: 1px; height: 1px; --star-opacity: 0.17727384544957275;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 94.01959300854921%; top: 93.20043979040221%; width: 1px; height: 1px; --star-opacity: 0.12308141186529226;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 47.87931497914558%; top: 86.59512884277501%; width: 1px; height: 1px; --star-opacity: 0.21307354237309478;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 58.10109802188214%; top: 71.21229071999625%; width: 1px; height: 1px; --star-opacity: 0.2034071342619253;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 47.019093694722145%; top: 91.95261606254127%; width: 1px; height: 1px; --star-opacity: 0.08429629947565431;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 32.19318907288666%; top: 70.24983054813605%; width: 1px; height: 1px; --star-opacity: 0.18511743012067985;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 29.49804543373321%; top: 11.53264978471965%; width: 1px; height: 1px; --star-opacity: 0.10073801703217142;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 56.91484061676564%; top: 30.41691497625577%; width: 1px; height: 1px; --star-opacity: 0.10445554336160547;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 55.84583868909766%; top: 91.92227430005047%; width: 2px; height: 2px; --star-opacity: 0.19740173542518033;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 95.81045802732297%; top: 71.99109782258066%; width: 1px; height: 1px; --star-opacity: 0.1635889796493245;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 37.13207747334598%; top: 26.6900706449408%; width: 1px; height: 1px; --star-opacity: 0.16398364284512412;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 74.20171363352924%; top: 85.04797342276204%; width: 1px; height: 1px; --star-opacity: 0.13797553610327162;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 36.692548037843885%; top: 5.114221931683183%; width: 1px; height: 1px; --star-opacity: 0.11856086702543936;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 86.88140695968191%; top: 36.66387468830611%; width: 1px; height: 1px; --star-opacity: 0.11593967475327183;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 72.9624357098443%; top: 36.53026601866867%; width: 1px; height: 1px; --star-opacity: 0.09606746407590716;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 33.61371756074638%; top: 71.16472684168181%; width: 1px; height: 1px; --star-opacity: 0.13393764984169507;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 38.487480108325734%; top: 34.96875065528167%; width: 2px; height: 2px; --star-opacity: 0.11900440083015795;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 92.51359927427741%; top: 64.11747272608643%; width: 2px; height: 2px; --star-opacity: 0.18914832214810254;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 80.61003200702946%; top: 90.66892276118415%; width: 1px; height: 1px; --star-opacity: 0.12583312902225935;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 54.85839890117165%; top: 4.754826675443158%; width: 1px; height: 1px; --star-opacity: 0.14607537929558073;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 60.667722097199174%; top: 78.11754532997186%; width: 1px; height: 1px; --star-opacity: 0.1872085853694276;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 61.88451578311387%; top: 74.85643032648433%; width: 2px; height: 2px; --star-opacity: 0.2347414726208612;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 58.009011640500376%; top: 19.438115334149696%; width: 1px; height: 1px; --star-opacity: 0.18415813852564905;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 47.29199204891125%; top: 9.272312487170742%; width: 1px; height: 1px; --star-opacity: 0.12844539789395865;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 63.34541464010711%; top: 37.92056496206102%; width: 1px; height: 1px; --star-opacity: 0.20389959530408955;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 12.807114919594987%; top: 42.339300655014455%; width: 1px; height: 1px; --star-opacity: 0.22137431836261795;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 89.72490159887523%; top: 56.03369167740267%; width: 1px; height: 1px; --star-opacity: 0.1498489117953826;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 93.69751415682629%; top: 51.03180428682743%; width: 1px; height: 1px; --star-opacity: 0.164137774490618;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 87.89064671596464%; top: 24.79261908661129%; width: 1px; height: 1px; --star-opacity: 0.2483734429821779;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 68.83651601973236%; top: 97.23748813156057%; width: 1px; height: 1px; --star-opacity: 0.14573209967027953;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 26.103264736445308%; top: 76.67915692499514%; width: 1px; height: 1px; --star-opacity: 0.20326350871588966;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 73.29270977993822%; top: 39.146153909860715%; width: 1px; height: 1px; --star-opacity: 0.21336906471720457;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 25.227339975061835%; top: 52.32247177922913%; width: 1px; height: 1px; --star-opacity: 0.11368290272646034;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 38.78381726531573%; top: 11.522535074420903%; width: 1px; height: 1px; --star-opacity: 0.13882184969582667;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 45.77395675501439%; top: 41.07855877726407%; width: 1px; height: 1px; --star-opacity: 0.10945713068457794;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 48.58038143566621%; top: 40.06715075011466%; width: 1px; height: 1px; --star-opacity: 0.0925384438714037;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 0.7538126410479906%; top: 82.80260948145154%; width: 1px; height: 1px; --star-opacity: 0.20145345913557183;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 24.26728022749178%; top: 55.0802472040087%; width: 1px; height: 1px; --star-opacity: 0.19108405030191453;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 98.33142096923467%; top: 99.18015753418098%; width: 1px; height: 1px; --star-opacity: 0.19793000121274534;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 47.85847968081911%; top: 86.54205904429993%; width: 1px; height: 1px; --star-opacity: 0.17525789110935724;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 71.9777047612076%; top: 4.480805820211497%; width: 1px; height: 1px; --star-opacity: 0.11653001094803103;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 94.17316499575418%; top: 45.355066007389865%; width: 2px; height: 2px; --star-opacity: 0.10360556265013465;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 97.73607431528572%; top: 56.4994965264613%; width: 2px; height: 2px; --star-opacity: 0.2038568523438875;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 6.165210530289733%; top: 11.949427978210847%; width: 1px; height: 1px; --star-opacity: 0.15926920635439745;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 25.43311383515633%; top: 14.789415318427967%; width: 1px; height: 1px; --star-opacity: 0.1349204114746734;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 51.66611090063677%; top: 87.23665520751783%; width: 1px; height: 1px; --star-opacity: 0.1562111238709351;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 75.27772243188788%; top: 82.24906180898014%; width: 1px; height: 1px; --star-opacity: 0.19838546239110522;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 64.85737637760276%; top: 16.65560300130309%; width: 1px; height: 1px; --star-opacity: 0.10823734403090468;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 28.222341896147118%; top: 85.66423328424759%; width: 1px; height: 1px; --star-opacity: 0.1981527545108373;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 26.75411571928962%; top: 13.781700601706092%; width: 1px; height: 1px; --star-opacity: 0.15981266821391582;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 47.084930483418376%; top: 66.57616695566703%; width: 1px; height: 1px; --star-opacity: 0.15555540854326871;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 54.47110938105584%; top: 28.840335615963653%; width: 1px; height: 1px; --star-opacity: 0.24243077965954812;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 97.71459461517455%; top: 28.227128473466777%; width: 1px; height: 1px; --star-opacity: 0.17609746906254453;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 97.7935960794648%; top: 68.63803590432244%; width: 1px; height: 1px; --star-opacity: 0.1147729221212902;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 96.42728684212213%; top: 92.38925194438647%; width: 1px; height: 1px; --star-opacity: 0.22181031031851733;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 99.57581349995512%; top: 13.285720785699851%; width: 1px; height: 1px; --star-opacity: 0.22351816585734363;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 89.85833729842324%; top: 87.64769874801674%; width: 1px; height: 1px; --star-opacity: 0.0856843983149199;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 4.138229134102145%; top: 64.91179038927127%; width: 1px; height: 1px; --star-opacity: 0.19412987974627893;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 70.0092157913852%; top: 8.572161806903312%; width: 1px; height: 1px; --star-opacity: 0.09106536241540274;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 17.007454363074302%; top: 76.76887510549484%; width: 1px; height: 1px; --star-opacity: 0.20426085350341627;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 27.6532724279012%; top: 96.55275395948443%; width: 1px; height: 1px; --star-opacity: 0.17472316200100949;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 95.77144406954065%; top: 20.361141096382607%; width: 1px; height: 1px; --star-opacity: 0.17086786070970303;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 27.139762903743737%; top: 28.126925494402975%; width: 1px; height: 1px; --star-opacity: 0.19812907784819098;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 93.48135656093352%; top: 25.992311358089704%; width: 1px; height: 1px; --star-opacity: 0.23653289914071202;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 19.319216151285413%; top: 1.065753049498308%; width: 1px; height: 1px; --star-opacity: 0.13532219084747082;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 79.16326667064536%; top: 69.38215682629405%; width: 1px; height: 1px; --star-opacity: 0.11700685482193608;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 38.76417619625659%; top: 86.74783159895362%; width: 1px; height: 1px; --star-opacity: 0.2312067009723744;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 69.10176442600488%; top: 78.4083200582461%; width: 1px; height: 1px; --star-opacity: 0.16544747747793442;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 27.150780797151597%; top: 62.12834592841203%; width: 1px; height: 1px; --star-opacity: 0.2309846597632947;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 86.43174142000514%; top: 50.94436092556746%; width: 1px; height: 1px; --star-opacity: 0.1807259362147451;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 23.589847328700742%; top: 14.225513471893358%; width: 1px; height: 1px; --star-opacity: 0.09716942705726905;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 14.373876260233443%; top: 84.56667537893259%; width: 1px; height: 1px; --star-opacity: 0.12224763547313694;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 64.87451032327412%; top: 26.542030017350015%; width: 1px; height: 1px; --star-opacity: 0.08545717537082335;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 47.69375033287919%; top: 33.60023666958738%; width: 1px; height: 1px; --star-opacity: 0.08719648161605968;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 66.30988590065569%; top: 74.35223000388362%; width: 1px; height: 1px; --star-opacity: 0.08303651415481753;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 62.95611956407852%; top: 97.52008151824927%; width: 1px; height: 1px; --star-opacity: 0.20265528075765565;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 21.3394437751781%; top: 94.08144349220066%; width: 1px; height: 1px; --star-opacity: 0.20713439347851725;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 46.53138794438716%; top: 3.3453673585985944%; width: 1px; height: 1px; --star-opacity: 0.19020843139778382;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 72.73946271302796%; top: 40.92249232372628%; width: 1px; height: 1px; --star-opacity: 0.24084578068222168;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 31.890016344058637%; top: 29.427825321919332%; width: 1px; height: 1px; --star-opacity: 0.19509502841953855;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 65.73877776475159%; top: 65.48293394620838%; width: 2px; height: 2px; --star-opacity: 0.24515500072215163;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 72.17820483564917%; top: 98.07672181070996%; width: 1px; height: 1px; --star-opacity: 0.09047956547108404;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 30.0793666224354%; top: 44.521560671040895%; width: 1px; height: 1px; --star-opacity: 0.16383084417076707;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 58.926185046215394%; top: 65.79819026326355%; width: 1px; height: 1px; --star-opacity: 0.1823496688326128;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 32.67714293415629%; top: 39.62157975916828%; width: 1px; height: 1px; --star-opacity: 0.1767453255366069;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 82.26692192968827%; top: 50.478217101193415%; width: 1px; height: 1px; --star-opacity: 0.12843957192096905;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 70.7175196007373%; top: 28.480550137771708%; width: 1px; height: 1px; --star-opacity: 0.23717919548689048;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 65.36818138021289%; top: 20.555514072719184%; width: 1px; height: 1px; --star-opacity: 0.09205822325861265;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 14.774860319891337%; top: 43.11771810096544%; width: 1px; height: 1px; --star-opacity: 0.2408552223806918;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 66.78254537935673%; top: 1.0227364637724445%; width: 1px; height: 1px; --star-opacity: 0.09669569838056019;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 1.3034715005391773%; top: 50.63133965881551%; width: 1px; height: 1px; --star-opacity: 0.16033987928875743;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 79.33203224814712%; top: 42.51355972255831%; width: 1px; height: 1px; --star-opacity: 0.09084265768174568;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 36.49349743530257%; top: 75.08912743174388%; width: 1px; height: 1px; --star-opacity: 0.1566959181005576;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 56.42078449247241%; top: 11.862599724442868%; width: 1px; height: 1px; --star-opacity: 0.23599337721690594;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 32.75362128706283%; top: 89.40443237397537%; width: 1px; height: 1px; --star-opacity: 0.2090996524066151;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 89.12849962384146%; top: 8.92269837575801%; width: 1px; height: 1px; --star-opacity: 0.2482412659926308;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 37.271654502690865%; top: 38.643857877164656%; width: 1px; height: 1px; --star-opacity: 0.10857749494906202;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 11.604739112524564%; top: 18.689478626367574%; width: 2px; height: 2px; --star-opacity: 0.10314477045600876;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 65.4861980405656%; top: 15.809842060497814%; width: 1px; height: 1px; --star-opacity: 0.12829119301516967;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 80.45014257515055%; top: 91.60913749655286%; width: 1px; height: 1px; --star-opacity: 0.2068994750709945;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 81.36908189630661%; top: 64.09058564466159%; width: 1px; height: 1px; --star-opacity: 0.11990914911602694;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 46.66435462623431%; top: 97.66581884662558%; width: 1px; height: 1px; --star-opacity: 0.11767103417582098;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 1.1029142448835128%; top: 16.023195694335524%; width: 1px; height: 1px; --star-opacity: 0.2026171156809442;"></span><span _ngcontent-ng-c2916131234="" class="background-star" style="left: 72.60249663637363%; top: 30.807618035634597%; width: 1px; height: 1px; --star-opacity: 0.22164975882524462;"></span><!--container--></div><div _ngcontent-ng-c2916131234="" aria-hidden="true" class="celestial-events"><span _ngcontent-ng-c2916131234="" class="celestial-event comet" style="left: 79.36597115442754%; top: 17.461388196352775%; --event-duration: 3.6221197228151145s; --event-delay: 7.1700843004715065s;"></span><span _ngcontent-ng-c2916131234="" class="celestial-event meteor" style="left: 50.22208125459257%; top: 11.257720053366922%; --event-duration: 3.0270535919603536s; --event-delay: 6.968980437352199s;"></span><span _ngcontent-ng-c2916131234="" class="celestial-event comet" style="left: 66.31768949100413%; top: 9.573833862760626%; --event-duration: 4.968066501667376s; --event-delay: 0.06814466573267097s;"></span><span _ngcontent-ng-c2916131234="" class="celestial-event meteor" style="left: 16.029321466852807%; top: 45.41829864180746%; --event-duration: 2.0897590639880823s; --event-delay: 7.814055784574056s;"></span><span _ngcontent-ng-c2916131234="" class="celestial-event meteor" style="left: 22.91456711035912%; top: 48.25908600534442%; --event-duration: 4.0550420808662775s; --event-delay: 2.860779064402977s;"></span><!--container--></div><div _ngcontent-ng-c2916131234="" aria-hidden="true" class="stars"><span _ngcontent-ng-c2916131234="" class="star star-1"></span><span _ngcontent-ng-c2916131234="" class="star star-2"></span><span _ngcontent-ng-c2916131234="" class="star star-3"></span><span _ngcontent-ng-c2916131234="" class="star star-4"></span><span _ngcontent-ng-c2916131234="" class="star star-5"></span><span _ngcontent-ng-c2916131234="" class="star star-6"></span><span _ngcontent-ng-c2916131234="" class="star star-7"></span><span _ngcontent-ng-c2916131234="" class="star star-8"></span><span _ngcontent-ng-c2916131234="" class="star star-9"></span><span _ngcontent-ng-c2916131234="" class="star star-10"></span><span _ngcontent-ng-c2916131234="" class="star star-11"></span><span _ngcontent-ng-c2916131234="" class="star star-12"></span></div><div _ngcontent-ng-c2916131234="" class="question-container"><section _ngcontent-ng-c2916131234="" class="story-screen question-screen"><div _ngcontent-ng-c2916131234="" class="story-content"><div _ngcontent-ng-c2916131234="" class="story-logo"><img _ngcontent-ng-c2916131234="" src="assets/logo.png" alt="Game logo"></div><p _ngcontent-ng-c2916131234="" class="story-text"> Before your journey begins... </p><p _ngcontent-ng-c2916131234="" class="story-text"> There is a world waiting to be discovered. </p><button _ngcontent-ng-c2916131234="" type="button" class="continue-button" jsaction="click:;"> Continue → </button></div></section><!--container--><!--container--><!--container--><!--container--><!--container--><!--container--></div></main></app-start><!--container--></app-root>
<script src="main.js" type="module"></script>

<script id="ng-state" type="application/json">{"__nghData__":[{"t":{"3":"t0","6":"t1","21":"t2","22":"t3","23":"t4","24":"t5","25":"t6","26":"t7"},"c":{"3":[{"i":"t0","r":1,"x":180}],"6":[{"i":"t1","r":1,"x":5}],"21":[{"i":"t2","r":1}],"22":[],"23":[],"24":[],"25":[],"26":[]}},{"c":{"0":[{"i":"c2916131234","r":1}]}}]}</script></body></html>`;