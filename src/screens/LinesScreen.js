import React, { Component } from "react";
import { connect } from 'react-redux';
import {getFavoritesLines, getLines, putFavoritesLines} from "../actions/lines";
import AppLayout from "../components/layouts/AppLayout";
import LoadingScreen from "../components/LoadingScreen";
import Tabs from "antd/lib/tabs";
import Icon from "antd/lib/icon";
import LineTab from "../components/line/LineTab";
import notification from "antd/lib/notification";

class LinesScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: Object.keys(this.props.lines.linesList).length === 0
        };

        document.title = "RATP API Interface - Lignes de transports";

        this.loadLines = this.loadLines.bind(this);
        this.putFavoriteLines = this.putFavoriteLines.bind(this);
    }

    componentDidMount() {
        Object.keys(this.props.lines.linesList).length === 0 && this.loadLines();
    }

    loadLines() {
        Promise.all([
            Object.keys(this.props.lines.favoriteLines).length === 0 && this.props.getFavoritesLines(),
            this.props.getLines()
        ])
            .then(() => this.setState({loading: false}))
            .catch(() => notification.error({
                    message: "La liste de lignes n'a pas pu être chargée",
                    description: "Nous nous excusons pour la gêne occasionnée",
                    icon: <Icon type="frown" />,
                    duration: 10
                })
            );
    }

    putFavoriteLines(line, likedVal, type) {
        const actionAfterRequest = (request) => {
            request
                .catch(() => notification.error({
                        message: "La liste de favoris n'a pas pu être modifiée",
                        description: "Nous nous excusons pour la gêne occasionnée",
                        icon: <Icon type="frown" />,
                        duration: 10
                    })
                );
        };
        let favoriteLines = {...this.props.lines.favoriteLines};
        if (likedVal) {
            switch (type) {
                case "metros":
                default:
                    favoriteLines.metros.push(line);
                    actionAfterRequest(this.props.putFavoritesLines(favoriteLines));
                break;
                case "rers":
                    favoriteLines.rers.push(line);
                    actionAfterRequest(this.props.putFavoritesLines(favoriteLines));
                break;
                case "tramways":
                    favoriteLines.tramways.push(line);
                    actionAfterRequest(this.props.putFavoritesLines(favoriteLines));
                break;
                case "buses":
                    favoriteLines.buses.push(line);
                    actionAfterRequest(this.props.putFavoritesLines(favoriteLines));
                break;
                case "noctiliens":
                    favoriteLines.noctiliens.push(line);
                    actionAfterRequest(this.props.putFavoritesLines(favoriteLines));
                break;
            }
        } else {
            switch (type) {
                case "metros":
                default:
                    favoriteLines.metros = favoriteLines.metros.filter(l => line.code !== l.code);
                    actionAfterRequest(this.props.putFavoritesLines(favoriteLines));
                    break;
                case "rers":
                    favoriteLines.rers = favoriteLines.rers.filter(l => line.code !== l.code);
                    actionAfterRequest(this.props.putFavoritesLines(favoriteLines));
                    break;
                case "tramways":
                    favoriteLines.tramways = favoriteLines.tramways.filter(l => line.code !== l.code);
                    actionAfterRequest(this.props.putFavoritesLines(favoriteLines));
                    break;
                case "buses":
                    favoriteLines.buses = favoriteLines.buses.filter(l => line.code !== l.code);
                    actionAfterRequest(this.props.putFavoritesLines(favoriteLines));
                    break;
                case "noctiliens":
                    favoriteLines.noctiliens = favoriteLines.noctiliens.filter(l => line.code !== l.code);
                    actionAfterRequest(this.props.putFavoritesLines(favoriteLines));
                    break;
            }
        }
    }

    render() {
        const { linesList } = this.props.lines;
        const { favoriteLines } = this.props.lines;

        return (
            <AppLayout
                defaultSelectedKeys={['line']}
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
                                            this.loadLines();
                                        }}
                                    />
                                }
                            >
                                <Tabs.TabPane tab="Métros" key="metros">
                                    <LineTab
                                        line={linesList.metros}
                                        favoriteLine={favoriteLines.metros}
                                        type="Métro"
                                        likeTab={(line, likedVal) => this.putFavoriteLines(line, likedVal, "metros")}
                                    />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="RERs" key="rers">
                                    <LineTab
                                        line={linesList.rers}
                                        favoriteLine={favoriteLines.rers}
                                        type="RER"
                                        likeTab={(line, likedVal) => this.putFavoriteLines(line, likedVal, "rers")}
                                    />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Tramways" key="tramways">
                                    <LineTab
                                        line={linesList.tramways}
                                        favoriteLine={favoriteLines.tramways}
                                        type="Tramway"
                                        likeTab={(line, likedVal) => this.putFavoriteLines(line, likedVal, "tramways")}
                                    />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Bus" key="buses">
                                    <LineTab
                                        line={linesList.buses}
                                        favoriteLine={favoriteLines.buses}
                                        type="Bus"
                                        likeTab={(line, likedVal) => this.putFavoriteLines(line, likedVal, "buses")}
                                    />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Noctiliens" key="noctiliens">
                                    <LineTab
                                        line={linesList.noctiliens}
                                        favoriteLine={favoriteLines.noctiliens}
                                        type="Noctilien"
                                        likeTab={(line, likedVal) => this.putFavoriteLines(line, likedVal, "noctiliens")}
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
    getLines,
    getFavoritesLines,
    putFavoritesLines
};

export default connect(mapStateToProps, mapDispatchToProps)(LinesScreen);
