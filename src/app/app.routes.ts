import { Routes } from '@angular/router';
import { PezBusinessCard } from './pages/business-card/business-card';
import { PezConfig } from './pages/config/config';
import { PezCinema } from './pages/cinema/cinema';

export const routes: Routes = [
    {
        path: '',
        component: PezBusinessCard
    },
    {
        path: 'business-card',
        component: PezBusinessCard
    },
    {
        path: 'config',
        component: PezConfig
    },
    {
        path: 'cinema',
        component: PezCinema
    }
];
