import * as React from 'react';
import { SignIn } from '../../../components/sign-in/sign-in';

export class SignPage extends React.Component {
    render() {
        return (
            <div className="container">

                <div className="d-flex justify-content-center">
                    <SignIn />
                </div>
            </div>
        )
    }
}