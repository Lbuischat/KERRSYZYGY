import {
  Routes
} from '@angular/router';


import {
  GameShell
} from './features/game/game-shell/game-shell';


import {
  GameEntry
} from './features/entry/game-entry';


import {
  Start
} from './features/start/start';


import {
  Settings
} from './features/game/settings/settings';


import {
  CreateAccount
} from './features/auth/create-account/create-account';


import {
  PlayerInfo
} from './features/game/player-info/player-info';


import {
  Shop
} from './features/game/shop/shop';


import {
  NewQuest
} from './features/tasks/new-quest/new-quest';


import {
  focusExitGuard,
  focusGuard
} from './services/tasks/focus-guard';


export const routes:
  Routes = [

    // ===================================================
    // ENTRY
    // ===================================================

    {
      path: '',

      component:
        GameEntry,

      canActivate: [
        focusGuard
      ]
    },


    // ===================================================
    // CREATE ACCOUNT
    // ===================================================

    {
      path:
        'create-account',

      component:
        CreateAccount,

      canActivate: [
        focusGuard
      ]
    },


    // ===================================================
    // START
    // ===================================================

    {
      path:
        'start',

      component:
        Start,

      canActivate: [
        focusGuard
      ]
    },


    // ===================================================
    // GAME
    // ===================================================

    {
      path:
        'game',

      component:
        GameShell,

      /*
       * Enquanto o Focus estiver ativo,
       * não pode sair dessa rota.
       */
      canDeactivate: [
        focusExitGuard
      ]
    },


    // ===================================================
    // SETTINGS
    // ===================================================

    {
      path:
        'settings',

      component:
        Settings,

      canActivate: [
        focusGuard
      ]
    },


    // ===================================================
    // PLAYER INFO
    // ===================================================

    {
      path:
        'playerinfo',

      component:
        PlayerInfo,

      canActivate: [
        focusGuard
      ]
    },


    // ===================================================
    // SHOP
    // ===================================================

    {
      path:
        'shop',

      component:
        Shop,

      canActivate: [
        focusGuard
      ]
    },


    // ===================================================
    // NEW QUEST
    // ===================================================

    {
      path:
        'new-quest',

      component:
        NewQuest,

      canActivate: [
        focusGuard
      ]
    }

  ];