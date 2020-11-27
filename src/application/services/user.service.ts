import { Injectable, resolve } from '@kitcon/core/annotations';
import { ApiService } from '@kitcon/ui/services/api.service';
import { SignInDTO } from '../dto/sign-in.tdo';
import { validate } from '../utils/validate';
import { LocalstorageService } from './localstorage.service';

const TOKEN_KEY = '$token';

@Injectable
export class UserService {

    @resolve
    private readonly apiServce: ApiService

    @resolve
    private readonly localstorageService: LocalstorageService;

    async signIn(signDto: SignInDTO) {
        if (validate(signDto)) {
            const { accessToken, refreshToken } = await this.apiServce.post('/auth', signDto) as any;
            this.localstorageService.setItem(TOKEN_KEY, { accessToken, refreshToken });
        }
    }
}