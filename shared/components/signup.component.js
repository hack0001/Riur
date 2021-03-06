/**
 * Copyright 2016-present, Dennis Norton.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule signup.component
 */

'use strict';

import React, { Component, PropTypes } from 'react';
import { Alert, Form, FormGroup, FormControl, Col, ControlLabel, Checkbox, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
const EMAIL_PATTERN = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            formState: {
                isEmailValid: false,
                emailState: null,
                isPasswordValid: false,
                passwordState: null
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleEmailChange(e) {
        let state = this.state;
        state.email = e.target.value;
        state.formState = this.getEmailValidationState(state);
        this.setState(state);
    }

    handlePasswordChange(e) {
        let state = this.state;
        state.password = e.target.value;
        state.formState = this.getPasswordValidationState(state);
        this.setState(state);
    }

    render() {
        const { errorMessage } = this.props;
        const toolTip = <Tooltip id='passwordHelp'>1 UPPERCASE letter, 1 lowercase letter, 1 number, 1 special character, more than 7 characters.</Tooltip>;

        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormGroup controlId='formHorizontalEmail' validationState={this.state.formState.emailState }>
                    <Col componentClass={ControlLabel} xs={2} sm={2}>
                        Email
                    </Col>
                    <Col xs={10} sm={10}>
                        <FormControl type='email' onChange={this.handleEmailChange} placeholder='Email' required/>
                        <FormControl.Feedback />
                    </Col>
                </FormGroup>

                <FormGroup controlId='formHorizontalPassword' validationState={this.state.formState.passwordState }>
                    <Col componentClass={ControlLabel} xs={2} sm={2}>
                        Password
                    </Col>
                    <Col xs={10} sm={10}>
                        <OverlayTrigger placement='bottom' overlay={toolTip} trigger='focus'>
                            <FormControl type='password' onChange={this.handlePasswordChange}  placeholder='Password' required/>
                        </OverlayTrigger>
                        <FormControl.Feedback />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col xsOffset={2} smOffset={2} xs={10} sm={10}>
                        <Button type='submit' bsStyle="info" disabled={!this.isFormValid() }>
                            Signup
                        </Button>
                    </Col>
                </FormGroup>

                {
                    errorMessage &&
                    <Alert bsStyle='danger'>
                        {errorMessage}
                    </Alert>
                }
            </Form>
        );
    }

    isFormValid() {
        return this.state.formState.isEmailValid && this.state.formState.isPasswordValid;
    }

    getEmailValidationState(state) {
        if (this.state.email.length === 0) {
            state.formState.isEmailValid = false;
            state.formState.emailState = null;
        }

        else if (EMAIL_PATTERN.exec(this.state.email) == null) {
            state.formState.isEmailValid = false;
            state.formState.emailState = 'error';
        }

        else {
            state.formState.isEmailValid = true;
            state.formState.emailState = 'success';
        }

        return state.formState;
    }

    getPasswordValidationState(state) {
        if (this.state.password.length === 0) {
            state.formState.isPasswordValid = false;
            state.formState.passwordState = null;
        }

        else if (PASSWORD_PATTERN.exec(this.state.password) == null) {
            state.formState.isPasswordValid = false;
            state.formState.passwordState = 'error'
        }

        else {
            state.formState.isPasswordValid = true;
            state.formState.passwordState = 'success';
        }

        return state.formState;
    }

    handleSubmit(event) {
        event.preventDefault();

        const creds = {
            email: this.state.email.trim(),
            password: this.state.password.trim()
        };

        this.props.onSignUpClick(creds);
    }
};

SignUp.propTypes = {
    onSignUpClick: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};