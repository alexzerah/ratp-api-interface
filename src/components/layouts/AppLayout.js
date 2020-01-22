import React, { Component } from "react";
import PropTypes from "prop-types";
import Layout from "antd/lib/layout";
import Menu from "antd/lib/menu";
import Icon from "antd/lib/icon";
import BackTop from "antd/lib/back-top";
import Logo from "../../static/img/logo/ratp.png";
import Logosm from "../../static/img/logo/ratp-sm.png";
import { Link } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {logOut} from "../../actions/auth";
import Avatar from "antd/lib/avatar";

class AppLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsedMenu: false
        };

        this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    toggleCollapse() {
        this.setState({ collapsedMenu: !this.state.collapsedMenu });
    }

    render() {
        const { user } = this.props.auth;
        const isConnected = !!user;

        return (
            <Layout>
                <BackTop />
                <Layout.Sider
                    collapsible
                    breakpoint="lg"
                    collapsed={this.state.collapsedMenu}
                    onCollapse={this.toggleCollapse}
                    width={250}
                >
                    <img src={Logo} alt="Logo de RATP" className="logo" />
                    <img src={Logosm} alt="Logo de RATP" className="logo-sm" />
                    {
                        isConnected &&
                            <div className="app-layout-connected-user">
                                <Avatar icon="user" /> <span className="app-layout-connected-user-name">{user.username}</span>
                            </div>
                    }
                    <Menu
                        theme="dark"
                        defaultOpenKeys={this.props.defaultOpenKeys}
                        defaultSelectedKeys={this.props.defaultSelectedKeys}
                        mode="inline"
                    >
                        <Menu.Item key="home">
                            <Link to="/">
                                <Icon type="home" />
                                <span>Page d'accueil</span>
                            </Link>
                        </Menu.Item>
                        {
                            isConnected &&
                                <Menu.Item key="traffic">
                                    <Link to="/traffics">
                                        <Icon type="stock" />
                                        <span>Trafic</span>
                                    </Link>
                                </Menu.Item>
                        }
                        {
                            isConnected &&
                                <Menu.Item key="line">
                                    <Link to="/lines">
                                        <Icon type="line" />
                                        <span>Lignes de transports</span>
                                    </Link>
                                </Menu.Item>
                        }
                        {
                            isConnected &&
                                <Menu.Item key="schedule">
                                    <Link to="/schedules">
                                        <Icon type="clock-circle" />
                                        <span>Horaires</span>
                                    </Link>
                                </Menu.Item>
                        }
                        {
                            isConnected
                                ? (
                                    <Menu.Item key="logout">
                                        <div onClick={() => this.props.logOut()}>
                                            <Icon type="logout" />
                                            <span>Déconnexion</span>
                                        </div>
                                    </Menu.Item>
                                ) : (
                                    <Menu.Item key="credentials">
                                        <Link to="/credentials">
                                            <Icon type="login" />
                                            <span>Authentification</span>
                                        </Link>
                                    </Menu.Item>
                                )
                        }
                        <Menu.SubMenu
                            key="about"
                            title={
                                <span>
                                  <Icon type="setting" />
                                  <span>À propos</span>
                                </span>
                            }
                        >
                            <Menu.Item key="team">
                                <Link to="/team">
                                    <Icon type="team" />
                                    <span>L'équipe</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="contact">
                                <Link to="/contacts">
                                    <Icon type="contacts" />
                                    <span>Contact</span>
                                </Link>
                            </Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </Layout.Sider>
                <Layout>
                    <Layout.Content className={`${this.state.collapsedMenu ? "" : "ant-layout-content--collapsed"}`}>
                        {this.props.children}
                    </Layout.Content>
                    <Layout.Footer className={`${this.state.collapsedMenu ? "" : "ant-layout-footer--collapsed"}`}>
                        RATP API Interface ©2019 Created by <a href="https://github.com/kevinhuang78/" rel="noreferrer noopener" target="_blank">Kévin Huang</a>
                    </Layout.Footer>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = {
    logOut
};

AppLayout.propTypes = {
    /** Default selected keys for menu on the left */
    defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string)
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLayout);
