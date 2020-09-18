import * as React from 'react';
import { resolve } from '@kitcon/core/annotations';
import { DI, load } from '@kitcon/ui/annotations';
import { MetaService } from '../../services/meta.service';

@DI
export class MainPage extends React.Component {

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
        return (<div>Some text from main page</div>)
    }
}