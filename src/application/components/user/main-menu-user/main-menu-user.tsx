import { observer } from 'mobx-react';
import * as React from 'react';
import { resolve } from '@kitcon/core/annotations';
import { DI } from '@kitcon/ui/annotations';
import { UserStorage } from '../../../storages/user.storage';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
    className?: string;
}

@DI
@observer
export class MainMenuUser extends React.Component<Props> {

    @resolve
    private readonly userStorage: UserStorage;

    render() {
        if (this.userStorage.user) {
            return (<div>User</div>)
        }
        return (
            <div role="menu" className={classNames(this.props.className)}>
                <Link to="/">Войти</Link>
                <Link to="/">Зарегистрироваться</Link>
                <Link to="/">Внести пожертвованиЕ</Link>
            </div>
        );
    }
}