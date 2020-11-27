import { Injectable } from '@kitcon/core/annotations';

@Injectable
export class LocalstorageService {

    getItem(key: string, def: any = false) {
        const value = localStorage.getItem(key);

        if (!value) {
            return def;
        }

        return JSON.parse(value);
    }

    setItem(key: string, value: any) {
        console.log(value)
        localStorage.setItem(key, JSON.stringify(value));
    }

    clear() {
        localStorage.clear();
    }

    removeItem(key: string) {
        localStorage.removeItem(key);
    }
}