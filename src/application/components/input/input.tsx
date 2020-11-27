import { observer } from 'mobx-react';
import * as React from 'react';

import styles from './input.scss';


type Props = {
    label?: string;
    placeholder?: string;
    name: string;
    model: any;
    type?: string;
}


@observer
export class Input extends React.Component<Props> {

    private handleChange = (e: any) => {
        this.props.model[e.target.name] = e.target.value;
    }

    render() {
        return (
            <label className={styles.inputWrapper}>
                {this.props.label ? <span className={styles.label}>{this.props.label}</span> : null}
                <input
                    className={styles.input}
                    name={this.props.name}
                    defaultValue={this.props.model[this.props.name]}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    onChange={this.handleChange}
                />
                {
                    this.props.model.$errors && this.props.model.$errors[this.props.name] ?
                        <span className={styles.error}>{this.props.model.$errors[this.props.name]}</span>
                        : null
                }
            </label>
        )
    }
}