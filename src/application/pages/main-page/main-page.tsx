import * as React from 'react';
import { resolve } from '@kitcon/core/annotations';
import { DI, load } from '@kitcon/ui/annotations';
import { MetaService } from '../../services/meta.service';
import classNames from 'classnames';
import styles from './main-page.scss';
import { MainMenu } from '../../components/main-menu/main-menu';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';


@DI
export class MainPage extends React.Component<RouteConfigComponentProps> {

    @resolve
    private readonly metaService: MetaService;

    @load('BROWSER')
    async load() {
        await this.metaService.loadMeta('BROWSER');
    }

    @load('SERVER')
    async loadData() {
        await this.metaService.loadMeta('SERVER');
    }

    render() {
        return (
            <div className={classNames(styles.mainPage)}>
                <div className="container">
                    <MainMenu className={styles.mainMenu} />
                </div>
                {renderRoutes(this.props.route.routes)}
            </div>
        );
    }
}