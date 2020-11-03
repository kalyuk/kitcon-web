import { RouteConfig } from 'react-router-config';
import { HomePage } from './main-page/home-page/home-page';
import { MainPage } from './main-page/main-page';

export const PAGES: RouteConfig[] = [{
    path: '',
    component: MainPage,
    routes: [{
        component: HomePage,
        path: '/',
        exact: true
    }]
}];