import { RouteConfig } from 'react-router-config';
import { HomePage } from './main-page/home-page/home-page';
import { MainPage } from './main-page/main-page';
import { SignPage } from './main-page/sign-in-page/sign-in-page';

export const PAGES: RouteConfig[] = [{
    path: '',
    component: MainPage,
    routes: [{
        component: HomePage,
        path: '/',
        exact: true
    }, {
        component: SignPage,
        path: '/sign-in'
    }]
}];