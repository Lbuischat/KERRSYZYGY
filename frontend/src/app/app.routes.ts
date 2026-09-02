import { Routes } from '@angular/router';

import { GameShell } from './features/game/game-shell/game-shell';
import { GameEntry } from './features/entry/game-entry';
import { Start } from './features/start/start';
import { Settings } from './features/game/settings/settings';

export const routes: Routes = [

    {
        path: '',
        component: GameEntry
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

];