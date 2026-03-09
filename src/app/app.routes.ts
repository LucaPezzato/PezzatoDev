import { Routes } from '@angular/router';
import { PezBusinessCard } from './pages/business-card/business-card';

export const routes: Routes = [
    {
        path: '',
        component: PezBusinessCard
    },
    {
        path: 'business-card',
        component: PezBusinessCard
    }
];
