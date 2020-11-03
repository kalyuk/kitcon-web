import { Injectable } from '@kitcon/core/annotations';
import { observable } from 'mobx';

@Injectable
export class UserStorage {

    @observable
    user: null;
}