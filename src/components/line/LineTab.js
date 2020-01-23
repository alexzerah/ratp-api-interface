import React, { Component, Fragment } from "react";
import Select from "antd/lib/select";
import PropTypes from "prop-types";
import Pagination from "antd/lib/pagination";
import Collapse from "antd/lib/collapse";
import Spin from "antd/lib/spin";
import Timeline from "antd/lib/timeline/Timeline";
import Icon from "antd/lib/icon";
import LineCard from "./LineCard";
import LogoMetro from "../../static/img/logo/logo-metro.png";
import LogoTramway from "../../static/img/logo/logo-tramway.png";
import LogoRer from "../../static/img/logo/logo-rer.png";
import LogoNoctilien from "../../static/img/logo/logo-noctilien.png";
import LogoBus from "../../static/img/logo/logo-bus.png";
import { removeDuplicates } from "../../utils/helper";

class LineTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            line: (props.line && props.line.length > 0) && props.line,
            page: 1
        };

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(value) {
        this.setState({
            line: value.length > 0
                ? [...this.props.line].filter(l => value.some(v => l.name.includes(v)))
                : this.props.line
        });
    }

    getStations(line) {
        if (this.props.stationsList && this.props.stationsList.some(sL => sL.line === line) === false) {
            this.props.onClick && this.props.onClick(line);
        }
    }

    renderIcon(type) {
        switch (type) {
            case "Métro":
                return LogoMetro;
            case "Tramway":
                return LogoTramway;
            case "RER":
                return LogoRer;
            case "Noctilien":
                return LogoNoctilien;
            case "Bus":
                return LogoBus;
            default:
                return null;
        }
    }

    render() {
        return (
            <Fragment>
                {this.props.line && (
                    <Select
                    mode="multiple"
                    showSearch
                    allowClear
                    placeholder={"Sélectionnez une ou plusieurs ligne(s) de " + this.props.type + "(s)"}
                    onChange={value => this.handleSearch(value)}
                >
                    {
                        removeDuplicates(this.props.line, 'code')
                            .map(l =>
                                <Select.Option key={l.id} value={l.name}>{l.name}</Select.Option>
                            )
                    }
                </Select>
                )}
                {/* {
                    this.state.line &&
                    this.state.line.length > 0 &&
                    this.state.line
                        .slice((this.state.page - 1) * 10, this.state.page * 10)
                        .map(l =>
                            <LineCard
                                key={this.props.type + "-" + l.id}
                                type={this.props.type}
                                isLiked={
                                    this.props.favoriteLine &&
                                    this.props.favoriteLine.length > 0 &&
                                    this.props.favoriteLine.some(line => line.code === l.code)
                                }
                                lineItem={l}
                                stationsList={this.props.stationsList}
                                onClick={() => this.props.onClick && this.props.onClick(l.code)}
                                onClick={(line, likedVal) => this.props.likeTab && this.props.likeTab(line, likedVal)}
                                removeLikeButton={this.props.removeLikeButton}
                            />
                        )
                } */}
                <Collapse accordion className="cardList">
                {this.state.line && this.state.line
                    .slice((this.state.page - 1) * 10, this.state.page * 10)
                    .map(l =>
                        <Collapse.Panel 
                            showArrow={false}
                            key={this.props.type + "-" + l.id}
                            className="cardItem"
                            header={
                                <div className="cardItem__header" onClick={() => this.getStations(l.code)}>
                                    <div className="cardItem__header-title">
                                        <img className="cardItem__header-icon" src={this.renderIcon(this.props.type)} /><span>{l.code}</span>
                                    </div>
                                    <div className="cardItem__header-infos">
                                        <p>{l.name}</p>
                                        <p>Directions : {l.directions}</p>
                                    </div>
                                </div>
                            }
                            
                        >
                            {this.props.stationsList && this.props.stationsList.some(sL => sL.line === l.code) ? (
                                <Timeline className="cardItem__timeline" mode="alternate">
                                {
                                    this.props.stationsList.find(sL => sL.line === l.code).stations.map(
                                        (s, index) =>
                                            <Timeline.Item
                                                className="cardItem__timeline-item"
                                                key={s + "-" + index}
                                                // position={
                                                //     s.destination === this.state.destinations[0].name
                                                //         ? 'right'
                                                //         : 'left'
                                                // }
                                            >
                                                {s.name}
                                            </Timeline.Item>
                                        )
                                }
                            </Timeline>
                            ) : (
                                <div className="cardItem__empty">
                                    <Spin/>
                                </div>
                            )}
                            
                        </Collapse.Panel>
                    )
                }
                </Collapse>
                
                {
                    this.state.line && this.state.line.length > 10 &&
                        <Pagination simple onChange={page => this.setState({page})} total={this.state.line.length} />
                }
            </Fragment>
        );
    }
}

LineTab.propTypes = {
    /** The array of lines */
    line: PropTypes.array,
    /** The array of favorite lines */
    favoriteLine: PropTypes.array,
    /** If the boolean is true, remove the like button */
    removeLikeButton: PropTypes.bool,
    /** Function triggered to like the line */
    likeTab: PropTypes.func,
    /** The type of line */
    type: PropTypes.oneOf(['Métro', 'Tramway', 'RER', 'Noctilien', 'Bus']).isRequired
};

export default LineTab;
