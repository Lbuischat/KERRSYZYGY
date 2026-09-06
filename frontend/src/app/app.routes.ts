import { Routes } from '@angular/router';

import { GameShell } from './features/game/game-shell/game-shell';
import { GameEntry } from './features/entry/game-entry';
import { Start } from './features/start/start';
import { Settings } from './features/game/settings/settings';
import { CreateAccount } from './features/auth/create-account/create-account';
import { PlayerInfo } from './features/game/player-info/player-info';
import { Shop } from './features/game/shop/shop';

export const routes: Routes = [

    {
        path: '',
        component: GameEntry
    },

    {
        path: 'create-account',
        component: CreateAccount
    },

    {
        path: 'start',
        component: Start
    },

    {
        path: 'game',
        component: GameShell
    },

    {
        path: 'settings',
        component: Settings
    },

    {
        path: 'playerinfo',
        component: PlayerInfo
    },

    {
        path: 'shop',
        component: Shop
    }

];