import React, { Component } from "react";
import { connect } from 'react-redux';
import { getFavoritesLines } from "../actions/lines";
import AppLayout from "../components/layouts/AppLayout";
import LoadingScreen from "../components/LoadingScreen";
import { notificationError } from "../utils/helper";
import Tabs from "antd/lib/tabs";
import Icon from "antd/lib/icon";
import LineTab from "../components/line/LineTab";

class FavoriteScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: Object.keys(this.props.lines.favoriteLines).length === 0
        };

        document.title = "RATP API Interface - Lignes favorites";

        this.loadFavoriteLines = this.loadFavoriteLines.bind(this);
    }

    componentDidMount() {
        Object.keys(this.props.lines.favoriteLines).length === 0 && this.loadFavoriteLines();
    }

    loadFavoriteLines() {
        this.props.getFavoritesLines()
            .then(() => this.setState({loading: false}))
            .catch(() => notificationError(this.props.lines.getFavoriteLinesError, ""));
    }

    render() {
        const { favoriteLines } = this.props.lines;
        return (
            <AppLayout
                defaultSelectedKeys={['favorites']}
            >
                {
                    this.state.loading
                        ? <LoadingScreen />
                        : <div>
                            <Tabs
                                defaultActiveKey="metros"
                                tabBarExtraContent={
                                    <Icon
                                        type="reload"
                                        onClick={() => {
                                            this.setState({loading: true});
                                            this.loadFavoriteLines();
                                        }}
                                    />
                                }
                            >
                                <Tabs.TabPane tab="Métros" key="metros">
                                    <LineTab
                                        line={favoriteLines.metros}
                                        type="Métro"
                                        removeLikeButton
                                    />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="RERs" key="rers">
                                    <LineTab
                                        line={favoriteLines.rers}
                                        type="RER"
                                        removeLikeButton
                                    />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Tramways" key="tramways">
                                    <LineTab
                                        line={favoriteLines.tramways}
                                        type="Tramway"
                                        removeLikeButton
                                    />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Bus" key="buses">
                                    <LineTab
                                        line={favoriteLines.buses}
                                        type="Bus"
                                        removeLikeButton
                                    />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Noctiliens" key="noctiliens">
                                    <LineTab
                                        line={favoriteLines.noctiliens}
                                        type="Noctilien"
                                        removeLikeButton
                                    />
                                </Tabs.TabPane>
                            </Tabs>
                        </div>
                }
            </AppLayout>
        );
    }
}

const mapStateToProps = (state) => ({
    lines: state.lines
});

const mapDispatchToProps = {
    getFavoritesLines
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteScreen);
