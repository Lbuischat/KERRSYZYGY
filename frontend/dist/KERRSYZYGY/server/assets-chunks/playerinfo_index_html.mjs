export default `<!DOCTYPE html><html lang="en"><head>
  <meta charset="utf-8">
  <title>KERRSYZYGY</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <script src="https://accounts.google.com/gsi/client" async="" defer=""></script>
<link rel="stylesheet" href="styles.css"><style ng-app-id="ng">
*[_ngcontent-ng-c2438930839] {
  box-sizing: border-box;
}
[_nghost-ng-c2438930839] {
  display: block;
  min-height: 100vh;
  font-family:
    Arial,
    Helvetica,
    sans-serif;
}
.profile-page[_ngcontent-ng-c2438930839] {
  position: relative;
  width: 100%;
  min-height: 100vh;
  height: auto;
  padding: 20px 30px 60px;
  overflow-x: hidden;
  overflow-y: visible;
  color: white;
  background-color: #030303;
  background-image:
    radial-gradient(
      circle at 10% 10%,
      white 1px,
      transparent 1px),
    radial-gradient(
      circle at 25% 60%,
      white 1px,
      transparent 1px),
    radial-gradient(
      circle at 45% 30%,
      white 1px,
      transparent 1px),
    radial-gradient(
      circle at 75% 20%,
      white 1px,
      transparent 1px),
    radial-gradient(
      circle at 90% 70%,
      white 1px,
      transparent 1px),
    radial-gradient(
      circle at 60% 90%,
      white 1px,
      transparent 1px),
    radial-gradient(
      circle at center,
      #151515 0%,
      #080808 45%,
      #000000 100%);
  background-size:
    130px 130px,
    170px 170px,
    200px 200px,
    250px 250px,
    290px 290px,
    340px 340px,
    100% 100%;
}
.profile-page[_ngcontent-ng-c2438930839]::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    radial-gradient(
      circle,
      white 1px,
      transparent 1px),
    radial-gradient(
      circle,
      white 1.5px,
      transparent 1.5px);
  background-size: 90px 90px, 190px 190px;
  background-position: 20px 30px, 60px 80px;
  opacity: 0.2;
  animation: _ngcontent-ng-c2438930839_starsBlink 3s ease-in-out infinite alternate;
}
@keyframes _ngcontent-ng-c2438930839_starsBlink {
  from {
    opacity: 0.15;
  }
  to {
    opacity: 0.4;
  }
}
.profile-header[_ngcontent-ng-c2438930839] {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
}
.profile-title[_ngcontent-ng-c2438930839] {
  position: relative;
  margin: 0;
  padding: 17px 35px;
  color: #ffffff;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.08), inset 0 0 15px rgba(255, 255, 255, 0.03);
}
.profile-title[_ngcontent-ng-c2438930839]::before {
  content: "\\2726";
  position: absolute;
  top: -13px;
  left: -10px;
  color: white;
  font-size: 18px;
  text-shadow: 0 0 6px white, 0 0 15px white;
  animation: _ngcontent-ng-c2438930839_titleStar 5s linear infinite;
}
@keyframes _ngcontent-ng-c2438930839_titleStar {
  0% {
    top: -13px;
    left: -10px;
  }
  25% {
    top: -13px;
    left: calc(100% - 5px);
  }
  50% {
    top: calc(100% - 5px);
    left: calc(100% - 5px);
  }
  75% {
    top: calc(100% - 5px);
    left: -10px;
  }
  100% {
    top: -13px;
    left: -10px;
  }
}
.profile-content[_ngcontent-ng-c2438930839] {
  position: relative;
  z-index: 2;
  width: min(1100px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 45px;
  align-items: start;
}
.profile-card[_ngcontent-ng-c2438930839] {
  width: 100%;
  height: auto;
  min-height: fit-content;
  padding: 25px 30px;
  overflow: visible;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 18px;
  background: rgba(15, 15, 15, 0.85);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.5), 0 0 25px rgba(255, 255, 255, 0.03);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}
.form-card[_ngcontent-ng-c2438930839] {
  height: auto;
  padding-bottom: 35px;
}
.section-heading[_ngcontent-ng-c2438930839] {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 8px;
}
.section-heading[_ngcontent-ng-c2438930839]   h2[_ngcontent-ng-c2438930839] {
  margin: 0;
  color: white;
  font-size: 18px;
  letter-spacing: 3px;
  text-align: center;
  text-transform: uppercase;
}
.small-star[_ngcontent-ng-c2438930839] {
  color: white;
  font-size: 12px;
  text-shadow: 0 0 5px white, 0 0 10px white;
  animation: _ngcontent-ng-c2438930839_starPulse 1.5s ease-in-out infinite alternate;
}
@keyframes _ngcontent-ng-c2438930839_starPulse {
  from {
    opacity: 0.35;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1.25);
  }
}
.form-description[_ngcontent-ng-c2438930839] {
  margin: 0 0 20px;
  color: #8d8d8d;
  text-align: center;
  font-size: 13px;
  line-height: 1.5;
}
.profile-form[_ngcontent-ng-c2438930839] {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 13px;
  height: auto;
}
.form-group[_ngcontent-ng-c2438930839] {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-group[_ngcontent-ng-c2438930839]   label[_ngcontent-ng-c2438930839] {
  color: #d7d7d7;
  font-size: 13px;
  letter-spacing: 0.7px;
}
.form-group[_ngcontent-ng-c2438930839]   input[_ngcontent-ng-c2438930839], 
.form-group[_ngcontent-ng-c2438930839]   select[_ngcontent-ng-c2438930839], 
.form-group[_ngcontent-ng-c2438930839]   textarea[_ngcontent-ng-c2438930839] {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #343434;
  border-radius: 8px;
  outline: none;
  color: white;
  background-color: #0a0a0a;
  font-family: inherit;
  font-size: 14px;
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    background-color 0.25s ease;
}
.form-group[_ngcontent-ng-c2438930839]   input[_ngcontent-ng-c2438930839]::placeholder, 
.form-group[_ngcontent-ng-c2438930839]   textarea[_ngcontent-ng-c2438930839]::placeholder {
  color: #5f5f5f;
}
.form-group[_ngcontent-ng-c2438930839]   input[_ngcontent-ng-c2438930839]:focus, 
.form-group[_ngcontent-ng-c2438930839]   select[_ngcontent-ng-c2438930839]:focus, 
.form-group[_ngcontent-ng-c2438930839]   textarea[_ngcontent-ng-c2438930839]:focus {
  border-color: #eeeeee;
  background-color: #101010;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.05), 0 0 15px rgba(255, 255, 255, 0.08);
}
.form-group[_ngcontent-ng-c2438930839]   select[_ngcontent-ng-c2438930839] {
  cursor: pointer;
}
.form-group[_ngcontent-ng-c2438930839]   select[_ngcontent-ng-c2438930839]   option[_ngcontent-ng-c2438930839] {
  color: white;
  background: #101010;
}
.form-group[_ngcontent-ng-c2438930839]   textarea[_ngcontent-ng-c2438930839] {
  min-height: 80px;
  resize: vertical;
}
.field-error[_ngcontent-ng-c2438930839] {
  margin-top: 1px;
  color: #ff6b6b;
  font-size: 11px;
  line-height: 1.2;
  letter-spacing: 0.3px;
}
.form-group[_ngcontent-ng-c2438930839]   input.ng-invalid.ng-touched[_ngcontent-ng-c2438930839], 
.form-group[_ngcontent-ng-c2438930839]   select.ng-invalid.ng-touched[_ngcontent-ng-c2438930839], 
.form-group[_ngcontent-ng-c2438930839]   textarea.ng-invalid.ng-touched[_ngcontent-ng-c2438930839] {
  border-color: #ff4d4d;
  box-shadow: 0 0 6px rgba(255, 77, 77, 0.25);
}
.create-profile-button[_ngcontent-ng-c2438930839] {
  position: relative;
  width: 100%;
  margin-top: 8px;
  padding: 14px 20px;
  overflow: hidden;
  border: 2px solid white;
  border-radius: 9px;
  color: black;
  background: white;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    color 0.25s ease,
    background-color 0.25s ease,
    box-shadow 0.25s ease;
}
.create-profile-button[_ngcontent-ng-c2438930839]::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 45%;
  height: 100%;
  background:
    linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.8),
      transparent);
  transform: skewX(-20deg);
  transition: left 0.6s ease;
}
.create-profile-button[_ngcontent-ng-c2438930839]:hover {
  color: white;
  background: transparent;
  transform: translateY(-2px);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.8), 0 0 25px rgba(255, 255, 255, 0.15);
}
.create-profile-button[_ngcontent-ng-c2438930839]:hover::before {
  left: 150%;
}
.create-profile-button[_ngcontent-ng-c2438930839]:active {
  transform: scale(0.96);
}
.feedback-error[_ngcontent-ng-c2438930839] {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px 14px;
  border: 1px solid rgba(255, 80, 80, 0.4);
  border-radius: 8px;
  color: #ff8080;
  background: rgba(255, 60, 60, 0.06);
  font-size: 12px;
  text-align: center;
  animation: _ngcontent-ng-c2438930839_errorAppear 0.3s ease;
}
.feedback-error-icon[_ngcontent-ng-c2438930839] {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid #ff6b6b;
  border-radius: 50%;
  font-weight: bold;
}
@keyframes _ngcontent-ng-c2438930839_errorAppear {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.feedback-success[_ngcontent-ng-c2438930839] {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 0;
  margin-top: 0;
  overflow: hidden;
  color: white;
  font-size: 13px;
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.3s ease;
}
.feedback-success.show[_ngcontent-ng-c2438930839] {
  height: 30px;
  margin-top: 5px;
  opacity: 1;
  transform: translateY(0);
}
.feedback-icon[_ngcontent-ng-c2438930839] {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  border-radius: 50%;
  font-size: 11px;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.35);
}
.shop-button[_ngcontent-ng-c2438930839] {
  width: 100%;
  padding: 13px 20px;
  border: 1px solid #555;
  border-radius: 9px;
  color: white;
  background: #0b0b0b;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.25s;
}
.shop-button[_ngcontent-ng-c2438930839]:hover {
  border-color: white;
  transform: translateY(-2px);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.15);
}
.shop-button[_ngcontent-ng-c2438930839]:active {
  transform: scale(0.97);
}
.character-card[_ngcontent-ng-c2438930839] {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  height: auto;
}
.character-selector[_ngcontent-ng-c2438930839] {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 5px;
}
.character-frame[_ngcontent-ng-c2438930839] {
  position: relative;
  width: 290px;
  height: 290px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.65);
  border-radius: 16px;
  background: #070707;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.15), 0 0 40px rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.character-frame[_ngcontent-ng-c2438930839]:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 18px rgba(255, 255, 255, 0.3), 0 0 45px rgba(255, 255, 255, 0.08);
}
.character-glow[_ngcontent-ng-c2438930839] {
  position: absolute;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.09);
  filter: blur(35px);
  animation: _ngcontent-ng-c2438930839_characterGlow 3s ease-in-out infinite alternate;
}
@keyframes _ngcontent-ng-c2438930839_characterGlow {
  from {
    opacity: 0.3;
    transform: scale(0.8);
  }
  to {
    opacity: 0.7;
    transform: scale(1.2);
  }
}
.character-image[_ngcontent-ng-c2438930839] {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.arrow-button[_ngcontent-ng-c2438930839] {
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: 0.2s;
}
.arrow-button[_ngcontent-ng-c2438930839]   img[_ngcontent-ng-c2438930839] {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: invert(1);
}
.arrow-left[_ngcontent-ng-c2438930839]   img[_ngcontent-ng-c2438930839] {
  transform: rotate(180deg);
}
.arrow-button[_ngcontent-ng-c2438930839]:hover {
  background: white;
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.7), 0 0 25px rgba(255, 255, 255, 0.2);
}
.arrow-button[_ngcontent-ng-c2438930839]:hover   img[_ngcontent-ng-c2438930839] {
  filter: invert(0);
}
.arrow-button[_ngcontent-ng-c2438930839]:active {
  transform: scale(0.9);
}
.character-details[_ngcontent-ng-c2438930839] {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.character-name[_ngcontent-ng-c2438930839] {
  margin: 0 0 10px;
  color: white;
  font-size: 25px;
  letter-spacing: 4px;
  text-transform: uppercase;
  text-shadow: 0 0 7px rgba(255, 255, 255, 0.4);
}
.character-class[_ngcontent-ng-c2438930839] {
  padding: 6px 14px;
  color: #dddddd;
  border: 1px solid #3c3c3c;
  border-radius: 30px;
  background: #0a0a0a;
  font-size: 12px;
  letter-spacing: 1px;
}
.character-quote[_ngcontent-ng-c2438930839] {
  margin: 15px 0;
  color: #8f8f8f;
  font-size: 14px;
  font-style: italic;
}
.character-quote[_ngcontent-ng-c2438930839]::before {
  content: "\\201c";
}
.character-quote[_ngcontent-ng-c2438930839]::after {
  content: "\\201d";
}
.character-divider[_ngcontent-ng-c2438930839] {
  width: 65%;
  height: 1px;
  margin: 5px 0 15px;
  background:
    linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.5),
      transparent);
}
.character-tags[_ngcontent-ng-c2438930839] {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}
.character-tag[_ngcontent-ng-c2438930839] {
  padding: 6px 12px;
  color: #bcbcbc;
  border: 1px solid #333;
  border-radius: 6px;
  background: #0a0a0a;
  font-size: 11px;
  letter-spacing: 1px;
}
.character-counter[_ngcontent-ng-c2438930839] {
  margin: 17px 0 10px;
  color: #777;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.character-counter[_ngcontent-ng-c2438930839]   strong[_ngcontent-ng-c2438930839] {
  color: white;
}
.character-dots[_ngcontent-ng-c2438930839] {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
}
.character-dot[_ngcontent-ng-c2438930839] {
  width: 8px;
  height: 8px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: #454545;
  cursor: pointer;
  transition: 0.2s;
}
.character-dot[_ngcontent-ng-c2438930839]:hover {
  transform: scale(1.3);
  background: #999;
}
.character-dot.active[_ngcontent-ng-c2438930839] {
  background: white;
  transform: scale(1.25);
  box-shadow: 0 0 5px white, 0 0 12px rgba(255, 255, 255, 0.5);
}
.character-info[_ngcontent-ng-c2438930839] {
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 5px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.025);
}
.character-info[_ngcontent-ng-c2438930839]   h4[_ngcontent-ng-c2438930839] {
  margin: 0 0 6px;
  color: #dedede;
  font-size: 13px;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.character-info[_ngcontent-ng-c2438930839]   p[_ngcontent-ng-c2438930839] {
  margin: 0;
  color: #737373;
  font-size: 12px;
  line-height: 1.5;
}
.info-star[_ngcontent-ng-c2438930839] {
  color: white;
  text-shadow: 0 0 5px white, 0 0 10px white;
}
@media (max-width: 900px) {
  .profile-content[_ngcontent-ng-c2438930839] {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 600px) {
  .profile-page[_ngcontent-ng-c2438930839] {
    padding: 20px 15px 50px;
  }
  .profile-title[_ngcontent-ng-c2438930839] {
    padding: 14px 20px;
    font-size: 20px;
    letter-spacing: 2px;
  }
  .profile-card[_ngcontent-ng-c2438930839] {
    padding: 22px 15px;
  }
  .character-selector[_ngcontent-ng-c2438930839] {
    gap: 10px;
  }
  .character-frame[_ngcontent-ng-c2438930839] {
    width: 210px;
    height: 210px;
  }
  .arrow-button[_ngcontent-ng-c2438930839] {
    width: 42px;
    height: 42px;
    padding: 10px;
  }
}
/*# sourceMappingURL=/player-info.css.map */</style></head>
<body><!--nghm--><script type="text/javascript" id="ng-event-dispatch-contract">(()=>{function p(t,n,r,o,e,i,f,m){return{eventType:t,event:n,targetElement:r,eic:o,timeStamp:e,eia:i,eirp:f,eiack:m}}function u(t){let n=[],r=e=>{n.push(e)};return{c:t,q:n,et:[],etc:[],d:r,h:e=>{r(p(e.type,e,e.target,t,Date.now()))}}}function s(t,n,r){for(let o=0;o<n.length;o++){let e=n[o];(r?t.etc:t.et).push(e),t.c.addEventListener(e,t.h,r)}}function c(t,n,r,o,e=window){let i=u(t);e._ejsas||(e._ejsas={}),e._ejsas[n]=i,s(i,r),s(i,o,!0)}window.__jsaction_bootstrap=c;})();
</script><script>window.__jsaction_bootstrap(document.body,"ng",["submit","input","compositionstart","compositionend","change","click"],["blur"]);</script>
  <app-root ng-version="22.1.3" ngh="1" ng-server-context="ssg"><router-outlet></router-outlet><app-player-info _nghost-ng-c2438930839="" ngh="0"><main _ngcontent-ng-c2438930839="" class="profile-page"><header _ngcontent-ng-c2438930839="" class="profile-header"><h1 _ngcontent-ng-c2438930839="" class="profile-title"> Informações do Perfil </h1></header><div _ngcontent-ng-c2438930839="" class="profile-content"><section _ngcontent-ng-c2438930839="" class="profile-card form-card"><div _ngcontent-ng-c2438930839="" class="section-heading"><span _ngcontent-ng-c2438930839="" class="small-star"> ✦ </span><h2 _ngcontent-ng-c2438930839=""> Nos ensine sobre você </h2><span _ngcontent-ng-c2438930839="" class="small-star"> ✦ </span></div><p _ngcontent-ng-c2438930839="" class="form-description"> Preencha todas as informações para começar sua jornada. </p><form _ngcontent-ng-c2438930839="" novalidate="" class="profile-form ng-untouched ng-pristine ng-invalid" jsaction="submit:;"><div _ngcontent-ng-c2438930839="" class="form-group"><label _ngcontent-ng-c2438930839="" for="name"> Nome </label><input _ngcontent-ng-c2438930839="" id="name" name="name" type="text" placeholder="Digite seu nome" ngmodel="" required="" class="ng-untouched ng-pristine ng-invalid" value="" jsaction="input:;blur:;compositionstart:;compositionend:;"><!--container--></div><div _ngcontent-ng-c2438930839="" class="form-group"><label _ngcontent-ng-c2438930839="" for="username"> Nome de usuário </label><input _ngcontent-ng-c2438930839="" id="username" name="username" type="text" placeholder="Digite seu username" ngmodel="" required="" class="ng-untouched ng-pristine ng-invalid" value="" jsaction="input:;blur:;compositionstart:;compositionend:;"><!--container--></div><div _ngcontent-ng-c2438930839="" class="form-group"><label _ngcontent-ng-c2438930839="" for="gender"> Gênero </label><select _ngcontent-ng-c2438930839="" id="gender" name="gender" ngmodel="" required="" class="ng-untouched ng-pristine ng-invalid" jsaction="change:;blur:;"><option _ngcontent-ng-c2438930839="" value=""> Selecione </option><option _ngcontent-ng-c2438930839="" value="masculino"> Masculino </option><option _ngcontent-ng-c2438930839="" value="feminino"> Feminino </option><option _ngcontent-ng-c2438930839="" value="outro"> Outro </option><option _ngcontent-ng-c2438930839="" value="nao-informar"> Prefiro não informar </option></select><!--container--></div><div _ngcontent-ng-c2438930839="" class="form-group"><label _ngcontent-ng-c2438930839="" for="pronouns"> Pronomes </label><select _ngcontent-ng-c2438930839="" id="pronouns" name="pronouns" ngmodel="" required="" class="ng-untouched ng-pristine ng-invalid" jsaction="change:;blur:;"><option _ngcontent-ng-c2438930839="" value=""> Selecione </option><option _ngcontent-ng-c2438930839="" value="ele"> Ele / Dele </option><option _ngcontent-ng-c2438930839="" value="ela"> Ela / Dela </option><option _ngcontent-ng-c2438930839="" value="elu"> Elu / Delu </option><option _ngcontent-ng-c2438930839="" value="outro"> Outro </option></select><!--container--></div><div _ngcontent-ng-c2438930839="" class="form-group"><label _ngcontent-ng-c2438930839="" for="birthday"> Aniversário </label><input _ngcontent-ng-c2438930839="" id="birthday" name="birthday" type="date" ngmodel="" required="" class="ng-untouched ng-pristine ng-invalid" value="" jsaction="input:;blur:;compositionstart:;compositionend:;"><!--container--></div><div _ngcontent-ng-c2438930839="" class="form-group"><label _ngcontent-ng-c2438930839="" for="language"> Idioma </label><select _ngcontent-ng-c2438930839="" id="language" name="language" ngmodel="" required="" class="ng-untouched ng-pristine ng-invalid" jsaction="change:;blur:;"><option _ngcontent-ng-c2438930839="" value=""> Selecione </option><option _ngcontent-ng-c2438930839="" value="pt"> Português </option><option _ngcontent-ng-c2438930839="" value="en"> English </option><option _ngcontent-ng-c2438930839="" value="ja"> 日本語 </option><option _ngcontent-ng-c2438930839="" value="es"> Español </option></select><!--container--></div><div _ngcontent-ng-c2438930839="" class="form-group"><label _ngcontent-ng-c2438930839="" for="bio"> Biografia </label><textarea _ngcontent-ng-c2438930839="" id="bio" name="bio" placeholder="Conte um pouco sobre você..." ngmodel="" required="" class="ng-untouched ng-pristine ng-invalid" jsaction="input:;blur:;compositionstart:;compositionend:;"></textarea><!--container--></div><button _ngcontent-ng-c2438930839="" type="submit" class="create-profile-button"> Criar Perfil </button><!--container--><div _ngcontent-ng-c2438930839="" class="feedback-success"><span _ngcontent-ng-c2438930839="" class="feedback-icon"> ✓ </span> Perfil criado com sucesso! </div><!--container--></form></section><section _ngcontent-ng-c2438930839="" class="profile-card character-card"><div _ngcontent-ng-c2438930839="" class="section-heading"><span _ngcontent-ng-c2438930839="" class="small-star"> ✦ </span><h2 _ngcontent-ng-c2438930839=""> Seu Personagem </h2><span _ngcontent-ng-c2438930839="" class="small-star"> ✦ </span></div><div _ngcontent-ng-c2438930839="" class="character-selector"><button _ngcontent-ng-c2438930839="" type="button" aria-label="Personagem anterior" class="arrow-button arrow-left" jsaction="click:;"><img _ngcontent-ng-c2438930839="" src="https://cdn-icons-png.flaticon.com/512/109/109617.png" alt=""></button><div _ngcontent-ng-c2438930839="" class="character-frame"><div _ngcontent-ng-c2438930839="" class="character-glow"></div><img _ngcontent-ng-c2438930839="" class="character-image" src="https://i.pinimg.com/736x/0c/a7/2e/0ca72e3739eac96cb4768da55eacdcd5.jpg" alt="Astra"></div><button _ngcontent-ng-c2438930839="" type="button" aria-label="Próximo personagem" class="arrow-button" jsaction="click:;"><img _ngcontent-ng-c2438930839="" src="https://cdn-icons-png.flaticon.com/512/109/109617.png" alt=""></button></div><div _ngcontent-ng-c2438930839="" class="character-details"><h3 _ngcontent-ng-c2438930839="" class="character-name"> Astra </h3><div _ngcontent-ng-c2438930839="" class="character-class"> ★ Explorer </div><p _ngcontent-ng-c2438930839="" class="character-quote"> Ready for the journey. </p><div _ngcontent-ng-c2438930839="" class="character-divider"></div><div _ngcontent-ng-c2438930839="" class="character-tags"><span _ngcontent-ng-c2438930839="" class="character-tag"> Cosmic </span><span _ngcontent-ng-c2438930839="" class="character-tag"> Adventurer </span></div><p _ngcontent-ng-c2438930839="" class="character-counter"> Character <strong _ngcontent-ng-c2438930839=""> 1 </strong> / 5 </p><div _ngcontent-ng-c2438930839="" class="character-dots"><button _ngcontent-ng-c2438930839="" type="button" aria-label="Personagem 1" class="character-dot active" jsaction="click:;"></button><button _ngcontent-ng-c2438930839="" type="button" aria-label="Personagem 2" class="character-dot" jsaction="click:;"></button><button _ngcontent-ng-c2438930839="" type="button" aria-label="Personagem 3" class="character-dot" jsaction="click:;"></button><button _ngcontent-ng-c2438930839="" type="button" aria-label="Personagem 4" class="character-dot" jsaction="click:;"></button><button _ngcontent-ng-c2438930839="" type="button" aria-label="Personagem 5" class="character-dot" jsaction="click:;"></button></div></div><div _ngcontent-ng-c2438930839="" class="character-info"><span _ngcontent-ng-c2438930839="" class="info-star"> ✦ </span><div _ngcontent-ng-c2438930839=""><h4 _ngcontent-ng-c2438930839=""> Character Info </h4><p _ngcontent-ng-c2438930839=""> Escolha o personagem que irá representar você durante sua jornada. </p></div></div></section></div></main></app-player-info><!--container--></app-root>
<script src="main.js" type="module"></script>

<script id="ng-state" type="application/json">{"__nghData__":[{"t":{"22":"t5","28":"t6","44":"t7","60":"t8","66":"t9","82":"t10","88":"t11","91":"t12","96":"t13"},"c":{"22":[],"28":[],"44":[],"60":[],"66":[],"82":[],"88":[],"91":[],"96":[]}},{"c":{"0":[{"i":"c2438930839","r":1}]}}]}</script></body></html>`;