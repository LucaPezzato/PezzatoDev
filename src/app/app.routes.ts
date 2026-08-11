import { Routes } from '@angular/router';
import { PezBusinessCard } from './pages/business-card/business-card';
import { PezConfig } from './pages/config/config';

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
    }
];
