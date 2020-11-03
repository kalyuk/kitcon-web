import * as React from 'react';
import { Intro } from '../../../components/intro/intro';
import styles from './home-page.scss';

export class HomePage extends React.Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <Intro />
                    </div>
                    <div className="col-5 offset-1 d-flex justify-content-center align-items-center">
                        <div className="pt-5 pl-5">
                            <button className={styles.button}>Начать играть!</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}