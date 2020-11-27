import * as React from 'react';
import { DI } from '@kitcon/ui/annotations';
import { SignInDTO } from '../../dto/sign-in.tdo';
import { Input } from '../input/input';
import styles from './sign-in.scss';
import { UserService } from '../../services/user.service';
import { resolve } from '@kitcon/core/annotations';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@DI
@observer
export class SignIn extends React.Component {
    private signInDTO = new SignInDTO();

    @resolve
    private userService: UserService;

    @observable
    errorMessage: string;

    private handleSubmit = async (e: any) => {
        e.preventDefault();
        this.errorMessage = null;
        try {
            await this.userService.signIn(this.signInDTO);
        } catch (e) {
            this.errorMessage = e.message;
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className={styles.signInWrapper}>
                {this.errorMessage ? <div className="alert alert-danger">{this.errorMessage}</div> : null}
                <Input
                    name="username"
                    model={this.signInDTO}
                    label="Ваш username"
                    placeholder="Введите Ваш username"
                />
                <Input
                    name="password"
                    type="password"
                    model={this.signInDTO}
                    label="Ваш пароль"
                    placeholder="Введите Ваш пароль"
                />
                <div className="pt-2">
                    <button className="btn btn-primary btn-block">Войти</button>
                </div>
            </form>);
    }
}