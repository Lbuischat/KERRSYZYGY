import { Component, Input } from '@angular/core';

export type CharacterKind =
  | 'explorer'
  | 'oracle'
  | 'guardian'
  | 'hunter'
  | 'chrono'
  | 'android'
  | 'mechanic'
  | 'botanist'
  | 'shadow'
  | 'captain';

export interface Personagem {
  id: string;
  nome: string;
  classe: string;
  frase: string;
  descricao: string;
  estilo: string;
  tema: string;
  kind: CharacterKind;
  colour: string;
  skin: string;
  hair: string;
  armor: string;
  cape: string;
}

@Component({
  selector: 'app-character-portrait',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 360 400"
      role="img"
      [attr.aria-label]="'Retrato de ' + personagem.nome"
    >
      <!-- FUNDO ESPACIAL -->
      <circle
        cx="180" cy="180" r="142"
        [attr.fill]="personagem.colour"
        opacity="0.055"
      />
      <circle
        cx="180" cy="180" r="135"
        fill="none"
        [attr.stroke]="personagem.colour"
        opacity="0.23"
        stroke-dasharray="3 9"
      />
      <circle
        cx="180" cy="180" r="113"
        fill="none"
        [attr.stroke]="personagem.colour"
        opacity="0.12"
      />
      <path
        d="M29 96h26m-13-13v26M297 84h20m-10-10v20M316 264h23m-11-11v23M31 280h19m-9-9v18"
        [attr.stroke]="personagem.colour"
        stroke-width="1.5"
        opacity="0.6"
      />
      <circle cx="72" cy="128" r="2" fill="#fff" opacity="0.6"/>
      <circle cx="283" cy="202" r="2" fill="#fff" opacity="0.5"/>
      <circle cx="108" cy="47" r="1.6" fill="#fff" opacity="0.6"/>
      <ellipse
        cx="180" cy="379" rx="112" ry="9"
        [attr.fill]="personagem.colour"
        opacity="0.15"
      />

      <!-- CAPA -->
      <path
        d="M145 263Q89 258 71 326L47 380H313L291 326Q267 259 215 263Z"
        [attr.fill]="personagem.cape"
      />
      <path
        d="M140 271Q90 284 80 366L59 380M221 271Q267 286 281 367L299 380"
        fill="none"
        [attr.stroke]="personagem.colour"
        opacity="0.23"
        stroke-width="3"
      />

      <!-- BRAÇOS E TRONCO -->
      <path
        d="M122 271Q78 269 64 310L48 380H137L151 289Z"
        [attr.fill]="personagem.armor"
      />
      <path
        d="M238 271Q282 269 296 310L312 380H223L209 289Z"
        [attr.fill]="personagem.armor"
      />
      <path
        d="M127 265Q180 244 233 265L250 380H110Z"
        [attr.fill]="personagem.armor"
      />
      <path
        d="M130 265L179 311L230 265L217 380H143Z"
        fill="#080e22"
        opacity="0.6"
      />
      <path
        d="M126 270L180 317L234 270"
        fill="none"
        [attr.stroke]="personagem.colour"
        opacity="0.65"
        stroke-width="4"
      />
      <path
        d="M126 318L104 368M234 318L256 368"
        fill="none"
        [attr.stroke]="personagem.colour"
        opacity="0.35"
        stroke-width="4"
      />
      <path
        d="M108 332H140M220 332H252"
        [attr.stroke]="personagem.colour"
        opacity="0.5"
        stroke-width="2"
      />

      <!-- PESCOÇO -->
      <path
        d="M159 232H201V275Q180 288 159 275Z"
        [attr.fill]="personagem.skin"
      />
      <path
        d="M159 242Q180 261 201 242V257Q180 274 159 259Z"
        fill="#381c36"
        opacity="0.17"
      />

      <!-- CABELO LONGO E CAPUZ -->
      @if (personagem.kind === 'oracle') {
        <path
          d="M104 208Q90 66 180 61Q271 67 256 208L281 319Q241 292 215 243H143Q117 289 80 318Z"
          [attr.fill]="personagem.cape"
        />
        <path
          d="M112 191Q108 89 180 76Q253 91 246 191"
          fill="none"
          [attr.stroke]="personagem.colour"
          stroke-width="5"
          opacity="0.55"
        />
      }
      @if (personagem.kind === 'hunter') {
        <path
          d="M218 109Q295 80 282 179Q307 229 274 303L241 284Q265 201 228 172Z"
          [attr.fill]="personagem.hair"
        />
        <circle
          cx="253" cy="106" r="20"
          [attr.fill]="personagem.hair"
        />
      }

      <!-- ORELHAS -->
      <ellipse
        cx="119" cy="188" rx="12" ry="19"
        [attr.fill]="personagem.skin"
      />
      <ellipse
        cx="241" cy="188" rx="12" ry="19"
        [attr.fill]="personagem.skin"
      />

      <!-- ROSTO -->
      <path
        d="M120 155Q120 103 180 100Q241 104 241 160L235 218Q218 252 180 253Q143 252 125 218Z"
        [attr.fill]="personagem.skin"
      />
      <path
        d="M133 203Q145 238 180 241Q214 236 227 203"
        fill="none"
        stroke="#5d2f40"
        stroke-width="2"
        opacity="0.1"
      />
      <path
        d="M131 180Q148 173 159 181M201 181Q213 173 229 180"
        fill="none"
        [attr.stroke]="personagem.hair"
        stroke-width="4"
        stroke-linecap="round"
      />
      <ellipse cx="147" cy="192" rx="5" ry="6" fill="#162035"/>
      <ellipse cx="212" cy="192" rx="5" ry="6" fill="#162035"/>
      <circle cx="149" cy="190" r="1.7" fill="#ffffff"/>
      <circle cx="214" cy="190" r="1.7" fill="#ffffff"/>
      <path
        d="M180 195l-4 17h8"
        fill="none"
        stroke="#5d2f40"
        stroke-width="2"
        opacity="0.33"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M169 224Q180 230 191 224"
        fill="none"
        stroke="#673b4e"
        stroke-width="2.4"
        opacity="0.7"
        stroke-linecap="round"
      />

      <!-- AETHER -->
      @if (personagem.kind === 'explorer') {
        <path
          d="M119 167Q99 113 124 93Q132 59 184 66Q235 61 246 118L239 167L224 132L210 117Q182 145 129 139Z"
          [attr.fill]="personagem.hair"
        />
        <path
          d="M119 156Q172 108 230 133"
          fill="none"
          [attr.stroke]="personagem.colour"
          stroke-width="5"
          opacity="0.85"
        />
        <path
          d="M128 161L114 151L107 174L121 189M232 161L246 151L253 174L239 189"
          [attr.fill]="personagem.armor"
          [attr.stroke]="personagem.colour"
          stroke-width="2"
        />
        <path
          d="M176 91l5-12 5 12-5 12Z"
          [attr.fill]="personagem.colour"
        />
      }

      <!-- SELENE -->
      @if (personagem.kind === 'oracle') {
        <path
          d="M119 174Q108 111 142 93Q180 70 219 91Q249 112 242 174L226 139Q195 121 177 138Q152 158 120 157Z"
          [attr.fill]="personagem.hair"
        />
        <path
          d="M134 111L154 91L180 108L206 91L226 111L213 129H147Z"
          [attr.fill]="personagem.colour"
          opacity="0.8"
        />
        <path
          d="M180 91l7 14-7 14-7-14Z"
          fill="#ecf2ff"
        />
        <circle cx="180" cy="93" r="4" fill="#ffffff"/>
      }

      <!-- KAEL -->
      @if (personagem.kind === 'guardian') {
        <path
          d="M118 167Q101 96 155 75Q195 63 228 91Q250 118 241 167L225 130L190 118Q152 142 125 134Z"
          [attr.fill]="personagem.hair"
        />
        <path
          d="M110 145L122 103L147 122L180 80L214 122L239 103L251 145L224 136H135Z"
          [attr.fill]="personagem.colour"
        />
        <path
          d="M180 91V133"
          stroke="#ffffff"
          opacity="0.75"
          stroke-width="3"
        />
        <path
          d="M165 118h30"
          stroke="#ffffff"
          opacity="0.65"
          stroke-width="3"
        />
      }

      <!-- VESPER -->
      @if (personagem.kind === 'hunter') {
        <path
          d="M120 168Q102 120 132 89Q163 59 202 83Q242 91 242 156L223 135Q199 150 187 110Q155 143 122 143Z"
          [attr.fill]="personagem.hair"
        />
        <path
          d="M124 165L155 151H211L238 165L230 182H128Z"
          fill="#101c2c"
          [attr.stroke]="personagem.colour"
          stroke-width="2"
        />
        <path
          d="M137 162h89"
          [attr.stroke]="personagem.colour"
          stroke-width="5"
          opacity="0.7"
        />
        <path
          d="M243 120l24 9-24 11"
          [attr.fill]="personagem.colour"
        />
      }

      <!-- CHRONA -->
      @if (personagem.kind === 'chrono') {
        <path
          d="M117 170Q102 119 135 92Q171 63 209 79Q246 91 243 165L220 128Q202 112 180 130Q149 148 124 137Z"
          [attr.fill]="personagem.hair"
        />
        <path
          d="M118 125Q180 79 242 125"
          fill="none"
          [attr.stroke]="personagem.colour"
          stroke-width="9"
          opacity="0.9"
        />
        <circle
          cx="180" cy="97" r="17"
          fill="#111827"
          [attr.stroke]="personagem.colour"
          stroke-width="4"
        />
        <path
          d="M180 86v12l8 6"
          fill="none"
          stroke="#ffffff"
          stroke-width="2"
          stroke-linecap="round"
        />
        <path
          d="M119 155l-17 13 18 23M241 155l17 13-18 23"
          fill="none"
          [attr.stroke]="personagem.colour"
          stroke-width="5"
          opacity="0.8"
        />
      }

      <!-- LUMI: ANDROIDE -->
      @if (personagem.kind === 'android') {
        <path
          d="M117 162V112L143 82H218L244 112V163L227 145V123H133V145Z"
          [attr.fill]="personagem.hair"
          [attr.stroke]="personagem.colour"
          stroke-width="3"
        />
        <rect
          x="128" y="175" width="104" height="37" rx="10"
          fill="#142b3d"
          [attr.stroke]="personagem.colour"
          stroke-width="3"
        />
        <rect x="137" y="184" width="35" height="14" rx="5" fill="#6df8ff"/>
        <rect x="188" y="184" width="35" height="14" rx="5" fill="#6df8ff"/>
        <rect x="150" y="188" width="10" height="5" rx="2" fill="#ffffff"/>
        <rect x="201" y="188" width="10" height="5" rx="2" fill="#ffffff"/>
        <rect x="166" y="224" width="28" height="4" rx="2" fill="#3c829b"/>
        <path
          d="M180 79V60M180 60l-10-12h20Z"
          [attr.fill]="personagem.colour"
          [attr.stroke]="personagem.colour"
          stroke-width="3"
        />
        <circle cx="180" cy="49" r="9" fill="#e9ffff"/>
        <path
          d="M130 163h-20v36h16M230 163h20v36h-16"
          fill="none"
          [attr.stroke]="personagem.colour"
          stroke-width="5"
        />
      }

      <!-- RAVI: ENGENHEIRO -->
      @if (personagem.kind === 'mechanic') {
        <path
          d="M112 161L108 118L121 103L118 83L142 91L159 70L177 82L197 67L211 87L233 82L241 116L244 159L218 132Q180 151 124 140Z"
          [attr.fill]="personagem.hair"
        />
        <path
          d="M125 141H236L228 161H133Z"
          fill="#342b2d"
          [attr.stroke]="personagem.colour"
          stroke-width="5"
        />
        <rect
          x="135" y="139" width="40" height="23" rx="7"
          fill="#152a3a"
          stroke="#ffd1a0"
          stroke-width="4"
        />
        <rect
          x="185" y="139" width="40" height="23" rx="7"
          fill="#152a3a"
          stroke="#ffd1a0"
          stroke-width="4"
        />
        <path
          d="M175 150h10M145 145h13M195 145h13"
          stroke="#ffffff"
          opacity="0.8"
          stroke-width="4"
        />
        <path
          d="M268 278v28l-9 8 14 10 9-10-7-8v-28"
          fill="none"
          stroke="#d7e6e9"
          stroke-width="6"
          stroke-linejoin="round"
        />
        <path
          d="M108 314h28"
          stroke="#ffbf73"
          stroke-width="8"
        />
      }

      <!-- ÍRIS: BOTÂNICA -->
      @if (personagem.kind === 'botanist') {
        <path
          d="M112 160Q101 100 139 81Q179 59 216 81Q256 103 246 159L234 139Q218 122 196 134Q160 155 121 138Z"
          [attr.fill]="personagem.hair"
        />
        <path
          d="M116 144Q81 190 114 276Q122 304 102 325M244 144Q279 190 246 276Q239 304 260 325"
          fill="none"
          [attr.stroke]="personagem.hair"
          stroke-width="20"
          stroke-linecap="round"
        />
        <path
          d="M114 117Q155 73 180 109Q203 75 246 116"
          fill="none"
          [attr.stroke]="personagem.colour"
          stroke-width="9"
        />
        <path
          d="M136 101q-21-27-26-6q10 17 26 6M228 99q21-29 26-7q-10 16-26 7"
          [attr.fill]="personagem.colour"
        />
        <circle cx="180" cy="98" r="14" fill="#ffe2e7"/>
        <circle cx="180" cy="98" r="6" fill="#edbe6d"/>
        <path
          d="M138 265Q118 296 136 337M221 265Q239 296 221 337"
          fill="none"
          stroke="#9fda8d"
          stroke-width="5"
        />
        <path
          d="M130 303l-14-13 4 20 10-7M232 303l14-13-4 20-10-7"
          [attr.fill]="personagem.colour"
        />
      }

      <!-- NOX: SOMBRAS -->
      @if (personagem.kind === 'shadow') {
        <path
          d="M89 244Q70 110 144 65L180 50L218 65Q288 115 271 244L296 344L244 299L226 150Q180 106 134 150L116 299L64 344Z"
          [attr.fill]="personagem.cape"
          [attr.stroke]="personagem.colour"
          stroke-width="3"
        />
        <path
          d="M121 164Q130 99 180 99Q229 99 239 164"
          fill="none"
          [attr.stroke]="personagem.colour"
          stroke-width="4"
        />
        <path
          d="M127 203Q181 222 232 203L225 238Q180 259 135 238Z"
          fill="#22213e"
        />
        <path
          d="M145 204h21M196 204h21"
          [attr.stroke]="personagem.colour"
          stroke-width="6"
          stroke-linecap="round"
        />
        <path
          d="M175 79a16 16 0 1 0 13 26a14 14 0 1 1-13-26"
          fill="#e2d6ff"
        />
      }

      <!-- ATLAS: CAPITÃO -->
      @if (personagem.kind === 'captain') {
        <path
          d="M110 164Q110 115 138 99Q174 76 214 98Q249 117 245 164L224 137Q188 146 130 139Z"
          [attr.fill]="personagem.hair"
        />
        <path
          d="M91 128L119 91L116 64Q179 45 244 64L242 91L270 128Q180 151 91 128Z"
          [attr.fill]="personagem.cape"
          [attr.stroke]="personagem.colour"
          stroke-width="5"
        />
        <path
          d="M124 103Q180 118 237 103"
          fill="none"
          [attr.stroke]="personagem.colour"
          stroke-width="7"
        />
        <path
          d="M180 75l10 11-10 11-10-11Z"
          [attr.fill]="personagem.colour"
        />
        <path d="M199 188h26l-1 18h-28Z" fill="#17182c"/>
        <path d="M189 179l25 29" stroke="#17182c" stroke-width="5"/>
        <path
          d="M142 227Q159 252 180 252Q199 252 219 227Q220 273 180 278Q140 272 142 227Z"
          [attr.fill]="personagem.hair"
          opacity="0.75"
        />
        <path
          d="M115 283l-12 89M245 283l12 89"
          [attr.stroke]="personagem.colour"
          stroke-width="7"
        />
        <circle cx="112" cy="305" r="7" fill="#fff0c6"/>
        <circle cx="248" cy="305" r="7" fill="#fff0c6"/>
      }

      <!-- EMBLEMA CENTRAL -->
      <circle
        cx="180" cy="335" r="28"
        fill="#0b1326"
        [attr.stroke]="personagem.colour"
        stroke-width="2.8"
      />
      @if (personagem.kind === 'chrono') {
        <circle
          cx="180" cy="335" r="17"
          fill="none"
          [attr.stroke]="personagem.colour"
          stroke-width="2"
        />
        <path
          d="M180 322v14l9 5"
          stroke="#ffffff"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
        />
      } @else if (personagem.kind === 'hunter') {
        <path
          d="M165 343l26-21m-20 3 19-3-3 19"
          fill="none"
          [attr.stroke]="personagem.colour"
          stroke-width="4"
          stroke-linejoin="round"
        />
      } @else if (personagem.kind === 'guardian') {
        <path
          d="M180 316l15 6v14q-5 12-15 17-10-5-15-17v-14Z"
          [attr.fill]="personagem.colour"
        />
        <path
          d="M180 323v20"
          stroke="#ffffff"
          stroke-width="3"
        />
      } @else {
        <path
          d="M180 314l6 15 15 6-15 6-6 15-6-15-15-6 15-6Z"
          [attr.fill]="personagem.colour"
        />
        <circle cx="180" cy="335" r="3" fill="#ffffff"/>
      }
      <path
        d="M159 380h42"
        [attr.stroke]="personagem.colour"
        stroke-width="3"
        opacity="0.6"
      />
    </svg>
  `,
  styles: [`
    :host {
      display: block;
      width: min(100%, 350px);
      flex: 0 0 auto;
      aspect-ratio: 9 / 10;
      max-height: 100%;
      pointer-events: none;
    }

    svg {
      display: block;
      width: 100%;
      height: 100%;
      overflow: visible;
      filter: drop-shadow(
        0 20px 28px rgba(0, 0, 0, 0.36)
      );
    }
  `]
})
export class CharacterPortrait {
  @Input({ required: true })
  personagem!: Personagem;
}