import { Injectable, resolve } from '@kitcon/core/annotations';
import { ApiService } from '@kitcon/ui/services/api.service';

@Injectable
export class MetaService {

    @resolve
    private readonly apiService: ApiService;


    async loadMeta(type: string) {
        const result = await this.apiService.get('/seo', { q: type });
        console.log('-----------------------------')
        console.log(result)
        console.log('-----------------------------')
    }

}