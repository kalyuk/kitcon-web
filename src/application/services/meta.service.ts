import { Injectable, resolve } from '@kitcon/core/annotations';
import { ApiService } from './api.service';

@Injectable
export class MetaService {

    @resolve
    private readonly apiService: ApiService;


    async loadMeta(type: string) {
        this.apiService.get('/seo/meta/' + type);
    }

}