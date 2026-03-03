import { Routes } from '@angular/router';
import { PezBusinessCard } from './pages/business-card/business-card';
import { PezCinema } from './pages/cinema/cinema';

export const routes: Routes = [
    {
        path: '',
        component: PezBusinessCard
    },
    {
        path: 'cinema',
        component: PezCinema
    },
    {
        path: 'business-card',
        component: PezBusinessCard
    }
];
