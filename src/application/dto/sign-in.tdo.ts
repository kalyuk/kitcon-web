import { Length } from 'class-validator';
import { observable } from 'mobx';

export class SignInDTO {
    @Length(3, 120)
    @observable
    username: string;

    @Length(3, 120)
    @observable
    password: string;

    @observable
    remmember: boolean;

    @observable
    $errors = {};
}