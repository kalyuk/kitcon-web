import 'reflect-metadata';
import * as React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { Container } from '@kitcon/core/container';
import { Context } from '@kitcon/ui/context';
import { LocationService } from '@kitcon/ui/services/location.service';
import { DataService } from '@kitcon/ui/services/data.service';

import { PAGES } from '../application/pages';

const container = new Container();
const locationService = container.get<LocationService>(LocationService);
const dataService = container.get<DataService>(DataService);
dataService.listen(PAGES);

render(
    <Context.Provider value={container}>
        <Router history={locationService.history}>
            {renderRoutes(PAGES)}
        </Router>
    </Context.Provider>
    , document.getElementById('root'));
