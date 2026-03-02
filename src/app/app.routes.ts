import { Routes } from '@angular/router';
import { PezCinema } from './pages/cinema/cinema';
import { PezPresentation } from './pages/presentation/presentation';

export const routes: Routes = [
    {
        path: '',
        component: PezPresentation
    },
    {
        path: 'cinema',
        component: PezCinema
    }
];
