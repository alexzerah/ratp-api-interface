import React, { Component } from "react";
import { connect } from 'react-redux';
import { getStations } from "../actions/stations";
import { getLines } from "../actions/lines";
import AppLayout from "../components/layouts/AppLayout";
import LoadingScreen from "../components/LoadingScreen";
import Tabs from "antd/lib/tabs";
import Icon from "antd/lib/icon";
import LineTab from "../components/line/LineTab";
import { notificationError } from "../utils/helper";

class LinesScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: Object.keys(this.props.lines.linesList).length === 0,
            stations: {}
        };

        document.title = "RATP API Interface - Lignes de transports";

        this.loadLines = this.loadLines.bind(this);
        this.loadStations = this.loadStations.bind(this);
    }

    componentDidMount() {
        Object.keys(this.props.lines.linesList).length === 0 && this.loadLines();
    }

    loadLines() {
        this.props.getLines()
            .then(() => this.setState({loading: false}))
            .catch(() => notificationError(this.props.lines.linesError.code, this.props.lines.linesError.message));
    }

    loadStations(type, line) {
        line && this.props.getStations(type, line)
            .catch(() => notificationError(this.props.stations.stationsError, this.props.stations.stationsError));
    }

    render() {
        const linesList = this.props.lines.linesList;
        

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
                                        type="Métro"
                                        onClick={line => this.loadStations("metros", line)}
                                        stationsList={this.props.stations && this.props.stations.stationsList}
                                    />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="RERs" key="rers">
                                    <LineTab
                                        line={linesList.rers}
                                        type="RER"
                                        onClick={line => this.loadStations("rers", line)}
                                        stationsList={this.props.stations && this.props.stations.stationsList}
                                    />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Tramways" key="tramways">
                                    <LineTab
                                        line={linesList.tramways}
                                        type="Tramway"
                                        onClick={line => this.loadStations("tramways", line)}
                                        stationsList={this.props.stations && this.props.stations.stationsList}
                                    />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Bus" key="buses">
                                    <LineTab
                                        line={linesList.buses}
                                        type="Bus"
                                        onClick={line => this.loadStations("buses", line)}
                                        stationsList={this.props.stations && this.props.stations.stationsList}
                                    />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Noctiliens" key="noctiliens">
                                    <LineTab
                                        line={linesList.noctiliens}
                                        type="Noctilien"
                                        onClick={line => this.loadStations("noctiliens", line)}
                                        stationsList={this.props.stations && this.props.stations.stationsList}
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
    stations: state.stations,
    lines: state.lines
});

const mapDispatchToProps = {
    getStations,
    getLines
};

export default connect(mapStateToProps, mapDispatchToProps)(LinesScreen);
