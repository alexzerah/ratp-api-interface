import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import AppLayout from "../components/layouts/AppLayout";
import Input from "antd/lib/input";
import Tooltip from "antd/lib/tooltip";
import Icon from "antd/lib/icon";
import Form from "antd/lib/form/Form";
import Button from "antd/lib/button/button";
import Tabs from "antd/lib/tabs";
import {Redirect, withRouter} from "react-router";
import {notificationError} from "../utils/helper";
import {logIn, signIn} from "../actions/auth";

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logIn: {
                username: "",
                password: ""
            },
            signIn: {
                username: "",
                password: ""
            }
        };

        this.submitLogIn = this.submitLogIn.bind(this);
        this.submitSignIn = this.submitSignIn.bind(this);
    }

    submitLogIn(e) {
        e.preventDefault();
        this.props.logIn(this.state.logIn)
            .then(() => this.props.history.push("/lines"))
            .catch(() => notificationError(this.props.auth.logInError, ""));
    }

    submitSignIn(e) {
        e.preventDefault();
        this.props.signIn(this.state.signIn)
            .then(() => this.props.history.push("/lines"))
            .catch(() => notificationError(this.props.auth.signInError, ""));
    }

    render() {


        return (
            this.props.auth.user
                ? (
                    <Redirect
                        to={{
                            pathname: "/lines"
                        }}
                    />
                )
                : (
                    <AppLayout defaultSelectedKeys={['credentials']}>
                        <Tabs>
                            <Tabs.TabPane tab="Connexion" key="login">
                                <Form onSubmit={e => this.submitLogIn(e)} className="login-form">
                                    <Form.Item>
                                        <Input
                                            prefix={<Icon type="user" />}
                                            suffix={
                                                <Tooltip title="Votre nom d'utilisateur lors de votre inscription">
                                                    <Icon type="info-circle" />
                                                </Tooltip>
                                            }
                                            placeholder="Entrez votre nom d'utilisateur"
                                            allowClear
                                            onChange={e => this.setState({
                                                logIn: {
                                                    ...this.state.logIn,
                                                    username: e.target.value
                                                }
                                            })}
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Input.Password
                                            prefix={<Icon type="lock" />}
                                            type="password"
                                            placeholder="Entrez votre mot de passe"
                                            allowClear
                                            onChange={e => this.setState({
                                                logIn: {
                                                    ...this.state.logIn,
                                                    password: e.target.value
                                                }
                                            })}
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            Se connecter
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Inscription" key="sign-in">
                                <Form onSubmit={e => this.submitSignIn(e)} className="login-form">
                                    <Form.Item>
                                        <Input
                                            prefix={<Icon type="user" />}
                                            placeholder="Le nom d'utilisateur avec lequel vous voulez vous inscrire"
                                            allowClear
                                            onChange={e => this.setState({
                                                signIn: {
                                                    ...this.state.signIn,
                                                    username: e.target.value
                                                }
                                            })}
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Input.Password
                                            prefix={<Icon type="lock" />}
                                            type="password"
                                            placeholder="Le mot de passe avec lequel vous voulez vous inscrire"
                                            allowClear
                                            onChange={e => this.setState({
                                                signIn: {
                                                    ...this.state.signIn,
                                                    password: e.target.value
                                                }
                                            })}
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            S'inscrire
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Tabs.TabPane>
                        </Tabs>
                    </AppLayout>
                )
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = {
    logIn,
    signIn
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginScreen));
