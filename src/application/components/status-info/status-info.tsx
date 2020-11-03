import * as React from 'react';
import styles from './status-info.scss';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

type Props = {
    className?: string;
}

@observer
export class StatusInfo extends React.Component<Props> {

    @observable
    private count = 0;

    componentDidMount() {
        setInterval(() => this.count++, 3000);
    }

    render() {
        return (
            <div className={classNames(this.props.className)}>
                <div className={styles.block}>
                    В игре: {this.count}
                </div>
            </div>
        );
    }
}