import * as React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './main-menu.scss';
import { StatusInfo } from '../status-info/status-info';
import { MainMenuUser } from '../user/main-menu-user/main-menu-user';

type Props = {
    className?: string;
}

export class MainMenu extends React.Component<Props> {

    render() {
        return (
            <div className={classNames(this.props.className)}>
                <div className={classNames('row', styles.mainMenu)}>
                    <div role="menu" className="col-5">
                        <Link to="/">Как начать играть?</Link>
                        <Link to="/">Новости</Link>
                        <Link to="/">Форум</Link>
                    </div>
                    <StatusInfo className="col-2"/>
                    <MainMenuUser className="col-5 text-right"/>
                </div>
            </div>
        );
    }
}