export default `<!DOCTYPE html><html lang="en"><head>
  <meta charset="utf-8">
  <title>KERRSYZYGY</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <script src="https://accounts.google.com/gsi/client" async="" defer=""></script>
<link rel="stylesheet" href="styles.css"><style ng-app-id="ng">
.global-shop[_ngcontent-ng-c1392587259] {
  --shop-max-width: 1600px;
  --shop-padding: clamp(16px, 2.4vw, 38px);
  --shop-gap: clamp(10px, 1.1vw, 18px);
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  color: rgba(255, 255, 255, 0.92);
}
.shop-ui[_ngcontent-ng-c1392587259] {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 100vh;
  pointer-events: none;
}
.shop-shell[_ngcontent-ng-c1392587259] {
  pointer-events: auto;
}
.shop-shell[_ngcontent-ng-c1392587259] {
  position: relative;
  width: min(calc(100% - clamp(16px, 3vw, 56px)), var(--shop-max-width));
  min-height: 100vh;
  margin: clamp(14px, 3vw, 50px) auto 0;
  background: transparent;
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 1px 0 0 rgba(255, 255, 255, 0.025), inset -1px 0 0 rgba(255, 255, 255, 0.025);
}
.shop-header[_ngcontent-ng-c1392587259] {
  min-height: clamp(90px, 8vw, 120px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(20px, 4vw, 60px);
  padding: clamp(18px, 2.2vw, 30px) var(--shop-padding);
  background: rgba(8, 11, 16, 0.42);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.shop-title[_ngcontent-ng-c1392587259] {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.shop-title-kicker[_ngcontent-ng-c1392587259] {
  margin-bottom: clamp(3px, 0.4vw, 6px);
  color: rgba(255, 255, 255, 0.38);
  font-size: clamp(7px, 0.55vw, 10px);
  font-weight: 700;
  letter-spacing: 0.28em;
}
.shop-title[_ngcontent-ng-c1392587259]   h1[_ngcontent-ng-c1392587259] {
  margin: 0;
  font-size: clamp(26px, 3vw, 42px);
  font-weight: 500;
  letter-spacing: 0.18em;
  color: rgba(255, 255, 255, 0.95);
  white-space: nowrap;
}
.shop-title-line[_ngcontent-ng-c1392587259] {
  width: clamp(42px, 4vw, 64px);
  height: 1px;
  margin-top: clamp(5px, 0.5vw, 8px);
  background: rgba(255, 255, 255, 0.45);
}
.shop-currencies[_ngcontent-ng-c1392587259] {
  display: flex;
  align-items: center;
  gap: clamp(16px, 2.5vw, 34px);
  flex-shrink: 0;
}
.currency[_ngcontent-ng-c1392587259] {
  display: flex;
  align-items: center;
  min-width: clamp(100px, 9vw, 140px);
  gap: clamp(7px, 0.7vw, 11px);
}
.currency-icon[_ngcontent-ng-c1392587259] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(28px, 2.3vw, 36px);
  height: clamp(28px, 2.3vw, 36px);
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.88);
  font-size: clamp(15px, 1.2vw, 19px);
}
.currency-icon-credits[_ngcontent-ng-c1392587259] {
  color: rgba(220, 225, 235, 0.9);
}
.currency-icon-xp[_ngcontent-ng-c1392587259] {
  color: rgba(255, 255, 255, 0.95);
}
.currency-info[_ngcontent-ng-c1392587259] {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.currency-info[_ngcontent-ng-c1392587259]   span[_ngcontent-ng-c1392587259] {
  color: rgba(255, 255, 255, 0.36);
  font-size: clamp(6px, 0.5vw, 9px);
  font-weight: 700;
  letter-spacing: 0.16em;
  white-space: nowrap;
}
.currency-info[_ngcontent-ng-c1392587259]   strong[_ngcontent-ng-c1392587259] {
  margin-top: 2px;
  color: rgba(255, 255, 255, 0.94);
  font-size: clamp(15px, 1.35vw, 20px);
  font-weight: 500;
  letter-spacing: 0.03em;
  font-variant-numeric: tabular-nums;
}
.shop-navigation[_ngcontent-ng-c1392587259] {
  display: flex;
  align-items: stretch;
  min-height: clamp(48px, 4vw, 60px);
  padding: 0 clamp(10px, 1.5vw, 22px);
  background: rgba(5, 7, 10, 0.34);
  border-bottom: 1px solid rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  overflow-x: auto;
  scrollbar-width: none;
}
.shop-navigation[_ngcontent-ng-c1392587259]::-webkit-scrollbar {
  display: none;
}
.shop-category[_ngcontent-ng-c1392587259] {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(5px, 0.6vw, 9px);
  min-width: max-content;
  padding: 0 clamp(12px, 1.3vw, 20px);
  border: 0;
  background: transparent;
  color: rgba(255, 255, 255, 0.38);
  cursor: pointer;
  font-size: clamp(7px, 0.6vw, 10px);
  font-weight: 700;
  letter-spacing: 0.12em;
  transition: color 180ms ease, background 180ms ease;
}
.shop-category[_ngcontent-ng-c1392587259]:hover {
  color: rgba(255, 255, 255, 0.72);
  background: rgba(255, 255, 255, 0.025);
}
.shop-category.active[_ngcontent-ng-c1392587259] {
  color: rgba(255, 255, 255, 0.95);
}
.shop-category.active[_ngcontent-ng-c1392587259]::after {
  content: "";
  position: absolute;
  right: clamp(10px, 1.2vw, 17px);
  bottom: 0;
  left: clamp(10px, 1.2vw, 17px);
  height: 1px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.25);
}
.category-symbol[_ngcontent-ng-c1392587259] {
  font-size: clamp(10px, 0.8vw, 13px);
  opacity: 0.75;
}
.shop-category-wishes[_ngcontent-ng-c1392587259] {
  margin-left: auto;
  color: rgba(235, 210, 150, 0.65);
}
.shop-category-wishes[_ngcontent-ng-c1392587259]:hover {
  color: rgba(245, 225, 170, 0.9);
}
.shop-category-wishes.active[_ngcontent-ng-c1392587259] {
  color: rgba(250, 230, 180, 0.95);
}
.shop-feedback[_ngcontent-ng-c1392587259] {
  display: flex;
  align-items: center;
  width: fit-content;
  margin: clamp(12px, 1.5vw, 20px) auto 0;
  padding: clamp(7px, 0.7vw, 10px) clamp(12px, 1.2vw, 17px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(8, 11, 16, 0.42);
  color: rgba(255, 255, 255, 0.75);
  font-size: clamp(8px, 0.65vw, 11px);
  letter-spacing: 0.04em;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.feedback-icon[_ngcontent-ng-c1392587259] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: clamp(16px, 1.4vw, 20px);
  height: clamp(16px, 1.4vw, 20px);
  margin-right: clamp(6px, 0.6vw, 9px);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  font-size: clamp(8px, 0.6vw, 11px);
}
.shop-feedback.success[_ngcontent-ng-c1392587259] {
  border-color: rgba(170, 210, 180, 0.24);
}
.shop-feedback.error[_ngcontent-ng-c1392587259] {
  border-color: rgba(220, 150, 150, 0.24);
}
.shop-content[_ngcontent-ng-c1392587259] {
  padding: clamp(24px, 2.8vw, 40px) var(--shop-padding) clamp(20px, 2.4vw, 34px);
}
.section-heading[_ngcontent-ng-c1392587259] {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: clamp(18px, 1.8vw, 26px);
}
.section-kicker[_ngcontent-ng-c1392587259] {
  display: block;
  margin-bottom: clamp(4px, 0.5vw, 7px);
  color: rgba(255, 255, 255, 0.32);
  font-size: clamp(7px, 0.55vw, 9px);
  font-weight: 700;
  letter-spacing: 0.2em;
}
.section-heading[_ngcontent-ng-c1392587259]   h2[_ngcontent-ng-c1392587259], 
.feature-copy[_ngcontent-ng-c1392587259]   h2[_ngcontent-ng-c1392587259] {
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: clamp(15px, 1.2vw, 19px);
  font-weight: 500;
  letter-spacing: 0.08em;
}
.section-heading[_ngcontent-ng-c1392587259]   p[_ngcontent-ng-c1392587259] {
  max-width: min(620px, 50vw);
  margin: clamp(5px, 0.6vw, 8px) 0 0;
  color: rgba(255, 255, 255, 0.38);
  font-size: clamp(9px, 0.7vw, 12px);
  line-height: 1.6;
}
.section-status[_ngcontent-ng-c1392587259] {
  display: flex;
  align-items: center;
  gap: clamp(5px, 0.5vw, 8px);
  color: rgba(255, 255, 255, 0.34);
  font-size: clamp(7px, 0.55vw, 9px);
  font-weight: 700;
  letter-spacing: 0.16em;
  white-space: nowrap;
}
.status-dot[_ngcontent-ng-c1392587259] {
  width: clamp(4px, 0.35vw, 6px);
  height: clamp(4px, 0.35vw, 6px);
  flex-shrink: 0;
  border-radius: 50%;
  background: rgba(210, 230, 215, 0.85);
  box-shadow: 0 0 7px rgba(210, 230, 215, 0.4);
}
.shop-grid[_ngcontent-ng-c1392587259] {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--shop-gap);
}
.shop-item[_ngcontent-ng-c1392587259] {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: clamp(280px, 25vw, 350px);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background:
    linear-gradient(
      180deg,
      rgba(12, 16, 23, 0.58),
      rgba(7, 9, 13, 0.72));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.035), 0 12px 35px rgba(0, 0, 0, 0.16);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    background 180ms ease;
}
.shop-item[_ngcontent-ng-c1392587259]:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.23);
  background:
    linear-gradient(
      180deg,
      rgba(18, 23, 32, 0.66),
      rgba(7, 9, 13, 0.78));
}
.item-art[_ngcontent-ng-c1392587259] {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: clamp(130px, 12vw, 175px);
  flex-shrink: 0;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(0, 0, 0, 0.12);
}
.item-art[_ngcontent-ng-c1392587259]::before {
  content: "";
  position: absolute;
  inset: clamp(10px, 1vw, 15px);
  border: 1px solid rgba(255, 255, 255, 0.035);
  clip-path: polygon(8% 0, 92% 0, 100% 8%, 100% 92%, 92% 100%, 8% 100%, 0 92%, 0 8%);
}
.item-art-glow[_ngcontent-ng-c1392587259] {
  position: absolute;
  width: clamp(75px, 7vw, 105px);
  height: clamp(75px, 7vw, 105px);
  border-radius: 50%;
  background: rgba(160, 185, 215, 0.08);
  filter: blur(clamp(25px, 2.5vw, 38px));
}
.item-symbol[_ngcontent-ng-c1392587259] {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(58px, 5.5vw, 80px);
  height: clamp(58px, 5.5vw, 80px);
  color: rgba(255, 255, 255, 0.82);
  font-size: clamp(30px, 3vw, 42px);
  text-shadow: 0 0 16px rgba(255, 255, 255, 0.16);
  transition: transform 180ms ease, color 180ms ease;
}
.shop-item[_ngcontent-ng-c1392587259]:hover   .item-symbol[_ngcontent-ng-c1392587259] {
  transform: scale(1.06);
  color: rgba(255, 255, 255, 0.96);
}
.item-owned-badge[_ngcontent-ng-c1392587259] {
  position: absolute;
  right: clamp(8px, 0.9vw, 13px);
  bottom: clamp(8px, 0.8vw, 11px);
  padding: clamp(3px, 0.35vw, 5px) clamp(5px, 0.5vw, 8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(5, 7, 10, 0.65);
  color: rgba(255, 255, 255, 0.52);
  font-size: clamp(7px, 0.6vw, 10px);
  font-weight: 700;
  letter-spacing: 0.04em;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
.item-body[_ngcontent-ng-c1392587259] {
  flex: 1;
  padding: clamp(13px, 1.2vw, 18px) clamp(13px, 1.2vw, 18px) clamp(10px, 1vw, 14px);
}
.item-heading[_ngcontent-ng-c1392587259] {
  display: flex;
  flex-direction: column;
  gap: clamp(3px, 0.4vw, 6px);
}
.item-heading[_ngcontent-ng-c1392587259]   h3[_ngcontent-ng-c1392587259] {
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: clamp(10px, 0.75vw, 13px);
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1.35;
}
.item-owned[_ngcontent-ng-c1392587259] {
  color: rgba(255, 255, 255, 0.3);
  font-size: clamp(6px, 0.5vw, 8px);
  font-weight: 700;
  letter-spacing: 0.13em;
}
.item-description[_ngcontent-ng-c1392587259] {
  margin: clamp(7px, 0.8vw, 11px) 0 0;
  color: rgba(255, 255, 255, 0.38);
  font-size: clamp(8px, 0.65vw, 11px);
  line-height: 1.55;
}
.item-footer[_ngcontent-ng-c1392587259] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(7px, 0.8vw, 11px);
  padding: clamp(10px, 1vw, 14px) clamp(10px, 1vw, 15px);
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(0, 0, 0, 0.12);
}
.item-price[_ngcontent-ng-c1392587259] {
  display: flex;
  align-items: center;
  gap: clamp(5px, 0.6vw, 8px);
  min-width: 0;
}
.price-icon[_ngcontent-ng-c1392587259] {
  color: rgba(255, 255, 255, 0.65);
  font-size: clamp(11px, 1vw, 15px);
}
.item-price[_ngcontent-ng-c1392587259]    > div[_ngcontent-ng-c1392587259] {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.price-label[_ngcontent-ng-c1392587259] {
  color: rgba(255, 255, 255, 0.25);
  font-size: clamp(6px, 0.5vw, 8px);
  font-weight: 700;
  letter-spacing: 0.14em;
}
.item-price[_ngcontent-ng-c1392587259]   strong[_ngcontent-ng-c1392587259] {
  margin-top: 2px;
  color: rgba(255, 255, 255, 0.85);
  font-size: clamp(11px, 0.9vw, 14px);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}
.item-buy[_ngcontent-ng-c1392587259] {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(6px, 0.6vw, 9px);
  min-width: clamp(76px, 6.5vw, 96px);
  height: clamp(31px, 2.7vw, 38px);
  padding: 0 clamp(8px, 0.8vw, 12px);
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.055);
  color: rgba(255, 255, 255, 0.72);
  cursor: pointer;
  font-size: clamp(7px, 0.6vw, 9px);
  font-weight: 700;
  letter-spacing: 0.13em;
  transition:
    background 160ms ease,
    border-color 160ms ease,
    color 160ms ease;
}
.item-buy[_ngcontent-ng-c1392587259]:hover {
  border-color: rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.96);
}
.item-buy[_ngcontent-ng-c1392587259]:active {
  transform: translateY(1px);
}
.buy-symbol[_ngcontent-ng-c1392587259] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(15px, 1.4vw, 18px);
  height: clamp(15px, 1.4vw, 18px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  font-size: clamp(11px, 1vw, 14px);
  font-weight: 400;
  line-height: 1;
}
.shop-feature[_ngcontent-ng-c1392587259] {
  display: grid;
  grid-template-columns: minmax(240px, 0.8fr) minmax(0, 1.2fr);
  gap: clamp(18px, 2vw, 32px);
  margin-top: clamp(30px, 3vw, 46px);
  padding: clamp(18px, 2vw, 26px);
  border: 1px solid rgba(255, 255, 255, 0.075);
  background:
    linear-gradient(
      100deg,
      rgba(255, 255, 255, 0.025),
      rgba(255, 255, 255, 0.01));
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.feature-copy[_ngcontent-ng-c1392587259] {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.feature-copy[_ngcontent-ng-c1392587259]   h2[_ngcontent-ng-c1392587259] {
  font-size: clamp(12px, 1vw, 15px);
}
.feature-copy[_ngcontent-ng-c1392587259]   p[_ngcontent-ng-c1392587259] {
  max-width: 400px;
  margin: clamp(6px, 0.7vw, 9px) 0 0;
  color: rgba(255, 255, 255, 0.35);
  font-size: clamp(8px, 0.65vw, 11px);
  line-height: 1.65;
}
.feature-items[_ngcontent-ng-c1392587259] {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(7px, 0.8vw, 11px);
}
.feature-item[_ngcontent-ng-c1392587259] {
  display: flex;
  align-items: center;
  min-height: clamp(60px, 6vw, 76px);
  gap: clamp(8px, 0.8vw, 13px);
  padding: clamp(9px, 1vw, 13px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(0, 0, 0, 0.14);
  transition: border-color 160ms ease, background 160ms ease;
}
.feature-item[_ngcontent-ng-c1392587259]:hover {
  border-color: rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.025);
}
.feature-icon[_ngcontent-ng-c1392587259] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(28px, 2.8vw, 36px);
  height: clamp(28px, 2.8vw, 36px);
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  font-size: clamp(13px, 1.2vw, 17px);
}
.feature-item[_ngcontent-ng-c1392587259]   div[_ngcontent-ng-c1392587259] {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.feature-item[_ngcontent-ng-c1392587259]   strong[_ngcontent-ng-c1392587259] {
  color: rgba(255, 255, 255, 0.72);
  font-size: clamp(7px, 0.6vw, 9px);
  letter-spacing: 0.1em;
}
.feature-item[_ngcontent-ng-c1392587259]   span[_ngcontent-ng-c1392587259] {
  margin-top: 4px;
  color: rgba(255, 255, 255, 0.27);
  font-size: clamp(6px, 0.5vw, 8px);
  letter-spacing: 0.08em;
}
.shop-footer[_ngcontent-ng-c1392587259] {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(7px, 0.8vw, 11px);
  margin-top: clamp(18px, 2vw, 26px);
  padding: clamp(8px, 0.8vw, 11px) 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.32);
  font-size: clamp(7px, 0.6vw, 10px);
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.footer-separator[_ngcontent-ng-c1392587259] {
  opacity: 0.4;
}
.shop-category[_ngcontent-ng-c1392587259]:focus-visible, 
.item-buy[_ngcontent-ng-c1392587259]:focus-visible {
  outline: 1px solid rgba(255, 255, 255, 0.65);
  outline-offset: 3px;
}
.shop-back-button[_ngcontent-ng-c1392587259] {
  position: absolute;
  top: clamp(-42px, -2.8vw, -32px);
  left: clamp(4px, 0.7vw, 10px);
  z-index: 9;
  display: flex;
  align-items: center;
  gap: clamp(7px, 0.7vw, 11px);
  border-radius: 999px;
  padding: clamp(7px, 0.7vw, 10px) clamp(8px, 0.8vw, 12px);
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(5, 7, 14, 0.42);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  color: rgba(255, 255, 255, 0.78);
  font-family: inherit;
  font-size: clamp(8px, 0.7vw, 11px);
  font-weight: 600;
  letter-spacing: 0.18em;
  cursor: pointer;
  transition:
    background 180ms ease,
    border-color 180ms ease,
    color 180ms ease,
    transform 180ms ease;
}
.shop-back-button[_ngcontent-ng-c1392587259]:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.32);
  color: #fff;
  transform: translateX(-2px);
}
.back-arrow[_ngcontent-ng-c1392587259] {
  font-size: clamp(15px, 1.3vw, 19px);
  line-height: 1;
}
@media (max-width: 1100px) {
  .shop-shell[_ngcontent-ng-c1392587259] {
    width: min(calc(100% - 28px), var(--shop-max-width));
  }
  .shop-grid[_ngcontent-ng-c1392587259] {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .shop-feature[_ngcontent-ng-c1392587259] {
    grid-template-columns: 1fr;
  }
  .feature-copy[_ngcontent-ng-c1392587259]   p[_ngcontent-ng-c1392587259] {
    max-width: 650px;
  }
}
@media (max-width: 800px) {
  .shop-shell[_ngcontent-ng-c1392587259] {
    width: calc(100% - 20px);
    margin-top: 12px;
  }
  .shop-header[_ngcontent-ng-c1392587259] {
    align-items: flex-start;
    flex-direction: column;
    gap: 18px;
    padding: 22px clamp(18px, 4vw, 26px);
  }
  .shop-currencies[_ngcontent-ng-c1392587259] {
    width: 100%;
    justify-content: flex-start;
  }
  .shop-content[_ngcontent-ng-c1392587259] {
    padding: 26px clamp(16px, 3vw, 24px) 24px;
  }
  .section-heading[_ngcontent-ng-c1392587259] {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }
  .section-heading[_ngcontent-ng-c1392587259]   p[_ngcontent-ng-c1392587259] {
    max-width: 100%;
  }
  .shop-grid[_ngcontent-ng-c1392587259] {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .feature-items[_ngcontent-ng-c1392587259] {
    grid-template-columns: 1fr;
  }
  .shop-footer[_ngcontent-ng-c1392587259] {
    padding: 0 clamp(16px, 3vw, 24px);
  }
}
@media (max-width: 560px) {
  .shop-shell[_ngcontent-ng-c1392587259] {
    width: calc(100% - 12px);
    margin-top: 8px;
  }
  .shop-header[_ngcontent-ng-c1392587259] {
    padding: 18px;
  }
  .shop-title[_ngcontent-ng-c1392587259]   h1[_ngcontent-ng-c1392587259] {
    font-size: clamp(23px, 8vw, 29px);
  }
  .shop-currencies[_ngcontent-ng-c1392587259] {
    gap: 16px;
  }
  .currency[_ngcontent-ng-c1392587259] {
    min-width: 0;
  }
  .currency-info[_ngcontent-ng-c1392587259]   strong[_ngcontent-ng-c1392587259] {
    font-size: 15px;
  }
  .shop-navigation[_ngcontent-ng-c1392587259] {
    padding: 0 8px;
  }
  .shop-category[_ngcontent-ng-c1392587259] {
    padding: 0 12px;
    font-size: 8px;
  }
  .shop-content[_ngcontent-ng-c1392587259] {
    padding: 22px 14px 20px;
  }
  .shop-grid[_ngcontent-ng-c1392587259] {
    grid-template-columns: 1fr;
  }
  .shop-item[_ngcontent-ng-c1392587259] {
    min-height: 0;
  }
  .item-art[_ngcontent-ng-c1392587259] {
    height: 150px;
  }
  .shop-feature[_ngcontent-ng-c1392587259] {
    margin-top: 28px;
    padding: 17px;
  }
  .shop-footer[_ngcontent-ng-c1392587259] {
    padding: 0 14px;
    font-size: 6px;
  }
  .shop-back-button[_ngcontent-ng-c1392587259] {
    top: -34px;
  }
}
@media (max-width: 380px) {
  .shop-currencies[_ngcontent-ng-c1392587259] {
    width: 100%;
    justify-content: space-between;
  }
  .currency-icon[_ngcontent-ng-c1392587259] {
    width: 27px;
    height: 27px;
  }
  .currency-info[_ngcontent-ng-c1392587259]   span[_ngcontent-ng-c1392587259] {
    font-size: 6px;
  }
  .currency-info[_ngcontent-ng-c1392587259]   strong[_ngcontent-ng-c1392587259] {
    font-size: 14px;
  }
  .item-footer[_ngcontent-ng-c1392587259] {
    align-items: stretch;
    flex-direction: column;
  }
  .item-buy[_ngcontent-ng-c1392587259] {
    width: 100%;
  }
}
@media (max-width: 320px) {
  .shop-currencies[_ngcontent-ng-c1392587259] {
    gap: 10px;
  }
  .currency[_ngcontent-ng-c1392587259] {
    gap: 5px;
  }
  .currency-info[_ngcontent-ng-c1392587259]   span[_ngcontent-ng-c1392587259] {
    letter-spacing: 0.1em;
  }
  .shop-title[_ngcontent-ng-c1392587259]   h1[_ngcontent-ng-c1392587259] {
    font-size: 22px;
    letter-spacing: 0.13em;
  }
  .item-art[_ngcontent-ng-c1392587259] {
    height: 135px;
  }
}
/*# sourceMappingURL=/shop.css.map */</style><style ng-app-id="ng">
[_nghost-ng-c2554034372] {
  position: fixed;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}
.shop-celestial-system[_ngcontent-ng-c2554034372] {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  background:
    radial-gradient(
      ellipse at 50% 35%,
      rgba(30, 35, 45, 0.55),
      transparent 55%),
    radial-gradient(
      ellipse at 50% 100%,
      rgba(15, 18, 25, 0.8),
      transparent 65%),
    #030508;
}
.shop-star[_ngcontent-ng-c2554034372] {
  position: absolute;
  display: block;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 3px rgba(255, 255, 255, 0.45);
  transform: translateZ(0);
}
.shop-s1[_ngcontent-ng-c2554034372] {
  position: absolute;
  left: 50%;
  top: 35%;
  width: 34px;
  height: 34px;
  transform: translate(-50%, -50%);
  z-index: 2;
}
.shop-s1-glow[_ngcontent-ng-c2554034372] {
  position: absolute;
  inset: -45px;
  border-radius: 50%;
  background:
    radial-gradient(
      circle,
      rgba(255, 255, 255, 0.18),
      rgba(255, 255, 255, 0.06) 35%,
      transparent 70%);
  filter: blur(7px);
}
.shop-s1-core[_ngcontent-ng-c2554034372] {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background:
    radial-gradient(
      circle at 35% 30%,
      #fff,
      rgba(255, 255, 255, 0.85) 30%,
      rgba(255, 255, 255, 0.45) 60%,
      rgba(255, 255, 255, 0.08) 85%,
      transparent 100%);
  box-shadow: 0 0 18px rgba(255, 255, 255, 0.55), 0 0 45px rgba(255, 255, 255, 0.18);
}
.shop-s2-orbit[_ngcontent-ng-c2554034372] {
  position: absolute;
  left: 50%;
  top: 34%;
  width: 500px;
  height: 260px;
  transform: translate(-50%, -50%);
  z-index: 2;
  animation: _ngcontent-ng-c2554034372_shop-s2-orbit 10s linear infinite;
}
@keyframes _ngcontent-ng-c2554034372_shop-s2-orbit {
  0% {
    transform: translate(-50%, -50%) translateX(-250px) scale(0.5);
  }
  25% {
    transform: translate(-50%, -50%) translateX(250px);
  }
}
.shop-s2[_ngcontent-ng-c2554034372] {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 24px;
  height: 24px;
  transform: translate(-50%, -50%);
  z-index: 3;
}
.shop-s2-glow[_ngcontent-ng-c2554034372] {
  position: absolute;
  inset: -22px;
  border-radius: 50%;
  background:
    radial-gradient(
      circle,
      rgba(255, 255, 255, 0.15),
      transparent 70%);
  filter: blur(5px);
}
.shop-s2-core[_ngcontent-ng-c2554034372] {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background:
    radial-gradient(
      circle at 35% 30%,
      #fff,
      rgba(255, 255, 255, 0.7) 45%,
      rgba(255, 255, 255, 0.12) 80%,
      transparent 100%);
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.45);
}
.shop-moon-orbit[_ngcontent-ng-c2554034372] {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 130%;
  height: 130%;
  transform: translate(-50%, -50%);
  animation: _ngcontent-ng-c2554034372_shop-moon-orbit 18s linear infinite;
  z-index: 3;
}
@keyframes _ngcontent-ng-c2554034372_shop-moon-orbit {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.shop-moon-one[_ngcontent-ng-c2554034372] {
  position: absolute;
  left: 50%;
  top: 0;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: #111;
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.95), 0 0 16px rgba(255, 255, 255, 0.5);
}
.shop-planet[_ngcontent-ng-c2554034372] {
  position: absolute;
  left: 50%;
  bottom: -100vh;
  width: 190vw;
  height: 100vw;
  transform: translateX(-50%);
  z-index: 1;
}
.shop-planet-body[_ngcontent-ng-c2554034372] {
  position: absolute;
  inset: 0;
  background: black;
  overflow: hidden;
  border-radius: 50%;
  z-index: 2;
}
.shop-moon-orbit[_ngcontent-ng-c2554034372] {
  z-index: 1;
}
.shop-planet-glow[_ngcontent-ng-c2554034372] {
  position: absolute;
  inset: -44px;
  border-radius: 50%;
  background:
    radial-gradient(
      circle,
      transparent 61%,
      rgba(255, 255, 255, 0.12) 66%,
      rgba(255, 255, 255, 0.045) 72%,
      transparent 79%);
  filter: blur(9px);
}
.planet-light[_ngcontent-ng-c2554034372] {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background:
    linear-gradient(
      115deg,
      rgba(255, 255, 255, 0.15),
      transparent 42%);
}
.planet-shadow[_ngcontent-ng-c2554034372] {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background:
    linear-gradient(
      90deg,
      transparent 38%,
      rgba(0, 0, 0, 0.25) 60%,
      rgba(0, 0, 0, 0.65) 100%);
}
@media (prefers-reduced-motion: reduce) {
  .shop-s2-orbit[_ngcontent-ng-c2554034372], 
   .shop-moon-orbit[_ngcontent-ng-c2554034372] {
    animation: none;
  }
}
/*# sourceMappingURL=/shop-cbb.css.map */</style></head>
<body><!--nghm--><script type="text/javascript" id="ng-event-dispatch-contract">(()=>{function p(t,n,r,o,e,i,f,m){return{eventType:t,event:n,targetElement:r,eic:o,timeStamp:e,eia:i,eirp:f,eiack:m}}function u(t){let n=[],r=e=>{n.push(e)};return{c:t,q:n,et:[],etc:[],d:r,h:e=>{r(p(e.type,e,e.target,t,Date.now()))}}}function s(t,n,r){for(let o=0;o<n.length;o++){let e=n[o];(r?t.etc:t.et).push(e),t.c.addEventListener(e,t.h,r)}}function c(t,n,r,o,e=window){let i=u(t);e._ejsas||(e._ejsas={}),e._ejsas[n]=i,s(i,r),s(i,o,!0)}window.__jsaction_bootstrap=c;})();
</script><script>window.__jsaction_bootstrap(document.body,"ng",["keydown","click","pointerdown","pointerup","pointercancel"],[]);</script>
  <app-root ng-version="22.1.3" ngh="2" ng-server-context="ssg"><router-outlet></router-outlet><app-shop _nghost-ng-c1392587259="" ngh="1"><app-shop-cbb _ngcontent-ng-c1392587259="" _nghost-ng-c2554034372="" ngh="0"><div _ngcontent-ng-c2554034372="" aria-hidden="true" class="shop-celestial-system"><div _ngcontent-ng-c2554034372="" class="shop-stars"><!--container--></div><div _ngcontent-ng-c2554034372="" class="shop-s1"><div _ngcontent-ng-c2554034372="" class="shop-s1-glow"></div><div _ngcontent-ng-c2554034372="" class="shop-s1-core"></div></div><div _ngcontent-ng-c2554034372="" class="shop-s2-orbit"><div _ngcontent-ng-c2554034372="" class="shop-s2"><div _ngcontent-ng-c2554034372="" class="shop-s2-glow"></div><div _ngcontent-ng-c2554034372="" class="shop-s2-core"></div></div></div><div _ngcontent-ng-c2554034372="" class="shop-s2-orbit"><div _ngcontent-ng-c2554034372="" class="shop-s2"><div _ngcontent-ng-c2554034372="" class="shop-s2-glow"></div><div _ngcontent-ng-c2554034372="" class="shop-s2-core"></div></div></div><div _ngcontent-ng-c2554034372="" class="shop-planet"><div _ngcontent-ng-c2554034372="" class="shop-planet-glow"></div><div _ngcontent-ng-c2554034372="" class="shop-planet-body"><div _ngcontent-ng-c2554034372="" class="planet-light"></div><div _ngcontent-ng-c2554034372="" class="planet-shadow"></div></div><div _ngcontent-ng-c2554034372="" class="shop-moon-orbit"><div _ngcontent-ng-c2554034372="" class="shop-moon-one"></div></div></div></div></app-shop-cbb><main _ngcontent-ng-c1392587259="" class="global-shop"><div _ngcontent-ng-c1392587259="" class="shop-ui"><section _ngcontent-ng-c1392587259="" class="shop-shell"><button _ngcontent-ng-c1392587259="" type="button" aria-label="Voltar para o jogo" class="shop-back-button" jsaction="click:;"><span _ngcontent-ng-c1392587259="" class="back-arrow">←</span></button><header _ngcontent-ng-c1392587259="" class="shop-header"><div _ngcontent-ng-c1392587259="" class="shop-title"><span _ngcontent-ng-c1392587259="" class="shop-title-kicker">SYSTEM // ECONOMY</span><h1 _ngcontent-ng-c1392587259="">SHOP</h1><span _ngcontent-ng-c1392587259="" class="shop-title-line"></span></div><div _ngcontent-ng-c1392587259="" class="shop-currencies"><div _ngcontent-ng-c1392587259="" class="currency"><span _ngcontent-ng-c1392587259="" class="currency-icon currency-icon-credits">◈</span><div _ngcontent-ng-c1392587259="" class="currency-info"><span _ngcontent-ng-c1392587259="">CREDITS</span><strong _ngcontent-ng-c1392587259="">12480</strong></div></div><div _ngcontent-ng-c1392587259="" class="currency"><span _ngcontent-ng-c1392587259="" class="currency-icon currency-icon-xp">✦</span><div _ngcontent-ng-c1392587259="" class="currency-info"><span _ngcontent-ng-c1392587259="">XP</span><strong _ngcontent-ng-c1392587259="">2840</strong></div></div></div></header><nav _ngcontent-ng-c1392587259="" aria-label="Shop categories" class="shop-navigation"><button _ngcontent-ng-c1392587259="" type="button" class="shop-category active" jsaction="click:;"><span _ngcontent-ng-c1392587259="" class="category-symbol">✦</span><span _ngcontent-ng-c1392587259="">RECOMMENDED</span></button><button _ngcontent-ng-c1392587259="" type="button" class="shop-category" jsaction="click:;"><span _ngcontent-ng-c1392587259="" class="category-symbol">◇</span><span _ngcontent-ng-c1392587259="">CHARACTERS</span></button><button _ngcontent-ng-c1392587259="" type="button" class="shop-category" jsaction="click:;"><span _ngcontent-ng-c1392587259="" class="category-symbol">⌁</span><span _ngcontent-ng-c1392587259="">WEAPONS</span></button><button _ngcontent-ng-c1392587259="" type="button" class="shop-category" jsaction="click:;"><span _ngcontent-ng-c1392587259="" class="category-symbol">✧</span><span _ngcontent-ng-c1392587259="">ABILITIES</span></button><button _ngcontent-ng-c1392587259="" type="button" class="shop-category" jsaction="click:;"><span _ngcontent-ng-c1392587259="" class="category-symbol">◆</span><span _ngcontent-ng-c1392587259="">MATERIALS</span></button><button _ngcontent-ng-c1392587259="" type="button" class="shop-category" jsaction="click:;"><span _ngcontent-ng-c1392587259="" class="category-symbol">○</span><span _ngcontent-ng-c1392587259="">CONSUMABLES</span></button><button _ngcontent-ng-c1392587259="" type="button" class="shop-category shop-category-wishes" jsaction="click:;"><span _ngcontent-ng-c1392587259="" class="category-symbol">✦</span><span _ngcontent-ng-c1392587259="">WISHES</span></button></nav><!--container--><section _ngcontent-ng-c1392587259="" class="shop-content"><div _ngcontent-ng-c1392587259="" class="section-heading"><div _ngcontent-ng-c1392587259=""><span _ngcontent-ng-c1392587259="" class="section-kicker"> CURRENT SELECTION </span><h2 _ngcontent-ng-c1392587259=""> PROGRESSION RESOURCES </h2><p _ngcontent-ng-c1392587259=""> Strengthen your characters, weapons, and abilities using the available resources. </p></div><div _ngcontent-ng-c1392587259="" class="section-status"><span _ngcontent-ng-c1392587259="" class="status-dot"></span> AVAILABLE </div></div><div _ngcontent-ng-c1392587259="" class="shop-grid"><article _ngcontent-ng-c1392587259="" class="shop-item"><div _ngcontent-ng-c1392587259="" class="item-art"><div _ngcontent-ng-c1392587259="" class="item-art-glow"></div><div _ngcontent-ng-c1392587259="" class="item-symbol"> ✦ </div><span _ngcontent-ng-c1392587259="" class="item-owned-badge"> x24 </span><!--container--></div><div _ngcontent-ng-c1392587259="" class="item-body"><div _ngcontent-ng-c1392587259="" class="item-heading"><h3 _ngcontent-ng-c1392587259=""> Stellar Concentrate </h3><span _ngcontent-ng-c1392587259="" class="item-owned"> OWNED 24 </span><!--container--></div><p _ngcontent-ng-c1392587259="" class="item-description"> Condensed energetic matter used to accelerate a character’s development. </p></div><div _ngcontent-ng-c1392587259="" class="item-footer"><div _ngcontent-ng-c1392587259="" class="item-price"><span _ngcontent-ng-c1392587259="" class="price-icon">✦</span><div _ngcontent-ng-c1392587259=""><span _ngcontent-ng-c1392587259="" class="price-label"> PRICE </span><strong _ngcontent-ng-c1392587259=""> 500 </strong></div></div><button _ngcontent-ng-c1392587259="" type="button" class="item-buy" jsaction="pointerdown:;pointerup:;pointercancel:;"><span _ngcontent-ng-c1392587259="">BUY</span><span _ngcontent-ng-c1392587259="" class="buy-symbol">+</span></button></div></article><article _ngcontent-ng-c1392587259="" class="shop-item"><div _ngcontent-ng-c1392587259="" class="item-art"><div _ngcontent-ng-c1392587259="" class="item-art-glow"></div><div _ngcontent-ng-c1392587259="" class="item-symbol"> ◇ </div><span _ngcontent-ng-c1392587259="" class="item-owned-badge"> x31 </span><!--container--></div><div _ngcontent-ng-c1392587259="" class="item-body"><div _ngcontent-ng-c1392587259="" class="item-heading"><h3 _ngcontent-ng-c1392587259=""> Tungsten Alloy </h3><span _ngcontent-ng-c1392587259="" class="item-owned"> OWNED 31 </span><!--container--></div><p _ngcontent-ng-c1392587259="" class="item-description"> High-strength metallic alloy used in equipment enhancement. </p></div><div _ngcontent-ng-c1392587259="" class="item-footer"><div _ngcontent-ng-c1392587259="" class="item-price"><span _ngcontent-ng-c1392587259="" class="price-icon">✦</span><div _ngcontent-ng-c1392587259=""><span _ngcontent-ng-c1392587259="" class="price-label"> PRICE </span><strong _ngcontent-ng-c1392587259=""> 350 </strong></div></div><button _ngcontent-ng-c1392587259="" type="button" class="item-buy" jsaction="pointerdown:;pointerup:;pointercancel:;"><span _ngcontent-ng-c1392587259="">BUY</span><span _ngcontent-ng-c1392587259="" class="buy-symbol">+</span></button></div></article><article _ngcontent-ng-c1392587259="" class="shop-item"><div _ngcontent-ng-c1392587259="" class="item-art"><div _ngcontent-ng-c1392587259="" class="item-art-glow"></div><div _ngcontent-ng-c1392587259="" class="item-symbol"> ✧ </div><span _ngcontent-ng-c1392587259="" class="item-owned-badge"> x8 </span><!--container--></div><div _ngcontent-ng-c1392587259="" class="item-body"><div _ngcontent-ng-c1392587259="" class="item-heading"><h3 _ngcontent-ng-c1392587259=""> Resonance Charge </h3><span _ngcontent-ng-c1392587259="" class="item-owned"> OWNED 8 </span><!--container--></div><p _ngcontent-ng-c1392587259="" class="item-description"> Stored energy capable of intensifying the response of abilities and powers. </p></div><div _ngcontent-ng-c1392587259="" class="item-footer"><div _ngcontent-ng-c1392587259="" class="item-price"><span _ngcontent-ng-c1392587259="" class="price-icon">✦</span><div _ngcontent-ng-c1392587259=""><span _ngcontent-ng-c1392587259="" class="price-label"> PRICE </span><strong _ngcontent-ng-c1392587259=""> 1200 </strong></div></div><button _ngcontent-ng-c1392587259="" type="button" class="item-buy" jsaction="pointerdown:;pointerup:;pointercancel:;"><span _ngcontent-ng-c1392587259="">BUY</span><span _ngcontent-ng-c1392587259="" class="buy-symbol">+</span></button></div></article><article _ngcontent-ng-c1392587259="" class="shop-item"><div _ngcontent-ng-c1392587259="" class="item-art"><div _ngcontent-ng-c1392587259="" class="item-art-glow"></div><div _ngcontent-ng-c1392587259="" class="item-symbol"> ◆ </div><span _ngcontent-ng-c1392587259="" class="item-owned-badge"> x12 </span><!--container--></div><div _ngcontent-ng-c1392587259="" class="item-body"><div _ngcontent-ng-c1392587259="" class="item-heading"><h3 _ngcontent-ng-c1392587259=""> Collapse Matter </h3><span _ngcontent-ng-c1392587259="" class="item-owned"> OWNED 12 </span><!--container--></div><p _ngcontent-ng-c1392587259="" class="item-description"> Matter altered by extreme gravitational conditions, used to surpass developmental limits. </p></div><div _ngcontent-ng-c1392587259="" class="item-footer"><div _ngcontent-ng-c1392587259="" class="item-price"><span _ngcontent-ng-c1392587259="" class="price-icon">✦</span><div _ngcontent-ng-c1392587259=""><span _ngcontent-ng-c1392587259="" class="price-label"> PRICE </span><strong _ngcontent-ng-c1392587259=""> 800 </strong></div></div><button _ngcontent-ng-c1392587259="" type="button" class="item-buy" jsaction="pointerdown:;pointerup:;pointercancel:;"><span _ngcontent-ng-c1392587259="">BUY</span><span _ngcontent-ng-c1392587259="" class="buy-symbol">+</span></button></div></article><!--container--></div></section></section></div></main></app-shop><!--container--></app-root>
<script src="main.js" type="module"></script>

<script id="ng-state" type="application/json">{"__nghData__":[{"t":{"3":"t5"},"c":{"3":[]}},{"t":{"67":"t6","82":"t7"},"c":{"67":[],"82":[{"i":"t7","r":1,"t":{"5":"t8","10":"t9"},"c":{"5":[{"i":"t8","r":1}],"10":[{"i":"t9","r":1}]},"x":4}]}},{"c":{"0":[{"i":"c1392587259","r":1}]}}]}</script></body></html>`;