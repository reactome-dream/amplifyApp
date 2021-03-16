import React, { Component } from 'react';
import {Card} from "../App/style";
import {Link} from "react-router-dom";

import {withFirebase} from "../Firebase";
import * as ROUTES from  '../../constants/routes';

const PasswordForgetPage = () => (
    <Card>
        <PasswordForgetForm />
    </Card>
);

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {email} = this.state;

        this.props.firebase
            .doPasswordReset(email)
            .then(() => {
                this.setState({...INITIAL_STATE});
            })
            .catch(error => {
                this.setState({error});
            });
        event.preventDefault();
    };

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {email, error} = this.state;

        const isInvalid = email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <h5>PasswordForget</h5>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        className="form-control"
                        value={this.state.email}
                        onChange={this.onChange}
                        placeholder="Email Address"
                    />
                </div>
                <button disabled={isInvalid} type="submit" className="btn btn-primary btn-block">
                    Reset My Password
                </button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const PasswordForgetLink = () => (
    <p className="forgot-password text-center mt-2">
        <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password</Link>
    </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export {PasswordForgetForm, PasswordForgetLink};
