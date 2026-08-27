import { Routes } from '@angular/router';
import { GameShell } from './features/game/game-shell/game-shell';
import { Title } from './features/title/title';
import { Login } from './features/auth/login/login';

export const routes: Routes = [

    {
        path: '',
        component: Title
    },

    {
        path: 'login',
        component: Login
    },

    {
        path: 'game',
        component: GameShell
    }
];